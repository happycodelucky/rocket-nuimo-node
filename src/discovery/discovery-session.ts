import * as createDebugLogger from 'debug'
import { EventEmitter } from 'events'
import { setTimeout } from 'timers'

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
    private deviceManager: DeviceDiscoveryManager
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
     * @param manager - vending manager
     * @param options - session options
     */
    constructor(manager: DeviceDiscoveryManager, options?: DeviceDiscoverySessionOptions) {
        super()

        this.deviceManager = manager
        this.discoveryOptions = {...options}

        // Replicate the discovery state
        this.sessionDiscoveryState = manager.discoveryState

        // Initialize a timeout
        const timeout = this.discoveryOptions.timeout;
        if (timeout && timeout > 0) {
            if (options instanceof Object) {
                this.timeoutTimer = setTimeout(this.handleSessionTimeout.bind(this), timeout * 1000)
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
     * Waits for a single device, or until time out (if defined)
     *
     * @param [autoStop=true] - causes the session to be stopped when a device is returned
     *
     * @throw {NuimoDeviceError} when timing out
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
                self.removeListener(key, value)
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
                self.removeListener(key, value)
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

    //
    // Module functions
    //

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
        if (this.discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            this.sessionDiscoveryState = DeviceDiscoveryState.AwaitingDiscovering
            this.deviceManager.stopDiscoverySession(this)

            if (this.timeoutTimer) {
                clearTimeout(this.timeoutTimer)
                this.timeoutTimer = undefined
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
        if (this.sessionDiscoveredDevicesMap.has(device.id)) {
            return
        }
        this.sessionDiscoveredDevicesMap.set(device.id, device)

        const whitelisted = this.discoveryOptions.deviceIds
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
     */
    private handleSessionTimeout() {
        debug('discovery session timed out')

        // Emit timeout event
        this.emit('timeout', this)

        this.timeoutTimer = undefined
        this.stopDiscovery(true)

        this.deviceManager.stopDiscoverySession(this)
    }
}