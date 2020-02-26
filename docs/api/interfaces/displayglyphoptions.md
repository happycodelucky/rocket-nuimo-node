[Rocket Nuimo](../README.md) › [DisplayGlyphOptions](displayglyphoptions.md)

# Interface: DisplayGlyphOptions

Options used when calling displayGlyph

## Hierarchy

* **DisplayGlyphOptions**

## Index

### Properties

* [alignment](displayglyphoptions.md#optional-alignment)
* [brightness](displayglyphoptions.md#optional-brightness)
* [compositionMode](displayglyphoptions.md#optional-compositionmode)
* [timeoutMs](displayglyphoptions.md#optional-timeoutms)
* [transition](displayglyphoptions.md#optional-transition)

## Properties

### `Optional` alignment

• **alignment**? : *[GlyphAlignment](../enums/glyphalignment.md)*

For glyphs smaller or larger than the 9x9 screen, the alignment to render the glyph with
Default is GlyphAlignment.Center

___

### `Optional` brightness

• **brightness**? : *undefined | number*

Display brightness
Does not affect device brightness level already set

___

### `Optional` compositionMode

• **compositionMode**? : *[DisplayComposition](../enums/displaycomposition.md)*

Display composition mode

___

### `Optional` timeoutMs

• **timeoutMs**? : *undefined | number*

Timeout, in milliseconds before the glyph disappears

Max: 25 seconds

___

### `Optional` transition

• **transition**? : *[DisplayTransition](../enums/displaytransition.md)*

Transition effect between glyph displays
