import { DisplayTransition, Glyph, GlyphAlignment } from '../..'
import { bootstrap, connectToDevice } from '../utils'

// Uncomment to search for only your device
// ENTER DEVICE_ID to discover only a particular device
const DEVICE_ID: string | undefined = undefined

/**
 * Main application entry point
 */
async function main() {
    const device = await connectToDevice(DEVICE_ID)

    // Create a custom Glyph
    // Nuimo Control has a 9x9 LED display, but you only need to create what you need
    // and use `GlyphAlignment` to align the glyph on display
    const glyph = Glyph.fromString([
        '  *  ',
        ' *** ',
        ' *** ',
        ' *** ',
        '*****',
        '** **',
        '* * *',
    ])

    // Display the glyph for 5 seconds
    device.displayGlyph(glyph, {
        alignment: GlyphAlignment.Center,           // Center align (default)
        brightness: 1,                              // Display brightness
        transition: DisplayTransition.CrossFade,    // Fade in/out
        timeoutMs: 5000,                            // Timeout after 5 seconds
    })
}

// Boot strap async function
bootstrap(main)