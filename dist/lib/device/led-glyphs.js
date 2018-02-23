"use strict";
/**
 * @module numio-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const led_bitmap_1 = require("./led-bitmap");
/**
 * Digit bitmap
 */
exports.digitBitmaps = [
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
    led_bitmap_1.LEDBitmap.fromBitmapString([
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
];
/**
 * Right arrow bitmap
 */
exports.rightBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '     * * ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    '         ',
]);
/**
 * Left arrow bitmpa
 */
exports.leftBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '    * *  ',
    '   * *   ',
    '  * *    ',
    ' * *     ',
    '  * *    ',
    '   * *   ',
    '    * *  ',
    '         ',
]);
/**
 * Error bitmap
 */
exports.errorBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '         ',
    '  *   *  ',
    '   * *   ',
    '    *    ',
    '   * *   ',
    '  *   *  ',
    '         ',
    '         ',
]);
/**
 * Link icon (infinity) bitmap
 */
exports.linkBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    ' **   ** ',
    '*  * *  *',
    '*  *    *',
    '*   *   *',
    '*    *  *',
    '*  * *  *',
    ' **   ** ',
    '         ',
]);
/**
 * Play bitmap icon
 */
exports.playBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '   *     ',
    '   **    ',
    '   ***   ',
    '   ****  ',
    '   ***   ',
    '   **    ',
    '   *     ',
    '         ',
]);
/**
 * Stop icon bitmap
 */
exports.stopBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    ' ******* ',
    '         ',
]);
/**
 * Pause icon bitmap
 */
exports.pauseBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '  ** **  ',
    '         ',
]);
/**
 * Empty bitmap
 */
exports.emptyBitmap = led_bitmap_1.LEDBitmap.fromBitmapString([
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
    '         ',
]);
/**
 * Filled bitmap
 */
exports.bitmapFilled = [
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
    '*********',
];
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill1 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill2 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill3 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill4 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill5 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill6 = LEDBitmap.fromBitmapString([
//     '         ',
//     '         ',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
// ])
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphFill7 = LEDBitmap.fromBitmapString([
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
//     '        *',
//     '         ',
// ])
// export const glyphFill: LEDBitmap[] = [glyphFill0, glyphFill1, glyphFill2, glyphFill3, glyphFill4, glyphFill5, glyphFill6, glyphFill7]
// /**
//  * @return {LEDBitmap}
//  */
// export const glyphBlank = [
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
//     '         ',
// ] 
//# sourceMappingURL=led-glyphs.js.map