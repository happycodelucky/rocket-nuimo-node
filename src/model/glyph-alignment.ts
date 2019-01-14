/** @internal */
export const GLYPH_HLEFT_MASK   = 0b01000
/** @internal */
export const GLYPH_HCENTER_MASK = 0b00000
/** @internal */
export const GLYPH_HRIGHT_MASK  = 0b10000
/** @internal */
export const GLYPH_VTOP_MASK    = 0b00001
/** @internal */
export const GLYPH_VCENTER_MASK = 0b00010
/** @internal */
export const GLYPH_VBOTTOM_MASK = 0b00100

/**
 * Glyph alignment for glyphs that do not fill the Nuimo display LED matrix
 */
export enum GlyphAlignment {
    /**
     * Top-left justified
     */
    TopLeft     = GLYPH_VTOP_MASK | GLYPH_HLEFT_MASK,
    /**
     * Top justified
     */
    Top         = GLYPH_VTOP_MASK | GLYPH_HCENTER_MASK,
    /**
     * Top-right justified
     */
    TopRight    = GLYPH_VTOP_MASK | GLYPH_HRIGHT_MASK,

    /**
     * Left justified
     */
    Left        = GLYPH_VCENTER_MASK | GLYPH_HLEFT_MASK,
    /**
     * Center justified
     */
    Center      = GLYPH_VCENTER_MASK | GLYPH_HCENTER_MASK,
    /**
     * Right justified
     */
    Right       = GLYPH_VCENTER_MASK | GLYPH_HRIGHT_MASK,

    /**
     * Bottom-left justified
     */
    BottomLeft  = GLYPH_VBOTTOM_MASK | GLYPH_HLEFT_MASK,
    /**
     * Bottom justified
     */
    Bottom      = GLYPH_VBOTTOM_MASK | GLYPH_HCENTER_MASK,
    /**
     * Bottom-right justified
     */
    BottomRight = GLYPH_VBOTTOM_MASK | GLYPH_HRIGHT_MASK,
}
