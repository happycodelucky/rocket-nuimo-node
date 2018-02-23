"use strict";
/**
 * @module numio-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const createDebugLogger = require("debug");
const events_1 = require("events");
const gatt_1 = require("../bluetooth/gatt");
const gatt_2 = require("../bluetooth/gatt");
const device_communication_error_1 = require("../errors/device-communication-error");
const gatt_3 = require("../bluetooth/gatt");
const gatt_4 = require("../bluetooth/gatt");
const gatt_5 = require("../bluetooth/gatt");
// Create debug logger
const debug = createDebugLogger('nuimo/device');
/**
 * Connected status of a device
 */
var DeviceConnectedState;
(function (DeviceConnectedState) {
    DeviceConnectedState["Disconnected"] = "disconnected";
    DeviceConnectedState["Connecting"] = "connecting";
    DeviceConnectedState["Connected"] = "connected";
})(DeviceConnectedState = exports.DeviceConnectedState || (exports.DeviceConnectedState = {}));
/**
 * Interaction gesture direction
 */
var SwipeDirection;
(function (SwipeDirection) {
    SwipeDirection["Left"] = "left";
    SwipeDirection["Right"] = "right";
    SwipeDirection["Up"] = "up";
    SwipeDirection["Down"] = "down";
})(SwipeDirection = exports.SwipeDirection || (exports.SwipeDirection = {}));
/**
 * Direction for fly gestures
 */
var FlyDirection;
(function (FlyDirection) {
    FlyDirection["Left"] = "left";
    FlyDirection["Right"] = "right";
    FlyDirection["Hover"] = "hover";
})(FlyDirection = exports.FlyDirection || (exports.FlyDirection = {}));
/**
 * Interaction gesture area
 */
var TouchArea;
(function (TouchArea) {
    TouchArea["Left"] = "left";
    TouchArea["Right"] = "right";
    TouchArea["Top"] = "top";
    TouchArea["Bottom"] = "bottom";
})(TouchArea = exports.TouchArea || (exports.TouchArea = {}));
/**
 * LED bitmap display transition effect
 */
var LEDBitmapTransitionEffect;
(function (LEDBitmapTransitionEffect) {
    LEDBitmapTransitionEffect[LEDBitmapTransitionEffect["Immediate"] = 0] = "Immediate";
    LEDBitmapTransitionEffect[LEDBitmapTransitionEffect["CrossFade"] = 128] = "CrossFade";
})(LEDBitmapTransitionEffect = exports.LEDBitmapTransitionEffect || (exports.LEDBitmapTransitionEffect = {}));
// Swipe and touch gesture event map
const swipeTouchEventMap = new Map();
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.SwipeLeft, { event: 'swipe', value: SwipeDirection.Left });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.SwipeRight, { event: 'swipe', value: SwipeDirection.Right });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.SwipeUp, { event: 'swipe', value: SwipeDirection.Down });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.SwipeDown, { event: 'swipe', value: SwipeDirection.Up });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.TouchLeft, { event: 'touch', value: TouchArea.Left });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.TouchRight, { event: 'touch', value: TouchArea.Right });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.TouchTop, { event: 'touch', value: TouchArea.Bottom });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.TouchBottom, { event: 'touch', value: TouchArea.Top });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.LongTouchLeft, { event: 'longTouch', value: TouchArea.Left });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.LongTouchRight, { event: 'longTouch', value: TouchArea.Right });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.LongTouchTop, { event: 'longTouch', value: TouchArea.Bottom });
swipeTouchEventMap.set(gatt_2.TouchOrSwipeCharacteristicData.LongTouchBottom, { event: 'longTouch', value: TouchArea.Top });
// Fly gesture event map
const flyEventMap = new Map();
flyEventMap.set(gatt_2.FlyCharacteristicData.Left, { event: 'fly', value: FlyDirection.Left });
flyEventMap.set(gatt_2.FlyCharacteristicData.Right, { event: 'fly', value: FlyDirection.Right });
flyEventMap.set(gatt_2.FlyCharacteristicData.UpDown, { event: 'fly', value: FlyDirection.Hover });
//
// Constants 
//
// Timeout when connecting to a device
const DEVICE_CONNECT_TIMEOUT = 30; // 30 seconds
// Number of points to accumulate one rotation
const DEVICE_ROTATION_STEPS = 2666.66;
// LED transition effect mask
const LED_TRANSITION_EFFECT_MASK = 0b0010000;
/**
 * A Nuimo device to interact with.
 *
 * Use `NuimoDevice.connectedDevice` to fetch a device that is fully connected rather than construct a NuimoDevice
 * directly. A returned device could be disconnected before use so be sure to check any `NuimoDeviceError` thrown
 * or observe the `disconnected` event.
 */
class NuimoDevice extends events_1.EventEmitter {
    /**
     * @param peripheral - bluetooth peripheral representing the device
     * @private
     */
    constructor(peripheral) {
        super();
        /**
         * State of connection to a peripheral
         */
        this._connectedState = DeviceConnectedState.Disconnected;
        /**
         * Battery level
         */
        this._batteryLevel = 100;
        /**
         * Minimum rotation (default 0.0)
         */
        this._minRotation = 0.0;
        /**
         * Maximum rotation (default 1.0)
         */
        this._maxRotation = 1.0;
        /**
         * Rotation level of the device between `minRotation` and `maxRotation`
         */
        this._rotation = 0.0;
        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('NuimoDevice(peripheral) does not represent a Nuimo device');
        }
        this.peripheral = peripheral;
    }
    //
    // Public properties
    //
    /**
     * Connection state of the Nuimo device
     */
    get connectedState() {
        return this._connectedState;
    }
    /**
     * Device ID
     */
    get id() {
        return this._peripheral.id;
    }
    /**
     * RSSI of bluetooth connection to the device, or undefined when not connected
     * @event 'rssi' - updates this value
     */
    get rssi() {
        if (this.connectedState === DeviceConnectedState.Connected) {
            return this._peripheral.rssi;
        }
        return undefined;
    }
    /**
     * Device battery level
     * @event 'batteryLevel' - updates this value
     */
    get batteryLevel() {
        if (this.connectedState === DeviceConnectedState.Connected) {
            return this._batteryLevel;
        }
        return undefined;
    }
    /**
     * Current device rotation value, can be between `minRotation` and `maxRotation`
     */
    get rotation() {
        return this._rotation;
    }
    /**
     * Set the device rotation value
     *
     * @param rotation: rotation value
     */
    set rotation(rotation) {
        this._rotation = Math.max(Math.min(this.maxRotation, rotation), this.minRotation);
    }
    /**
     * Minimum rotation allowed (default 0.0)
     */
    get minRotation() {
        return this._minRotation;
    }
    /**
     * Set device's minimum rotation valu allowed
     *
     * @param minRotation: Minimum rotation value
     */
    set minRotation(minRotation) {
        this._minRotation = minRotation;
        // Reset the current rotation
        if (this.rotation < this.minRotation) {
            this.rotation = this.minRotation;
        }
        // Match the max rotation
        if (this.minRotation > this.maxRotation) {
            this.maxRotation = this.minRotation;
        }
    }
    /**
     * Maximum rotation allowed (default 0.0)
     */
    get maxRotation() {
        return this._maxRotation;
    }
    /**
     * Set device's maximum rotation valu allowed
     *
     * @param maxRotation: Maximum rotation value
     */
    set maxRotation(maxRotation) {
        this._maxRotation = maxRotation;
        // Reset the current rotation
        if (this.rotation > this.maxRotation) {
            this.rotation = this.maxRotation;
        }
        // Match the min rotation
        if (this.maxRotation > this.minRotation) {
            this.minRotation = this.maxRotation;
        }
    }
    //
    // Public functions
    //
    /**
     * Displays a bitmap on the Nuimo device
     *
     * @param bitmap - LED bitmap to display
     * @param [options={}] - display options
     */
    async displayBitmap(bitmap, options = {}) {
        // Require connnection
        this._connectionRequiredToProceed();
        const characteristic = this._ledCharacteristic;
        if (characteristic) {
            const self = this;
            return new Promise((resolve, reject) => {
                // Display brightness
                let brightnessByte = 0;
                if (options.brightness !== undefined) {
                    brightnessByte = Math.round(options.brightness * 255) & 0xFF;
                }
                else {
                    brightnessByte = 255;
                }
                // Display time (max 25.5 seconds)
                let displayTime = 0;
                if (options.timeoutMs !== undefined) {
                    displayTime = Math.round((options.timeoutMs / 1000.0)) & 0xFF;
                }
                else {
                    displayTime = 255; // 0
                }
                const matrixLen = bitmap.buffer.length;
                const data = Buffer.alloc(matrixLen + 2);
                bitmap.buffer.copy(data);
                data[matrixLen] = brightnessByte;
                data[matrixLen + 1] = displayTime;
                if ('transitionEffect' in options) {
                    const FADE_FLAG = 0b00010000;
                    switch (options.transitionEffect) {
                        case LEDBitmapTransitionEffect.CrossFade:
                            data[10] &= FADE_FLAG;
                            break;
                        default:
                            data[10] |= ~FADE_FLAG;
                            break;
                    }
                }
                // Write out LED data
                characteristic.write(new Buffer(data), false, (err) => {
                    if (err) {
                        if (self.connectedState === DeviceConnectedState.Disconnected) {
                            reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                        }
                        else {
                            reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Bluetooth, self.id, err));
                        }
                        return;
                    }
                    else {
                        resolve(true);
                    }
                });
            });
        }
        throw new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.NotReady, this.id);
    }
    /**
     * Disconnects cleanly from the device
     */
    disconnect() {
        this._peripheral.removeAllListeners();
        this._peripheral.disconnect();
        this._ledCharacteristic = undefined;
        this._connectedState = DeviceConnectedState.Disconnected;
        this.emit('disconnect');
    }
    //
    // Module functions
    //
    /**
     * Underlying bluetooth peripheral
     * @internal
     */
    get peripheral() {
        return this._peripheral;
    }
    /**
     * Sets a new peripheral to preprent the Nuimo device
     * This may attempt a reconnect if a connection was prior lost
     * @internal
     *
     * @param peripheral - bluetooth peripheral representing the device
     */
    set peripheral(peripheral) {
        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('peripheral(peripheral) does not represent a Nuimo device');
        }
        if (peripheral !== this._peripheral) {
            const oldPeripheral = this._peripheral;
            if (oldPeripheral) {
                oldPeripheral.removeAllListeners();
                oldPeripheral.disconnect;
            }
            this._connectedState = DeviceConnectedState.Disconnected;
            this._peripheral = peripheral;
            this._ledCharacteristic = undefined;
        }
    }
    /**
     * Connects to the device, if not already connected.
     * @internal
     */
    async connect() {
        // Check there still is an associated peripheral
        if (!this._peripheral) {
            throw new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.NotAvailable, this.id);
        }
        // TODO: Should we here attempt to establish a connection session with the device ID 
        return this._connectToPeriperal(true);
    }
    //
    // Private functions
    //
    /**
     * Connects to a peripheral
     * @private
     *
     * @param peripheral - peripheral representing a Nuimo device to connect to
     */
    async _connectToPeriperal(attemptReconnect = false) {
        debug(`Connecting to device ${this.id}`);
        if (this.connectedState !== DeviceConnectedState.Disconnected) {
            return this._pendingConnection;
        }
        const peripheral = this.peripheral;
        if (!peripheral.connectable) {
            throw new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.NotConnectable, this.id);
        }
        // About to attempt connection
        this._connectedState = DeviceConnectedState.Connecting;
        const self = this;
        this._pendingConnection = new Promise((resolve, reject) => {
            // Set up a connection timeout timer in case connection does not succeed
            let timeout = false;
            const timeoutTimer = setTimeout(() => {
                timeout = true;
                // If the periperal is differnet, it was an aborted connection
                if (peripheral !== self._peripheral) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                    return;
                }
                // Disconnected
                self.disconnect();
                this._connectedState = DeviceConnectedState.Disconnected;
                reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.ConnectionTimeout, self.id));
            }, DEVICE_CONNECT_TIMEOUT * 1000);
            // When connected
            peripheral.once('connect', async () => {
                clearTimeout(timeoutTimer);
                if (timeout) {
                    return;
                }
                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                    return;
                }
                // Now connected
                this._connectedState = DeviceConnectedState.Connected;
                // Now connected, listen for disconnects
                peripheral.on('disconnect', () => {
                    if (peripheral === self._peripheral) {
                        debug(`Disconnected from device ${self.id}`);
                        self.disconnect();
                    }
                });
                peripheral.on('rssiUpdate', () => {
                    self.emit('rssi', self.rssi);
                });
                // Begin service discovery...
                const services = await new Promise((resolve, reject) => {
                    const services = [gatt_3.DeviceService.BatteryStatus, gatt_3.DeviceService.LED, gatt_3.DeviceService.Nuimo];
                    peripheral.discoverServices([], async (err, services) => {
                        if (err) {
                            reject(new Error(err));
                            return;
                        }
                        resolve(services);
                    });
                });
                debug(`Discovered ${services.length} services on device ${peripheral.uuid}`);
                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                    return;
                }
                // Characterisitic discovery...
                await Promise.all(services.map(service => {
                    return new Promise((resolve, reject) => {
                        service.discoverCharacteristics([], (err, characteristics) => {
                            if (err) {
                                reject(new Error(err));
                                return;
                            }
                            resolve(characteristics);
                        });
                    });
                }));
                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                    return;
                }
                // All the characteristics should be cached now
                const awaitBindings = [];
                services.forEach(service => {
                    switch (service.uuid) {
                        case gatt_3.DeviceService.BatteryStatus:
                            awaitBindings.push(...self._bindToBatteryServiceCharacteristics(service, service.characteristics));
                            break;
                        case gatt_3.DeviceService.Nuimo:
                            awaitBindings.push(...self._bindToNuimoServiceCharacteristics(service, service.characteristics));
                            break;
                        case gatt_3.DeviceService.LED:
                            this._ledCharacteristic = service.characteristics
                                .find(characteristic => characteristic.uuid === gatt_4.LEDServiceCharacteristic.LEDMatrix);
                            // Increase count for animations
                            // TODO: Better solution out there
                            this._ledCharacteristic.setMaxListeners(20);
                            break;
                    }
                });
                await Promise.all(awaitBindings);
                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, self.id));
                    return;
                }
                resolve(true);
            });
            // Perform connection
            peripheral.connect((err) => {
                clearTimeout(timeoutTimer);
                if (timeout) {
                    return;
                }
                if (err) {
                    reject(new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Bluetooth, self.id, err));
                }
            });
        });
        return this._pendingConnection;
    }
    /**
     * Throws an error if the device is not fully connected, ensuring code following this call can operated on
     * a connected device.
     */
    _connectionRequiredToProceed() {
        switch (this.connectedState) {
            case DeviceConnectedState.Connected:
                return;
            case DeviceConnectedState.Connecting:
                throw new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.NotReady, this.id);
            case DeviceConnectedState.Disconnected:
                throw new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Disconnected, this.id);
        }
    }
    //
    // Private functions
    //
    /**
     * Subscribes to a characteristic with a notify handler
     * @private
     *
     * @param characteristic - characteristic to subscribe to
     * @param handler - handler to be called when the characteristic value changes
     * @return Promise to capture when subscription has succeeded
     */
    _bindCharacterNotifyHandler(characteristic, handler) {
        debug(`Subscribing to characteristic ${characteristic.name || characteristic.uuid}`);
        characteristic.on('data', (data, isNotification) => {
            handler(data, characteristic);
        });
        const self = this;
        return new Promise((resolve, reject) => {
            characteristic.subscribe((error) => {
                if (error) {
                    debug(`Device ${this.id} error: ${error}`);
                    const deviceError = new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Bluetooth, self.id, error);
                    this.emit('error', deviceError);
                    reject(deviceError);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    /**
     * Subscribes to characteristics of the battery status service
     * @private
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    _bindToBatteryServiceCharacteristics(service, characteristics) {
        const awaitingBidings = [];
        for (const characteristic of characteristics) {
            switch (characteristic.uuid) {
                case gatt_1.BatteryStatusServiceCharacteristic.BatteryLevel:
                    awaitingBidings.push(this._bindCharacterNotifyHandler(characteristic, this._handleBatteryLevelNotify.bind(this)));
                    // Read the battery level and add the read to the awaitingBidings so the battery level is set 
                    // before the connection is established
                    const self = this;
                    awaitingBidings.push(new Promise((resolve, reject) => {
                        characteristic.read((error, data) => {
                            if (error) {
                                debug(`Device ${this.id} error: ${error}`);
                                const deviceError = new device_communication_error_1.DeviceCommunicationError(device_communication_error_1.DeviceCommunicationErrorCode.Bluetooth, self.id, error);
                                this.emit('error', deviceError);
                                // Do not reject
                                return;
                            }
                            self._handleBatteryLevelNotify(data, characteristic);
                            resolve(true);
                        });
                    }));
                    break;
                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`);
            }
        }
        return awaitingBidings;
    }
    /**
     * Subscribes to characteristics of the nuimo service
     * @private
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    _bindToNuimoServiceCharacteristics(service, characteristics) {
        const awaitBindings = [];
        for (const characteristic of characteristics) {
            switch (characteristic.uuid) {
                case gatt_5.NuimoServiceCharacteristic.ButtonClick:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleButtonClick.bind(this)));
                    break;
                case gatt_5.NuimoServiceCharacteristic.Fly:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleFlyGesture.bind(this)));
                    break;
                case gatt_5.NuimoServiceCharacteristic.Rotation:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleRotate.bind(this)));
                    break;
                case gatt_5.NuimoServiceCharacteristic.TouchOrSwipe:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleTouchorSwipe.bind(this)));
                    break;
                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`);
            }
        }
        // There is nothing to wait for, all UI subscriptions can come later
        return awaitBindings;
    }
    /**
     * Handles user interface button clicks
     * @private
     *
     * @param {Buffer} data - characteristic data
     * @param {Characteristic} characteristic - characteristic the data is fod
     */
    _handleButtonClick(data, characteristic) {
        if (data[0] === gatt_2.ButtonClickCharacteristicData.Released) {
            debug('Button click released');
            this.emit("button.released");
        }
        else if (data[0] === gatt_2.ButtonClickCharacteristicData.Pressed) {
            debug('Button click pressed');
            this.emit("button.pressed");
        }
        this.emit("button", data[0]);
    }
    /**
     * Notification handler for device fly gesture
     * @private
     *
     * @param data - fly characteristic data
     * @param characteristic - notification characteristic
     */
    _handleFlyGesture(data, characteristic) {
        const { event, value } = flyEventMap.get(data[0]);
        // TODO: Normalize hover (start/end/up/down)
        if (event === 'hover') {
            this.emit(event, data[1]);
            if (data[1] > 0.0) {
                this.emit(`${event}.up`);
            }
            else if (data[1] < 0.0) {
                this.emit(`${event}.down`);
            }
        }
        else {
            this.emit(event, value);
            this.emit(`${event}.${value}`);
        }
    }
    /**
     * Notification handler for device dial rotation
     * @private
     *
     * @param data - rotation characteristic data
     * @param characteristic - notification characteristic
     */
    _handleRotate(data, characteristic) {
        // Determined to be a close number of points for 360 degress of rotation
        const delta = (data.readInt16LE(0) / 2666.66);
        this.rotation = this._rotation + delta;
        this.emit('rotate', delta, this.rotation);
        if (delta > 0.0) {
            this.emit('rotate.right', delta, this.rotation);
        }
        if (delta < 0.0) {
            this.emit('rotate.left', delta, this.rotation);
        }
    }
    /**
     * Handles the swipe & touch gesture and generates events accordingly
     * @private
     *
     * @param data - swipe/touch characteristic data
     * @param characteristic - notification characteristic
     */
    _handleTouchorSwipe(data, characteristic) {
        const { event, value } = swipeTouchEventMap.get(data[0]);
        this.emit(event, value);
        this.emit(`${event}.${value}`);
    }
    /**
     * Notify handler for battery level changes
     * @private
     *
     * @param {Buffer} data - characteristic data
     * @param {Characteristic} characteristic - characteristic the data is fod
     */
    _handleBatteryLevelNotify(data, characteristic) {
        this._batteryLevel = data[0];
        this.emit("batteryLevel", data[0]);
    }
}
exports.NuimoDevice = NuimoDevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVpbW8tZGV2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGliL2RldmljZS9udWltby1kZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOztBQUVILDJDQUEwQztBQUcxQyxtQ0FBcUM7QUFFckMsNENBQXNFO0FBQ3RFLDRDQUF3SDtBQUN4SCxxRkFBNkc7QUFDN0csNENBQWlEO0FBRWpELDRDQUE0RDtBQUM1RCw0Q0FBOEQ7QUFFOUQsc0JBQXNCO0FBQ3RCLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFBO0FBRS9DOztHQUVHO0FBQ0gsSUFBWSxvQkFJWDtBQUpELFdBQVksb0JBQW9CO0lBQzVCLHFEQUE2QixDQUFBO0lBQzdCLGlEQUEyQixDQUFBO0lBQzNCLCtDQUEwQixDQUFBO0FBQzlCLENBQUMsRUFKVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUkvQjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxjQUtYO0FBTEQsV0FBWSxjQUFjO0lBQ3RCLCtCQUFjLENBQUE7SUFDZCxpQ0FBZSxDQUFBO0lBQ2YsMkJBQVksQ0FBQTtJQUNaLCtCQUFjLENBQUE7QUFDbEIsQ0FBQyxFQUxXLGNBQWMsR0FBZCxzQkFBYyxLQUFkLHNCQUFjLFFBS3pCO0FBRUQ7O0dBRUc7QUFDSCxJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDcEIsNkJBQWMsQ0FBQTtJQUNkLCtCQUFlLENBQUE7SUFDZiwrQkFBZSxDQUFBO0FBQ25CLENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxTQUtYO0FBTEQsV0FBWSxTQUFTO0lBQ2pCLDBCQUFlLENBQUE7SUFDZiw0QkFBZ0IsQ0FBQTtJQUNoQix3QkFBYyxDQUFBO0lBQ2QsOEJBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUxXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlC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