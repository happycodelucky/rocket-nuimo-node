import { bootstrap, connectToDevice, logEvent } from '../utils'

// Uncomment to search for only your device
// ENTER DEVICE_ID to discover only a particular device
const DEVICE_ID: string | undefined = undefined

/**
 * Main application entry point
 */
async function main() {

    const device = await connectToDevice(DEVICE_ID)

    // Any touch
    device.on('touch', (area) => {
        logEvent('touch', {
            area,
        })
    })

    // Area specific touches
    device.on('touchBottom', () => logEvent('touchBottom'))
    device.on('touchLeft', () => logEvent('touchLeft'))
    device.on('touchRight', () => logEvent('touchRight'))
    device.on('touchTop', () => logEvent('touchTop'))

    // Any long-touch
    device.on('longTouch', (area) => {
        logEvent('longTouch', {
            area,
        })
    })

    // Area specific touches
    device.on('longTouchBottom', () => logEvent('longTouchBottom'))
    device.on('longTouchLeft', () => logEvent('longTouchLeft'))
    device.on('longTouchRight', () => logEvent('longTouchRight'))

    // This event does not exist (capture by hover on/off)
    // device.on('longTouchTop', () => logEvent('longTouchRight'))
}

// Boot strap async function
bootstrap(main)