/**
 * @module numio-connect
 */

import * as createDebugLogger from 'debug'
import { Characteristic, Peripheral, Service } from 'noble'
import { EventEmitter } from 'events'

import { BatteryStatusServiceCharacteristic } from '../bluetooth/gatt'
import { ButtonClickCharacteristicData, FlyCharacteristicData, TouchOrSwipeCharacteristicData } from '../bluetooth/gatt'
import { DeviceCommunicationError, DeviceCommunicationErrorCode } from '../errors/device-communication-error'
import { DeviceService } from '../bluetooth/gatt'
import { LEDBitmap } from './led-bitmap'
import { LEDServiceCharacteristic } from '../bluetooth/gatt'
import { NuimoServiceCharacteristic } from '../bluetooth/gatt'
import { NuimoError } from '..';

// Create debug logger
const debug = createDebugLogger('nuimo/device')

/**
 * Connected status of a device
 */
export enum DeviceConnectedState {
    Disconnected = 'disconnected',
    Connecting   = 'connecting',
    Connected    = 'connected',
}

/**
 * Interaction gesture direction
 */
export enum SwipeDirection {
    Left  = 'left',
    Right = 'right',
    Up    = 'up',
    Down  = 'down',
}

/**
 * Direction for fly gestures
 */
export enum FlyDirection {
    Left  = 'left',
    Right = 'right',
    Hover = 'hover',
}

/**
 * Interaction gesture area
 */
export enum TouchArea {
    Left   = 'left',
    Right  = 'right',
    Top    = 'top',
    Bottom = 'bottom',
}

/**
 * LED bitmap display transition effect
 */
export enum LEDBitmapTransitionEffect {
    Immediate = 0x00,
    CrossFade = 0x80,
}

/**
 * LED bitmap display options
 */
export interface DisplayBitmapOptions {
    /**
     * Transition effect between LED bitmaps
     */
    transitionEffect?: LEDBitmapTransitionEffect
    /**
     * LED display brightness
     */
    brightness?: number
    /**
     * Timeout, in milliseconds for the display (max 25 seconds)
     */
    timeoutMs?: number
}

// Swipe and touch gesture event map
const swipeTouchEventMap = new Map<number, { event: string, value: string }>()
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.SwipeLeft,       { event: 'swipe',     value: SwipeDirection.Left })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.SwipeRight,      { event: 'swipe',     value: SwipeDirection.Right })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.SwipeUp,         { event: 'swipe',     value: SwipeDirection.Down })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.SwipeDown,       { event: 'swipe',     value: SwipeDirection.Up })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.TouchLeft,       { event: 'touch',     value: TouchArea.Left })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.TouchRight,      { event: 'touch',     value: TouchArea.Right })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.TouchTop,        { event: 'touch',     value: TouchArea.Bottom })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.TouchBottom,     { event: 'touch',     value: TouchArea.Top })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.LongTouchLeft,   { event: 'longTouch', value: TouchArea.Left })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.LongTouchRight,  { event: 'longTouch', value: TouchArea.Right })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.LongTouchTop,    { event: 'longTouch', value: TouchArea.Bottom })
swipeTouchEventMap.set(TouchOrSwipeCharacteristicData.LongTouchBottom, { event: 'longTouch', value: TouchArea.Top })

// Fly gesture event map
const flyEventMap = new Map<number, { event: string, value: string }>()
flyEventMap.set(FlyCharacteristicData.Left,                            { event: 'fly',       value: FlyDirection.Left })
flyEventMap.set(FlyCharacteristicData.Right,                           { event: 'fly',       value: FlyDirection.Right })
flyEventMap.set(FlyCharacteristicData.UpDown,                          { event: 'fly',       value: FlyDirection.Hover })

//
// Constants
//

// Timeout when connecting to a device
const DEVICE_CONNECT_TIMEOUT = 30 // 30 seconds

// Number of points to accumulate one rotation
const DEVICE_ROTATION_STEPS = 2666.66

// LED transition effect mask
const LED_TRANSITION_EFFECT_MASK = 0b0010000

/**
 * Handler function for characteristic notify BLE subscriptions
 */
interface NuimoNotifyHandler {
    (data: Buffer, characteristic: Characteristic): void
}


/**
 * Declaration for events
 */
export declare interface NuimoDevice {
    on(event: 'rotate' | 'rotate.left' | 'rotate.right', listener: (delta: number, rotation: number) => void): this;
    on(event: 'swipe' | 'swipe.up' | 'swipe.left' | 'swipe.right' | 'swipe.down' , listener: (direction: SwipeDirection) => void): this;
    on(event: 'touch' | 'touch.top' | 'touch.left' | 'touch.right' | 'touch.bottom', listener: (direction: TouchArea) => void): this;
    on(event: 'longTouch' | 'longTouch.top' | 'longTouch.left' | 'longTouch.right' | 'longTouch.bottom', listener: (direction: TouchArea) => void): this;
    // on(event: 'fly.hover' | 'fly.up' | 'fly.down', listener: (: TouchArea) => void): this;

    on(event: 'error', listener: (error: NuimoError) => void): this;
    on(event: 'batteryLevel', listener: (level: number) => void): this;
    on(event: 'rssi', listener: (rssi: number) => void): this;
    on(event: string, listener: Function): this;
}

/**
 * A Nuimo device to interact with.
 *
 * Use `NuimoDevice.connectedDevice` to fetch a device that is fully connected rather than construct a NuimoDevice
 * directly. A returned device could be disconnected before use so be sure to check any `NuimoDeviceError` thrown
 * or observe the `disconnected` event.
 */
export class NuimoDevice extends EventEmitter {
    /**
     * Associated bluetooth peripheral
     */
    private _peripheral: Peripheral
    /**
     * State of connection to a peripheral
     */
    private _connectedState: DeviceConnectedState = DeviceConnectedState.Disconnected
    /**
     * Pending connection promise
     */
    private _pendingConnection: Promise<boolean>
    /**
     * LED characteristic to write to
     */
    private _ledCharacteristic: Characteristic | undefined

    /**
     * Battery level
     */
    private _batteryLevel: number = 100
    /**
     * Minimum rotation (default 0.0)
     */
    private _minRotation: number = 0
    /**
     * Maximum rotation (default 1.0)
     */
    private _maxRotation: number = 1
    /**
     * Rotation level of the device between `minRotation` and `maxRotation`
     */
    private _rotation: number = 0

    /**
     * @param peripheral - bluetooth peripheral representing the device
     */
    constructor(peripheral: Peripheral) {
        super()

        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('NuimoDevice(peripheral) does not represent a Nuimo device')
        }
        this.peripheral = peripheral
    }

    //
    // Public properties
    //

    /**
     * Connection state of the Nuimo device
     */
    get connectedState(): DeviceConnectedState {
        return this._connectedState
    }

    /**
     * Device ID
     */
    get id(): string {
        return this._peripheral.id
    }

    /**
     * RSSI of bluetooth connection to the device, or undefined when not connected
     * @event 'rssi' - updates this value
     */
    get rssi(): number | undefined {
        if (this.connectedState === DeviceConnectedState.Connected) {
            return this._peripheral.rssi
        }

        return undefined
    }

    /**
     * Device battery level
     * @event 'batteryLevel' - updates this value
     */
    get batteryLevel(): number | undefined {
        if (this.connectedState === DeviceConnectedState.Connected) {
            return this._batteryLevel
        }

        return undefined
    }

    /**
     * Current device rotation value, can be between `minRotation` and `maxRotation`
     */
    get rotation(): number {
        return this._rotation
    }

    /**
     * Set the device rotation value
     *
     * @param rotation: rotation value
     */
    set rotation(rotation: number) {
        this._rotation = Math.max(Math.min(this.maxRotation, rotation), this.minRotation)
    }

    /**
     * Minimum rotation allowed (default 0.0)
     */
    get minRotation(): number {
        return this._minRotation
    }

    /**
     * Set device's minimum rotation valu allowed
     *
     * @param minRotation: Minimum rotation value
     */
    set minRotation(minRotation: number) {
        this._minRotation = minRotation

        // Reset the current rotation
        if (this.rotation < this.minRotation) {
            this.rotation = this.minRotation
        }
        // Match the max rotation
        if (this.minRotation > this.maxRotation) {
            this.maxRotation = this.minRotation
        }
    }

    /**
     * Maximum rotation allowed (default 0.0)
     */
    get maxRotation(): number {
        return this._maxRotation
    }

    /**
     * Set device's maximum rotation valu allowed
     *
     * @param maxRotation: Maximum rotation value
     */
    set maxRotation(maxRotation: number) {
        this._maxRotation = maxRotation

        // Reset the current rotation
        if (this.rotation > this.maxRotation) {
            this.rotation = this.maxRotation
        }
        // Match the min rotation
        if (this.minRotation > this.maxRotation) {
            this.minRotation = this.maxRotation
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
    async displayBitmap(bitmap: LEDBitmap, options: DisplayBitmapOptions = {}): Promise<boolean> {
        // Require connnection
        this._connectionRequiredToProceed()

        const characteristic = this._ledCharacteristic;
        if (characteristic) {
            const self = this

            return new Promise((resolve, reject) => {
                // Display brightness
                let brightnessByte = 0
                if (options.brightness !== undefined) {
                    brightnessByte = Math.round(options.brightness * 255) & 0xFF
                } else {
                    brightnessByte = 255
                }

                // Display time (max 25.5 seconds)
                let displayTime = 0
                if (options.timeoutMs !== undefined) {
                    displayTime = Math.round((options.timeoutMs / 1000)) & 0xFF
                } else {
                    displayTime = 255 // 0
                }
                const matrixLen = bitmap.buffer.length;
                const data = Buffer.alloc(matrixLen + 2);
                bitmap.buffer.copy(data)
                data[matrixLen] = brightnessByte
                data[matrixLen + 1] = displayTime
                if ('transitionEffect' in options) {
                    const FADE_FLAG = 0b00010000
                    switch (options.transitionEffect) {
                        case LEDBitmapTransitionEffect.CrossFade:
                            data[10] &= FADE_FLAG
                            break;
                        default:
                            data[10] ^= FADE_FLAG
                            break;
                    }
                }

                // Write out LED data
                characteristic.write(new Buffer(data), false, (err) => {
                    if (err) {
                        if (self.connectedState === DeviceConnectedState.Disconnected) {
                            reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))
                        } else {
                            reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Bluetooth, self.id, err))
                        }

                        return
                    } else {
                        resolve(true)
                    }
                })
            }) as Promise<boolean>
        }

        throw new DeviceCommunicationError(DeviceCommunicationErrorCode.NotReady, this.id)
    }

    /**
     * Disconnects cleanly from the device
     */
    disconnect() {
        this._peripheral.removeAllListeners()
        this._peripheral.disconnect()
        this._ledCharacteristic = undefined

        this._connectedState = DeviceConnectedState.Disconnected
        this.emit('disconnect')
    }

    //
    // Module functions
    //

    /**
     * Underlying bluetooth peripheral
     * @internal
     */
    get peripheral(): Peripheral {
        return this._peripheral
    }

    /**
     * Sets a new peripheral to preprent the Nuimo device
     * This may attempt a reconnect if a connection was prior lost
     * @internal
     *
     * @param peripheral - bluetooth peripheral representing the device
     */
    set peripheral(peripheral: Peripheral) {
        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('peripheral(peripheral) does not represent a Nuimo device')
        }

        if (peripheral !== this._peripheral) {
            const oldPeripheral = this._peripheral
            if (oldPeripheral) {
                oldPeripheral.removeAllListeners()
                oldPeripheral.disconnect
            }
            this._connectedState = DeviceConnectedState.Disconnected
            this._peripheral = peripheral
            this._ledCharacteristic = undefined
        }
    }

    /**
     * Connects to the device, if not already connected.
     * @internal
     */
    async connect(): Promise<boolean> {
        // Check there still is an associated peripheral
        if (!this._peripheral) {
            throw new DeviceCommunicationError(DeviceCommunicationErrorCode.NotAvailable, this.id)
        }

        // TODO: Should we here attempt to establish a connection session with the device ID

        return this._connectToPeriperal(true)
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
    private async _connectToPeriperal(attemptReconnect: boolean = false): Promise<boolean> {
        debug(`Connecting to device ${this.id}`)

        if (this.connectedState !== DeviceConnectedState.Disconnected) {
            return this._pendingConnection
        }

        const peripheral = this.peripheral
        if (!peripheral.connectable) {
            throw new DeviceCommunicationError(DeviceCommunicationErrorCode.NotConnectable, this.id)
        }

        // About to attempt connection
        this._connectedState = DeviceConnectedState.Connecting

        const self = this
        this._pendingConnection = new Promise<Boolean>((resolve, reject) => {
            // Set up a connection timeout timer in case connection does not succeed
            let timeout = false;
            const timeoutTimer = setTimeout(() => {
                timeout = true

                // If the periperal is differnet, it was an aborted connection
                if (peripheral !== self._peripheral) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))
                    return
                }

                // Disconnected
                self.disconnect()
                this._connectedState = DeviceConnectedState.Disconnected

                reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.ConnectionTimeout, self.id))

            }, DEVICE_CONNECT_TIMEOUT * 1000)

            // When connected
            peripheral.once('connect', async () => {
                clearTimeout(timeoutTimer);
                if (timeout) {
                    return
                }

                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))
                    return;
                }

                // Now connected
                this._connectedState = DeviceConnectedState.Connected

                // Now connected, listen for disconnects
                peripheral.on('disconnect', () => {
                    if (peripheral === self._peripheral) {
                        debug(`Disconnected from device ${self.id}`)
                        self.disconnect()
                    }
                })
                peripheral.on('rssiUpdate', () => {
                    self.emit('rssi', self.rssi)
                })

                // Begin service discovery...
                const services = await new Promise<Service[]>((resolve, reject) => {
                    const services = [ DeviceService.BatteryStatus, DeviceService.LED, DeviceService.Nuimo ]
                    peripheral.discoverServices([], async (err, services) => {
                        if (err) {
                            reject(new Error(err))
                            return
                        }
                        resolve(services)
                    })
                })
                debug(`Discovered ${services.length} services on device ${peripheral.uuid}`)

                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))

                    return;
                }

                // Characterisitic discovery...
                await Promise.all(services.map(service => {
                    return new Promise<Characteristic[]>((resolve, reject) => {
                        service.discoverCharacteristics([], (err, characteristics) => {
                            if (err) {
                                reject(new Error(err))

                                return
                            }
                            resolve(characteristics)
                        })
                    })
                }))

                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))

                    return;
                }

                // All the characteristics should be cached now
                const awaitBindings: Promise<boolean>[] = []
                services.forEach(service => {
                    switch(service.uuid) {
                        case DeviceService.BatteryStatus:
                            awaitBindings.push(...self._bindToBatteryServiceCharacteristics(service, service.characteristics))
                            break
                        case DeviceService.Nuimo:
                            awaitBindings.push(...self._bindToNuimoServiceCharacteristics(service, service.characteristics))
                            break
                        case DeviceService.LED:
                            this._ledCharacteristic = service.characteristics
                                .find(characteristic => characteristic.uuid === LEDServiceCharacteristic.LEDMatrix)

                            // Increase count for animations
                            // TODO: Better solution out there
                            this._ledCharacteristic!.setMaxListeners(20)

                            break
                    }
                })
                await Promise.all(awaitBindings)

                // Make sure we are connecting to the right device
                if (peripheral !== self._peripheral) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, self.id))

                    return;
                }

                resolve(true)
            });

            // Perform connection
            peripheral.connect((err) => {
                clearTimeout(timeoutTimer);
                if (timeout) {
                    return
                }

                if (err) {
                    reject(new DeviceCommunicationError(DeviceCommunicationErrorCode.Bluetooth, self.id, err))
                }
            })
        }) as Promise<boolean>

        return this._pendingConnection
    }

    /**
     * Throws an error if the device is not fully connected, ensuring code following this call can operated on
     * a connected device.
     */
    private _connectionRequiredToProceed() {
        switch(this.connectedState) {
            case DeviceConnectedState.Connected:
                return
            case DeviceConnectedState.Connecting:
                throw new DeviceCommunicationError(DeviceCommunicationErrorCode.NotReady, this.id)
            case DeviceConnectedState.Disconnected:
                throw new DeviceCommunicationError(DeviceCommunicationErrorCode.Disconnected, this.id)
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
    private _bindCharacterNotifyHandler(characteristic: Characteristic, handler: NuimoNotifyHandler): Promise<boolean> {
        debug(`Subscribing to characteristic ${characteristic.name || characteristic.uuid}`)

        characteristic.on('data', (data: Buffer, isNotification: boolean) => {
            handler(data, characteristic)
        })

        const self = this

        return new Promise((resolve, reject) => {
            characteristic.subscribe((error: string) => {
                if (error) {
                    debug(`Device ${this.id} error: ${error}`)

                    const deviceError = new DeviceCommunicationError(DeviceCommunicationErrorCode.Bluetooth, self.id, error)
                    this.emit('error', deviceError)

                    reject(deviceError)
                } else {
                    resolve(true)
                }
            })
        })
    }

    /**
     * Subscribes to characteristics of the battery status service
     * @private
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    private _bindToBatteryServiceCharacteristics(service: Service, characteristics: Characteristic[]): Promise<boolean>[] {
        const awaitingBidings: Promise<boolean>[] = []

        for (const characteristic of characteristics) {
            switch(characteristic.uuid) {
                case BatteryStatusServiceCharacteristic.BatteryLevel:
                    awaitingBidings.push(this._bindCharacterNotifyHandler(characteristic, this._handleBatteryLevelNotify.bind(this)))

                    // Read the battery level and add the read to the awaitingBidings so the battery level is set
                    // before the connection is established
                    const self = this
                    awaitingBidings.push(new Promise((resolve, reject) => {
                        characteristic.read((error: string, data: Buffer) => {
                            if (error) {
                                debug(`Device ${this.id} error: ${error}`)

                                const deviceError = new DeviceCommunicationError(DeviceCommunicationErrorCode.Bluetooth, self.id, error)
                                this.emit('error', deviceError)

                                // Do not reject
                                return
                            }

                            self._handleBatteryLevelNotify(data, characteristic)
                            resolve(true)
                        })
                    }))
                    break

                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`)
            }
        }

        return awaitingBidings
    }

    /**
     * Subscribes to characteristics of the nuimo service
     * @private
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    private _bindToNuimoServiceCharacteristics(service: Service, characteristics: Characteristic[]): Promise<boolean>[] {
        const awaitBindings: Promise<boolean>[] = []
        for (const characteristic of characteristics) {
            switch(characteristic.uuid) {
                case NuimoServiceCharacteristic.ButtonClick:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleButtonClick.bind(this)))
                    break

                case NuimoServiceCharacteristic.Fly:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleFlyGesture.bind(this)))
                    break

                case NuimoServiceCharacteristic.Rotation:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleRotate.bind(this)))
                    break

                case NuimoServiceCharacteristic.TouchOrSwipe:
                    awaitBindings.push(this._bindCharacterNotifyHandler(characteristic, this._handleTouchorSwipe.bind(this)))
                    break

                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`)
            }
        }

        // There is nothing to wait for, all UI subscriptions can come later
        return awaitBindings
    }

    /**
     * Handles user interface button clicks
     * @private
     *
     * @param {Buffer} data - characteristic data
     * @param {Characteristic} characteristic - characteristic the data is fod
     */
    private _handleButtonClick(data: Buffer, characteristic: Characteristic) {
        if (data[0] === ButtonClickCharacteristicData.Released) {
            debug('Button click released')
            this.emit('button.released')
        } else if (data[0] === ButtonClickCharacteristicData.Pressed) {
            debug('Button click pressed')
            this.emit('button.pressed')
        }
        this.emit('button', data[0])
    }

    /**
     * Notification handler for device fly gesture
     * @private
     *
     * @param data - fly characteristic data
     * @param characteristic - notification characteristic
     */
    private _handleFlyGesture(data: Buffer, characteristic: Characteristic) {
        const { event, value } = flyEventMap.get(data[0])!

        // TODO: Normalize hover (start/end/up/down)
        if (event === 'hover') {
            this.emit(event, data[1])
            if (data[1] > 0) {
                this.emit(`${event}.up`, data[1])
            } else if (data[1] < 0) {
                this.emit(`${event}.down`, data[1])
            }
        } else {
            this.emit(event, value)
            this.emit(`${event}.${value}`)
        }
    }

    /**
     * Notification handler for device dial rotation
     * @private
     *
     * @param data - rotation characteristic data
     * @param characteristic - notification characteristic
     */
    private _handleRotate(data: Buffer, characteristic: Characteristic) {
        // Determined to be a close number of points for 360 degress of rotation
        const delta = (data.readInt16LE(0) / DEVICE_ROTATION_STEPS)

        this.rotation = this._rotation + delta
        this.emit('rotate', delta, this.rotation)
        if (delta > 0.0) {
            this.emit('rotate.right', delta, this.rotation)
        } if (delta < 0.0) {
            this.emit('rotate.left', delta, this.rotation)
        }
    }

    /**
     * Handles the swipe & touch gesture and generates events accordingly
     * @private
     *
     * @param data - swipe/touch characteristic data
     * @param characteristic - notification characteristic
     */
    private _handleTouchorSwipe(data: Buffer, characteristic: Characteristic) {
        const { event, value } = swipeTouchEventMap.get(data[0])!
        this.emit(event, value)
        this.emit(`${event}.${value}`)
    }

    /**
     * Notify handler for battery level changes
     * @private
     *
     * @param {Buffer} data - characteristic data
     * @param {Characteristic} characteristic - characteristic the data is fod
     */
    private _handleBatteryLevelNotify(data: Buffer, characteristic: Characteristic) {
        this._batteryLevel = data[0]
        this.emit('batteryLevel', data[0])
    }
}