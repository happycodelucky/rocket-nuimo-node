import { EventEmitter } from 'events'

import { ButtonClickCharacteristicData, FlyCharacteristicData, TouchOrSwipeCharacteristicData } from '../bluetooth/gatt'
import { Glyph } from './glyph'
import { NuimoBitmap } from '../device/nuimo-bitmap'
import { NuimoPeripheral } from '../device/nuimo-peripheral'
import { SwipeGestureDirection } from './swipe-gesture-direction'
import { TouchGestureArea } from './touch-gesture-area'
import { NuimoOnErrorCallback, NuimoOnEventCallback } from '../callbacks/callbacks'

/**
 * Display transition when displaying a glyph
 */
export enum DisplayTransition {
    /**
     * Fades between two glyphs, or fades in when no other glyph is displayed
     */
    CrossFade,

    /**
     * No cross-fading, appears as soon a possible
     */
    Immediate,
}

/**
 * Options used when calling displayGlyph
 */
export interface DisplayGlyphOptions {
    /**
     * Transition effect between glyph displays
     */
    transition?: DisplayTransition

    /**
     * Display brightness
     * Does not affect device brightness level already set
     */
    brightness?: number

    /**
     * Timeout, in milliseconds before the glyph disappears
     *
     * Max: 25 seconds
     */
    timeoutMs?: number
}

type HoverEvents = 'hover'
type RotateEvents = 'rotate' | 'rotateLeft' | 'rotateRight'
type SelectEvents = 'select' | 'selectUp' | 'selectDown'
type SwipeEvents = 'swipeUp' | 'swipeLeft' | 'swipeRight' | 'swipeDown'
type TapEvents = 'touchTop' | 'touchLeft' | 'touchRight' | 'touchBottom'
type TouchEvents = 'longTouchTop' | 'longTouchLeft' | 'longTouchRight' | 'longTouchBottom'

/**
 * Declaration for events
 */
export declare interface NuimoDevice {
    on(event: HoverEvents, listener: (proximity: number) => void): this
    on(event: SelectEvents | TapEvents | TouchEvents, listener: NuimoOnEventCallback): this
    on(event: RotateEvents, listener: (delta: number, rotation: number) => void): this
    on(event: SwipeEvents , listener: (touchless: boolean) => void): this
    on(event: 'swipe' , listener: (direction: SwipeGestureDirection, touchless: boolean) => void): this
    on(event: 'touch' | 'longTouch' , listener: (area: TouchGestureArea) => void): this
    on(event: 'error', listener: NuimoOnErrorCallback): this;
    on(event: 'batteryLevel', listener: (level: number) => void): this;
    on(event: 'rssi', listener: (power: number) => void): this;

    once(event: HoverEvents, listener: (proximity: number) => void): this
    once(event: SelectEvents | TapEvents | TouchEvents, listener: NuimoOnEventCallback): this
    once(event: RotateEvents, listener: (delta: number, rotation: number) => void): this
    once(event: SwipeEvents , listener: (touchless: boolean) => void): this
    once(event: 'swipe' , listener: (direction: SwipeGestureDirection, touchless: boolean) => void): this
    once(event: 'touch' | 'longTouch' , listener: (area: TouchGestureArea) => void): this
    once(event: 'error', listener: NuimoOnErrorCallback): this;
    once(event: 'batteryLevel', listener: (level: number) => void): this;
    once(event: 'rssi', listener: (power: number) => void): this;
}

/**
 * A Nuimo device client for interacting with BT Nuimo peripheral
 */
export class NuimoDevice extends EventEmitter {
    /**
     * Associated peripheral
     * @internal
     */
    nuimoPeripheral: NuimoPeripheral

    /**
     * Brightness level for the Nuimo device display
     * @internal
     */
    private internalBrightness = 1

    /**
     * Minimum rotation (default 0.0)
     * @internal
     */
    private internalMinRotation = 0
    /**
     * Maximum rotation (default 1.0)
     * @internal
     */
    private internalMaxRotation = 1
    /**
     * Rotation level of the device between `minRotation` and `maxRotation`
     * @internal
     */
    private internalRotation = 0

    /**
     * @internal
     * @param peripheral - bluetooth peripheral representing the Nuimo device
     */
    constructor(peripheral: NuimoPeripheral) {
        super()

        this.nuimoPeripheral = peripheral
        this.bindToPeripheral(this.nuimoPeripheral)
    }

    //
    // Public properties
    //

    /**
     * Indicates if there is a connection established to the Nuimo device
     */
    get isConnected(): boolean {
        return this.nuimoPeripheral.isConnected
    }

    /**
     * Nuimo device identifier
     */
    get id(): string {
        return this.nuimoPeripheral.id
    }

    /**
     * Nuimo device battery level
     */
    get batteryLevel(): number | undefined {
        return this.nuimoPeripheral.batteryLevel
    }

    /**
     * Nuimo device RSSI
     */
    get rssi(): number | undefined {
        return this.nuimoPeripheral.rssi
    }

    /**
     * Brightness level of the Nuimo screen
     */
    get brightness(): number {
        return this.internalBrightness
    }

    /**
     * Set brightness level of the Nuimo screen
     *
     * Note: This will only be reflected when a new glyph is displayed
     * due to the way Nuimo operates
     *
     * @param brightness - Brightness level between 0.0-1.0
     */
    set brightness(brightness: number) {
        this.internalBrightness = Math.max(Math.min(brightness, 1), 0)
    }

    /**
     * Nuimo rotation value, can be between `minRotation` and `maxRotation`
     */
    get rotation(): number {
        return this.internalRotation
    }

    /**
     * Set the Nuimo currently rotation
     *
     * @param rotation: value to set rotation at, between `minRotation` and `maxRotation`
     */
    set rotation(rotation: number) {
        this.internalRotation = Math.max(Math.min(rotation, this.maxRotation), this.minRotation)
    }

    /**
     * Minimum rotation allowed (default 0.0)
     */
    get minRotation(): number {
        return this.internalMinRotation
    }

    /**
     * Maximum rotation allowed (default 0.0)
     */
    get maxRotation(): number {
        return this.internalMaxRotation
    }

    /**
     * Sets the Nuimo dial rotation range and value
     *
     * @param min - minimum rotation value
     * @param max - maximum rotation value
     * @param [value] - new value between `min` and `max`
     */
    setRotationRange(min: number, max: number, value?: number) {
        if (min > max) {
            throw new TypeError('setRotationRange(min, max) cannot be greater than `max`')
        }
        if (min === max) {
            throw new TypeError('setRotationRange(min, max) cannot be equal to `max`')
        }
        if (value !== undefined && (value < min || value > max)) {
            throw new TypeError('setRotationRange(value) must be a valid value between `min` and `max`')
        }

        this.internalMinRotation = min
        this.internalMaxRotation = max
        this.internalRotation = (value !== undefined)
            ? value
            : Math.min(this.maxRotation, Math.max(this.minRotation, this.rotation)) // Clamp the current rotation
    }

    //
    // Public functions
    //

    /**
     * Displays a glyph on the Nuimo display
     *
     * @param glyph - glyph to display
     * @param [options={}] - options when displaying the glyph
     */
    async displayGlyph(glyph: Glyph, options?: DisplayGlyphOptions): Promise<void> {
        const explicitBrightness = options && options.brightness
        const brightness = explicitBrightness !== undefined ? explicitBrightness : this.brightness
        const bitmap = new NuimoBitmap(glyph)

        return this.nuimoPeripheral.displayBitmap(bitmap, {
            brightness,
            timeoutMs: options && options.timeoutMs,
            fadeTransition: options && options.transition === DisplayTransition.CrossFade,
        }) as Promise<any>
    }

    /**
     * Connects to the device, if not already connected.
     */
    async connect(): Promise<boolean> {
        return this.nuimoPeripheral.connect()
    }

    /**
     * Disconnects cleanly from the Nuimo device
     */
    disconnect() {
        this.nuimoPeripheral.disconnect()
    }

    //
    // Private functions
    //

    /**
     * Binds to a `NuimoPeripheral` device's events
     * @internal
     *
     * @param peripheral - peripheral device to bind events to
     */
    private bindToPeripheral(peripheral: NuimoPeripheral) {
        peripheral.on('disconnect', () => this.emit('disconnect'))
        peripheral.on('batteryLevel', () => this.emit('batteryLevel', this.batteryLevel))
        peripheral.on('button', this.onButtonClick.bind(this))
        peripheral.on('fly', this.onFly.bind(this))
        peripheral.on('hover', this.onHover.bind(this))
        peripheral.on('longTouch', this.onLongTouch.bind(this))
        peripheral.on('rotate', this.onRotate.bind(this))
        peripheral.on('rssi', () => this.emit('rssi', this.rssi))
        peripheral.on('swipe', this.onSwipe.bind(this))
        peripheral.on('touch', this.onTouch.bind(this))
    }

    //
    // Event handlers
    //

    /** @internal */
    private onButtonClick(state: ButtonClickCharacteristicData) {
        if (state === ButtonClickCharacteristicData.Released) {
            this.emit('buttonUp')
            this.emit('select')
        } else if (state === ButtonClickCharacteristicData.Pressed) {
            this.emit('buttonDown')
        }
    }

    /** @internal */
    private onSwipe(state: TouchOrSwipeCharacteristicData) {
        if (state === TouchOrSwipeCharacteristicData.SwipeDown) {
            this.emit('swipeDown', false)
            this.emit('swipe', SwipeGestureDirection.Down, false)
        } else if (state === TouchOrSwipeCharacteristicData.SwipeLeft) {
            this.emit('swipeLeft', false)
            this.emit('swipe', SwipeGestureDirection.Left, false)
        } else if (state === TouchOrSwipeCharacteristicData.SwipeRight) {
            this.emit('swipeRight', false)
            this.emit('swipe', SwipeGestureDirection.Right, false)
        } else if (state === TouchOrSwipeCharacteristicData.SwipeUp) {
            this.emit('swipeUp', false)
            this.emit('swipe', SwipeGestureDirection.Up, false)
        }
    }

    /** @internal */
    private onTouch(state: TouchOrSwipeCharacteristicData) {
        if (state === TouchOrSwipeCharacteristicData.TouchBottom) {
            this.emit('tapUp')
            this.emit('tap', TouchGestureArea.Bottom)
        } else if (state === TouchOrSwipeCharacteristicData.TouchLeft) {
            this.emit('tapLeft')
            this.emit('tap', TouchGestureArea.Left)
        } else if (state === TouchOrSwipeCharacteristicData.TouchRight) {
            this.emit('tapRight')
            this.emit('tap', TouchGestureArea.Right)
        } else if (state === TouchOrSwipeCharacteristicData.TouchTop) {
            this.emit('tapUp')
            this.emit('tap', TouchGestureArea.Top)
        }
    }

    /** @internal */
    private onLongTouch(state: TouchOrSwipeCharacteristicData) {
        if (state === TouchOrSwipeCharacteristicData.LongTouchBottom) {
            this.emit('longTouchUp')
            this.emit('longTouch', TouchGestureArea.Bottom)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchLeft) {
            this.emit('longTouchLeft')
            this.emit('longTouch', TouchGestureArea.Left)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchRight) {
            this.emit('longTouchRight')
            this.emit('longTouch', TouchGestureArea.Right)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchTop) {
            this.emit('longTouchUp')
            this.emit('longTouch', TouchGestureArea.Top)
        }
    }

    /** @internal */
    private onRotate(delta: number) {
        const rotation = this.rotation

        // Setting rotation is clamped
        this.rotation = rotation + (delta * (this.maxRotation - this.minRotation))

        if (this.rotation !== rotation) {
            if (delta > 0) {
                this.emit('rotateLeft', delta, this.rotation)
                this.emit('rotate', delta, this.rotation)
            } else if (delta < 0) {
                this.emit('rotateRight', delta, this.rotation)
                this.emit('rotate', delta, this.rotation)
            }
        }
    }

    /** @internal */
    private onFly(state: FlyCharacteristicData) {
        if (state === FlyCharacteristicData.Left) {
            this.emit('swipeLeft', true)
            this.emit('swipe', SwipeGestureDirection.Left, true)
        } else if (state === FlyCharacteristicData.Right) {
            this.emit('swipeRight', true)
            this.emit('swipe', SwipeGestureDirection.Right, true)
        }
    }

    /** @internal */
    private onHover(proximity: number) {
        this.emit('hover', proximity)
    }
}