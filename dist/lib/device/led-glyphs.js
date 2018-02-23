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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVkLWdseXBocy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9kZXZpY2UvbGVkLWdseXBocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsNkNBQXdDO0FBRXhDOztHQUVHO0FBQ1UsUUFBQSxZQUFZLEdBQUc7SUFDeEIsc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7S0FDZCxDQUFDO0lBQ0Ysc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7S0FDZCxDQUFDO0lBQ0Ysc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7S0FDZCxDQUFDO0lBQ0Ysc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7S0FDZCxDQUFDO0lBQ0Ysc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7S0FDZCxDQUFDO0lBQ0Ysc0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2QixXQUFXO1FBQ1gsV0FBVztRQUNYLFdBQVc7UUFDWCxXQUFXO1FBQ1gs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