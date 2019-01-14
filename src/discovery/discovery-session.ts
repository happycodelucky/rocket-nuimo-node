import * as createDebugLogger from 'debug'

import { EventEmitter } from 'events'
import { setTimeout } from 'timers'

import { DeviceDiscoveryManager } from './discovery'
import { DeviceDiscoveryState } from './device-discovery-state'
import { NuimoDevice } from '../model/nuimo-device'
import { NuimoOnDeviceDiscoveredCallback, NuimoOnDiscoveryDoneCallback, NuimoOnEventCallback } from '../callbacks/callbacks'

// Create debug logger
const debug = createDebugLogger('nuimo/discovery')

/**
 * Options given when starting a new discovery session for Nuimo devices
 */
export interface DeviceDiscoverySessionOptions {
    /**
     * Timeout in milliseconds before auto-stopping discovery
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
    readonly deviceManager: DeviceDiscoveryManager

    /**
     * Options supplied when starting a new discovery
     */
    private discoveryOptions: DeviceDiscoverySessionOptions

    /**
     * Timeout timer when a timeout was specified
     */
    private timeoutTimer?: NodeJS.Timer

    /**
     * Mutable internal discovery state
     */
    private sessionDiscoveryState: DeviceDiscoveryState

    /**
     * Internal map of discovered devices, and devices to ignore when seen subsequent times
     */
    private sessionDiscoveredDevicesMap: Map<string, NuimoDevice> = new Map()

    /**
     * Promise for first call to waitForFirstDevice
     */
    private waitForDevicePromise?: Promise<NuimoDevice>

    /**
     * Callback for found device
     */
    private waitForDeviceResolveCallback?: (device: NuimoDevice) => void

    /**
     * Callback for timeouts or other rejections
     */
    private waitForDeviceRejectCallback?: (error: Error) => void

    /**
     * @param manager - vending discovery manager
     * @param [options] - session options
     */
    constructor(manager: DeviceDiscoveryManager, options?: DeviceDiscoverySessionOptions) {
        super()

        this.deviceManager = manager
        this.discoveryOptions = {...options}

        // Replicate the discovery state
        this.sessionDiscoveryState = manager.discoveryState

        // Initialize a timeout
        const timeout = this.discoveryOptions.timeout
        if (timeout && timeout > 0) {
            if (options instanceof Object) {
                this.timeoutTimer = setTimeout(this.onSessionTimeout.bind(this), timeout)
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
        const managerState = this.deviceManager.discoveryState
        if (managerState === DeviceDiscoveryState.Discovering) {
            return this.sessionDiscoveryState
        }

        return managerState
    }

    /**
     * All discovered devices by the device manager
     */
    get discoveredDevices(): NuimoDevice[] {
        return [...this.sessionDiscoveredDevicesMap.values()]
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
     * Waits for a single (first) device or until time out, if specified when creating the session
     *
     * @param [autoStop=true] - causes the session to be stopped when a device is returned
     *
     * @throw `NuimoDeviceError` when timing out
     */
    async waitForFirstDevice(autoStop: boolean = true): Promise<NuimoDevice> {
        if (this.waitForDevicePromise) {
            return this.waitForDevicePromise
        }

        // Check if there is already a device, if so return it immediately
        if (this.sessionDiscoveredDevicesMap.size > 0) {
            const iterator = this.sessionDiscoveredDevicesMap.values().next()
            if (iterator.value) {
                this.waitForDevicePromise = Promise.resolve(iterator.value)

                return this.waitForDevicePromise
            }
        }

        // Need to wait for a device to be discovered
        const self = this
        const lisenters = new Map<string, (...args: any[]) => void>()
        // Function called when a device is discovered
        function onWaitDeviceDiscovered(device: NuimoDevice) {
            if (self.waitForDeviceResolveCallback) {
                self.waitForDeviceResolveCallback(device)

                // stop discovery if we should auto-stop
                if (autoStop) {
                    self.stopDiscovery(false)
                }
            }
            self.waitForDeviceResolveCallback = undefined
            self.waitForDeviceRejectCallback = undefined
            lisenters.forEach((value, key) => {
                self.removeListener(key as any, value)
            })
        }
        // Function called when the session times out
        function onWaitTimeout() {
            if (self.waitForDeviceRejectCallback) {
                self.waitForDeviceRejectCallback(new Error('Timeout'))
            }
            self.waitForDeviceResolveCallback = undefined
            self.waitForDeviceRejectCallback = undefined
            lisenters.forEach((value, key) => {
                self.removeListener(key as any, value)
            })
        }

        // Listen for device/timeout events
        this.once('device', onWaitDeviceDiscovered)
        lisenters.set('device', onWaitDeviceDiscovered)
        this.once('timeout', onWaitTimeout)
        lisenters.set('timeout', onWaitTimeout)

        this.waitForDevicePromise = new Promise<NuimoDevice>((resolve, reject) => {
            self.waitForDeviceResolveCallback = resolve
            self.waitForDeviceRejectCallback = reject
        })

        return this.waitForDevicePromise
    }

    /**
     * Called by DeviceDiscoveryManager, not intented to be called directly
     * @internal
     */
    startDiscovery() {
        if (this.deviceManager.discoveryState !== DeviceDiscoveryState.Discovering) {
            return
        }

        this.sessionDiscoveryState = DeviceDiscoveryState.Discovering
    }

    /**
     * Stops discovery for this session
     * @internal
     *
     * @param timeout - `true` if stopping is because of a timeout
     */
    stopDiscovery(timeout: boolean) {
        if (this.discoveryState !== DeviceDiscoveryState.Ready) {
            this.sessionDiscoveryState = DeviceDiscoveryState.Ready
            this.deviceManager.stopDiscoverySession(this)

            if (this.timeoutTimer) {
                clearTimeout(this.timeoutTimer)
                this.timeoutTimer = undefined
            }

            // Emit timeout event
            this.emit('done', timeout)
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
        if (this.sessionDiscoveredDevicesMap.has(device.id)) {
            return
        }
        this.sessionDiscoveredDevicesMap.set(device.id, device)

        const whitelisted = this.discoveryOptions.deviceIds
        if (!whitelisted || whitelisted.includes(device.id)) {
            this.emit('device', device, newDevice)
        }
    }

    //
    // Private functions
    //

    /**
     * Called when the session times out
     */
    private onSessionTimeout() {
        debug('Discovery session timed out')

        this.emit('timeout')

        this.timeoutTimer = undefined
        this.stopDiscovery(true)

        this.deviceManager.stopDiscoverySession(this)
    }
}

//
// Event declarations
//

export interface DeviceDiscoverySession extends EventEmitter {
    /**
     * Alias for `on`
     * @alias on
     *
     * @param event - The name of the event (*'device'*)
     * @param listener - The callback function
     */
    addListener(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    /**
     * Alias for `on`
     * @alias on
     *
     * @param event - The name of the event (*'timeout'*)
     * @param listener - The callback function
     */
    addListener(eventName: 'timeout', listener: NuimoOnEventCallback): this
    /**
     * Alias for `on`
     * @alias on
     *
     * @param event - The name of the event (*'done'*)
     * @param listener - The callback function
     */
    addListener(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    /** @internal */
    emit(eventName: 'device', device: NuimoDevice, newDevice: boolean): boolean
    /** @internal */
    emit(eventName: 'timeout'): boolean
    /** @internal */
    emit(eventName: 'done', timedOut: boolean): boolean

    /**
     * Returns a copy of the array of listeners for the event named eventName
     *
     * @param event - The name of the event (*'device'*)
     *
     * @return Array of listeners for the event named 'device'
     */
    listeners(eventName: 'device'): NuimoOnDeviceDiscoveredCallback[]
    /**
     * Returns a copy of the array of listeners for the event named eventName
     *
     * @param event - The name of the event (*'timeout'*)
     *
     * @return Array of listeners for the event named 'timeout'
     */
    listeners(eventName: 'timeout'): NuimoOnEventCallback[]
    /**
     * Returns a copy of the array of listeners for the event named eventName
     *
     * @param event - The name of the event (*'done'*)
     *
     * @return Array of listeners for the event named 'done'
     */
    listeners(eventName: 'done'): NuimoOnDiscoveryDoneCallback[]

    /**
     * Adds a device discovery listener function to the end of the `listeners` array
     *
     * @param event - The name of the event (*'done'*)
     * @param listener - Discovery callback listener
     */
    on(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    /**
     * Adds a discovery session timed out listener function to the end of the `listeners` array
     *
     * @param event - The name of the event (*'timeout'*)
     * @param listener - Timeout callback listener
     */
    on(eventName: 'timeout', listener: NuimoOnEventCallback): this
    /**
     * Adds a discovery session completed listener function to the end of the `listeners` array
     *
     * @param event - The name of the event (*'timeout'*)
     * @param listener - Done callback listener
     */
    on(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    /**
     * Adds a **one-time** device discovery listener callback to the end of the `listeners` array
     *
     * @param event - The name of the event (*'device'*)
     * @param listener - Discovery callback listener
     */
    once(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    /**
     * Adds a **one-time** discovery session timed out listener callback to the end of the `listeners` array
     *
     * @param event - The name of the event (*'timeout'*)
     * @param listener - Timeout callback listener
     */
    once(eventName: 'timeout', listener: NuimoOnEventCallback): this
    /**
     * Adds a **one-time** discovery session completed callback to the end of the `listeners` array
     *
     * @param event - The name of the event (*'done'*)
     * @param listener - Done callback listener
     */
    once(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    /**
     * Adds a device discovery listener function to the beginning of the `listeners` array
     *
     * @param event - The name of the event (*'device'*)
     * @param listener - Discovery callback listener
     */
    prependListener(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    /**
     * Adds a discovery session timed out listener function to the beginning of the `listeners` array
     *
     * @param event - The name of the event (*'timeout'*)
     * @param listener - Discovery callback listener
     */
    prependListener(eventName: 'timeout', listener: NuimoOnEventCallback): this
    /**
     * Adds a discovery session completed listener function to the beginning of the `listeners` array
     *
     * @param event - The name of the event (*'done'*)
     * @param listener - Discovery callback listener
     */
    prependListener(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    prependOnceListener(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    prependOnceListener(eventName: 'timeout', listener: NuimoOnEventCallback): this
    prependOnceListener(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    /**
     * Removes a listener callback when a device has been discovered
     *
     * @param event - The name of the event being listened for
     * @param listener - Discovery callback listener
     */
    removeListener(eventName: 'device', listener: NuimoOnDeviceDiscoveredCallback): this
    removeListener(eventName: 'timeout', listener: NuimoOnEventCallback): this
    removeListener(eventName: 'done', listener: NuimoOnDiscoveryDoneCallback): this

    /**
     * Returns the number of listeners listening to the event named eventName.
     * @param type - The name of the event being listened for
     *
     * @return Number of listeners listening
     */
    listenerCount(type: 'device' | 'timeout' | 'done'): number
}