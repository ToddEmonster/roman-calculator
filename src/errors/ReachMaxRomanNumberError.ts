export class ReachMaxRomanNumberError extends Error {
    constructor(input: string) {
        super('"' + input + '" is superior to 3999. Cannot be converted.');

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ReachMaxRomanNumberError.prototype);
    }
}