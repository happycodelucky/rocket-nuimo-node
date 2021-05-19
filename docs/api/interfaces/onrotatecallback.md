[Rocket Nuimo - v1.1.0](../README.md) / OnRotateCallback

# Interface: OnRotateCallback

Callback for `rotate`, `rotateLeft`, and `rotateRight` events

## Callable

▸ **OnRotateCallback**(`delta`: *number*, `rotation`: *number*): *void*

Callback for `rotate`, `rotateLeft`, and `rotateRight` events

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delta` | *number* | delta (positive = right, negative = left) between events |
| `rotation` | *number* | rotation of dial between 0-1, 0 being at the 12 o'clock option, 1 just before it |

**Returns:** *void*
