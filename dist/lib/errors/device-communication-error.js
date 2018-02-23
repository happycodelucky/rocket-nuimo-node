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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2aWNlLWNvbW11bmljYXRpb24tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZXJyb3JzL2RldmljZS1jb21tdW5pY2F0aW9uLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSCwrQ0FBMEM7QUFFMUM7O0dBRUc7QUFDSCxJQUFZLDRCQVFYO0FBUkQsV0FBWSw0QkFBNEI7SUFDcEMsbURBQStCLENBQUE7SUFDL0IsNkRBQW9DLENBQUE7SUFDcEMsaUVBQXNDLENBQUE7SUFDdEMscURBQWdDLENBQUE7SUFDaEMsNkRBQStCLENBQUE7SUFDL0IsNkRBQW9DLENBQUE7SUFDcEMsdURBQWlDLENBQUE7QUFDckMsQ0FBQyxFQVJXLDRCQUE0QixHQUE1QixvQ0FBNEIsS0FBNUIsb0NBQTRCLFFBUXZDO0FBRUQ7O0dBRUc7QUFDSCw4QkFBc0MsU0FBUSx3QkFBVTtJQVVwRDs7O09BR0c7SUFDSCxZQUFZLElBQWtDLEVBQUUsRUFBVSxFQUFFLE9BQWdCO1FBQ3hFLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLDhCQUE4QixDQUFDLENBQUE7UUFFeEYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7SUFDaEIsQ0FBQztDQUNKO0FBcEJELDREQW9CQztBQUVELEVBQUU7QUFDRixvQkFBb0I7QUFDcEIsRUFBRTtBQUVGOzs7OztHQUtHO0FBQ0gsd0NBQXdDLElBQWtDLEVBQUUsRUFBVSxFQUFFLE9BQWdCO0lBQ3BHLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVixLQUFLLDRCQUE0QixDQUFDLFNBQVM7WUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQTtZQUN4RCxDQUFDO1lBQ0QsTUFBTSxDQUFDLHFDQUFxQyxFQUFFLEVBQUUsQ0FBQTtRQUVwRCxLQUFLLDRCQUE0QixDQUFDLGlCQUFpQjtZQUMvQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLE9BQU8sRUFBRSxDQUFBO1lBQzNELENBQUM7WUFDRCxNQUFNLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxDQUFBO1FBRS9DLEtBQUssNEJBQTRCLENBQUMsWUFBWTtZQUMxQyxNQUFNLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQTtRQUV0QyxLQUFLLDRCQUE0QixDQUFDLFlBQVk7WUFDMUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxtQkFBbUIsQ0FBQTtRQUUxQyxLQUFLLDRCQUE0QixDQUFDLGNBQWM7WUFDNUMsTUFBTSxDQUFDLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQTtRQUVoRCxLQUFLLDRCQUE0QixDQUFDLFFBQVE7WUFDdEMsTUFBTSxDQUFDLDZCQUE2QixFQUFFLG1CQUFtQixDQUFBO1FBRTdELEtBQUssNEJBQTRCLENBQUMsT0FBTztZQUNyQyxNQUFNLENBQUMsMkJBQTJCLEVBQUUsRUFBRSxDQUFBO0lBQzlDLENBQUM7QUFDTCxDQUFDIn0=