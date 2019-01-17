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
    device.on('swipe', (area, hoverSwipe) => {
        logEvent('swipe', {
            area,
            hoverSwipe,
        })
    })

    // Area specific swipes
    device.on('swipeDown', () => logEvent('swipeDown'))
    device.on('swipeUp', () => logEvent('swipeUp'))
    device.on('swipeLeft', (hoverSwipe) => logEvent('swipeLeft', { hoverSwipe }))
    device.on('swipeRight', (hoverSwipe) => logEvent('swipeRight', { hoverSwipe }))

}

// Boot strap async function
bootstrap(main)