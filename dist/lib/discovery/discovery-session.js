"use strict";
/**
 * @module nuimo-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const createDebugLogger = require("debug");
const events_1 = require("events");
const timers_1 = require("timers");
const discovery_1 = require("./discovery");
// Create debug logger
const debug = createDebugLogger('nuimo/device-manager');
/**
 * A single discovery session, keeping the vending manager monitor for Nuimo devices
 *
 * Do not create a session manually, instead use DeviceDiscoveryManager to start discovery
 */
class DeviceDiscoverySession extends events_1.EventEmitter {
    /**
     * @param manager - vending manager
     * @param options - session options
     */
    constructor(manager, options) {
        super();
        /**
         * Internal map of discovered devices, and devices to ignore when seen subsequent times
         */
        this._discoveredDevices = new Map();
        this._deviceManager = manager;
        this._discoveryOptions = Object.assign({}, options);
        // Replicate the discovery state
        this._discoveryState = manager.discoveryState;
        // Initialize a timeout
        const timeout = this._discoveryOptions.timeout;
        if (timeout && timeout > 0) {
            if (options instanceof Object) {
                this._timeoutTimer = timers_1.setTimeout(this._handleSessionTimeout.bind(this), timeout * 1000);
            }
        }
    }
    //
    // Public properties
    //
    /**
     * Discovery state for the session
     */
    get discoveryState() {
        const managerState = this._deviceManager.discoveryState;
        if (managerState === discovery_1.DeviceDiscoveryState.Discovering) {
            return this._discoveryState;
        }
        return managerState;
    }
    /**
     * All discovered devices by the device manager
     */
    get discoveredDevices() {
        return Array.from(this._discoveredDevices.values());
    }
    //
    // Public functions
    //
    /**
     * Stop device discover for this session
     */
    stop() {
        this.stopDiscovery(false);
    }
    /**
     * Waits for a single device, or until time out (if defined)
     *
     * @param [autoStop=true] - causes the session to be stopped when a device is returned
     *
     * @throw {NuimoDeviceError} when timing out
     */
    async waitForFirstDevice(autoStop = true) {
        if (this._waitForDevicePromise) {
            return this._waitForDevicePromise;
        }
        // Check if there is already a device, if so return it immediately
        if (this._discoveredDevices.size > 0) {
            const iterator = this._discoveredDevices.values().next();
            if (iterator.value) {
                this._waitForDevicePromise = Promise.resolve(iterator.value);
                return this._waitForDevicePromise;
            }
        }
        // Need to wait for a device to be discovered
        const self = this;
        const lisenters = new Map();
        // Function called when a device is discovered
        function onWaitDeviceDiscovered(device) {
            if (self._waitForDeviceResolveCallback) {
                self._waitForDeviceResolveCallback(device);
                // stop discovery if we should auto-stop
                if (autoStop) {
                    self.stopDiscovery(false);
                }
            }
            self._waitForDeviceResolveCallback = undefined;
            self._waitForDeviceRejectCallback = undefined;
            lisenters.forEach((value, key) => {
                self.removeListener(key, value);
            });
        }
        // Function called when the session times out
        function onWaitTimeout() {
            if (self._waitForDeviceRejectCallback) {
                self._waitForDeviceRejectCallback(new Error('Timeout'));
            }
            self._waitForDeviceResolveCallback = undefined;
            self._waitForDeviceRejectCallback = undefined;
            lisenters.forEach((value, key) => {
                self.removeListener(key, value);
            });
        }
        // Listen for device/timeout events
        this.once('device', onWaitDeviceDiscovered);
        lisenters.set('device', onWaitDeviceDiscovered);
        this.once('timeout', onWaitTimeout);
        lisenters.set('timeout', onWaitTimeout);
        this._waitForDevicePromise = new Promise((resolve, reject) => {
            self._waitForDeviceResolveCallback = resolve;
            self._waitForDeviceRejectCallback = reject;
        });
        return this._waitForDevicePromise;
    }
    //
    // Module functions
    //
    /**
     * Called by DeviceDiscoveryManager, not intented to be called directly
     * @internal
     */
    startDiscovery() {
        if (this._deviceManager.discoveryState !== discovery_1.DeviceDiscoveryState.Discovering) {
            return;
        }
        this._discoveryState = discovery_1.DeviceDiscoveryState.Discovering;
    }
    /**
     * Stops discovery for this session
     * @internal
     *
     * @param timeout - `true` if stopping is because of a timeout
     */
    stopDiscovery(timeout) {
        if (this.discoveryState !== discovery_1.DeviceDiscoveryState.AwaitingDiscovering) {
            this._discoveryState = discovery_1.DeviceDiscoveryState.AwaitingDiscovering;
            this._deviceManager.stopDiscoverySession(this);
            if (this._timeoutTimer) {
                clearTimeout(this._timeoutTimer);
                this._timeoutTimer = undefined;
            }
            // Emit timeout event
            this.emit('stopped', timeout);
        }
    }
    /**
     * Called from the vending manager when a device has been discovered
     * @internal
     *
     * @param device - Nuimo device
     * @param newDevice - true if the device has never been seen before
     */
    onDeviceDiscovered(device, newDevice) {
        // Can happen between async calls, a stop is issued whilst we are async processing handling of
        // discovered devices
        if (this.discoveryState !== discovery_1.DeviceDiscoveryState.Discovering) {
            return;
        }
        // If the device has already been seen, ignore it
        if (this._discoveredDevices.has(device.id)) {
            return;
        }
        this._discoveredDevices.set(device.id, device);
        const whitelisted = this._discoveryOptions.deviceIds;
        if (whitelisted) {
            if (whitelisted.includes(device.id)) {
                this.emit('device', device);
            }
        }
        else {
            this.emit('device', device);
        }
    }
    //
    // Private functions
    //
    /**
     * Called when the session times out
     * @private
     */
    _handleSessionTimeout() {
        debug('discovery session timed out');
        // Emit timeout event
        this.emit('timeout', this);
        this._timeoutTimer = undefined;
        this.stopDiscovery(true);
        this._deviceManager.stopDiscoverySession(this);
    }
}
exports.DeviceDiscoverySession = DeviceDiscoverySession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJ5LXNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZGlzY292ZXJ5L2Rpc2NvdmVyeS1zZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCwyQ0FBMEM7QUFDMUMsbUNBQXFDO0FBQ3JDLG1DQUFvQztBQUVwQywyQ0FBMEU7QUFHMUUsc0JBQXNCO0FBQ3RCLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFrQnZEOzs7O0dBSUc7QUFDSCw0QkFBb0MsU0FBUSxxQkFBWTtJQWtDcEQ7OztPQUdHO0lBQ0gsWUFBWSxPQUErQixFQUFFLE9BQXVDO1FBQ2hGLEtBQUssRUFBRSxDQUFBO1FBdEJYOztXQUVHO1FBQ0ssdUJBQWtCLEdBQTZCLElBQUksR0FBRyxFQUFFLENBQUE7UUFxQjVELElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFBO1FBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUVuRCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFBO1FBRTdDLHVCQUF1QjtRQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxtQkFBVSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQzFGLENBQUM7UUFDTCxDQUFDO0lBQ0ws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