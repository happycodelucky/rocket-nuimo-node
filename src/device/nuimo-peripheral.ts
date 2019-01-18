import * as createDebugLogger from 'debug'

import { Characteristic, Peripheral, Service } from 'noble'
import { EventEmitter } from 'events'

import { BatteryStatusServiceCharacteristic } from '../bluetooth/gatt'
import { ButtonClickCharacteristicData, FlyCharacteristicData, TouchOrSwipeCharacteristicData } from '../bluetooth/gatt'
import { NuimoDeviceCommunicationError, NuimoDeviceCommunicationErrorCode } from '../errors/nuimo-device-communication-error'
import { DeviceConnectedStatus } from './connection-status'
import { DeviceService } from '../bluetooth/gatt'
import { LEDServiceCharacteristic } from '../bluetooth/gatt'
import { NuimoBitmap } from './nuimo-bitmap'
import { NuimoServiceCharacteristic } from '../bluetooth/gatt'

// Create debug logger
const debug = createDebugLogger('nuimo/device/bluetooth')

// Timeout when connecting to a device
const DEVICE_CONNECT_TIMEOUT_MS = 30 * 1000 // 30 seconds

// Number of points to accumulate one rotation
const DEVICE_ROTATION_POINTS = 2650

// Number of points measured for hover proximity
const DEVICE_HOVER_PROXIMITY_POINTS = 250

// Proximity is hard to get exacts, clamp the values to account for missed hi/low ranges
const DEVICE_HOVER_PROXIMITY_MIN_CLAMP = 2
const DEVICE_HOVER_PROXIMITY_MAX_CLAMP = 1

/**
 * LED bitmap display options
 * @internal
 */
export interface DisplayBitmapOptions {
    /**
     * LED display brightness
     */
    brightness?: number

    /**
     * Transition effect between LED bitmaps
     */
    fadeTransition?: boolean

    /**
     * Timeout, in milliseconds for the display (max 25 seconds)
     */
    timeoutMs?: number
}

// Button click characteristic events
const buttonClickEvent = new Set<number>([
    ButtonClickCharacteristicData.Pressed,
    ButtonClickCharacteristicData.Released,
])

// Swipe gesture characteristic events
const swipeEvent = new Set<number>([
    TouchOrSwipeCharacteristicData.SwipeLeft,
    TouchOrSwipeCharacteristicData.SwipeRight,
    TouchOrSwipeCharacteristicData.SwipeUp,
    TouchOrSwipeCharacteristicData.SwipeDown,
])

// Touch gesture characteristic events
const touchEvent = new Set<number>([
    TouchOrSwipeCharacteristicData.TouchLeft,
    TouchOrSwipeCharacteristicData.TouchRight,
    TouchOrSwipeCharacteristicData.TouchTop,
    TouchOrSwipeCharacteristicData.TouchBottom,
])

// Long touch gesture characteristic events
const longTouchEvents = new Set<number>([
    TouchOrSwipeCharacteristicData.LongTouchLeft,
    TouchOrSwipeCharacteristicData.LongTouchRight,
    TouchOrSwipeCharacteristicData.LongTouchTop,
    TouchOrSwipeCharacteristicData.LongTouchBottom,
])

// Fly gesture characteristic events
const flyEvents = new Set<number>([
    FlyCharacteristicData.Left,
    FlyCharacteristicData.Right,
])

// Fly gesture characteristic events, but representing the hover up/down
const hoverEvents = new Set<number>([
    FlyCharacteristicData.UpDown,
])

/**
 * Handler function for characteristic notify BLE subscriptions
 */
interface NuimoNotifyHandler {
    (data: Buffer, characteristic: Characteristic): void
}

/**
 * A Nuimo bluetooth peripheral
 * @internal
 */
export class NuimoPeripheral extends EventEmitter {
    /**
     * Associated bluetooth peripheral
     */
    private internalPeripheral: Peripheral

    /**
     * State of connection to a peripheral
     */
    private internalConnectedState: DeviceConnectedStatus = DeviceConnectedStatus.Disconnected
    /**
     * Pending connection promise to ensure multiple connects result in a single connection attempt
     */
    private pendingConnection?: Promise<boolean>
    /**
     * LED characteristic to write display data to
     */
    private ledCharacteristic: Characteristic | undefined

    /**
     * Cached battery level
     */
    private internalBatteryLevel = 100

    /**
     * @param peripheral - bluetooth peripheral representing the device
     */
    constructor(peripheral: Peripheral) {
        super()

        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('NuimoDevice(peripheral) does not represent a Nuimo device')
        }
        this.internalPeripheral = peripheral
    }

    //
    // Public properties
    //

    /**
     * Indicates if the peripheral is connected and usable
     * @event 'connected'
     * @event 'disconnected'
     */
    get isConnected(): boolean {
        return this.connectedState === DeviceConnectedStatus.Connected
    }

    /**
     * Connection state of the peripheral
     * @event 'connected'
     * @event 'disconnected'
     */
    get connectedState(): DeviceConnectedStatus {
        return this.internalConnectedState
    }

    /**
     * Peripheral ID
     */
    get id(): string {
        return this.internalPeripheral.id
    }

    /**
     * RSSI of bluetooth connection to the peripheral, or undefined when not connected
     * @event 'rssi'
     */
    get rssi(): number | undefined {
        if (this.connectedState === DeviceConnectedStatus.Connected) {
            return this.internalPeripheral.rssi
        }

        return undefined
    }

    /**
     * Peripheral battery level
     * @event 'batteryLevel'
     */
    get batteryLevel(): number | undefined {
        if (this.connectedState === DeviceConnectedStatus.Connected) {
            return this.internalBatteryLevel
        }

        return undefined
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
    async displayBitmap(bitmap: NuimoBitmap, options: DisplayBitmapOptions = {}): Promise<boolean> {
        // Requires connnection
        this.connectionRequiredToProceed()

        const characteristic = this.ledCharacteristic;
        if (characteristic) {
            return new Promise((resolve, reject) => {
                // Display brightness
                const brightnessByte = (options.brightness !== undefined)
                    ? Math.max(Math.min(Math.round(options.brightness * 0xFF) & 0xFF, 0xFF), 0x0)
                    : 0xFF

                // Display time (max 25.5 seconds)
                const displayTime = options.timeoutMs !== undefined
                    ? Math.max(Math.min(Math.round((options.timeoutMs / 100)) & 0xFF, 0xFF), 0x0)
                    : 0

                const matrixLen = bitmap.bytes.length
                const data = Buffer.alloc(matrixLen + 2)
                bitmap.bytes.copy(data)
                data[matrixLen] = brightnessByte
                data[matrixLen + 1] = displayTime

                if (options.fadeTransition !== undefined) {
                    const FADE_FLAG = 0b00010000
                    if (options.fadeTransition) {
                        data[10] &= FADE_FLAG
                    } else {
                        data[10] ^= FADE_FLAG
                    }
                }

                // Write out LED data
                characteristic.write(data, false, (err) => {
                    if (err) {
                        if (!this.isConnected) {
                            reject(new NuimoDeviceCommunicationError(
                                NuimoDeviceCommunicationErrorCode.Disconnected, this.id))
                        } else {
                            reject(new NuimoDeviceCommunicationError(
                                NuimoDeviceCommunicationErrorCode.Bluetooth, this.id, err))
                        }

                        return
                    } else {
                        resolve(true)
                    }
                })
            })
        }

        throw new NuimoDeviceCommunicationError(
            NuimoDeviceCommunicationErrorCode.NotConnected, this.id)
    }

    /**
     * Disconnects cleanly from the device
     * @emit 'disconnect'
     */
    disconnect() {
        this.internalPeripheral.removeAllListeners()
        this.internalPeripheral.disconnect()
        this.ledCharacteristic = undefined

        this.internalConnectedState = DeviceConnectedStatus.Disconnected
        this.emit('disconnect')
    }

    /**
     * Underlying bluetooth peripheral
     */
    get peripheral(): Peripheral {
        return this.internalPeripheral
    }

    /**
     * Sets a new peripheral to preprent the Nuimo device
     * This may attempt a reconnect if a connection was prior lost
     *
     * @param peripheral - bluetooth peripheral representing the device
     */
    set peripheral(peripheral: Peripheral) {
        if (peripheral.advertisement.localName !== 'Nuimo') {
            throw new TypeError('peripheral(peripheral) does not represent a Nuimo device')
        }

        if (peripheral !== this.internalPeripheral) {
            const wasConnected = this.isConnected

            const oldPeripheral = this.internalPeripheral
            if (oldPeripheral) {
                oldPeripheral.removeAllListeners()
                oldPeripheral.disconnect()
            }

            this.internalConnectedState = DeviceConnectedStatus.Disconnected
            this.internalPeripheral = peripheral
            this.ledCharacteristic = undefined

            // If the device was connected, event the disconnect
            if (wasConnected) {
                this.emit('disconnect')
            }
        }
    }

    /**
     * Connects to the device, if not already connected.
     */
    async connect(): Promise<boolean> {
        // Check there still is an associated peripheral
        if (!this.internalPeripheral) {
            throw new NuimoDeviceCommunicationError(
                NuimoDeviceCommunicationErrorCode.NotAvailable, this.id)
        }

        return this.connectToPeriperal()
    }

    //
    // Private functions
    //

    /**
     * Connects to a peripheral
     * @emit 'connect'
     */
    private async connectToPeriperal(): Promise<boolean> {
        debug(`Connecting to device ${this.id}`)

        if (this.connectedState !== DeviceConnectedStatus.Disconnected) {
            return this.pendingConnection!
        }

        const peripheral = this.peripheral
        if (!peripheral.connectable) {
            throw new NuimoDeviceCommunicationError(
                NuimoDeviceCommunicationErrorCode.NotConnectable, this.id)
        }

        // About to attempt connection
        this.internalConnectedState = DeviceConnectedStatus.Connecting

        const self = this
        this.pendingConnection = new Promise<Boolean>((resolve, reject) => {
            // Set up a connection timeout timer in case connection does not succeed
            let timeout = false;
            const timeoutTimer = setTimeout(() => {
                timeout = true

                // If the periperal is differnet, it was an aborted connection
                if (peripheral !== self.internalPeripheral) {
                    reject(new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Disconnected, self.id))

                    return
                }

                // Disconnected
                self.disconnect()
                this.internalConnectedState = DeviceConnectedStatus.Disconnected

                reject(new NuimoDeviceCommunicationError(
                    NuimoDeviceCommunicationErrorCode.ConnectionTimeout, self.id))
            }, DEVICE_CONNECT_TIMEOUT_MS * 1000)

            // When connected
            peripheral.once('connect', async () => {
                clearTimeout(timeoutTimer);
                if (timeout) {
                    return
                }

                // Make sure we are connecting to the right device
                if (peripheral !== self.internalPeripheral) {
                    reject(new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Disconnected, self.id))

                    return
                }

                // Now connected
                this.internalConnectedState = DeviceConnectedStatus.Connected

                // Now connected, listen for disconnects
                peripheral.on('disconnect', () => {
                    if (peripheral === self.internalPeripheral) {
                        debug(`Disconnected from device ${self.id}`)
                        this.disconnect()
                    }
                })
                peripheral.on('rssiUpdate', () => {
                    this.emit('rssi', this.rssi!)
                })

                // Begin service discovery...
                const services = await new Promise<Service[]>((resolveService, rejectServices) => {
                    peripheral.discoverServices([], async (err, discoveredServices) => {
                        if (err) {
                            rejectServices(new Error(err))

                            return
                        }
                        resolveService(discoveredServices)
                    })
                })
                debug(`Discovered ${services.length} services on device ${peripheral.uuid}`)

                // Make sure we are connecting to the right device
                if (peripheral !== self.internalPeripheral) {
                    reject(new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Disconnected, self.id))

                    return
                }

                // Characterisitic discovery...
                await Promise.all(services.map(async (service) => {
                    return new Promise<Characteristic[]>((resolveCharacteristic, rejectCharacteristic) => {
                        service.discoverCharacteristics([], (err, characteristics) => {
                            if (err) {
                                rejectCharacteristic(new Error(err))

                                return
                            }
                            resolveCharacteristic(characteristics)
                        })
                    })
                }))

                // Make sure we are connecting to the right device
                if (peripheral !== self.internalPeripheral) {
                    reject(new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Disconnected, self.id))

                    return;
                }

                // All the characteristics should be cached now
                const awaitBindings: Promise<boolean>[] = []
                services.forEach(service => {
                    switch (service.uuid) {
                        case DeviceService.BatteryStatus:
                            awaitBindings.push(...this.bindToBatteryServiceCharacteristics(service, service.characteristics))
                            break
                        case DeviceService.Nuimo:
                            awaitBindings.push(...this.bindToNuimoServiceCharacteristics(service, service.characteristics))
                            break
                        case DeviceService.LED:
                            this.ledCharacteristic = service.characteristics
                                .find(characteristic => characteristic.uuid === LEDServiceCharacteristic.LEDMatrix)

                            // Increase count for animations
                            // TODO: Better solution out there
                            this.ledCharacteristic!.setMaxListeners(20)

                            break
                    }
                })
                await Promise.all(awaitBindings)

                // Make sure we are connecting to the right device
                if (peripheral !== self.internalPeripheral) {
                reject(new NuimoDeviceCommunicationError(
                    NuimoDeviceCommunicationErrorCode.Disconnected, self.id))

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
                    reject(new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Bluetooth, self.id, err))
                }
            })
        }) as Promise<boolean>

        return this.pendingConnection.then((connected) => {
            if (connected) {
                this.emit('connect')
            }

            return connected
        })
    }

    /**
     * Throws an error if the device is not fully connected, ensuring code following this call can operated on
     * a connected device.
     */
    private connectionRequiredToProceed() {
        switch (this.connectedState) {
            case DeviceConnectedStatus.Connected:
                return
            case DeviceConnectedStatus.Connecting:
                throw new NuimoDeviceCommunicationError(NuimoDeviceCommunicationErrorCode.NotConnected, this.id)
            case DeviceConnectedStatus.Disconnected:
                throw new NuimoDeviceCommunicationError(NuimoDeviceCommunicationErrorCode.Disconnected, this.id)
        }
    }

    /**
     * Subscribes to a characteristic with a notify handler
     *
     * @param characteristic - characteristic to subscribe to
     * @param handler - handler to be called when the characteristic value changes
     * @return Promise to capture when subscription has succeeded
     */
    private async bindCharacterNotifyHandler(characteristic: Characteristic, handler: NuimoNotifyHandler): Promise<boolean> {
        debug(`Subscribing to characteristic ${characteristic.name || characteristic.uuid}`)

        characteristic.on('data', (data: Buffer, isNotification: boolean) => {
            if (isNotification) {
                handler(data, characteristic)
            }
        })

        return new Promise((resolve, reject) => {
            characteristic.subscribe((error: string) => {
                if (error) {
                    debug(`Device ${this.id} error: ${error}`)

                    const deviceError = new NuimoDeviceCommunicationError(
                        NuimoDeviceCommunicationErrorCode.Bluetooth, this.id, error)
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
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    private bindToBatteryServiceCharacteristics(service: Service, characteristics: Characteristic[]): Promise<boolean>[] {
        const awaitingBindings: Promise<boolean>[] = []

        for (const characteristic of characteristics) {
            switch (characteristic.uuid) {
                case BatteryStatusServiceCharacteristic.BatteryLevel:
                    awaitingBindings.push(this.bindCharacterNotifyHandler(characteristic, this.onBatteryLevelNotify.bind(this)))

                    // Read the battery level and add the read to the awaitingBindings so the battery level is set
                    // before the connection is established
                    awaitingBindings.push(new Promise((resolve) => {
                        characteristic.read((error: string, data: Buffer) => {
                            if (error) {
                                debug(`Device ${this.id} error: ${error}`)

                                const deviceError = new NuimoDeviceCommunicationError(
                                    NuimoDeviceCommunicationErrorCode.Bluetooth, this.id, error)
                                this.emit('error', deviceError)

                                // Do not reject
                                return
                            }

                            this.onBatteryLevelNotify(data, characteristic)
                            resolve(true)
                        })
                    }))

                    break
                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`)
            }
        }

        return awaitingBindings
    }

    /**
     * Subscribes to characteristics of the nuimo service
     *
     * @param service - service the characteristic is a member of
     * @param characteristics - characteristics to subscribe to
     * @return Promise to capture when all subscriptions have succeeded
     */
    private bindToNuimoServiceCharacteristics(service: Service, characteristics: Characteristic[]): Promise<boolean>[] {
        const awaitBindings: Promise<boolean>[] = []
        for (const characteristic of characteristics) {
            switch (characteristic.uuid) {
                case NuimoServiceCharacteristic.ButtonClick:
                    awaitBindings.push(this.bindCharacterNotifyHandler(characteristic, this.onButtonClickNotify.bind(this)))
                    break

                case NuimoServiceCharacteristic.Fly:
                    awaitBindings.push(this.bindCharacterNotifyHandler(characteristic, this.onFlyNotify.bind(this)))
                    break

                case NuimoServiceCharacteristic.Rotation:
                    awaitBindings.push(this.bindCharacterNotifyHandler(characteristic, this.onRotateNotify.bind(this)))
                    break

                case NuimoServiceCharacteristic.TouchOrSwipe:
                    awaitBindings.push(this.bindCharacterNotifyHandler(characteristic, this.onTouchOrSwipeNotify.bind(this)))
                    break

                default:
                    debug(`Unknown characteristic ${characteristic.name || characteristic.uuid}`)
            }
        }

        // There is nothing to wait for, all UI subscriptions can come later
        return awaitBindings
    }

    /**
     * Notify handler for button click interactions
     *
     * @param data - characteristic data
     * @param characteristic - characteristic the data is fod
     */
    private onButtonClickNotify(data: Buffer, characteristic: Characteristic) {
        if (buttonClickEvent.has(data[0])) {
            this.emit('button', data[0])
        }
    }

    /**
     * Notify handler for device fly gesture interactions
     *
     * @param data - fly characteristic data
     * @param characteristic - notification characteristic
     */
    private onFlyNotify(data: Buffer, characteristic: Characteristic) {
        if (flyEvents.has(data[0])) {
            this.emit('fly', data[0])
        } else if (hoverEvents.has(data[0])) {
            const minClamp = DEVICE_HOVER_PROXIMITY_MIN_CLAMP
            const maxClamp = DEVICE_HOVER_PROXIMITY_POINTS - DEVICE_HOVER_PROXIMITY_MAX_CLAMP

            const proximity = Math.min(Math.max(data[1], minClamp), maxClamp) - minClamp
            const range = DEVICE_HOVER_PROXIMITY_POINTS - (DEVICE_HOVER_PROXIMITY_MIN_CLAMP + DEVICE_HOVER_PROXIMITY_MAX_CLAMP)
            this.emit('hover', (proximity / range))
        }
    }

    /**
     * Notify handler for device ring rotation interactions
     *
     * @param data - rotation characteristic data
     * @param characteristic - notification characteristic
     */
    private onRotateNotify(data: Buffer, characteristic: Characteristic) {
        // Determined to be a close number of points for 360 degress of rotation
        const delta = (data.readInt16LE(0) / DEVICE_ROTATION_POINTS)
        this.emit('rotate', delta)
    }

    /**
     * Notify handler for swipe, touch, and long touch screen interactions
     *
     * @param data - swipe/touch characteristic data
     * @param characteristic - notification characteristic
     */
    private onTouchOrSwipeNotify(data: Buffer, characteristic: Characteristic) {
        if (swipeEvent.has(data[0])) {
            this.emit('swipe', data[0])
        } else if (touchEvent.has(data[0])) {
            this.emit('touch', data[0])
        } else if (longTouchEvents.has(data[0])) {
            this.emit('longTouch', data[0])
        }
    }

    /**
     * Notify handler for battery level changes
     *
     * @param data - characteristic data
     * @param characteristic - characteristic the data is for
     */
    private onBatteryLevelNotify(data: Buffer, characteristic: Characteristic) {
        this.internalBatteryLevel = data[0]
        this.emit('batteryLevel', data[0])
    }
}

//
// Event interface
//

/** @internal */
export interface NuimoPeripheral extends EventEmitter {
    emit(eventName: 'error', error: Error): boolean
    emit(eventName: 'connect' | 'disconnect'): boolean
    emit(eventName: 'batteryLevel' | 'button' | 'fly' | 'hover' | 'longTouch' | 'swipe' | 'rotate'  |  'rssi' | 'touch',
        data: number): boolean

    on(eventName: 'error', listener: (error: Error) => void): this
    on(eventName: 'connect' | 'disconnect', listener: () => void): this
    on(eventName: 'batteryLevel' | 'button' | 'fly' | 'hover' | 'longTouch' | 'swipe' | 'rotate'  |  'rssi' | 'touch',
        listener: (data: number) => void): this

    once(eventName: 'error', listener: (error: Error) => void): this
    once(eventName: 'connect' | 'disconnect', listener: () => void): this
    once(eventName: 'batteryLevel' | 'button' | 'fly' | 'hover' | 'longTouch' | 'swipe' | 'rotate'  |  'rssi' | 'touch',
        listener: (data: number) => void): this
}