/**
 * @module nuimo-connect
 */

import * as createDebugLogger from 'debug'
import { EventEmitter } from 'events'
import { setTimeout } from 'timers';

import { DeviceDiscoveryManager, DeviceDiscoveryState } from './discovery'
import { NuimoDevice } from '../device/nuimo-device'

// Create debug logger
const debug = createDebugLogger('nuimo/device-manager')

/**
 * Options given when starting a new discovery session for Nuimo devices
 */
export interface DeviceDiscoverySessionOptions {
    /**
     * Timeout in seconds before auto-stopping discovery
     */
    timeout?: number

    /**
     * List of know device IDs to discover
     * When specified only those devices white listed will be evented
     */
    deviceIds?: string[]
}

/**
 * A single discovery session, keeping the vending manager monitor for Nuimo devices
 * 
 * Do not create a session manually, instead use DeviceDiscoveryManager to start discovery
 */
export class DeviceDiscoverySession extends EventEmitter {
    /**
     * Vending device manager
     */
    private _deviceManager: DeviceDiscoveryManager
    /**
     * Options supplied when starting a new discovery
     */
    private _discoveryOptions: DeviceDiscoverySessionOptions
    /**
     * Timeout timer when a timeout was specified
     */
    private _timeoutTimer?: NodeJS.Timer
    /**
     * Mutable internal discovery state
     */
    private _discoveryState: DeviceDiscoveryState
    /**
     * Internal map of discovered devices, and devices to ignore when seen subsequent times
     */
    private _discoveredDevices: Map<string, NuimoDevice> = new Map()    
    /**
     * Promise for first call to waitForFirstDevice
     */
    private _waitForDevicePromise?: Promise<NuimoDevice>
    /**
     * Callback for found device
     */    
    private _waitForDeviceResolveCallback?: (device: NuimoDevice) => void
    /**
     * Callback for timeouts or other rejections
     */    
    private _waitForDeviceRejectCallback?: (error: Error) => void    

    /**
     * @param manager - vending manager
     * @param options - session options
     */
    constructor(manager: DeviceDiscoveryManager, options?: DeviceDiscoverySessionOptions) {
        super()

        this._deviceManager = manager
        this._discoveryOptions = Object.assign({}, options)

        // Replicate the discovery state
        this._discoveryState = manager.discoveryState

        // Initialize a timeout
        const timeout = this._discoveryOptions.timeout;
        if (timeout && timeout > 0) {
            if (options instanceof Object) {
                this._timeoutTimer = setTimeout(this._handleSessionTimeout.bind(this), timeout * 1000)
            }
        }
    }

    //
    // Public properties
    //

    /**
     * Discovery state for the session
     */
    get discoveryState(): DeviceDiscoveryState {
        const managerState = this._deviceManager.discoveryState
        if (managerState === DeviceDiscoveryState.Discovering) {
            return this._discoveryState
        }
        
        return managerState
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
     * Stop device discover for this session
     */
    stop() {
        this.stopDiscovery(false)
    }

    /**
     * Waits for a single device, or until time out (if defined)
     * 
     * @param [autoStop=true] - causes the session to be stopped when a device is returned
     * 
     * @throw {NuimoDeviceError} when timing out
     */
    async waitForFirstDevice(autoStop: boolean = true): Promise<NuimoDevice> {
        if (this._waitForDevicePromise) {
            return this._waitForDevicePromise
        }

        // Check if there is already a device, if so return it immediately
        if (this._discoveredDevices.size > 0) {
            const iterator = this._discoveredDevices.values().next()
            if (iterator.value) {
                this._waitForDevicePromise = Promise.resolve(iterator.value)
                return this._waitForDevicePromise
            }
        }

        // Need to wait for a device to be discovered
        const self = this
        const lisenters = new Map<string, (...args) => void>()
        // Function called when a device is discovered
        function onWaitDeviceDiscovered(device: NuimoDevice) {
            if (self._waitForDeviceResolveCallback) {
                self._waitForDeviceResolveCallback(device)

                // stop discovery if we should auto-stop
                if (autoStop) {
                    self.stopDiscovery(false)
                }                 
            }
            self._waitForDeviceResolveCallback = undefined
            self._waitForDeviceRejectCallback = undefined
            lisenters.forEach((value, key) => {
                self.removeListener(key, value)
            })
        }
        // Function called when the session times out
        function onWaitTimeout() {
            if (self._waitForDeviceRejectCallback) {
                self._waitForDeviceRejectCallback(new Error('Timeout'))
            }
            self._waitForDeviceResolveCallback = undefined
            self._waitForDeviceRejectCallback = undefined
            lisenters.forEach((value, key) => {
                self.removeListener(key, value)
            })
        }

        // Listen for device/timeout events
        this.once('device', onWaitDeviceDiscovered)
        lisenters.set('device', onWaitDeviceDiscovered)
        this.once('timeout', onWaitTimeout)
        lisenters.set('timeout', onWaitTimeout)

        this._waitForDevicePromise = new Promise<NuimoDevice>((resolve, reject) => {
            self._waitForDeviceResolveCallback = resolve
            self._waitForDeviceRejectCallback = reject
        })

        return this._waitForDevicePromise
    }

    //
    // Module functions
    //

    /**
     * Called by DeviceDiscoveryManager, not intented to be called directly
     * @internal
     */
    startDiscovery() {
        if (this._deviceManager.discoveryState !== DeviceDiscoveryState.Discovering) {
            return 
        }

        this._discoveryState = DeviceDiscoveryState.Discovering
    }    

    /**
     * Stops discovery for this session
     * @internal
     * 
     * @param timeout - `true` if stopping is because of a timeout
     */
    stopDiscovery(timeout: boolean) {
        if (this.discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            this._discoveryState = DeviceDiscoveryState.AwaitingDiscovering
            this._deviceManager.stopDiscoverySession(this)

            if (this._timeoutTimer) {
                clearTimeout(this._timeoutTimer)
                this._timeoutTimer = undefined
            }

            // Emit timeout event
            this.emit('stopped', timeout)
        }
    }

    /**
     * Called from the vending manager when a device has been discovered
     * @internal
     * 
     * @param device - Nuimo device
     * @param newDevice - true if the device has never been seen before
     */
    onDeviceDiscovered(device: NuimoDevice, newDevice: boolean) {
        // Can happen between async calls, a stop is issued whilst we are async processing handling of
        // discovered devices
        if (this.discoveryState !== DeviceDiscoveryState.Discovering) {
            return
        }

        // If the device has already been seen, ignore it
        if (this._discoveredDevices.has(device.id)) {
            return
        }
        this._discoveredDevices.set(device.id, device)

        const whitelisted = this._discoveryOptions.deviceIds
        if (whitelisted) {
            if (whitelisted.includes(device.id)) {
                this.emit('device', device)
            }
        } else {
            this.emit('device', device)
        }
    }

    //
    // Private functions
    //

    /**
     * Called when the session times out
     * @private
     */
    private _handleSessionTimeout() {
        debug('discovery session timed out')

        // Emit timeout event
        this.emit('timeout', this)

        this._timeoutTimer = undefined
        this.stopDiscovery(true)

        this._deviceManager.stopDiscoverySession(this)
    }
}