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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVpbW8tZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvZXJyb3JzL251aW1vLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7QUFFSDs7R0FFRztBQUNILGdCQUF3QixTQUFRLEtBQUs7SUFDakM7OztPQUdHO0lBQ0gsWUFBWSxPQUFlLEVBQUUsT0FBZSxZQUFZO1FBQ3BELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVmLHdDQUF3QztRQUN4QyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQWJELGdDQWFDIn0=