import { DisplayTransition, Glyph, GlyphAlignment, DisplayComposition } from '../..'
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
    ])

    // Display the glyph for 5 seconds
    device.displayGlyph(glyph, {
        alignment: GlyphAlignment.Top,
        transition: DisplayTransition.CrossFade,
    })

    // Set up click handlers
    device.on('selectDown', () => {
        console.log('SELECTED PRESSED')

        device.displayGlyph(glyph, {
            alignment: GlyphAlignment.Center,
            compositionMode: DisplayComposition.Invert,
            transition: DisplayTransition.CrossFade,
        })
    })

    // Set up click handlers
    device.on('selectUp', () => {
        console.log('SELECTED RELEASED')

        device.displayGlyph(glyph, {
            alignment: GlyphAlignment.Center,
            brightness: 0.2,
            transition: DisplayTransition.CrossFade,
        })
    })

    // Set up click handlers
    device.on('select', () => {
        console.log('SELECTED')
    })
}

// Boot strap async function
bootstrap(main)