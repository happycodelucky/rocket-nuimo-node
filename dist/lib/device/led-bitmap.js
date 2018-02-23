"use strict";
/**
 * @module numio-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
// Nuimo device LED matrix
const MATRIX_HEIGHT = 9;
const MATRIX_WIDTH = 9;
// Mask for bitmap row values
const BITMAP_ROW_MASK = Math.pow(2, MATRIX_WIDTH) - 1;
const BITMAP_BYTES = Math.ceil((MATRIX_HEIGHT * MATRIX_WIDTH) / 8);
/**
 * Composition mode for composing two bitmaps
 */
var LEDBitmapCompositeMode;
(function (LEDBitmapCompositeMode) {
    LEDBitmapCompositeMode[LEDBitmapCompositeMode["Multiple"] = 0] = "Multiple";
    LEDBitmapCompositeMode[LEDBitmapCompositeMode["Difference"] = 1] = "Difference";
    LEDBitmapCompositeMode[LEDBitmapCompositeMode["Mask"] = 2] = "Mask";
})(LEDBitmapCompositeMode = exports.LEDBitmapCompositeMode || (exports.LEDBitmapCompositeMode = {}));
/**
 * A LED bitmap object for use with Nuimo devices
 */
class LEDBitmap {
    /**
     * @param {Buffer} buffer - raw buffer for device LED bitmap
     */
    constructor(buffer) {
        if (!(buffer instanceof buffer_1.Buffer)) {
            throw new TypeError('LEDBitmap(buffer) should be an instance of Uint8Array');
        }
        if (buffer.length !== BITMAP_BYTES) {
            throw new TypeError(`LEDBitmap(buffer) should be include ${BITMAP_BYTES} buffer`);
        }
        this.buffer = buffer;
    }
    /**
     * Creates a LEDBitmap from an array of characters.
     * Non-whitespace characters are treated as the on state for each LED in that row
     *
     * @param bitmapString - array of strings representing each row (should be 9x9 string)
     *
     * @return LEDBitmap for use with a Nuimo device
     */
    static fromBitmapString(bitmapString) {
        if (!Array.isArray(bitmapString)) {
            throw new TypeError('fromBitmapString(bitmapString) should be an instance of Array<string>');
        }
        let byte = 0;
        let byteIndex = 0;
        let bitPosition = 0;
        let byteBuffer = new buffer_1.Buffer(BITMAP_BYTES);
        // Iterate through the character bits
        for (const row of bitmapString) {
            for (const character of row.padEnd(MATRIX_WIDTH)) {
                const c = character.charCodeAt(0);
                // Check for non-whitespace characters
                if (c >= 0x21 && c !== 0x7F) {
                    byte |= 0b1 << bitPosition;
                }
                bitPosition = (bitPosition + 1) % 8;
                if (bitPosition === 0) {
                    byteBuffer[byteIndex] = byte;
                    byte = 0;
                    byteIndex += 1;
                }
            }
        }
        byteBuffer[byteIndex] = byte;
        return new LEDBitmap(byteBuffer);
    }
    /**
     * Composites the current bitmap with another and returns a new bitmap
     *
     * @param bitmap - bitmap to composite with
     * @param mode - composite mode
     *
     * @return composited bitmap
     */
    compositeWith(bitmap, mode = LEDBitmapCompositeMode.Multiple) {
        const buffer = new buffer_1.Buffer(this.buffer);
        for (let i = 0; i < BITMAP_BYTES; i++) {
            switch (mode) {
                case LEDBitmapCompositeMode.Difference:
                    buffer[i] ^= bitmap.buffer[i];
                    break;
                case LEDBitmapCompositeMode.Multiple:
                    buffer[i] |= bitmap.buffer[i];
                    break;
                case LEDBitmapCompositeMode.Mask:
                    buffer[i] &= bitmap.buffer[i];
                    break;
            }
        }
        return new LEDBitmap(buffer);
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
    static _convertBitmapTobuffer(bitmap) {
        const buffer = new Uint8Array(BITMAP_BYTES);
        let rolloverBits = 0;
        let rolloverValue = 0;
        let index = 0;
        const valueMask = (Math.pow(2, MATRIX_WIDTH) - 1);
        const items = [...bitmap, 0];
        while (items.length) {
            if (rolloverBits > 0) {
                let nextRolloverBits = (MATRIX_WIDTH - 8) + rolloverBits;
                if (rolloverBits < 8) {
                    let value = items.shift() & valueMask;
                    buffer[index] = (rolloverValue | (value >> nextRolloverBits)) & 0xFF;
                    // Set next rollover
                    rolloverValue = (value << (8 - nextRolloverBits)) & 0xFF;
                    rolloverBits = nextRolloverBits;
                }
                else {
                    // There's enough bits not to pull another row
                    buffer[index] = rolloverValue >> (8 - rolloverBits);
                    rolloverBits -= 8;
                    rolloverValue = (rolloverValue << 8) & 0xFF;
                }
            }
            else {
                // Prime
                let value = items.shift() & valueMask;
                rolloverBits = MATRIX_WIDTH - 8;
                buffer[index] = value >> rolloverBits;
                rolloverValue = (value << 7) & 0xFF;
            }
            index += 1;
        }
        return buffer;
    }
}
exports.LEDBitmap = LEDBitmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVkLWJpdG1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9kZXZpY2UvbGVkLWJpdG1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsbUNBQStCO0FBRS9CLDBCQUEwQjtBQUMxQixNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUE7QUFDdkIsTUFBTSxZQUFZLEdBQUksQ0FBQyxDQUFBO0FBRXZCLDZCQUE2QjtBQUM3QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDckQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUVsRTs7R0FFRztBQUNILElBQVksc0JBSVg7QUFKRCxXQUFZLHNCQUFzQjtJQUM5QiwyRUFBUSxDQUFBO0lBQ1IsK0VBQVUsQ0FBQTtJQUNWLG1FQUFJLENBQUE7QUFDUixDQUFDLEVBSlcsc0JBQXNCLEdBQXRCLDhCQUFzQixLQUF0Qiw4QkFBc0IsUUFJakM7QUFFRDs7R0FFRztBQUNIO0lBR0k7O09BRUc7SUFDSCxZQUFvQixNQUFjO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLFlBQVksZUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sSUFBSSxTQUFTLENBQUMsdURBQXVELENBQUMsQ0FBQTtRQUNoRixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sSUFBSSxTQUFTLENBQUMsdUNBQXVDLFlBQVksU0FBUyxDQUFDLENBQUE7UUFDckYsQ0FBQztRQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ks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