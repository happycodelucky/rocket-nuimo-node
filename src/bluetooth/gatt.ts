/**
 * GATT profile constants
 */

//
// Services
//

/**
 * Services available on Nuimo devices
 * @internal
 */
export enum DeviceService {
    BatteryStatus       = '180f',
    LED                 = 'f29b1523cb1940f3be5c7241ecb82fd1',
    Nuimo               = 'f29b1525cb1940f3be5c7241ecb82fd2',
}

//
// Service characteristics
//

/**
 * Battery status service characteristics
 * @internal
 */
export enum BatteryStatusServiceCharacteristic {
    BatteryLevel        = '2a19',
}

/**
 * LED service characteristics
 * @internal
 */
export enum LEDServiceCharacteristic {
    LEDMatrix           = 'f29b1524cb1940f3be5c7241ecb82fd1',
}

/**
 * Nuimo service characteristics
 * @internal
 */
export enum NuimoServiceCharacteristic {
    ButtonClick         = 'f29b1529cb1940f3be5c7241ecb82fd2',
    Fly                 = 'f29b1526cb1940f3be5c7241ecb82fd2',
    Rotation            = 'f29b1528cb1940f3be5c7241ecb82fd2',
    TouchOrSwipe        = 'f29b1527cb1940f3be5c7241ecb82fd2',
}

//
// Characteristic values
//

/**
 * Button click characteristic data values
 * @internal
 */
export enum ButtonClickCharacteristicData {
    Released            = 0,
    Pressed             = 1,
}

/**
 * Fly characteristic data values
 * @internal
 */
export enum FlyCharacteristicData {
    Left                = 0,
    Right               = 1,
    UpDown              = 4,
}

/**
 * Touch/Swipe characteristic data values
 * @internal
 */
export enum TouchOrSwipeCharacteristicData {
    SwipeLeft           = 0,
    SwipeRight          = 1,
    SwipeDown           = 2,
    SwipeUp             = 3,
    TouchLeft           = 4,
    TouchRight          = 5,
    TouchBottom         = 6,
    TouchTop            = 7,
    LongTouchLeft       = 8,
    LongTouchRight      = 9,
    LongTouchBottom     = 10,
    LongTouchTop        = 11,
}