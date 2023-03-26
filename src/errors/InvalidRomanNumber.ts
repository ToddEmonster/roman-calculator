export class InvalidRomanNumberError extends Error {
    constructor(msg: string) {
        super('"' + msg + '" is not a valid roman number');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidRomanNumberError.prototype);
    }
}