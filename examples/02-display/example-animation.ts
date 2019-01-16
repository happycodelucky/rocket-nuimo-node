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

    // Create two glyph animation frames
    const glyphFrames = [
        Glyph.fromString([
            '     ',
            '     ',
            '  *  ',
            ' *** ',
            ' *** ',
            ' *** ',
            '*****',
            '** **',
            '*   *',
            '     ',
            '  *  ',
            ' * * ',
        ]),
        Glyph.fromString([
            '     ',
            '     ',
            '  *  ',
            ' *** ',
            ' *** ',
            ' *** ',
            '*****',
            '** **',
            '* * *',
            ' * * ',
            '  *  ',
            '     ',
        ]),
    ]

    const primaryGlyph = glyphFrames[1]

    // Display the primary glyph
    device.displayGlyph(primaryGlyph, {
        alignment: GlyphAlignment.Top,           // The glyphs are larger than the display - top align
        transition: DisplayTransition.CrossFade,
    })

    // Perform a little animation
    let offset = 0
    let direction = 1
    setInterval(() => {
        const newOffset = offset + direction
        if (offset + direction > primaryGlyph.height || newOffset < 0) {
            direction *= -1
        }
        offset = offset + direction

        // Translate the glyph, offseting the Y start position to display
        device.displayGlyph(glyphFrames[offset % glyphFrames.length].translate(0, -offset), {
            alignment: GlyphAlignment.Top,
            transition: DisplayTransition.Immediate,
        })
    }, 500)
}

// Boot strap async function
bootstrap(main)