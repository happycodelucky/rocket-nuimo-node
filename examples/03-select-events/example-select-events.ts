import { DisplayComposition, DisplayTransition, Glyph, GlyphAlignment } from '../..'
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

    // When display button is pressed
    device.on('selectDown', () => {
        console.log('Display button presses')

        device.displayGlyph(glyph, {
            alignment: GlyphAlignment.Center,
            compositionMode: DisplayComposition.Invert,
            transition: DisplayTransition.CrossFade,
        })
    })

    // When display button is released
    device.on('selectUp', () => {
        console.log('Display button released')

        device.displayGlyph(glyph, {
            alignment: GlyphAlignment.Center,
            brightness: 0.2,
            transition: DisplayTransition.CrossFade,
        })
    })

    // When display button is pressed & released
    device.on('select', () => {
        console.log('Display button clicked')
    })
}

// Boot strap async function
bootstrap(main)