import { DeviceDiscoveryManager } from '../../discovery/discovery'

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
            console.log()

            console.log('DEVICE INFO:')
            console.log(`ID:      ${device.id}`)
            console.log(`RSSI:    ${device.rssi}`)
            console.log(`BATTERY: ${device.batteryLevel}`)

            device.on('rssi', (rssi: number) => {
                console.log(`RSSI changed to ${rssi}`)
            })
        }
    } catch (err) {
        console.error(`${err.message}`)
    }
}

main()