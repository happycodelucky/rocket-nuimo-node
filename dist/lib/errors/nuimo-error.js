"use strict";
/**
 * @module nuimo-connect
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic error message for all Nuimo errors
 */
class NuimoError extends Error {
    /**
     * @param message - error message
     * @param name - name given to the error
     */
    constructor(message, name = 'NuimoError') {
        super(message);
        // Correct prototype overridden by Error
        Reflect.setPrototypeOf(this, new.target.prototype);
        this.name = name;
    }
}
exports.NuimoError = NuimoError;
//# sourceMappingURL=nuimo-error.js.map