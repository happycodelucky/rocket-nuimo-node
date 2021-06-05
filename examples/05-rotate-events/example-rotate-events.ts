import { bootstrap, connectToDevice, logEvent } from '../utils'
import { RotationMode } from '../../src'

// Uncomment to search for only your device
// ENTER DEVICE_ID to discover only a particular device
const DEVICE_ID: string | undefined = undefined

/**
 * Main application entry point
 */
async function main() {
    const device = await connectToDevice(DEVICE_ID)

    // Set the rotation mode to clamp, ensuring the rotation stops at a min/max value for us
    device.rotationMode = RotationMode.Clamped

    // When using clamped rotation you may set the min/max values using setRotationRange
    // In this example the range is from -1 to 1, starting at 0 (mid-range)
    // The final value represents the number of rotation cycles it takes between the min and max. By default
    // this is the spread of the max-min (2 in this example). For example, this is set to 2 (1 positive and 1 negative rotation)
    device.setRotationRange(-1, 1, 0, 1)

    // Rotation in any direction
    device.on('rotate', (delta, rotation) => {
        logEvent('rotate', {
            delta,
            rotation,
        })
    })

    // Direction specific rotations
    device.on('rotateLeft', (delta, rotation) => {
        logEvent('rotateLeft', {
            delta,
            rotation,
        })
    })
    device.on('rotateRight', (delta, rotation) => {
        logEvent('rotateRight', {
            delta,
            rotation,
        })
    })
}

// Boot strap async function
bootstrap(main)