export class InvalidRomanNumberError extends Error {
    constructor(input: string) {
        super('"' + input + '" is not a valid roman number');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidRomanNumberError.prototype);
    }
}