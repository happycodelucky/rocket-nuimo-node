import { DeviceDiscoveryManager, LEDBitmap, LEDBitmapTransitionEffect, NuimoDevice } from '../../src'

// Connection timeout 30 seconds
const CONNECT_TIMEOUT = 30 * 60

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Main application entry point
 */
async function main() {
    console.log('Starting discovery')
    const session = manager.startDiscoverySession({
        timeout: CONNECT_TIMEOUT,
    })

    try {
        console.log('Waiting for device...')
        const device = await session.waitForFirstDevice()

        console.log(`Found device ${device.id}. Connecting...`)
        if (await device.connect()) {
            console.log('Connected!')

            // Set our rotation min/max for convenience
            device.minRotation = 0
            device.maxRotation = 1

            // Bind event
            device.on('rotate', handleRotation)
            device.on('rotate.left', handleRotateLeft)
            device.on('rotate.right', handleRotateRight)
        }
    } catch (err) {
        console.error(`${err.message}`)
    }
}

// Rotation direction
let rotationDirection = 0
// Tracked rotation amount
let currentRotation = 0

function handleRotation(delta: number, rotation: number) {
    const calculatedRotation = Math.floor(rotation * 32)

    if (calculatedRotation !== currentRotation) {
        currentRotation = calculatedRotation
        console.log(`Rotation at: ${currentRotation + 1}`)

        // @ts-ignore
        const device: NuimoDevice = this as NuimoDevice
        const bitmap: string[] = []
        bitmap[0] = ''.padEnd(Math.min(currentRotation, 9), '*')
        if (currentRotation >= 8) {
            for (let y = 0; y < Math.min(7, currentRotation - 8); y += 1) {
                bitmap[y + 1] = '*'.padStart(9, ' ')
            }
        }
        if (currentRotation >= 16) {
            bitmap[8]  = ''.padEnd(Math.min(currentRotation - 16, 9), '*')
            bitmap[8] = bitmap[8].padStart(9, ' ')
        }
        if (currentRotation >= 25) {
            for (let y = 0; y < Math.min(7, currentRotation - 25); y += 1) {
                bitmap[7 - y] = `*${bitmap[7 - y].slice(1)}`
            }
        }

        device.displayBitmap(LEDBitmap.fromBitmapString(bitmap), {
            transitionEffect: LEDBitmapTransitionEffect.Immediate,
        })
    }
}

function handleRotateLeft() {
    if (rotationDirection >= 0) {
        rotationDirection = -1
        console.log('Rotation LEFT now')
    }
}

function handleRotateRight() {
    if (rotationDirection <= 0) {
        rotationDirection = 1
        console.log('Rotation RIGHT now')
    }
}

main()