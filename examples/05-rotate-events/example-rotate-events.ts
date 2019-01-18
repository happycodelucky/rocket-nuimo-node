import { bootstrap, connectToDevice, logEvent } from '../utils'

// Uncomment to search for only your device
// ENTER DEVICE_ID to discover only a particular device
const DEVICE_ID: string | undefined = undefined

/**
 * Main application entry point
 */
async function main() {

    const device = await connectToDevice(DEVICE_ID)

    // Set rotation from -1 to 1, starting at 0
    // This causes rotation to be clamped to these ranges
    device.setRotationRange(-1, 1, 0)

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