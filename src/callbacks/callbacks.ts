import { NuimoControlDevice } from '../model/nuimo-control-device'
import { NuimoError } from '../errors/nuimo-error'
import { SwipeGestureDirection, TouchGestureArea } from '../model'

/**
 * Callback for events with no event arguments
 */
export interface OnEventCallback {
    (): void
}

/**
 * Callback for all `error` events
 */
export interface OnErrorCallback {
    /**
     * @param error - Evented error
     */
    (error: NuimoError): void
}

/**
 * Callback for 'batteryLevel' events
 */
export interface OnBatteryLeveCallback {
    /**
     * @param level - Battery level from 0-100
     */
    (level: number): void
}

/**
 * Callback for 'rssi' events
 */
export interface OnRssiCallback {
    /**
     * @param rssi - BT signal strenght in db
     */
    (rssi: number): void
}

/**
 * Callback for 'hover' events
 */
export interface OnHoverCallback {
    /**
     * @param proximity - proximity between 0-1, 0 being closest to the device
     */
    (proximity: number): void
}

/**
 * Callback for `swipeLeft`, `swipeRight`, `swipeTop`, and `swipeBottom` events
 */
export interface OnDirectionalSwipeGestureCallback {
    /**
     * Note: hoverSwipe is only applicable for `swipeLeft` or `swipeRight` gestures
     *
     * @param hoverSwipe - indicates if the swipe comes from an in-air swipe when `true`; `false`
     *                     indicates a touch interaction.
     */
    (hoverSwipe: boolean): void
}

/**
 * Callback for `swipe` gesture events
 */
export interface OnSwipeGestureCallback {
    /**
     * @param direction - swipe direction
     * @param hoverSwipe - indicates if the swipe comes from an in-air swipe when `true`; `false`
     *                     indicates a touch interaction
     */
    (direction: SwipeGestureDirection, hoverSwipe: boolean): void
}

/**
 * Callback for `touch` and `longTouch` gesture events
 */
export interface OnTouchGestureCallback {
    /**
     * @param area - touch area on device
     */
    (area: TouchGestureArea): void
}

/**
 * Callback for `rotate`, `rotateLeft`, and `rotateRight` events
 */
export interface OnRotateCallback {
    /**
     * @param delta - delta (positive = right, negative = left) between events
     * @param rotation - rotation of dial between 0-1, 0 being at the 12 o'clock option, 1 just before it
     */
    (delta: number, rotation: number): void
}

/**
 * Callback for device `discover` events
 */
export interface OnDeviceDiscoveredCallback {
    /**
     * @param device - Device discovered
     * @param newDevice - Indicates if this is a new device or one that has been discovered before, found prior to a disconnect
     */
    (device: NuimoControlDevice, newDevice: boolean): void
}

/**
 * Callback for all discovery session `done` events
 */
export interface OnDiscoveryDoneCallback {
    /**
     * @param timedOut - Indicates if a discovery session timed out
     */
    (timedOut: boolean): void
}