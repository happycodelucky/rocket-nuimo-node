[Rocket Nuimo - v1.2.1](../README.md) / RotationMode

# Enumeration: RotationMode

Modes for rotation support

## Table of contents

### Enumeration members

- [Clamped](rotationmode.md#clamped)
- [Continuous](rotationmode.md#continuous)

## Enumeration members

### Clamped

• **Clamped** = 0

Causes rotation to be clamped to a max and minimum.

No events will be fired when at the ends of a set rotation range

___

### Continuous

• **Continuous** = 1

Causes rotation to be continuous. When in this mode there will be no
rotation value returned or evented. You must rely on the delta rotation only
