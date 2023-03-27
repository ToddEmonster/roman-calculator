import { RomanSymbol } from './roman-symbol';

/* Constants */
export const validRomanSymbolsRegex = new RegExp("^[IVXLCDM]+$", "i"); // Also checks that the string is not empty 
export const invalidMoreThanThreeRegex = new RegExp("(?:I{4,}|X{4,}|C{4,}|M{4,})"); // TOCHECK
export const invalidMoreThanOneRegex = new RegExp("(?:V{2,}|L{2,}|D{2,})"); // TOCHECK

/**
 * Checks if a string is a valid Roman number with regex. It must comply with the following rules :
 * + It can only contain the following characters (case-sensitive) : I,V,X,L,C,D,M
 * + Inside the string, for the symbols I, X, C or M you can't have more than three numerals of each in a row (ex: “IIII” is prohibited)
 * + Inside the string, for the symbols V, L or D you can't have more than three one of each in a row (ex: “DD” is prohibited)
 * @param romanNumber a Roman number
 */
export function isValidRomanNumber(romanNumber: string): boolean {
    return validRomanSymbolsRegex.test(romanNumber) &&
        !invalidMoreThanThreeRegex.test(romanNumber) &&
        !invalidMoreThanOneRegex.test(romanNumber);
}

/**
 * Checks if a first Roman symbol is smaller than a second one.
 * @param firstSymbol   first Roman symbol to compare
 * @param secondSymbol   second Roman symbol to compare
 */
export function isFirstRomanSymbolSmallerThanSecond(firstSymbol: string, secondSymbol: string) : boolean {
    return RomanSymbol[firstSymbol] < RomanSymbol[secondSymbol];
}

/**
 * Returns the value of a specific digit column (units, tens, hundreds or thousands) from an Arabic number.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit of interest
 */
export function getSpecificDigitFromArabicNumber(arabicNumber: number, digitColumn: number): number {
    return Math.floor( arabicNumber%(digitColumn*10) / digitColumn);
}