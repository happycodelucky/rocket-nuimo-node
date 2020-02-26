[Rocket Nuimo](../README.md) › [NuimoControlDevice](nuimocontroldevice.md)

# Class: NuimoControlDevice

A Nuimo Control device client for interacting with BT Nuimo Control peripheral

## Hierarchy

* EventEmitter

  ↳ **NuimoControlDevice**

## Index

### Properties

* [defaultMaxListeners](nuimocontroldevice.md#static-defaultmaxlisteners)

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
* [emit](nuimocontroldevice.md#emit)
* [eventNames](nuimocontroldevice.md#eventnames)
* [getMaxListeners](nuimocontroldevice.md#getmaxlisteners)
* [listenerCount](nuimocontroldevice.md#listenercount)
* [listeners](nuimocontroldevice.md#listeners)
* [off](nuimocontroldevice.md#off)
* [on](nuimocontroldevice.md#on)
* [once](nuimocontroldevice.md#once)
* [prependListener](nuimocontroldevice.md#prependlistener)
* [prependOnceListener](nuimocontroldevice.md#prependoncelistener)
* [rawListeners](nuimocontroldevice.md#rawlisteners)
* [removeAllListeners](nuimocontroldevice.md#removealllisteners)
* [removeListener](nuimocontroldevice.md#removelistener)
* [setMaxListeners](nuimocontroldevice.md#setmaxlisteners)
* [setRotationRange](nuimocontroldevice.md#setrotationrange)
* [listenerCount](nuimocontroldevice.md#static-listenercount)

## Properties

### `Static` defaultMaxListeners

▪ **defaultMaxListeners**: *number*

*Inherited from void*

## Accessors

###  batteryLevel

• **get batteryLevel**(): *number | undefined*

Nuimo device battery level

**Returns:** *number | undefined*

___

###  brightness

• **get brightness**(): *number*

Brightness level of the Nuimo screen

Note: This will only be reflected when a new glyph is displayed
due to the way Nuimo operates

**Returns:** *number*

• **set brightness**(`brightness`: number): *void*

Set brightness level of the Nuimo screen

Note: This will only be reflected when a new glyph is displayed
due to the way Nuimo operates

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`brightness` | number | Brightness level between 0.0-1.0  |

**Returns:** *void*

___

###  id

• **get id**(): *string*

Nuimo device identifier

**Returns:** *string*

___

###  isConnected

• **get isConnected**(): *boolean*

Indicates if there is a connection established to the Nuimo device

**Returns:** *boolean*

___

###  maxRotation

• **get maxRotation**(): *number*

Maximum rotation allowed (default 0.0)

**Returns:** *number*

___

###  minRotation

• **get minRotation**(): *number*

Minimum rotation allowed (default 0.0)

**Returns:** *number*

___

###  rotation

• **get rotation**(): *number*

Nuimo rotation value, can be between `minRotation` and `maxRotation`

**Returns:** *number*

• **set rotation**(`rotation`: number): *void*

Set the Nuimo currently rotation

**Parameters:**

Name | Type |
------ | ------ |
`rotation` | number |

**Returns:** *void*

___

###  rssi

• **get rssi**(): *number | undefined*

Nuimo device RSSI

**Returns:** *number | undefined*

## Methods

###  addListener

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **addListener**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **addListener**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  clearDisplay

▸ **clearDisplay**(`transition?`: [DisplayTransition](../enums/displaytransition.md)): *Promise‹boolean›*

Clears the display

**Parameters:**

Name | Type |
------ | ------ |
`transition?` | [DisplayTransition](../enums/displaytransition.md) |

**Returns:** *Promise‹boolean›*

true if the display was cleared

___

###  connect

▸ **connect**(): *Promise‹boolean›*

Connects to the device, if not already connected.

**Returns:** *Promise‹boolean›*

___

###  disconnect

▸ **disconnect**(): *void*

Disconnects cleanly from the Nuimo device

**Returns:** *void*

___

###  displayGlyph

▸ **displayGlyph**(`glyph`: [Glyph](glyph.md), `options?`: [DisplayGlyphOptions](../interfaces/displayglyphoptions.md)): *Promise‹boolean›*

Displays a glyph on the Nuimo Control display

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`glyph` | [Glyph](glyph.md) | glyph to display |
`options?` | [DisplayGlyphOptions](../interfaces/displayglyphoptions.md) | - |

**Returns:** *Promise‹boolean›*

true if the glyph was displayed

___

###  emit

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from void*

*Overrides void*

**Returns:** *Array‹string | symbol›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from void*

*Overrides void*

**Returns:** *number*

___

###  listenerCount

▸ **listenerCount**(`type`: string | symbol): *number*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | string &#124; symbol |

**Returns:** *number*

▸ **listenerCount**(`type`: [HoverEvents](../README.md#hoverevents) | [HoverSwipeEvents](../README.md#hoverswipeevents) | [SelectEvents](../README.md#selectevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | [RotateEvents](../README.md#rotateevents) | [SwipeEvents](../README.md#swipeevents) | "disconnect" | "swipe" | "touch" | "longTouch" | "error" | "batteryLevel" | "rssi"): *number*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`type` | [HoverEvents](../README.md#hoverevents) &#124; [HoverSwipeEvents](../README.md#hoverswipeevents) &#124; [SelectEvents](../README.md#selectevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; [RotateEvents](../README.md#rotateevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; "disconnect" &#124; "swipe" &#124; "touch" &#124; "longTouch" &#124; "error" &#124; "batteryLevel" &#124; "rssi" |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

▸ **listeners**(`eventName`: [HoverEvents](../README.md#hoverevents)): *[OnHoverCallback](../interfaces/onhovercallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |

**Returns:** *[OnHoverCallback](../interfaces/onhovercallback.md)[]*

▸ **listeners**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect"): *[OnEventCallback](../interfaces/oneventcallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |

**Returns:** *[OnEventCallback](../interfaces/oneventcallback.md)[]*

▸ **listeners**(`eventName`: [RotateEvents](../README.md#rotateevents)): *[OnRotateCallback](../interfaces/onrotatecallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |

**Returns:** *[OnRotateCallback](../interfaces/onrotatecallback.md)[]*

▸ **listeners**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents)): *[OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |

**Returns:** *[OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)[]*

▸ **listeners**(`eventName`: "swipe"): *[OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |

**Returns:** *[OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)[]*

▸ **listeners**(`eventName`: "touch" | "longTouch"): *[OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |

**Returns:** *[OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)[]*

▸ **listeners**(`eventName`: "error"): *[OnErrorCallback](../interfaces/onerrorcallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |

**Returns:** *[OnErrorCallback](../interfaces/onerrorcallback.md)[]*

▸ **listeners**(`eventName`: "batteryLevel"): *[OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |

**Returns:** *[OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)[]*

▸ **listeners**(`eventName`: "rssi"): *[OnRssiCallback](../interfaces/onrssicallback.md)[]*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |

**Returns:** *[OnRssiCallback](../interfaces/onrssicallback.md)[]*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **off**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **off**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  on

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **on**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **on**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  once

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **once**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **once**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  prependListener

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **prependListener**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **prependListener**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **prependOnceListener**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

▸ **removeListener**(`eventName`: [HoverEvents](../README.md#hoverevents), `listener`: [OnHoverCallback](../interfaces/onhovercallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverEvents](../README.md#hoverevents) |
`listener` | [OnHoverCallback](../interfaces/onhovercallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: [SelectEvents](../README.md#selectevents) | [SwipeEvents](../README.md#swipeevents) | [TouchEvents](../README.md#touchevents) | [LongTouchEvents](../README.md#longtouchevents) | "disconnect", `listener`: [OnEventCallback](../interfaces/oneventcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [SelectEvents](../README.md#selectevents) &#124; [SwipeEvents](../README.md#swipeevents) &#124; [TouchEvents](../README.md#touchevents) &#124; [LongTouchEvents](../README.md#longtouchevents) &#124; "disconnect" |
`listener` | [OnEventCallback](../interfaces/oneventcallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: [RotateEvents](../README.md#rotateevents), `listener`: [OnRotateCallback](../interfaces/onrotatecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [RotateEvents](../README.md#rotateevents) |
`listener` | [OnRotateCallback](../interfaces/onrotatecallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: [HoverSwipeEvents](../README.md#hoverswipeevents), `listener`: [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | [HoverSwipeEvents](../README.md#hoverswipeevents) |
`listener` | [OnDirectionalSwipeGestureCallback](../interfaces/ondirectionalswipegesturecallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: "swipe", `listener`: [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "swipe" |
`listener` | [OnSwipeGestureCallback](../interfaces/onswipegesturecallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: "touch" | "longTouch", `listener`: [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "touch" &#124; "longTouch" |
`listener` | [OnTouchGestureCallback](../interfaces/ontouchgesturecallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: "error", `listener`: [OnErrorCallback](../interfaces/onerrorcallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "error" |
`listener` | [OnErrorCallback](../interfaces/onerrorcallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: "batteryLevel", `listener`: [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "batteryLevel" |
`listener` | [OnBatteryLeveCallback](../interfaces/onbatterylevecallback.md) |

**Returns:** *this*

▸ **removeListener**(`eventName`: "rssi", `listener`: [OnRssiCallback](../interfaces/onrssicallback.md)): *this*

*Inherited from void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | "rssi" |
`listener` | [OnRssiCallback](../interfaces/onrssicallback.md) |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from void*

*Overrides void*

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  setRotationRange

▸ **setRotationRange**(`min`: number, `max`: number, `value?`: undefined | number): *void*

Sets the Nuimo dial rotation range and value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`min` | number | minimum rotation value |
`max` | number | maximum rotation value |
`value?` | undefined &#124; number | - |

**Returns:** *void*

___

### `Static` listenerCount

▸ **listenerCount**(`emitter`: EventEmitter, `event`: string | symbol): *number*

*Inherited from void*

**`deprecated`** since v4.0.0

**Parameters:**

Name | Type |
------ | ------ |
`emitter` | EventEmitter |
`event` | string &#124; symbol |

**Returns:** *number*
