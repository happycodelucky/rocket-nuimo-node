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
    device.on('hover', (proximity) => {
        logEvent('hover', {
            proximity: proximity.toFixed(4),
        })
    })

    // Any touch that allows for hover events
    device.on('swipe', (area, hoverSwipe) => hoverSwipe && logEvent('swipe', { area }))

    // Area specific swipes that allow for hover events
    device.on('swipeLeft', (hoverSwipe) => hoverSwipe && logEvent('swipeLeft'))
    device.on('swipeRight', (hoverSwipe) => hoverSwipe && logEvent('swipeRight'))

}

// Boot strap async function
bootstrap(main)