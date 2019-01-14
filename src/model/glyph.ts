import * as GlyphMasks from './glyph-alignment'

import { GlyphAlignment } from './glyph-alignment'
import { LED_DISPLAY_COLS, LED_DISPLAY_ROWS } from '../device/display-config'

/**
 * String based LED glyph for Nuimo LED matrix displays
 */
export class Glyph {
    /**
     * LED on glyph character
     */
    static readonly onChar = '*'
    /**
     * LED off glyph character
     */
    static readonly offChar = ' '
    /**
     * Blank row
     */
    static readonly blankRow = Glyph.offChar.repeat(LED_DISPLAY_ROWS)

    /**
     * Glyph character rows
     * @internal
     */
    readonly characterRows: ReadonlyArray<string>

    /**
     * Glyph height in characters
     */
    readonly height = LED_DISPLAY_ROWS

    /**
     * Glyph width in characters
     */
    readonly width = LED_DISPLAY_COLS

    /**
     * @param rows - character rows encoded with `onChar` and `offChar`
     */
    private constructor(rows: ReadonlyArray<string>) {
        if (rows.length > LED_DISPLAY_ROWS) {
            throw new TypeError(`Glyph(rows) should have ${LED_DISPLAY_ROWS} elements`)
        }
        for (const [row, i] of rows) {
            if (row.length > LED_DISPLAY_COLS) {
                throw new TypeError(`Glyph(rows[${i}]) should have ${LED_DISPLAY_COLS} characters`)
            }
        }

        this.characterRows = rows
    }

    /**
     * Creates a new LED glyph from an array of strings, where each array element represents a row, and each character an LED.
     * Nuimo devices have a 9x9 LED matrix so the rows should be 9 elements or less, with 9 characters or less.
     *
     * - Whitespace characters are treated as off characters
     * - Other characters are treated as on characters
     *
     * *Note*: Do not use unicode characters as they are not supported
     *
     * @param rows - glyph string character rows
     * @param [alignment=GlyphAlignment.Center] - optional alighment to align bitmap to
     *
     * @return New bitmap based on the rows and alignment
     */
    static fromString(rows: ReadonlyArray<string>, alignment: GlyphAlignment = GlyphAlignment.Center): Glyph {
        if (rows.length > LED_DISPLAY_ROWS) {
            throw new TypeError(`Glyph(rows) should contain no more than ${LED_DISPLAY_ROWS} elements`)
        }
        for (const [row, i] of rows) {
            if (row.length > LED_DISPLAY_COLS) {
                throw new TypeError(`Glyph(rows[${i}]) should can only be ${LED_DISPLAY_COLS} in length`)
            }
        }

        // Rows
        rows = rows.map(row => {
            let normalizedRow = ''
            for (const char of row) {
                normalizedRow += /\s/.test(char) ? Glyph.offChar : Glyph.onChar
            }

            if (row.length < LED_DISPLAY_COLS) {
                if ((alignment & GlyphMasks.GLYPH_HLEFT_MASK) === GlyphMasks.GLYPH_HLEFT_MASK) {
                    normalizedRow = normalizedRow.padEnd(LED_DISPLAY_COLS, Glyph.offChar)
                } else if ((alignment & GlyphMasks.GLYPH_HRIGHT_MASK) === GlyphMasks.GLYPH_HRIGHT_MASK) {
                    normalizedRow = normalizedRow.padStart(LED_DISPLAY_COLS, Glyph.offChar)
                } else {
                    const rowPrefix = LED_DISPLAY_COLS - Math.floor((LED_DISPLAY_COLS - row.length) / 2)
                    normalizedRow = normalizedRow.padStart(rowPrefix, Glyph.offChar).padEnd(LED_DISPLAY_COLS, Glyph.offChar)
                }
            }

            return normalizedRow
        })

        const glyph: string[] = []
        if (rows.length < LED_DISPLAY_ROWS) {
            const missingRows = LED_DISPLAY_ROWS - rows.length

            let prefixRows = 0
            // tslint:disable-next-line prefer-conditional-expression
            if ((alignment & GlyphMasks.GLYPH_VBOTTOM_MASK) === GlyphMasks.GLYPH_VBOTTOM_MASK) {
                prefixRows = missingRows
            } else if ((alignment & GlyphMasks.GLYPH_VCENTER_MASK) === GlyphMasks.GLYPH_VCENTER_MASK) {
                prefixRows = Math.floor(missingRows / 2)
            }

            // Prefix
            while (prefixRows) {
                glyph.push(Glyph.blankRow)
                prefixRows -= 1
            }

            glyph.push(...rows)

            // Suffix
            while (glyph.length < LED_DISPLAY_ROWS) {
                glyph.push(Glyph.blankRow)
            }
        } else {
            glyph.push(...rows)
        }

        return new Glyph(glyph)
    }

    /**
     * Performs a translation of the x/y of the glyph and produces a new glyph
     *
     * @param x - number of LED characters to shift the glyph by on the horizontal plane
     * @param y - number of LED charactersto shift the glyph by on the vertical plane
     * @param [wrap=false] - when `true` causes LED characters to wrap around
     * @return A new glyph with the transformation applied
     */
    translate(x: number, y: number, wrap: boolean = false): Glyph {
        if (x > LED_DISPLAY_COLS) {
            throw new TypeError(`translate(x) should be less than ${LED_DISPLAY_COLS}`)
        }
        if (x < -LED_DISPLAY_COLS) {
            throw new TypeError(`translate(x) should be greater or equal to -${LED_DISPLAY_COLS}`)
        }
        if (y > LED_DISPLAY_ROWS) {
            throw new TypeError(`translate(y) should be less than ${LED_DISPLAY_ROWS}`)
        }
        if (y < -LED_DISPLAY_ROWS) {
            throw new TypeError(`translate(y) should be greater or equal to -${LED_DISPLAY_ROWS}`)
        }

        // Check of any change
        if (x === 0 && y === 0) {
            return this
        }

        let rows = this.characterRows
        // Adjust vertical alignment
        if (y !== 0) {
            if (Math.abs(y) === LED_DISPLAY_ROWS) {
                rows = wrap ? rows : []
            } else {
                rows = (y < 0)
                    ? [...rows.slice(-y), ...(wrap ? rows.slice(0, -y) : [])]
                    : [...(wrap ? rows.slice(-y) : []), ...rows.slice(0, -y)]
            }
        }

        // Adjust horizontal aligment
        if (x !== 0) {
            if (Math.abs(y) === LED_DISPLAY_COLS) {
                rows = wrap ? rows : []
            } else {
                rows = rows.map(row => {
                    return (x < 0)
                        ? row.slice(-x) + (wrap ? row.slice(0, -x) : '')
                        : (wrap ? row.slice(-x) : '') + row.slice(0, -x)
                })
            }
        }

        // Adjust alignment of the glyph
        let alignment = 0
        if (y < 0) {
            alignment |= GlyphMasks.GLYPH_VTOP_MASK
        } else if (y > 0) {
            alignment |= GlyphMasks.GLYPH_VBOTTOM_MASK
        } else {
            alignment |= GlyphMasks.GLYPH_VCENTER_MASK
        }
        if (x < 0) {
            alignment |= GlyphMasks.GLYPH_HLEFT_MASK
        } else if (x > 0) {
            alignment |= GlyphMasks.GLYPH_HRIGHT_MASK
        } else {
            alignment |= GlyphMasks.GLYPH_HCENTER_MASK
        }

        return wrap ? new Glyph(rows) : Glyph.fromString(rows, alignment as GlyphAlignment)
    }

    /**
     * Inverts the glyph, turning off LEDs that are on and vice-versa
     */
    invert(): Glyph {
        const rows = this.characterRows.map(row => {
            let invertedRow = ''
            for (const char of row) {
                invertedRow += (char === Glyph.offChar) ? Glyph.onChar : Glyph.offChar
            }

            return invertedRow
        })

        return new Glyph(rows)
    }

    /**
     * Return a string representation of the glyph
     */
    toString() {
        return this.characterRows.join('\n')
    }
}