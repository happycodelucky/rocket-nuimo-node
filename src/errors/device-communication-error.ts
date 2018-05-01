import { NuimoError } from './nuimo-error'

/**
 * Error code for connection class errors for a device
 */
export enum DeviceCommunicationErrorCode {
    Unknown             = 'unknown',
    NotAvailable        = 'notAvailable',
    NotConnectable      = 'notConnectable',
    NotReady            = 'notReady',
    ConnectionTimeout   = 'timeout',
    Disconnected        = 'disconnected',
    Bluetooth           = 'bluetooth',
}

/**
 * Class of error related to device communication errors with a known device
 */
export class DeviceCommunicationError extends NuimoError {
    /**
     * Device error code
     */
    readonly code: DeviceCommunicationErrorCode
    /**
     * Device identifier
     */
    readonly id: string

    /**
     * @param code - connection error code
     * @param id - device ID for the connection error
     */
    constructor(code: DeviceCommunicationErrorCode, id: string, message?: string) {
        super(deviceCommunicatioErrorMessage(code, id, message), 'DeviceCommunicationErrorCode')

        this.code = code
        this.id = id
    }
}

//
// Private functions
//

/**
 * Helper function for generating connection error messages
 * @param code - connection error code
 * @param id - device ID for the connection error
 * @param message - optional error mesage
 */
function deviceCommunicatioErrorMessage(code: DeviceCommunicationErrorCode, id: string, message?: string) {
    switch (code) {
        case DeviceCommunicationErrorCode.Bluetooth:
            if (message) {
                return `Bluetooth error on device ${id}: ${message}`
            }

            return `Unknown bluetooth error on device ${id}`
        case DeviceCommunicationErrorCode.ConnectionTimeout:
            if (message) {
                return `Connection timeout on device ${id}: ${message}`
            }

            return `Connection timeout on device ${id}`
        case DeviceCommunicationErrorCode.Disconnected:
            return `Device ${id} disconnected`
        case DeviceCommunicationErrorCode.NotAvailable:
            return `Device ${id} is not available`
        case DeviceCommunicationErrorCode.NotConnectable:
            return `Device ${id} cannot be connected to`
        case DeviceCommunicationErrorCode.NotReady:
            return `Communication with device ${id} is not yet ready`
        case DeviceCommunicationErrorCode.Unknown:
            return `Unknown error on device ${id}`
    }
}