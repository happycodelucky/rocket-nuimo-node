[Rocket Nuimo - v1.1.0](../README.md) / DisplayGlyphOptions

# Interface: DisplayGlyphOptions

Options used when calling displayGlyph

## Table of contents

### Properties

- [alignment](displayglyphoptions.md#alignment)
- [brightness](displayglyphoptions.md#brightness)
- [compositionMode](displayglyphoptions.md#compositionmode)
- [timeoutMs](displayglyphoptions.md#timeoutms)
- [transition](displayglyphoptions.md#transition)

## Properties

### alignment

• `Optional` **alignment**: [*GlyphAlignment*](../enums/glyphalignment.md)

For glyphs smaller or larger than the 9x9 screen, the alignment to render the glyph with
Default is GlyphAlignment.Center

___

### brightness

• `Optional` **brightness**: *number*

Display brightness
Does not affect device brightness level already set

___

### compositionMode

• `Optional` **compositionMode**: [*Invert*](../enums/displaycomposition.md#invert)

Display composition mode

___

### timeoutMs

• `Optional` **timeoutMs**: *number*

Timeout, in milliseconds before the glyph disappears

Max: 25 seconds

___

### transition

• `Optional` **transition**: [*DisplayTransition*](../enums/displaytransition.md)

Transition effect between glyph displays
