import { NuimoDevice } from '../model/nuimo-device'
import { NuimoError } from '../errors/nuimo-error'

/**
 * Callback for device discovery events
 */
export interface NuimoOnEventCallback {
    (): void
}

/**
 * Callback for device discovery events
 */
export interface NuimoOnDeviceDiscoveredCallback {
    /**
     * @param device - Device discovered
     * @param newDevice - Indicates if this is a new device or one that has been discovered before, found prior to a disconnect
     */
    (device: NuimoDevice, newDevice: boolean): void
}

/**
 * Callback for all error events
 */
export interface NuimoOnErrorCallback {
    /**
     * @param error - Evented error
     */
    (error: NuimoError): void
}

/**
 * Callback for all discovery session done events
 */
export interface NuimoOnDiscoveryDoneCallback {
    /**
     * @param timedOut - Indicates if a discovery session timed out
     */
    (timedOut: boolean): void
}