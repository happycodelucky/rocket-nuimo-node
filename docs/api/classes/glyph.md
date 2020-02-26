[Rocket Nuimo](../README.md) › [Glyph](glyph.md)

# Class: Glyph

String based glyph for Nuimo Control LED matrix displays

## Hierarchy

* **Glyph**

## Index

### Properties

* [characterRows](glyph.md#characterrows)
* [height](glyph.md#height)
* [width](glyph.md#width)
* [offChar](glyph.md#static-offchar)
* [onChar](glyph.md#static-onchar)

### Methods

* [invert](glyph.md#invert)
* [resize](glyph.md#resize)
* [toString](glyph.md#tostring)
* [translate](glyph.md#translate)
* [fromString](glyph.md#static-fromstring)

## Properties

###  characterRows

• **characterRows**: *ReadonlyArray‹string›*

Glyph character rows

___

###  height

• **height**: *number*

Glyph height in characters

___

###  width

• **width**: *number*

Glyph width in characters

___

### `Static` offChar

▪ **offChar**: *" "* = " "

LED off glyph character

___

### `Static` onChar

▪ **onChar**: *"*"* = "*"

LED on glyph character

## Methods

###  invert

▸ **invert**(): *[Glyph](glyph.md)*

Inverts the glyph, turning off LEDs that are on and vice-versa

**Returns:** *[Glyph](glyph.md)*

___

###  resize

▸ **resize**(`width`: number, `height`: number, `alignment`: [GlyphAlignment](../enums/glyphalignment.md)): *[Glyph](glyph.md)*

Resizes the glyph

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`width` | number | - | width to resize to |
`height` | number | - | height to resize to |
`alignment` | [GlyphAlignment](../enums/glyphalignment.md) | GlyphAlignment.Center | - |

**Returns:** *[Glyph](glyph.md)*

___

###  toString

▸ **toString**(): *string*

Return a string representation of the glyph

**Returns:** *string*

___

###  translate

▸ **translate**(`x`: number, `y`: number, `wrap`: boolean): *[Glyph](glyph.md)*

Performs a translation of the x/y of the glyph and produces a new glyph

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`x` | number | - | number of LED characters to shift the glyph by on the horizontal plane |
`y` | number | - | number of LED charactersto shift the glyph by on the vertical plane |
`wrap` | boolean | false | - |

**Returns:** *[Glyph](glyph.md)*

A new glyph with the transformation applied

___

### `Static` fromString

▸ **fromString**(`rows`: ReadonlyArray‹string›): *[Glyph](glyph.md)*

Creates a new LED glyph from an array of strings, where each array element represents a row, and each character an LED.
Nuimo devices have a 9x9 LED matrix so the rows should be 9 elements or less, with 9 characters or less.

- Whitespace characters are treated as off characters
- Other characters are treated as on characters

*Note*: Do not use unicode characters as they are not supported

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`rows` | ReadonlyArray‹string› | glyph string character rows  |

**Returns:** *[Glyph](glyph.md)*

New bitmap based on the rows and alignment
