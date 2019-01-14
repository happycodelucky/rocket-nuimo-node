import { Glyph } from '../model/glyph'

/**
 * Nuimo LED bitmap for rendering on a Nuimo device LED matrix
 * @internal
 */
export class NuimoBitmap {
    /**
     * Bytes encoded for
     */
    readonly bytes: Buffer;

    /**
     * @param ledGlyph -
     */
    constructor(ledGlyph: Glyph) {
        let byte = 0
        let byteIndex = 0
        let bitPosition = 0
        const byteBuffer = Buffer.alloc(Math.ceil((ledGlyph.width * ledGlyph.height) / 8))

        // Iterate through the character bits
        for (const row of ledGlyph.characterRows) {
            for (const char of row) {
                // Check for non-whitespace characters
                if (char === Glyph.onChar) {
                    byte |= 0b1 << bitPosition
                }
                bitPosition = (bitPosition + 1) % 8
                if (bitPosition === 0) {
                    byteBuffer[byteIndex] = byte
                    byte = 0
                    byteIndex += 1
                }
            }
        }
        byteBuffer[byteIndex] = byte

        this.bytes = byteBuffer
    }
}