/**
 * @module numio-connect
 */

import * as createDebugLogger from 'debug'
import * as noble from 'noble'
import * as weak from 'weak'
import { EventEmitter } from 'events'
import { Peripheral } from 'noble'

import { DeviceDiscoverySession, DeviceDiscoverySessionOptions } from './discovery-session'
import { NuimoDevice } from '../device/nuimo-device'

const debug = createDebugLogger('nuimo:discovery')

/**
 * Discovery states for device discovery
 */
export enum DeviceDiscoveryState {
    Initial                 = 0x0,
    BluetoothUnavailable    = 0x1,
    AwaitingDiscovering     = 0x10,
    Discovering             = 0x11,
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
    private managerDiscoveryState: DeviceDiscoveryState = DeviceDiscoveryState.Initial
    /**
     * Active discovery sessions
     */
    private activeSessions: Set<DeviceDiscoverySession> = new Set()
    /**
     * All devices discovered, index by device ID
     */
    private discoveredDevicesMap: Map<string, NuimoDevice> = new Map()
    /**
     * Indiciates if a discovery should be performed when the BT radio is powered on
     */
    private discoverWhenPoweredOnRequested: boolean = false

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
        return this.managerDiscoveryState
    }

    /**
     * All discovered devices by the device manager
     */
    get discoveredDevices(): NuimoDevice[] {
        return [...this.discoveredDevicesMap.values()]
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
        if (this.managerDiscoveryState === DeviceDiscoveryState.Initial) {
            // TODO: Should we account for BT initialization for timeouts?
            this.initializeBluetooth()

            const self = this
            noble.on('discover', async (peripheral: Peripheral) => {
                const isNuimoDevice = (peripheral.advertisement.localName === 'Nuimo')
                if (isNuimoDevice) {
                    debug(`Nuimo device found ${peripheral.uuid}`)

                    // Create a new device or pull the one from the cache
                    const existingDevice = self.discoveredDevicesMap.get(peripheral.uuid)

                    const device = existingDevice || new NuimoDevice(peripheral)
                    device.peripheral = peripheral

                    // Cache device using a weak reference
                    if (!existingDevice) {
                        const uuid = peripheral.uuid
                        weak(device, () => {
                            const weakDevice = self.discoveredDevicesMap.get(uuid)
                            if (weak.isDead(weakDevice!) || weak.isNearDeath(weakDevice!)) {
                                self.discoveredDevicesMap.delete(uuid)
                            }
                        })

                        self.discoveredDevicesMap.set(peripheral.uuid, device)

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
                    this.activeSessions.forEach((session) => {
                        session.onDeviceDiscovered(device, !!existingDevice)
                    })
                } else {
                    debug(`Other (non-Nuimo) device found '${peripheral.advertisement.localName}': ${peripheral.uuid}`)
                }
            })
        }

        // Create new session and schedule
        const discoverySession = new DeviceDiscoverySession(this, options)
        this.activeSessions.add(discoverySession)

        // If we need to wait for bluetooth then schedule it
        if (this.managerDiscoveryState <= DeviceDiscoveryState.BluetoothUnavailable) {
            this.discoverWhenPoweredOnRequested = true

            return discoverySession
        }

        this.discoverDevices()

        return discoverySession
    }

    /**
     * Stops and removes a session from the list of managed sessions.
     * When all session have been removed discovery will cease.
     *
     * @param session - session to remove
     */
    stopDiscoverySession(session: DeviceDiscoverySession) {
        if (this.activeSessions.has(session)) {
            this.activeSessions.delete(session)
        }

        // If there are no more session, end discovery
        if (this.activeSessions.size === 0 && this.managerDiscoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            this.stopDiscovery()
        }
    }

    /**
     * Stops _all_ discovery sessions in progress
     */
    stopDiscovery() {
        // If discovery has already been stopped, there is nothing to do
        if (this.managerDiscoveryState === DeviceDiscoveryState.AwaitingDiscovering) {
            return
        }

        noble.stopScanning()
        this.discoverWhenPoweredOnRequested = false

        // Only if in discovery mode should the state change
        if (this.managerDiscoveryState >= DeviceDiscoveryState.Discovering) {
            this.managerDiscoveryState = DeviceDiscoveryState.AwaitingDiscovering
        }

        // Stop discovery on each session, removing it from the session pool
        this.activeSessions.forEach(session => {
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
     */
    private initializeBluetooth() {
        // Only initialized if the discovery was never started
        if (this.managerDiscoveryState !== DeviceDiscoveryState.Initial) {
            return
        }

        debug('[bluetooth] waiting for poweredOn state')
        this.managerDiscoveryState = DeviceDiscoveryState.BluetoothUnavailable

        const self = this
        function onPowerStateChange(state: string) {
            debug(`[bluetooth] ${state}`)

            const poweredOn = state === 'poweredOn'
            if (poweredOn) {
                debug('Bluetooth powered on')
                // Awaiting discovery
                self.managerDiscoveryState = DeviceDiscoveryState.AwaitingDiscovering
                if (self.discoverWhenPoweredOnRequested) {
                    self.discoverDevices()
                }
            } else {
                debug('Bluetooth powered off')
                // Radio has been powered off
                const wasInDiscovery = self.managerDiscoveryState === DeviceDiscoveryState.Discovering

                // Stop all discovery
                self.stopDiscovery()

                // If discovery was in progress, then request discovery again when BT is available
                if (wasInDiscovery) {
                    debug('was in discovery, will auto-resume on onPoweredOn')

                    self.managerDiscoveryState = DeviceDiscoveryState.BluetoothUnavailable
                    self.discoverWhenPoweredOnRequested = true
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
     */
    private discoverDevices() {
        if (this.managerDiscoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            return
        }

        // Start discovery
        debug('Beginning device discovery session')
        this.managerDiscoveryState = DeviceDiscoveryState.Discovering
        this.activeSessions.forEach(session => session.startDiscovery())
        noble.startScanning()

        this.emit('started')
    }
}