import { DeviceDiscoveryManager, NuimoDevice, NuimoDeviceCommunicationError, NuimoDeviceCommunicationErrorCode } from '../src'
import { DEVICE_DISCOVERY_TIMEOUT_MS } from '../src/defaults'

// Device connection manager
const manager = DeviceDiscoveryManager.defaultManager

/**
 * Helper function to connect to a device
 *
 * @param [deviceId] - specific device to connect to
 */
export async function connectToDevice(deviceId?: string): Promise<NuimoDevice> {
    console.log('Starting Numio discovery')
    const session = manager.startDiscoverySession({
        timeoutMs: DEVICE_DISCOVERY_TIMEOUT_MS,
        deviceIds: deviceId ? [deviceId] : undefined,
    })

    console.log('Waiting for device...')
    const device = await session.waitForFirstDevice()
    console.log(`Found device '${device.id}'`)

    console.log('Connecting...')
    if (await device.connect()) {
        console.log('Connected to Nuimo')

        return device
    }

    // Throw error
    throw new NuimoDeviceCommunicationError(NuimoDeviceCommunicationErrorCode.ConnectionTimeout, device.id)
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