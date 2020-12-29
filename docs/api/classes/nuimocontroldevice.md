[Rocket Nuimo - v1.0.0](../README.md) / NuimoControlDevice

# Class: NuimoControlDevice

A Nuimo Control device client for interacting with BT Nuimo Control peripheral

## Hierarchy

* *EventEmitter*

  ↳ **NuimoControlDevice**

## Index

### Constructors

* [constructor](nuimocontroldevice.md#constructor)

### Accessors

* [batteryLevel](nuimocontroldevice.md#batterylevel)
* [brightness](nuimocontroldevice.md#brightness)
* [id](nuimocontroldevice.md#id)
* [isConnected](nuimocontroldevice.md#isconnected)
* [maxRotation](nuimocontroldevice.md#maxrotation)
* [minRotation](nuimocontroldevice.md#minrotation)
* [rotation](nuimocontroldevice.md#rotation)
* [rssi](nuimocontroldevice.md#rssi)

### Methods

* [addListener](nuimocontroldevice.md#addlistener)
* [clearDisplay](nuimocontroldevice.md#cleardisplay)
* [connect](nuimocontroldevice.md#connect)
* [disconnect](nuimocontroldevice.md#disconnect)
* [displayGlyph](nuimocontroldevice.md#displayglyph)
* [listenerCount](nuimocontroldevice.md#listenercount)
* [listeners](nuimocontroldevice.md#listeners)
* [off](nuimocontroldevice.md#off)
* [on](nuimocontroldevice.md#on)
* [once](nuimocontroldevice.md#once)
* [prependListener](nuimocontroldevice.md#prependlistener)
* [prependOnceListener](nuimocontroldevice.md#prependoncelistener)
* [removeListener](nuimocontroldevice.md#removelistener)
* [setRotationRange](nuimocontroldevice.md#setrotationrange)

## Constructors

### constructor

• **constructor**: 

## Accessors

### batteryLevel

• **batteryLevel**(): *undefined* \| *number*

Nuimo device battery level

**Returns:** *undefined* \| *number*

___

### brightness

• **brightness**(): *number*

Brightness level of the Nuimo screen

**Returns:** *number*

• **brightness**(`brightness`: *number*): *void*

Set brightness level of the Nuimo screen

Note: This will only be reflected when a new glyph is displayed
due to the way Nuimo operates

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`brightness` | *number* | Brightness level between 0.0-1.0    |

**Returns:** *void*

___

### id

• **id**(): *string*

Nuimo device identifier

**Returns:** *string*

___

### isConnected

• **isConnected**(): *boolean*

Indicates if there is a connection established to the Nuimo device

**Returns:** *boolean*

___

### maxRotation

• **maxRotation**(): *number*

Maximum rotation allowed (default 0.0)

**Returns:** *number*

___

### minRotation

• **minRotation**(): *number*

Minimum rotation allowed (default 0.0)

**Returns:** *number*

___

### rotation

• **rotation**(): *number*

Nuimo rotation value, can be between `minRotation` and `maxRotation`

**Returns:** *number*

• **rotation**(`rotation`: *number*): *void*

Set the Nuimo currently rotation

#### Parameters:

Name | Type |
------ | ------ |
`rotation` | *number* |

**Returns:** *void*

___

### rssi

• **rssi**(): *undefined* \| *number*

Nuimo device RSSI

**Returns:** *undefined* \| *number*

## Methods

### addListener

▸ **addListener**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **addListener**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### clearDisplay

▸ **clearDisplay**(`transition?`: [*CrossFade*](../enums/displaytransition.md#crossfade) \| [*Immediate*](../enums/displaytransition.md#immediate)): *Promise*<*boolean*\>

Clears the display

#### Parameters:

Name | Type |
------ | ------ |
`transition?` | [*CrossFade*](../enums/displaytransition.md#crossfade) \| [*Immediate*](../enums/displaytransition.md#immediate) |

**Returns:** *Promise*<*boolean*\>

true if the display was cleared

___

### connect

▸ **connect**(): *Promise*<*boolean*\>

Connects to the device, if not already connected.

**Returns:** *Promise*<*boolean*\>

___

### disconnect

▸ **disconnect**(): *void*

Disconnects cleanly from the Nuimo device

**Returns:** *void*

___

### displayGlyph

▸ **displayGlyph**(`glyph`: [*Glyph*](glyph.md), `options?`: [*DisplayGlyphOptions*](../interfaces/displayglyphoptions.md)): *Promise*<*boolean*\>

Displays a glyph on the Nuimo Control display

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`glyph` | [*Glyph*](glyph.md) | glyph to display   |
`options?` | [*DisplayGlyphOptions*](../interfaces/displayglyphoptions.md) | - |

**Returns:** *Promise*<*boolean*\>

true if the glyph was displayed

___

### listenerCount

▸ **listenerCount**(`type`: *error* \| *disconnect* \| *batteryLevel* \| *hover* \| *longTouch* \| *swipe* \| *rotate* \| *rssi* \| *touch* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* \| *rotateLeft* \| *rotateRight* \| *swipeLeft* \| *swipeRight*): *number*

#### Parameters:

Name | Type |
------ | ------ |
`type` | *error* \| *disconnect* \| *batteryLevel* \| *hover* \| *longTouch* \| *swipe* \| *rotate* \| *rssi* \| *touch* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* \| *rotateLeft* \| *rotateRight* \| *swipeLeft* \| *swipeRight* |

**Returns:** *number*

___

### listeners

▸ **listeners**(`eventName`: *hover*): [*OnHoverCallback*](../interfaces/onhovercallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |

**Returns:** [*OnHoverCallback*](../interfaces/onhovercallback.md)[]

▸ **listeners**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*): [*OnEventCallback*](../interfaces/oneventcallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |

**Returns:** [*OnEventCallback*](../interfaces/oneventcallback.md)[]

▸ **listeners**(`eventName`: RotateEvents): [*OnRotateCallback*](../interfaces/onrotatecallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |

**Returns:** [*OnRotateCallback*](../interfaces/onrotatecallback.md)[]

▸ **listeners**(`eventName`: HoverSwipeEvents): [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |

**Returns:** [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)[]

▸ **listeners**(`eventName`: *swipe*): [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |

**Returns:** [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)[]

▸ **listeners**(`eventName`: *longTouch* \| *touch*): [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |

**Returns:** [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)[]

▸ **listeners**(`eventName`: *error*): [*OnErrorCallback*](../interfaces/onerrorcallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |

**Returns:** [*OnErrorCallback*](../interfaces/onerrorcallback.md)[]

▸ **listeners**(`eventName`: *batteryLevel*): [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |

**Returns:** [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)[]

▸ **listeners**(`eventName`: *rssi*): [*OnRssiCallback*](../interfaces/onrssicallback.md)[]

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |

**Returns:** [*OnRssiCallback*](../interfaces/onrssicallback.md)[]

___

### off

▸ **off**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **off**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### on

▸ **on**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **on**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### once

▸ **once**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **once**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### prependListener

▸ **prependListener**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependListener**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **prependOnceListener**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### removeListener

▸ **removeListener**(`eventName`: *hover*, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *hover* |
`listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom*, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *disconnect* \| *select* \| *selectUp* \| *selectDown* \| *swipeUp* \| *swipeDown* \| *touchTop* \| *touchLeft* \| *touchRight* \| *touchBottom* \| *longTouchLeft* \| *longTouchRight* \| *longTouchBottom* |
`listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | RotateEvents |
`listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | HoverSwipeEvents |
`listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *swipe*, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *swipe* |
`listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *longTouch* \| *touch*, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *longTouch* \| *touch* |
`listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *error*, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *error* |
`listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *batteryLevel*, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *batteryLevel* |
`listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

▸ **removeListener**(`eventName`: *rssi*, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters:

Name | Type |
------ | ------ |
`eventName` | *rssi* |
`listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

___

### setRotationRange

▸ **setRotationRange**(`min`: *number*, `max`: *number*, `value?`: *number*): *void*

Sets the Nuimo dial rotation range and value

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`min` | *number* | minimum rotation value   |
`max` | *number* | maximum rotation value   |
`value?` | *number* | - |

**Returns:** *void*
