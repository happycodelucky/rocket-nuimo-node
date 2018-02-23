"use strict";
/**
 * @module nuimo-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
const nuimo_error_1 = require("./nuimo-error");
/**
 * Error code for connection class errors for a device
 */
var DeviceCommunicationErrorCode;
(function (DeviceCommunicationErrorCode) {
    DeviceCommunicationErrorCode["Unknown"] = "unknown";
    DeviceCommunicationErrorCode["NotAvailable"] = "notAvailable";
    DeviceCommunicationErrorCode["NotConnectable"] = "notConnectable";
    DeviceCommunicationErrorCode["NotReady"] = "notReady";
    DeviceCommunicationErrorCode["ConnectionTimeout"] = "timeout";
    DeviceCommunicationErrorCode["Disconnected"] = "disconnected";
    DeviceCommunicationErrorCode["Bluetooth"] = "bluetooth";
})(DeviceCommunicationErrorCode = exports.DeviceCommunicationErrorCode || (exports.DeviceCommunicationErrorCode = {}));
/**
 * Class of error related to device communication errors with a known device
 */
class DeviceCommunicationError extends nuimo_error_1.NuimoError {
    /**
     * @param code - connection error code
     * @param id - device ID for the connection error
     */
    constructor(code, id, message) {
        super(deviceCommunicatioErrorMessage(code, id, message), 'DeviceCommunicationErrorCode');
        this.code = code;
        this.id = id;
    }
}
exports.DeviceCommunicationError = DeviceCommunicationError;
//
// Private functions
//
/**
 * Helper function for generating connection error messages
 * @param code - connection error code
 * @param id - device ID for the connection error
 * @param message - optional error mesage
 */
function deviceCommunicatioErrorMessage(code, id, message) {
    switch (code) {
        case DeviceCommunicationErrorCode.Bluetooth:
            if (message) {
                return `Bluetooth error on device ${id}: ${message}`;
            }
            return `Unknown bluetooth error on device ${id}`;
        case DeviceCommunicationErrorCode.ConnectionTimeout:
            if (message) {
                return `Connection timeout on device ${id}: ${message}`;
            }
            return `Connection timeout on device ${id}`;
        case DeviceCommunicationErrorCode.Disconnected:
            return `Device ${id} disconnected`;
        case DeviceCommunicationErrorCode.NotAvailable:
            return `Device ${id} is not available`;
        case DeviceCommunicationErrorCode.NotConnectable:
            return `Device ${id} cannot be connected to`;
        case DeviceCommunicationErrorCode.NotReady:
            return `Communication with device ${id} is not yet ready`;
        case DeviceCommunicationErrorCode.Unknown:
            return `Unknown error on device ${id}`;
    }
}
//# sourceMappingURL=device-communication-error.js.map