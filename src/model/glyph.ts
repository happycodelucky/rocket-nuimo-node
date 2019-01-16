import * as GlyphMasks from './glyph-alignment'

import { GlyphAlignment } from './glyph-alignment'

/**
 * String based glyph for Nuimo Control LED matrix displays
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
     * Glyph character rows
     */
    readonly characterRows: ReadonlyArray<string>

    /**
     * Glyph height in characters
     */
    readonly height: number

    /**
     * Glyph width in characters
     */
    readonly width: number

    /**
     * @param rows - character rows encoded with `onChar` and `offChar`
     */
    private constructor(rows: ReadonlyArray<string>) {
        this.characterRows = rows
        this.height = this.characterRows.length
        this.width = Math.max(...rows.map(r => r.length))
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
     *
     * @return New bitmap based on the rows and alignment
     */
    static fromString(rows: ReadonlyArray<string>): Glyph {
        return new Glyph(rows.map(row => {
            let normalizedRow = ''
            for (const char of row) {
                normalizedRow += /\s/.test(char) ? Glyph.offChar : Glyph.onChar
            }

            return normalizedRow
        }))
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
        const [width, height] = [this.width, this.height]

        if (x > width) {
            throw new TypeError(`translate(x) should be less than ${width}`)
        }
        if (x < -width) {
            throw new TypeError(`translate(x) should be greater or equal to -${width}`)
        }
        if (y > height) {
            throw new TypeError(`translate(y) should be less than ${height}`)
        }
        if (y < -height) {
            throw new TypeError(`translate(y) should be greater or equal to -${height}`)
        }

        // Check of any change
        if (x === 0 && y === 0) {
            return this
        }

        let rows = this.characterRows
        // Adjust vertical alignment
        if (y !== 0) {
            if (Math.abs(y) === height) {
                rows = wrap ? rows : []
            } else {
                rows = (y < 0)
                    ? [...rows.slice(-y), ...(wrap ? rows.slice(0, -y) : [])]
                    : [...(wrap ? rows.slice(-y) : []), ...rows.slice(0, -y)]
            }
        }

        // Adjust horizontal aligment
        if (x !== 0) {
            if (Math.abs(y) === width) {
                rows = wrap ? rows : []
            } else {
                rows = rows.map(row => {
                    return (x < 0)
                        ? row.slice(-x) + (wrap ? row.slice(0, -x) : '')
                        : (wrap ? row.slice(-x) : '') + row.slice(0, -x)
                })
            }
        }

        return new Glyph(rows)
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
     * Resizes the glyph
     * @param width - width to resize to
     * @param height - height to resize to
     * @param [alignment=GlyphAlignment.Center] - alignment to pad/crop the glyph
     */
    resize(width: number, height: number, alignment: GlyphAlignment = GlyphAlignment.Center): Glyph {
        if (width < 0) {
            throw new TypeError('resize(width) should be cannot be less than 0')
        }
        if (height < 0) {
            throw new TypeError('resize(height) should be cannot be less than 0')
        }

        // When the width or height is 0 then the glyph has no content
        if (width === 0 || height === 0) {
            return new Glyph([])
        }

        const rows = this.characterRows.map(row => {
            if (row.length < width) {
                if ((alignment & GlyphMasks.GLYPH_HLEFT_MASK) === GlyphMasks.GLYPH_HLEFT_MASK) {
                    row = row.padEnd(width, Glyph.offChar)
                } else if ((alignment & GlyphMasks.GLYPH_HRIGHT_MASK) === GlyphMasks.GLYPH_HRIGHT_MASK) {
                    row = row.padStart(width, Glyph.offChar)
                } else {
                    const rowPrefix = width - Math.floor((width - row.length) / 2)
                    row = row.padStart(rowPrefix, Glyph.offChar).padEnd(width, Glyph.offChar)
                }
            }

            return row
        })

        const glyph: string[] = []
        if (rows.length < height) {
            const missingRows = height - rows.length

            let prefixRows = 0
            // tslint:disable-next-line prefer-conditional-expression
            if ((alignment & GlyphMasks.GLYPH_VBOTTOM_MASK) === GlyphMasks.GLYPH_VBOTTOM_MASK) {
                prefixRows = missingRows
            } else if ((alignment & GlyphMasks.GLYPH_VCENTER_MASK) === GlyphMasks.GLYPH_VCENTER_MASK) {
                prefixRows = Math.floor(missingRows / 2)
            }

            const blankRow = Glyph.offChar.repeat(width)
            // Prefix
            while (prefixRows) {
                glyph.push(blankRow)
                prefixRows -= 1
            }

            glyph.push(...rows)

            // Suffix
            while (glyph.length < height) {
                glyph.push(blankRow)
            }
        } else {
            glyph.push(...rows)
        }

        return new Glyph(glyph)
    }

    /**
     * Return a string representation of the glyph
     */
    toString() {
        return this.characterRows.join('\n')
    }
}