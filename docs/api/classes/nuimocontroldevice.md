[Rocket Nuimo - v1.1.0](../README.md) / NuimoControlDevice

# Class: NuimoControlDevice

A Nuimo Control device client for interacting with BT Nuimo Control peripheral

## Hierarchy

- *EventEmitter*

  ↳ **NuimoControlDevice**

## Table of contents

### Accessors

- [batteryLevel](nuimocontroldevice.md#batterylevel)
- [brightness](nuimocontroldevice.md#brightness)
- [id](nuimocontroldevice.md#id)
- [isConnected](nuimocontroldevice.md#isconnected)
- [maxRotation](nuimocontroldevice.md#maxrotation)
- [minRotation](nuimocontroldevice.md#minrotation)
- [rotation](nuimocontroldevice.md#rotation)
- [rssi](nuimocontroldevice.md#rssi)

### Methods

- [addListener](nuimocontroldevice.md#addlistener)
- [clearDisplay](nuimocontroldevice.md#cleardisplay)
- [connect](nuimocontroldevice.md#connect)
- [disconnect](nuimocontroldevice.md#disconnect)
- [displayGlyph](nuimocontroldevice.md#displayglyph)
- [listenerCount](nuimocontroldevice.md#listenercount)
- [listeners](nuimocontroldevice.md#listeners)
- [off](nuimocontroldevice.md#off)
- [on](nuimocontroldevice.md#on)
- [once](nuimocontroldevice.md#once)
- [prependListener](nuimocontroldevice.md#prependlistener)
- [prependOnceListener](nuimocontroldevice.md#prependoncelistener)
- [removeListener](nuimocontroldevice.md#removelistener)
- [setRotationRange](nuimocontroldevice.md#setrotationrange)

## Accessors

### batteryLevel

• get **batteryLevel**(): *undefined* \| *number*

Nuimo device battery level

**Returns:** *undefined* \| *number*

___

### brightness

• get **brightness**(): *number*

Brightness level of the Nuimo screen

**Returns:** *number*

• set **brightness**(`brightness`: *number*): *void*

Set brightness level of the Nuimo screen

Note: This will only be reflected when a new glyph is displayed
due to the way Nuimo operates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `brightness` | *number* | Brightness level between 0.0-1.0 |

**Returns:** *void*

___

### id

• get **id**(): *string*

Nuimo device identifier

**Returns:** *string*

___

### isConnected

• get **isConnected**(): *boolean*

Indicates if there is a connection established to the Nuimo device

**Returns:** *boolean*

___

### maxRotation

• get **maxRotation**(): *number*

Maximum rotation allowed (default 0.0)

**Returns:** *number*

___

### minRotation

• get **minRotation**(): *number*

Minimum rotation allowed (default 0.0)

**Returns:** *number*

___

### rotation

• get **rotation**(): *number*

Nuimo rotation value, can be between `minRotation` and `maxRotation`

**Returns:** *number*

• set **rotation**(`rotation`: *number*): *void*

Set the Nuimo currently rotation

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | *number* |

**Returns:** *void*

___

### rssi

• get **rssi**(): *undefined* \| *number*

Nuimo device RSSI

**Returns:** *undefined* \| *number*

## Methods

### addListener

▸ **addListener**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

▸ **addListener**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.addListener

___

### clearDisplay

▸ **clearDisplay**(`transition?`: [*DisplayTransition*](../enums/displaytransition.md)): *Promise*<boolean\>

Clears the display

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition?` | [*DisplayTransition*](../enums/displaytransition.md) |

**Returns:** *Promise*<boolean\>

true if the display was cleared

___

### connect

▸ **connect**(): *Promise*<boolean\>

Connects to the device, if not already connected.

**Returns:** *Promise*<boolean\>

___

### disconnect

▸ **disconnect**(): *void*

Disconnects cleanly from the Nuimo device

**Returns:** *void*

___

### displayGlyph

▸ **displayGlyph**(`glyph`: [*Glyph*](glyph.md), `options?`: [*DisplayGlyphOptions*](../interfaces/displayglyphoptions.md)): *Promise*<boolean\>

Displays a glyph on the Nuimo Control display

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glyph` | [*Glyph*](glyph.md) | glyph to display |
| `options?` | [*DisplayGlyphOptions*](../interfaces/displayglyphoptions.md) | - |

**Returns:** *Promise*<boolean\>

true if the glyph was displayed

___

### listenerCount

▸ **listenerCount**(`type`: ``"error"`` \| ``"disconnect"`` \| ``"batteryLevel"`` \| ``"hover"`` \| ``"longTouch"`` \| ``"swipe"`` \| ``"rssi"`` \| ``"touch"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents \| RotateEvents \| HoverSwipeEvents): *number*

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` \| ``"disconnect"`` \| ``"batteryLevel"`` \| ``"hover"`` \| ``"longTouch"`` \| ``"swipe"`` \| ``"rssi"`` \| ``"touch"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents \| RotateEvents \| HoverSwipeEvents |

**Returns:** *number*

Inherited from: EventEmitter.listenerCount

___

### listeners

▸ **listeners**(`eventName`: ``"hover"``): [*OnHoverCallback*](../interfaces/onhovercallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |

**Returns:** [*OnHoverCallback*](../interfaces/onhovercallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents): [*OnEventCallback*](../interfaces/oneventcallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |

**Returns:** [*OnEventCallback*](../interfaces/oneventcallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: RotateEvents): [*OnRotateCallback*](../interfaces/onrotatecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |

**Returns:** [*OnRotateCallback*](../interfaces/onrotatecallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: HoverSwipeEvents): [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |

**Returns:** [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"swipe"``): [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |

**Returns:** [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"longTouch"`` \| ``"touch"``): [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |

**Returns:** [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"error"``): [*OnErrorCallback*](../interfaces/onerrorcallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |

**Returns:** [*OnErrorCallback*](../interfaces/onerrorcallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"batteryLevel"``): [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |

**Returns:** [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)[]

Inherited from: EventEmitter.listeners

▸ **listeners**(`eventName`: ``"rssi"``): [*OnRssiCallback*](../interfaces/onrssicallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |

**Returns:** [*OnRssiCallback*](../interfaces/onrssicallback.md)[]

Inherited from: EventEmitter.listeners

___

### off

▸ **off**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

▸ **off**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.off

___

### on

▸ **on**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

▸ **on**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.on

___

### once

▸ **once**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

▸ **once**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.once

___

### prependListener

▸ **prependListener**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

▸ **prependListener**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependListener

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.prependOnceListener

___

### removeListener

▸ **removeListener**(`eventName`: ``"hover"``, `listener`: [*OnHoverCallback*](../interfaces/onhovercallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [*OnHoverCallback*](../interfaces/onhovercallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents, `listener`: [*OnEventCallback*](../interfaces/oneventcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| SelectEvents \| SwipeEvents \| TouchEvents \| LongTouchEvents |
| `listener` | [*OnEventCallback*](../interfaces/oneventcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: RotateEvents, `listener`: [*OnRotateCallback*](../interfaces/onrotatecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | RotateEvents |
| `listener` | [*OnRotateCallback*](../interfaces/onrotatecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: HoverSwipeEvents, `listener`: [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | HoverSwipeEvents |
| `listener` | [*OnDirectionalSwipeGestureCallback*](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"swipe"``, `listener`: [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [*OnSwipeGestureCallback*](../interfaces/onswipegesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"longTouch"`` \| ``"touch"``, `listener`: [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [*OnTouchGestureCallback*](../interfaces/ontouchgesturecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"error"``, `listener`: [*OnErrorCallback*](../interfaces/onerrorcallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [*OnErrorCallback*](../interfaces/onerrorcallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"batteryLevel"``, `listener`: [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [*OnBatteryLeveCallback*](../interfaces/onbatterylevecallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

▸ **removeListener**(`eventName`: ``"rssi"``, `listener`: [*OnRssiCallback*](../interfaces/onrssicallback.md)): [*NuimoControlDevice*](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [*OnRssiCallback*](../interfaces/onrssicallback.md) |

**Returns:** [*NuimoControlDevice*](nuimocontroldevice.md)

Inherited from: EventEmitter.removeListener

___

### setRotationRange

▸ **setRotationRange**(`min`: *number*, `max`: *number*, `value?`: *number*): *void*

Sets the Nuimo dial rotation range and value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | *number* | minimum rotation value |
| `max` | *number* | maximum rotation value |
| `value?` | *number* | - |

**Returns:** *void*
