import { LEDBitmap } from './led-bitmap'

/**
 * Digit bitmap
 */
export const digitBitmaps = [
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '  * * *  ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '    *    ',
        '   **    ',
        '    *    ',
        '    *    ',
        '    *    ',
        '    *    ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '      *  ',
        '     *   ',
        '   **    ',
        '  *      ',
        '  *****  ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '      *  ',
        '     *   ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '     *   ',
        '    **   ',
        '   * *   ',
        '  *  *   ',
        '  *****  ',
        '     *   ',
        '     *   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ****  ',
        '  *      ',
        '  *      ',
        '   ***   ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *      ',
        '  ****   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '  ****   ',
        '      *  ',
        '      *  ',
        '     *   ',
        '     *   ',
        '    *    ',
        '    *    ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ]),
    LEDBitmap.fromBitmapString([
        '         ',
        '   ***   ',
        '  *   *  ',
        '  *   *  ',
        '   ****  ',
        '      *  ',
        '  *   *  ',
        '   ***   ',
        '         ',
    ])
]

/**
 * Right arrow bitmap
 */
export const rightBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '     * * ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    '         ',
])

/**
 * Left arrow bitmpa
 */
export const leftBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    ' * *     ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '         ',
])

/**
 * Error bitmap
 */
export const errorBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '         ',
    '  *   *  ',
    '   * *   ',
    '    *    ',
    '   * *   ',
    '  *   *  ',
    '         ',
    '         ',
])

/**
 * Link icon (infinity) bitmap
 */
export const linkBitmap = LEDBitmap.fromBitmapString([
    '         ',
    ' **   ** ',
    '*  * *  *',
    '*  *    *',
    '*   *   *',
    '*    *  *',
    '*  * *  *',
    ' **   ** ',
    '         ',
])

/**
 * Play bitmap icon
 */
export const playBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '   *     ',
    '   **    ',
    '   ***   ',
    '   ****  ',
    '   ***   ',
    '   **    ',
    '   *     ',
    '         ',
])

/**
 * Stop icon bitmap
 */
export const stopBitmap = LEDBitmap.fromBitmapString([
    '         ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    '         ',
])

/**
 * Pause icon bitmap
 */
export const pauseBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '         ',
])

/**
 * Empty bitmap
 */
export const emptyBitmap = LEDBitmap.fromBitmapString([
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
])

/**
 * Filled bitmap
 */
export const bitmapFilled = LEDBitmap.fromBitmapString([
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
])