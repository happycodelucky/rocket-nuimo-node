/**
 * Generic error message for all Nuimo errors
 */
export class NuimoError extends Error {
    /**
     * @param message - error message
     * @param name - name given to the error
     */
    constructor(message: string, name: string = 'NuimoError') {
        super(message);

        // Correct prototype overridden by Error
        // tslint:disable-next-line:no-unsafe-any
        Reflect.setPrototypeOf(this, new.target.prototype);

        this.name = name;
    }
}