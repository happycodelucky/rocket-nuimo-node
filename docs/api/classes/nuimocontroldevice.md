[Rocket Nuimo - v1.2.0](../README.md) / NuimoControlDevice

# Class: NuimoControlDevice

A Nuimo Control device client for interacting with BT Nuimo Control peripheral

## Hierarchy

- `EventEmitter`

  ↳ **NuimoControlDevice**

## Table of contents

### Properties

- [rotationMode](nuimocontroldevice.md#rotationmode)

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

## Properties

### rotationMode

• **rotationMode**: [RotationMode](../enums/rotationmode.md)

Rotation mode for the device

## Accessors

### batteryLevel

• `get` **batteryLevel**(): `undefined` \| `number`

Nuimo device battery level

#### Returns

`undefined` \| `number`

___

### brightness

• `get` **brightness**(): `number`

Brightness level of the Nuimo screen

#### Returns

`number`

• `set` **brightness**(`brightness`): `void`

Set brightness level of the Nuimo screen

Note: This will only be reflected when a new glyph is displayed
due to the way Nuimo operates

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `brightness` | `number` | Brightness level between 0.0-1.0 |

#### Returns

`void`

___

### id

• `get` **id**(): `string`

Nuimo device identifier

#### Returns

`string`

___

### isConnected

• `get` **isConnected**(): `boolean`

Indicates if there is a connection established to the Nuimo device

#### Returns

`boolean`

___

### maxRotation

• `get` **maxRotation**(): `number`

Maximum rotation allowed (default 0.0)

#### Returns

`number`

___

### minRotation

• `get` **minRotation**(): `number`

Minimum rotation allowed (default 0.0)

#### Returns

`number`

___

### rotation

• `get` **rotation**(): `number`

Nuimo rotation value, can be between `minRotation` and `maxRotation`

#### Returns

`number`

• `set` **rotation**(`rotation`): `void`

Set the Nuimo currently rotation

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

`void`

___

### rssi

• `get` **rssi**(): `undefined` \| `number`

Nuimo device RSSI

#### Returns

`undefined` \| `number`

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

▸ **addListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.addListener

___

### clearDisplay

▸ **clearDisplay**(`transition?`): `Promise`<boolean\>

Clears the display

#### Parameters

| Name | Type |
| :------ | :------ |
| `transition?` | [DisplayTransition](../enums/displaytransition.md) |

#### Returns

`Promise`<boolean\>

true if the display was cleared

___

### connect

▸ **connect**(): `Promise`<boolean\>

Connects to the device, if not already connected.

#### Returns

`Promise`<boolean\>

___

### disconnect

▸ **disconnect**(): `void`

Disconnects cleanly from the Nuimo device

#### Returns

`void`

___

### displayGlyph

▸ **displayGlyph**(`glyph`, `options?`): `Promise`<boolean\>

Displays a glyph on the Nuimo Control display

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glyph` | [Glyph](glyph.md) | glyph to display |
| `options?` | [DisplayGlyphOptions](../interfaces/displayglyphoptions.md) | - |

#### Returns

`Promise`<boolean\>

true if the glyph was displayed

___

### listenerCount

▸ **listenerCount**(`type`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"error"`` \| ``"disconnect"`` \| ``"batteryLevel"`` \| ``"hover"`` \| ``"longTouch"`` \| ``"swipe"`` \| ``"rssi"`` \| ``"touch"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` \| `RotateEvents` \| `HoverSwipeEvents` |

#### Returns

`number`

#### Inherited from

EventEmitter.listenerCount

___

### listeners

▸ **listeners**(`eventName`): [OnHoverCallback](../interfaces/onhovercallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |

#### Returns

[OnHoverCallback](../interfaces/onhovercallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnEventCallback](../interfaces/oneventcallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |

#### Returns

[OnEventCallback](../interfaces/oneventcallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnRotateCallback](../interfaces/onrotatecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |

#### Returns

[OnRotateCallback](../interfaces/onrotatecallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |

#### Returns

[OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |

#### Returns

[OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |

#### Returns

[OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnErrorCallback](../interfaces/onerrorcallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |

#### Returns

[OnErrorCallback](../interfaces/onerrorcallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |

#### Returns

[OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)[]

#### Inherited from

EventEmitter.listeners

▸ **listeners**(`eventName`): [OnRssiCallback](../interfaces/onrssicallback.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |

#### Returns

[OnRssiCallback](../interfaces/onrssicallback.md)[]

#### Inherited from

EventEmitter.listeners

___

### off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

▸ **off**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.off

___

### on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

▸ **on**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.on

___

### once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

▸ **once**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.once

___

### prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

▸ **prependListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependListener

___

### prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

▸ **prependOnceListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.prependOnceListener

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"hover"`` |
| `listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"disconnect"`` \| `SelectEvents` \| `SwipeEvents` \| `TouchEvents` \| `LongTouchEvents` |
| `listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `RotateEvents` |
| `listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `HoverSwipeEvents` |
| `listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"swipe"`` |
| `listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"longTouch"`` \| ``"touch"`` |
| `listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"error"`` |
| `listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"batteryLevel"`` |
| `listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

▸ **removeListener**(`eventName`, `listener`): [NuimoControlDevice](nuimocontroldevice.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | ``"rssi"`` |
| `listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

#### Returns

[NuimoControlDevice](nuimocontroldevice.md)

#### Inherited from

EventEmitter.removeListener

___

### setRotationRange

▸ **setRotationRange**(`min`, `max`, `value?`, `rotationCycles?`): `void`

Sets the Nuimo dial rotation range and value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `min` | `number` | minimum rotation value |
| `max` | `number` | maximum rotation value |
| `value` | `undefined` \| `number` | - |
| `rotationCycles` | `number` | - |

#### Returns

`void`
