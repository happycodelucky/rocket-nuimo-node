import { DeviceDiscoveryManager, NuimoDevice, LEDBitmapTransitionEffect, LEDBitmap, linkBitmap } from '../'

const manager = DeviceDiscoveryManager.defaultManager

export const bitmap = LEDBitmap.fromBitmapString([
    '   *     ',
    '   **    ',
    '   ***   ',
    '   ****  ',
    '   ***** ',
    '   ****  ',
    '   ***   ',
    '   **    ',
    '   *     ',
])

async function main() {
    console.log('Starting discovery...')
    const session = manager.startDiscoverySession({
        timeout: 30 * 60
    })

    try {
        console.log('Waiting for device...')
        const device = await session.waitForFirstDevice()
        console.log('Connecting...')
        await device.connect()

        setInterval(() => {
            device.displayBitmap(bitmap, {
                transitionEffect: LEDBitmapTransitionEffect.CrossFade
            })
        }, 1000)
    } catch (err) {
        console.error(`${err.message}`)
    }
}

main()
