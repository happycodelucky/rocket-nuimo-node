"use strict";
/**
 * @module numio-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const createDebugLogger = require("debug");
const noble = require("noble");
const weak = require("weak");
const events_1 = require("events");
const discovery_session_1 = require("./discovery-session");
const nuimo_device_1 = require("../device/nuimo-device");
const debug = createDebugLogger('nuimo:discovery');
/**
 * Discovery states for device discovery
 */
var DeviceDiscoveryState;
(function (DeviceDiscoveryState) {
    DeviceDiscoveryState[DeviceDiscoveryState["Initial"] = 0] = "Initial";
    DeviceDiscoveryState[DeviceDiscoveryState["BluetoothUnavailable"] = 1] = "BluetoothUnavailable";
    DeviceDiscoveryState[DeviceDiscoveryState["AwaitingDiscovering"] = 16] = "AwaitingDiscovering";
    DeviceDiscoveryState[DeviceDiscoveryState["Discovering"] = 17] = "Discovering";
})(DeviceDiscoveryState = exports.DeviceDiscoveryState || (exports.DeviceDiscoveryState = {}));
/**
 * A device manager is the main entry for connecting to Nuimo devices. It offers device discovery and
 *
 * Events:
 * - started
 * - stopped
 * - device
 */
class DeviceDiscoveryManager extends events_1.EventEmitter {
    /**
     * There should be no need to construct a new device manager. Use `defaultManager`
     */
    constructor() {
        super();
        /**
         * Device discovery state
         */
        this._discoveryState = DeviceDiscoveryState.Initial;
        /**
         * Indiciates if a discovery should be performed when the BT radio is powered on
         */
        this._discoverWhenPoweredOnRequested = false;
        /**
         * Active discovery sessions
         */
        this._sessions = new Set();
        /**
         * All devices discovered, index by device ID
         */
        this._discoveredDevices = new Map();
    }
    /**
     * Default device discovery manager to manage discovery of one or more Nuimo devices
     */
    static get defaultManager() {
        return new DeviceDiscoveryManager();
    }
    //
    // Public properties
    //
    /**
     * Active discovery state
     */
    get discoveryState() {
        return this._discoveryState;
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
     * Start a new discovery session to discover Nuimo devices
     *
     * @param options - discovery session options
     *
     * @return Session object initialized based on options and to observe discovery events on
     */
    startDiscoverySession(options) {
        // Initial discovery requires events to be registered
        if (this._discoveryState === DeviceDiscoveryState.Initial) {
            // TODO: Should we account for BT initialization for timeouts?
            this._initializeBluetooth();
            const self = this;
            noble.on('discover', async (peripheral) => {
                const isNuimoDevice = (peripheral.advertisement.localName === 'Nuimo');
                if (isNuimoDevice) {
                    debug(`Nuimo device found ${peripheral.uuid}`);
                    // Create a new device or pull the one from the cache
                    const existingDevice = self._discoveredDevices.get(peripheral.uuid);
                    const device = existingDevice || new nuimo_device_1.NuimoDevice(peripheral);
                    device.peripheral = peripheral;
                    // Cache device using a weak reference
                    if (!existingDevice) {
                        const uuid = peripheral.uuid;
                        const weakDevice = weak(device, () => {
                            const device = self._discoveredDevices.get(uuid);
                            if (weak.isDead(device) || weak.isNearDeath(device)) {
                                self._discoveredDevices.delete(uuid);
                            }
                        });
                        self._discoveredDevices.set(peripheral.uuid, device);
                        // TODO: Auto-reconnect handling
                        // // Listen for connect/disconnect
                        // device.on('disconnect', (willAutoReconnect: boolean) => {
                        //     if (!willAutoReconnect) {
                        //         self.discoveredDevices.delete(uuid)
                        //     }
                        // })
                    }
                    // Emit event
                    self.emit('device', device, !!existingDevice);
                    // Allow each session to handle the device as appropriate
                    this._sessions.forEach(session => {
                        session.onDeviceDiscovered(device, !!existingDevice);
                    });
                }
                else {
                    debug(`Other (non-Nuimo) device found '${peripheral.advertisement.localName}': ${peripheral.uuid}`);
                }
            });
        }
        // Create new session and schedule
        const session = new discovery_session_1.DeviceDiscoverySession(this, options);
        this._sessions.add(session);
        // If we need to wait for bluetooth then schedule it
        if (this._discoveryState <= DeviceDiscoveryState.BluetoothUnavailable) {
            this._discoverWhenPoweredOnRequested = true;
            return session;
        }
        this._discoverDevices();
        return session;
    }
    /**
     * Stops and removes a session from the list of managed sessions.
     * When all session have been removed discovery will cease.
     *
     * @param session - session to remove
     */
    stopDiscoverySession(session) {
        if (this._sessions.has(session)) {
            this._sessions.delete(session);
        }
        // If there are no more session, end discovery
        if (this._sessions.size === 0 && this._discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            this.stopDiscovery();
        }
    }
    /**
     * Stops _all_ discovery sessions in progress
     */
    stopDiscovery() {
        // If discovery has already been stopped, there is nothing to do
        if (this._discoveryState === DeviceDiscoveryState.AwaitingDiscovering) {
            return;
        }
        noble.stopScanning();
        this._discoverWhenPoweredOnRequested = false;
        // Only if in discovery mode should the state change
        if (this._discoveryState >= DeviceDiscoveryState.Discovering) {
            this._discoveryState = DeviceDiscoveryState.AwaitingDiscovering;
        }
        // Stop discovery on each session, removing it from the session pool
        this._sessions.forEach(session => {
            session.stopDiscovery(false);
        });
        // Add assert sessions.size === 0
        this.emit('stopped');
    }
    //
    // Private functions
    //
    /**
     * Initialized bluetooth on the host hardware, ensuring it's powered on
     * @private
     */
    _initializeBluetooth() {
        // Only initialized if the discovery was never started
        if (this._discoveryState !== DeviceDiscoveryState.Initial) {
            return;
        }
        debug('[bluetooth] waiting for poweredOn state');
        this._discoveryState = DeviceDiscoveryState.BluetoothUnavailable;
        const self = this;
        function onPowerStateChange(state) {
            debug(`[bluetooth] ${state}`);
            const poweredOn = state === 'poweredOn';
            if (poweredOn) {
                debug('Bluetooth powered on');
                // Awaiting discovery
                self._discoveryState = DeviceDiscoveryState.AwaitingDiscovering;
                if (self._discoverWhenPoweredOnRequested) {
                    self._discoverDevices();
                }
            }
            else {
                debug('Bluetooth powered off');
                // Radio has been powered off
                const wasInDiscovery = self._discoveryState === DeviceDiscoveryState.Discovering;
                // Stop all discovery
                self.stopDiscovery();
                // If discovery was in progress, then request discovery again when BT is available
                if (wasInDiscovery) {
                    debug(`was in discovery, will auto-resume on onPoweredOn`);
                    self._discoveryState = DeviceDiscoveryState.BluetoothUnavailable;
                    self._discoverWhenPoweredOnRequested = true;
                }
                // // Allow each session to handle the device as appropriate
                // self.sessions.forEach(session => {
                //     session.handleDevice(device, !!existingDevice)
                // })
                // Disconnect all devices and reconnect when BT is available again
                self.discoveredDevices.forEach(device => {
                    device.disconnect();
                });
            }
        }
        // Listen for power state changes in the radio
        noble.on('stateChange', onPowerStateChange.bind(this));
        // Check if the power is already on, and handle the power state
        if (noble.state === 'poweredOn') {
            onPowerStateChange(noble.state);
        }
    }
    /**
     * Kicks off device discovery
     * @private
     */
    _discoverDevices() {
        if (this._discoveryState !== DeviceDiscoveryState.AwaitingDiscovering) {
            return;
        }
        // Start discovery
        debug('Beginning device discovery session');
        this._discoveryState = DeviceDiscoveryState.Discovering;
        this._sessions.forEach(session => session.startDiscovery());
        noble.startScanning();
        this.emit('started');
    }
}
exports.DeviceDiscoveryManager = DeviceDiscoveryManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2Rpc2NvdmVyeS9kaXNjb3ZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILDJDQUEwQztBQUMxQywrQkFBOEI7QUFDOUIsNkJBQTRCO0FBRTVCLG1DQUFxQztBQUlyQywyREFBMkY7QUFFM0YseURBQW9EO0FBRXBELE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFFbEQ7O0dBRUc7QUFDSCxJQUFZLG9CQUtYO0FBTEQsV0FBWSxvQkFBb0I7SUFDNUIscUVBQTZCLENBQUE7SUFDN0IsK0ZBQTZCLENBQUE7SUFDN0IsOEZBQThCLENBQUE7SUFDOUIsOEVBQThCLENBQUE7QUFDbEMsQ0FBQyxFQUxXLG9CQUFvQixHQUFwQiw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBSy9CO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILDRCQUFvQyxTQUFRLHFCQUFZO0lBa0JwRDs7T0FFRztJQUNIO1FBQ0ksS0FBSyxFQUFFLENBQUE7UUFyQlg7O1dBRUc7UUFDSyxvQkFBZSxHQUF5QixvQkFBb0IsQ0FBQyxPQUFPLENBQUE7UUFDNUU7O1dBRUc7UUFDSyxvQ0FBK0IsR0FBWSxLQUFLLENBQUE7UUFDeEQ7O1dBRUc7UUFDSyxjQUFTLEdBQWdDLElBQUksR0FBRyxFQUFFLENBQUE7UUFDMUQ7O1dBRUc7UUFDSyx1QkFBa0IsR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQU9oRSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLEtBQUssY0FBYztRQUNyQixNQUFNLENBQUMsSUFBSSxzQkFBc0IsRUFBRSxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxFQUFFO0lBQ0Ysb0JBQW9CO0lBQ3BCLEVBQUU7SUFFRjs7T0FFRztJQUNILElBQUksY0FBYztRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFBO0lBQy9CLENBQUM7SUFF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