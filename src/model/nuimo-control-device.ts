import { EventEmitter } from 'events'

import { emptyGlyph } from './glyphs'

import { Glyph } from './glyph'
import { GlyphAlignment } from './glyph-alignment'
import { NuimoBitmap } from '../device/nuimo-bitmap'
import { NuimoError } from '../errors/nuimo-error'
import { NuimoPeripheral } from '../device/nuimo-peripheral'
import { SwipeGestureDirection } from './swipe-gesture-direction'
import { TouchGestureArea } from './touch-gesture-area'

import {
    ButtonClickCharacteristicData,
    FlyCharacteristicData,
    TouchOrSwipeCharacteristicData,
} from '../bluetooth/gatt'

import {
    OnBatteryLeveCallback,
    OnDirectionalSwipeGestureCallback,
    OnErrorCallback,
    OnEventCallback,
    OnHoverCallback,
    OnRotateCallback,
    OnRssiCallback,
    OnSwipeGestureCallback,
    OnTouchGestureCallback,
 } from '../callbacks/callbacks'
import { LED_DISPLAY_COLS, LED_DISPLAY_ROWS } from '../device';

// Empty bitmap for clearing display
const emptyBitmap = new NuimoBitmap(emptyGlyph)

/**
 * Composition mode when display a glyph
 */
export enum DisplayComposition {
    /**
     * Inverts the displayed glyph
     */
    Invert,
}

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
     * For glyphs smaller or larger than the 9x9 screen, the alignment to render the glyph with
     * Default is GlyphAlignment.Center
     */
    alignment?: GlyphAlignment,

    /**
     * Display brightness
     * Does not affect device brightness level already set
     */
    brightness?: number

    /**
     * Display composition mode
     */
    compositionMode?: DisplayComposition

    /**
     * Transition effect between glyph displays
     */
    transition?: DisplayTransition

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
type TouchEvents = 'touchTop' | 'touchLeft' | 'touchRight' | 'touchBottom'
type LongTouchEvents = 'longTouchTop' | 'longTouchLeft' | 'longTouchRight' | 'longTouchBottom'

/**
 * A Nuimo Control device client for interacting with BT Nuimo Control peripheral
 */
export class NuimoControlDevice extends EventEmitter {
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
     * Displays a glyph on the Nuimo Control display
     *
     * @param glyph - glyph to display
     * @param [options={}] - options when displaying the glyph
     */
    async displayGlyph(glyph: Glyph, options?: DisplayGlyphOptions): Promise<void> {
        const explicitBrightness = options && options.brightness
        const brightness = explicitBrightness !== undefined ? explicitBrightness : this.brightness

        // Resize and perform composition
        let displayGlyph = glyph.resize(LED_DISPLAY_COLS, LED_DISPLAY_ROWS, options && options.alignment)
        if (options && options.compositionMode === DisplayComposition.Invert) {
            displayGlyph = displayGlyph.invert()
        }
        const bitmap = new NuimoBitmap(displayGlyph)

        return this.nuimoPeripheral.displayBitmap(bitmap, {
            brightness,
            timeoutMs: options && options.timeoutMs,
            fadeTransition: options && options.transition === DisplayTransition.CrossFade,
        }) as Promise<any>
    }

    /**
     * Clears the display
     *
     * @param [transition=DisplayTransition.CrossFade] - transition when clearing the screen
     */
    async clearDisplay(transition?: DisplayTransition): Promise<void> {
        return this.nuimoPeripheral.displayBitmap(emptyBitmap, {
            brightness: this.brightness,
            timeoutMs: 0,
            fadeTransition: transition === DisplayTransition.CrossFade,
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
        peripheral.on('batteryLevel', () => this.emit('batteryLevel', this.batteryLevel!))
        peripheral.on('button', this.onButtonClick.bind(this))
        peripheral.on('fly', this.onFly.bind(this))
        peripheral.on('hover', this.onHover.bind(this))
        peripheral.on('longTouch', this.onLongTouch.bind(this))
        peripheral.on('rotate', this.onRotate.bind(this))
        peripheral.on('rssi', () => this.emit('rssi', this.rssi!))
        peripheral.on('swipe', this.onSwipe.bind(this))
        peripheral.on('touch', this.onTouch.bind(this))
    }

    //
    // Event handlers
    //

    /** @internal */
    private onButtonClick(state: ButtonClickCharacteristicData) {
        if (state === ButtonClickCharacteristicData.Released) {
            this.emit('selectUp')
            this.emit('select')
        } else if (state === ButtonClickCharacteristicData.Pressed) {
            this.emit('selectDown')
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
            this.emit('touchTop')
            this.emit('touch', TouchGestureArea.Bottom)
        } else if (state === TouchOrSwipeCharacteristicData.TouchLeft) {
            this.emit('touchLeft')
            this.emit('touch', TouchGestureArea.Left)
        } else if (state === TouchOrSwipeCharacteristicData.TouchRight) {
            this.emit('touchRight')
            this.emit('touch', TouchGestureArea.Right)
        } else if (state === TouchOrSwipeCharacteristicData.TouchTop) {
            this.emit('touchTop')
            this.emit('touch', TouchGestureArea.Top)
        }
    }

    /** @internal */
    private onLongTouch(state: TouchOrSwipeCharacteristicData) {
        if (state === TouchOrSwipeCharacteristicData.LongTouchBottom) {
            this.emit('longTouchBottom')
            this.emit('longTouch', TouchGestureArea.Bottom)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchLeft) {
            this.emit('longTouchLeft')
            this.emit('longTouch', TouchGestureArea.Left)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchRight) {
            this.emit('longTouchRight')
            this.emit('longTouch', TouchGestureArea.Right)
        } else if (state === TouchOrSwipeCharacteristicData.LongTouchTop) {
            this.emit('longTouchTop')
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

//
// Event declarations
//

export declare interface NuimoControlDevice {
    addListener(eventName: HoverEvents, listener: OnHoverCallback): this
    addListener(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    addListener(eventName: RotateEvents, listener: OnRotateCallback): this
    addListener(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    addListener(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    addListener(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    addListener(eventName: 'error', listener: OnErrorCallback): this
    addListener(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    addListener(eventName: 'rssi', listener: OnRssiCallback): this

    /** @internal */
    emit(eventName: HoverEvents | 'batteryLevel' | 'rssi', value: number): boolean
    /** @internal */
    emit(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect'): boolean
    /** @internal */
    emit(eventName: RotateEvents, delta: number, rotation: number): boolean
    /** @internal */
    emit(eventName: SwipeEvents, hoverSwipe: boolean): boolean
    /** @internal */
    emit(eventName: 'swipe', direction: SwipeGestureDirection, hoverSwipe: boolean): boolean
    /** @internal */
    emit(eventName: 'touch' | 'longTouch', area: TouchGestureArea): boolean
    /** @internal */
    emit(eventName: 'error', error: NuimoError): boolean

    listeners(eventName: HoverEvents): OnHoverCallback[]
    listeners(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect'): OnEventCallback[]
    listeners(eventName: RotateEvents): OnRotateCallback[]
    listeners(eventName: SwipeEvents): OnDirectionalSwipeGestureCallback[]
    listeners(eventName: 'swipe'): OnSwipeGestureCallback[]
    listeners(eventName: 'touch' | 'longTouch'): OnTouchGestureCallback[]
    listeners(eventName: 'error'): OnErrorCallback[]
    listeners(eventName: 'batteryLevel'): OnBatteryLeveCallback[]
    listeners(eventName: 'rssi'): OnRssiCallback[]

    off(eventName: HoverEvents, listener: OnHoverCallback): this
    off(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    off(eventName: RotateEvents, listener: OnRotateCallback): this
    off(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    off(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    off(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    off(eventName: 'error', listener: OnErrorCallback): this
    off(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    off(eventName: 'rssi', listener: OnRssiCallback): this

    on(eventName: HoverEvents, listener: OnHoverCallback): this
    on(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    on(eventName: RotateEvents, listener: OnRotateCallback): this
    on(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    on(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    on(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    on(eventName: 'error', listener: OnErrorCallback): this
    on(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    on(eventName: 'rssi', listener: OnRssiCallback): this

    once(eventName: HoverEvents, listener: OnHoverCallback): this
    once(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    once(eventName: RotateEvents, listener: OnRotateCallback): this
    once(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    once(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    once(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    once(eventName: 'error', listener: OnErrorCallback): this
    once(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    once(eventName: 'rssi', listener: OnRssiCallback): this

    prependListener(eventName: HoverEvents, listener: OnHoverCallback): this
    prependListener(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    prependListener(eventName: RotateEvents, listener: OnRotateCallback): this
    prependListener(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    prependListener(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    prependListener(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    prependListener(eventName: 'error', listener: OnErrorCallback): this
    prependListener(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    prependListener(eventName: 'rssi', listener: OnRssiCallback): this

    prependOnceListener(eventName: HoverEvents, listener: OnHoverCallback): this
    prependOnceListener(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    prependOnceListener(eventName: RotateEvents, listener: OnRotateCallback): this
    prependOnceListener(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    prependOnceListener(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    prependOnceListener(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    prependOnceListener(eventName: 'error', listener: OnErrorCallback): this
    prependOnceListener(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    prependOnceListener(eventName: 'rssi', listener: OnRssiCallback): this

    removeListener(eventName: HoverEvents, listener: OnHoverCallback): this
    removeListener(eventName: SelectEvents | TouchEvents | LongTouchEvents | 'disconnect', listener: OnEventCallback): this
    removeListener(eventName: RotateEvents, listener: OnRotateCallback): this
    removeListener(eventName: SwipeEvents, listener: OnDirectionalSwipeGestureCallback): this
    removeListener(eventName: 'swipe', listener: OnSwipeGestureCallback): this
    removeListener(eventName: 'touch' | 'longTouch', listener: OnTouchGestureCallback): this
    removeListener(eventName: 'error', listener: OnErrorCallback): this
    removeListener(eventName: 'batteryLevel', listener: OnBatteryLeveCallback): this
    removeListener(eventName: 'rssi', listener: OnRssiCallback): this

    listenerCount(type: HoverEvents | SelectEvents | TouchEvents | LongTouchEvents | 'disconnect' | RotateEvents | SwipeEvents |
        'swipe' | 'touch' | 'longTouch' | 'error' | 'batteryLevel' | 'rssi'): number
}