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
    // Nuimo has a 9x9 LED display, but you only need to create what you need
    // and use `GlyphAlignment` to align the glyph
    const glyph = Glyph.fromString([
        '  *  ',
        ' *** ',
        ' *** ',
        ' *** ',
        '*****',
        '** **',
        '* * *',
    ], GlyphAlignment.Center)

    // Display the glyph for 5 seconds
    device.displayGlyph(glyph, {
        transition: DisplayTransition.CrossFade,
        timeoutMs: 5000, // 5 seconds (max 25.5 seconds)
    })

    // Display another glyph after 5 seconds
    setTimeout(() => {
        // Invert the glyph and display
        const invertedGlyph = glyph.invert()
        device.displayGlyph(invertedGlyph, {
            brightness: 0.1,
            transition: DisplayTransition.Immediate,
            timeoutMs: 5000, // 5 seconds (max 25.5 seconds)
        })
    }, 5000)
}

// Boot strap async function
bootstrap(main)