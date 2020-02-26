[Rocket Nuimo](README.md)

# Rocket Nuimo

## Index

### Enumerations

* [DeviceConnectedStatus](enums/deviceconnectedstatus.md)
* [DeviceDiscoveryState](enums/devicediscoverystate.md)
* [DisplayComposition](enums/displaycomposition.md)
* [DisplayTransition](enums/displaytransition.md)
* [GlyphAlignment](enums/glyphalignment.md)
* [NuimoDeviceCommunicationErrorCode](enums/nuimodevicecommunicationerrorcode.md)
* [SwipeGestureDirection](enums/swipegesturedirection.md)
* [TouchGestureArea](enums/touchgesturearea.md)

### Classes

* [DeviceDiscoveryManager](classes/devicediscoverymanager.md)
* [DeviceDiscoverySession](classes/devicediscoverysession.md)
* [Glyph](classes/glyph.md)
* [NuimoControlDevice](classes/nuimocontroldevice.md)
* [NuimoDeviceCommunicationError](classes/nuimodevicecommunicationerror.md)
* [NuimoError](classes/nuimoerror.md)

### Interfaces

* [DeviceDiscoverySessionOptions](interfaces/devicediscoverysessionoptions.md)
* [DisplayGlyphOptions](interfaces/displayglyphoptions.md)
* [OnBatteryLeveCallback](interfaces/onbatterylevecallback.md)
* [OnDeviceDiscoveredCallback](interfaces/ondevicediscoveredcallback.md)
* [OnDirectionalSwipeGestureCallback](interfaces/ondirectionalswipegesturecallback.md)
* [OnDiscoveryDoneCallback](interfaces/ondiscoverydonecallback.md)
* [OnErrorCallback](interfaces/onerrorcallback.md)
* [OnEventCallback](interfaces/oneventcallback.md)
* [OnHoverCallback](interfaces/onhovercallback.md)
* [OnRotateCallback](interfaces/onrotatecallback.md)
* [OnRssiCallback](interfaces/onrssicallback.md)
* [OnSwipeGestureCallback](interfaces/onswipegesturecallback.md)
* [OnTouchGestureCallback](interfaces/ontouchgesturecallback.md)

### Type aliases

* [HoverEvents](README.md#hoverevents)
* [HoverSwipeEvents](README.md#hoverswipeevents)
* [LongTouchEvents](README.md#longtouchevents)
* [RotateEvents](README.md#rotateevents)
* [SelectEvents](README.md#selectevents)
* [SwipeEvents](README.md#swipeevents)
* [TouchEvents](README.md#touchevents)

### Variables

* [digitGlyphs](README.md#const-digitglyphs)
* [emptyGlyph](README.md#const-emptyglyph)
* [errorGlyph](README.md#const-errorglyph)
* [filledGlyph](README.md#const-filledglyph)
* [leftGlyph](README.md#const-leftglyph)
* [linkGlyph](README.md#const-linkglyph)
* [pauseGlyph](README.md#const-pauseglyph)
* [playGlyph](README.md#const-playglyph)
* [rightGlyph](README.md#const-rightglyph)
* [stopGlyph](README.md#const-stopglyph)

## Type aliases

###  HoverEvents

Ƭ **HoverEvents**: *"hover"*

___

###  HoverSwipeEvents

Ƭ **HoverSwipeEvents**: *"swipeLeft" | "swipeRight"*

___

###  LongTouchEvents

Ƭ **LongTouchEvents**: *"longTouchLeft" | "longTouchRight" | "longTouchBottom"*

___

###  RotateEvents

Ƭ **RotateEvents**: *"rotate" | "rotateLeft" | "rotateRight"*

___

###  SelectEvents

Ƭ **SelectEvents**: *"select" | "selectUp" | "selectDown"*

___

###  SwipeEvents

Ƭ **SwipeEvents**: *"swipeUp" | "swipeDown"*

___

###  TouchEvents

Ƭ **TouchEvents**: *"touchTop" | "touchLeft" | "touchRight" | "touchBottom"*

## Variables

### `Const` digitGlyphs

• **digitGlyphs**: *[Glyph](classes/glyph.md)‹›[]* = [
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '  * * *  ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '    *    ',
        '   **    ',
        '    *    ',
        '    *    ',
        '    *    ',
        '    *    ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '      *  ',
        '     *   ',
        '   **    ',
        '  *      ',
        '  *****  ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '      *  ',
        '     *   ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '     *   ',
        '    **   ',
        '   * *   ',
        '  *  *   ',
        '  *****  ',
        '     *   ',
        '     *   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ****  ',
        '  *      ',
        '  *      ',
        '   ***   ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *      ',
        '  ****   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '  ****   ',
        '      *  ',
        '      *  ',
        '     *   ',
        '     *   ',
        '    *    ',
        '    *    ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    Glyph.fromString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ****  ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
]

Digit glyphs

___

### `Const` emptyGlyph

• **emptyGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
])

Empty glyph

___

### `Const` errorGlyph

• **errorGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '         ',
    '  *   *  ',
    '   * *   ',
    '    *    ',
    '   * *   ',
    '  *   *  ',
    '         ',
    '         ',
])

Error glyph

___

### `Const` filledGlyph

• **filledGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
])

Filled glyph

___

### `Const` leftGlyph

• **leftGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    ' * *     ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '         ',
])

Left arrow glyphs

___

### `Const` linkGlyph

• **linkGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    ' **   ** ',
    '*  * *  *',
    '*  *    *',
    '*   *   *',
    '*    *  *',
    '*  * *  *',
    ' **   ** ',
    '         ',
])

Link icon (infinity) glyph

___

### `Const` pauseGlyph

• **pauseGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '         ',
])

Pause icon glyph

___

### `Const` playGlyph

• **playGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '   *     ',
    '   **    ',
    '   ***   ',
    '   ****  ',
    '   ***   ',
    '   **    ',
    '   *     ',
    '         ',
])

Play icon glyph

___

### `Const` rightGlyph

• **rightGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '     * * ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    '         ',
])

Right arrow glyph

___

### `Const` stopGlyph

• **stopGlyph**: *[Glyph](classes/glyph.md)‹›* = Glyph.fromString([
    '         ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    '         ',
])

Stop icon glyph
