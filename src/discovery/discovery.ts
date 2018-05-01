/**
 * @module numio-connect
 */

import * as createDebugLogger from 'debug'
import * as noble from 'noble'
import * as weak from 'weak'
import { Peripheral } from 'noble'
import { EventEmitter } from 'events'
import { setTimeout } from 'timers'

import * as glyphs from '../device/led-glyphs'
import { DeviceDiscoverySession, DeviceDiscoverySessionOptions } from './discovery-session'
import { LEDBitmap } from '../device/led-bitmap'
import { NuimoDevice } from '../device/nuimo-device'

const debug = createDebugLogger('nuimo:discovery')

/**
 * Discovery states for device discovery
 */
export enum DeviceDiscoveryState {
    Initial                 = 0x0,
    BluetoothUnavailable    = 0x1,
    AwaitingDiscovering     = 0x10,
    Discovering             = 0x11
}

/**
 * A device manager is the main entry for connecting to Nuimo devices. It offers device discovery and 
 * 
 * Events:
 * - started
 * - stopped
 * - device
 */
export class DeviceDiscoveryManager extends EventEmitter {
    /**
     * Device discovery state
     */
    private _discoveryState: DeviceDiscoveryState = DeviceDiscoveryState.Initial
    /**
     * Indiciates if a discovery should be performed when the BT radio is powered on
     */
    private _discoverWhenPoweredOnRequested: boolean = false    
    /**
     * Active discovery sessions 
     */
    private _sessions: Set<DeviceDiscoverySession> = new Set()
    /**
     * All devices discovered, index by device ID
     */
    private _discoveredDevices: Map<string, NuimoDevice> = new Map()

    /**
     * There should be no need to construct a new device manager. Use `defaultManager`
     */
    private constructor() {
        super()
    }

    /**
     * Default device discovery manager to manage discovery of one or more Nuimo devices
     */
    static get defaultManager(): DeviceDiscoveryManager {
        return new DeviceDiscoveryManager()
    }

    //
    // Public properties
    //

    /**
     * Active discovery state
     */
    get discoveryState(): DeviceDiscoveryState {
        return this._discoveryState
    }

    /**
     * All discovered devices by the device manager
     */
    get discoveredDevices(): NuimoDevice[] {
        return Array.from<NuimoDevice>(this._discoveredDevices.values())
    }

    //
    // Public functions
    //

    /**
     * Start a new discovery session to discover Nuimo devices
     * 
     * @param options - discovery session options
     * 
     * @return Session object initialized based on options and to observe discovery events on
     */
    startDiscoverySession(options?: DeviceDiscoverySessionOptions): DeviceDiscoverySession {
        // Initial discovery requires events to be registered
        if (this._discoveryState === DeviceDiscoveryState.Initial) {
            // TODO: Should we account for BT initialization for timeouts?
            this._initializeBluetooth()

            const self = this
            noble.on('discover', async (peripheral: Peripheral) => {
                const isNuimoDevice = (peripheral.advertisement.localName === 'Nuimo')
                if (isNuimoDevice) {
                    debug(`Nuimo device found ${peripheral.uuid}`)

                    // Create a new device or pull the one from the cache
                    const existingDevice = self._discoveredDevices.get(peripheral.uuid)

                    const device = existingDevice || new NuimoDevice(peripheral)
                    device.peripheral = peripheral

                    // Cache device using a weak reference
                    if (!existingDevice) {
                        const uuid = peripheral.uuid
                        const weakDevice = weak(device, () => {
                            const device = self._discoveredDevices.get(uuid)
                            if (weak.isDead(device!) || weak.isNearDeath(device!)) {
                                self._discoveredDevices.delete(uuid)
                            }
                        })

                        self._discoveredDevices.set(peripheral.uuid, device)

                        // TODO: Auto-reconnect handling
                        // // Listen for connect/disconnect
                        // device.on('disconnect', (willAutoReconnect: boolean) => {
                        //     if (!willAutoReconnect) {
                        //         self.discoveredDevices.delete(uuid)
                        //     }
                        // })
                    }

                    // Emit event
                    self.emit('device', device, !!existingDevice)

                    // Allow each session to handle the device as appropriate
                    this._sessions.forEach(session => {
                        session.onDeviceDiscovered(device, !!existingDevice)
                    })
                } else {
                    debug(`Other (non-Nuimo) device found '${peripheral.advertisement.localName}': ${peripheral.uuid}`)
                }
            })
        }

        // Create new session and schedule
        const session = new DeviceDiscoverySession(this, options)
        this._sessions.add(session)

        // If we need to wait for bluetooth then schedule it
        if (this._discoveryState <= DeviceDiscoveryState.BluetoothUnavailable) {
            this._discoverWhenPoweredOnRequested = true
            return session
        }        

        this._discoverDevices()

        return session
    }

    /**
     * Stops and removes a session from the list of managed sessions.
     * When all session have been removed discovery will cease.
     * 
     * @param session - session to remove
     */
    stopDiscoverySession(session: DeviceDiscoverySession) {
        if (this._sessions.has(session)) {
            this._sessions.delete(session)
        }

        // If there are no more session, end discovery
        if (this._sessions.size === 0 && this._discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            this.stopDiscovery()
        }
    }    

    /**
     * Stops _all_ discovery sessions in progress
     */
    stopDiscovery() {
        // If discovery has already been stopped, there is nothing to do
        if (this._discoveryState === DeviceDiscoveryState.AwaitingDiscovering) {
            return
        }

        noble.stopScanning()
        this._discoverWhenPoweredOnRequested = false

        // Only if in discovery mode should the state change
        if (this._discoveryState >= DeviceDiscoveryState.Discovering) {
            this._discoveryState = DeviceDiscoveryState.AwaitingDiscovering
        }

        // Stop discovery on each session, removing it from the session pool
        this._sessions.forEach(session => {
            session.stopDiscovery(false)
        })
        // Add assert sessions.size === 0

        this.emit('stopped')
    }

    //
    // Private functions
    //

    /**
     * Initialized bluetooth on the host hardware, ensuring it's powered on
     * @private
     */
    private _initializeBluetooth() {
        // Only initialized if the discovery was never started
        if (this._discoveryState !== DeviceDiscoveryState.Initial) {
            return
        }

        debug('[bluetooth] waiting for poweredOn state')
        this._discoveryState = DeviceDiscoveryState.BluetoothUnavailable

        const self = this
        function onPowerStateChange(state: string) {
            debug(`[bluetooth] ${state}`)

            const poweredOn = state === 'poweredOn'
            if (poweredOn) {
                debug('Bluetooth powered on')
                // Awaiting discovery
                self._discoveryState = DeviceDiscoveryState.AwaitingDiscovering
                if (self._discoverWhenPoweredOnRequested) {
                    self._discoverDevices()
                }
            } else {
                debug('Bluetooth powered off')
                // Radio has been powered off
                const wasInDiscovery = self._discoveryState === DeviceDiscoveryState.Discovering

                // Stop all discovery
                self.stopDiscovery()

                // If discovery was in progress, then request discovery again when BT is available
                if (wasInDiscovery) {
                    debug(`was in discovery, will auto-resume on onPoweredOn`)

                    self._discoveryState = DeviceDiscoveryState.BluetoothUnavailable
                    self._discoverWhenPoweredOnRequested = true
                }

                // // Allow each session to handle the device as appropriate
                // self.sessions.forEach(session => {
                //     session.handleDevice(device, !!existingDevice)
                // })

                // Disconnect all devices and reconnect when BT is available again
                self.discoveredDevices.forEach(device => {
                    device.disconnect()
                })             
            }
        } 

        // Listen for power state changes in the radio
        noble.on('stateChange', onPowerStateChange.bind(this))     
        
        // Check if the power is already on, and handle the power state
        if (noble.state === 'poweredOn') {
            onPowerStateChange(noble.state)
        }
    }

    /**
     * Kicks off device discovery
     * @private
     */
    private _discoverDevices() {
        if (this._discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            return
        }

        // Start discovery
        debug('Beginning device discovery session')
        this._discoveryState = DeviceDiscoveryState.Discovering
        this._sessions.forEach(session => session.startDiscovery())
        noble.startScanning()

        this.emit('started')
    }
}