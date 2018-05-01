/**
 * @module numio-connect
 */

import { Buffer } from 'buffer'

// Nuimo device LED matrix
const MATRIX_HEIGHT = 9
const MATRIX_WIDTH  = 9

// Mask for bitmap row values
const BITMAP_ROW_MASK = Math.pow(2, MATRIX_WIDTH) - 1
const BITMAP_BYTES = Math.ceil((MATRIX_HEIGHT * MATRIX_WIDTH) / 8)

/**
 * Composition mode for composing two bitmaps
 */
export enum LEDBitmapCompositeMode {
    Multiple,
    Difference,
    Mask,
}

/**
 * A LED bitmap object for use with Nuimo devices
 */
export class LEDBitmap {
    readonly buffer: Buffer;

    /**
     * @param buffer - raw buffer for device LED bitmap
     */
    private constructor(buffer: Buffer) {
        if (!(buffer instanceof Buffer)) {
            throw new TypeError('LEDBitmap(buffer) should be an instance of Uint8Array')
        }
        if (buffer.length !== BITMAP_BYTES) {
            throw new TypeError(`LEDBitmap(buffer) should be include ${BITMAP_BYTES} buffer`)
        }

        this.buffer = buffer
    }

    /**
     * Creates a LEDBitmap from an array of characters.
     * Non-whitespace characters are treated as the on state for each LED in that row
     *
     * @param bitmapString - array of strings representing each row (should be 9x9 string)
     *
     * @return LEDBitmap for use with a Nuimo device
     */
    static fromBitmapString(bitmapString: Array<string>): LEDBitmap {
        if (!Array.isArray(bitmapString)) {
            throw new TypeError('fromBitmapString(bitmapString) should be an instance of Array<string>')
        }

        let byte = 0
        let byteIndex = 0
        let bitPosition = 0
        const byteBuffer = new Buffer(BITMAP_BYTES)

        // Iterate through the character bits
        for (const row of bitmapString) {
            for (const character of row.padEnd(MATRIX_WIDTH)) {
                const c = character.charCodeAt(0)

                // Check for non-whitespace characters
                if (c >= 0x21 && c !== 0x7F) {
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

        return new LEDBitmap(byteBuffer)
    }

    /**
     * Composites the current bitmap with another and returns a new bitmap
     *
     * @param bitmap - bitmap to composite with
     * @param mode - composite mode
     *
     * @return composited bitmap
     */
    compositeWith(bitmap: LEDBitmap, mode: LEDBitmapCompositeMode = LEDBitmapCompositeMode.Multiple): LEDBitmap {
        const buffer = new Buffer(this.buffer)
        for (let i = 0; i < BITMAP_BYTES; i++) {
            switch (mode) {
                case LEDBitmapCompositeMode.Difference:
                    buffer[i] ^= bitmap.buffer[i]
                    break
                case LEDBitmapCompositeMode.Multiple:
                    buffer[i] |= bitmap.buffer[i]
                    break
                case LEDBitmapCompositeMode.Mask:
                    buffer[i] &= bitmap.buffer[i]
                    break
            }

        }

        return new LEDBitmap(buffer)
    }

    //
    // Private functions
    //

    /**
     * Converts a Uint16 array buffer into a bitmap. This allows bitmaps to be specified as bit patterns consisting on
     * 9 bits.
     *
     * @param bitmap - UInt16 buffer bitmap, with each 2xbyte pair representing a single line
     */
    private static _convertBitmapTobuffer(bitmap: Uint16Array) {
        const buffer: Uint8Array = new Uint8Array(BITMAP_BYTES);
        let rolloverBits = 0
        let rolloverValue = 0
        let index = 0

        const valueMask = (Math.pow(2, MATRIX_WIDTH) - 1);
        const items = [...bitmap, 0]
        while (items.length) {
            if (rolloverBits > 0) {
                let nextRolloverBits = (MATRIX_WIDTH - 8) + rolloverBits
                if (rolloverBits < 8) {
                    let value: number = <number> items.shift() & valueMask
                    buffer[index] = (rolloverValue | (value >> nextRolloverBits)) & 0xFF

                    // Set next rollover
                    rolloverValue = (value << (8 - nextRolloverBits)) & 0xFF
                    rolloverBits = nextRolloverBits;
                } else {
                    // There's enough bits not to pull another row
                    buffer[index] = rolloverValue >> (8 - rolloverBits)
                    rolloverBits -= 8
                    rolloverValue = (rolloverValue << 8) & 0xFF
                }
            } else {
                // Prime
                let value: number = <number> items.shift() & valueMask
                rolloverBits = MATRIX_WIDTH - 8
                buffer[index] = value >> rolloverBits
                rolloverValue = (value << 7) & 0xFF
            }
            index += 1
        }

        return buffer;
    }
}