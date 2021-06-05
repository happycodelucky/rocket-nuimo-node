[Rocket Nuimo - v1.2.0](../README.md) / RotationMode

# Enumeration: RotationMode

Modes for rotation support

## Table of contents

### Enumeration members

- [Clamped](rotationmode.md#clamped)
- [Continous](rotationmode.md#continous)

## Enumeration members

### Clamped

• **Clamped** = 0

Causes rotation to be clamped to a max and minimum.

No events will be fired when at the ends of a set rotation range

___

### Continous

• **Continous** = 1

Causes rotation to be continous. When in this mode there will be no
rotation value returned or evented. You must rely on the delta rotation only
