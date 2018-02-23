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
//# sourceMappingURL=nuimo-device.js.map