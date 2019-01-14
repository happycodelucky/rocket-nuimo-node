import { DeviceDiscoveryManager, NuimoDevice } from '../src'
import { DEVICE_CONNECT_TIMEOUT_MS } from '../src/defaults'

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Helper function to connect to a device
 */
export async function connectToDevice(onConnect: (device: NuimoDevice) => void) {
    console.log('Starting Numio discovery')
    const session = manager.startDiscoverySession({
        timeout: DEVICE_CONNECT_TIMEOUT_MS,
    })

    console.log('Waiting for device...')
    const device = await session.waitForFirstDevice()

    console.log(`Found device ${device.id}. Connecting...`)
    if (await device.connect()) {
        onConnect(device)
    }
}

/**
 * Async bootstrap
 *
 * @param main - main function
 */
export async function bootstrap(main: () => void) {
    try {
        await main()
    } catch (err) {
        console.error(`Connection error: ${err.message}`)
    }
}