import { DEVICE_CONNECT_TIMEOUT_MS } from '../../src'
import { DeviceDiscoveryManager, DisplayTransition, Glyph } from '../../src'

/**
 * Rocket glyph
 */
export const rocketGlyph = Glyph.fromString([
    '         ',
    '         ',
    '    *    ',
    '   ***   ',
    '   ***   ',
    '   ***   ',
    '  *****  ',
    '  ** **  ',
    '  * * *  ',
])

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Main application entry point
 */
async function main() {
    const session = manager.startDiscoverySession({
        timeout: DEVICE_CONNECT_TIMEOUT_MS,
    })

    console.log('Looking for Nuimo device...')
    const device = await session.waitForFirstDevice()

    console.log(`Found device ${device.id}. Connecting...`)
    if (await device.connect()) {
        console.log('Connected!')

        // Display a glyph
        device.displayGlyph(rocketGlyph, {
            transition: DisplayTransition.CrossFade,
        })

        // Offsets
        let xOffset = 0
        let yOffset = 0

        // Move the glyph based on the rotation
        device.setRotationRange(-9, 9, 0)

        device.on('rotate', (delta, rotation) => {
            const offset = -Math.round(rotation)
            if (offset !== yOffset) {
                yOffset = offset
                device.displayGlyph(rocketGlyph.translate(xOffset, yOffset), {
                    transition: DisplayTransition.Immediate,
                })
            }
        })

        device.on('swipe', (direction) => {
            const offset = xOffset;

            if (direction === SwipeGestureDirection.Left) {
                xOffset = (xOffset - 1) % rocketGlyph.width
            } else if (direction === SwipeGestureDirection.Right) {
                xOffset = (xOffset + 1) % rocketGlyph.width
            }

            if (offset !== xOffset) {
                device.displayGlyph(rocketGlyph.translate(xOffset, yOffset), {
                    transition: DisplayTransition.Immediate,
                })
            }
        })

        // Reset rotation
        device.on('select', () => {
            xOffset = 0
            yOffset = 0

            device.rotation = 0
            device.displayGlyph(rocketGlyph, {
                transition: DisplayTransition.CrossFade,
            })
        })
    }
}

import { bootstrap } from '../utils'
import { SwipeGestureDirection } from '../../src/model/swipe-gesture-direction';

// Boot strap async function
bootstrap(main)