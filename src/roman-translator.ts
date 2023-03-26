import { InvalidRomanNumberError } from './errors/InvalidRomanNumber';

const validRomanSymbolsRegex = new RegExp("^[IVXLCDM]+$", "i"); // Also checks that the string is not empty 
const invalidMoreThanThreeRegex = new RegExp("(?:I{4,}|X{4,}|C{4,}|M{4,})"); // TOCHECK
const invalidMoreThanOneRegex = new RegExp("(?:V{2,}|L{2,}|D{2,})"); // TOCHECK

/**
 * Checks if a string is a valid Roman number with regex. It must comply with the following rules :
 * + It can only contain the following characters (case-sensitive) : I,V,X,L,C,D,M
 * + Inside the string, for the symbols I, X, C or M you can't have more than three numerals of each in a row (ex: “IIII” is prohibited)
 * + Inside the string, for the symbols V, L or D you can't have more than three one of each in a row (ex: “DD” is prohibited)
 * @param romanNumber a Roman number
 */
export function isValidRomanNumber(romanNumber: string): boolean {
    if (!validRomanSymbolsRegex.test(romanNumber) || 
        invalidMoreThanThreeRegex.test(romanNumber) || 
        invalidMoreThanOneRegex.test(romanNumber) )
        return false;

    return true;
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
 * Converts Roman number into Arabic notation.
 * Only works up to 3999 (MMMCMXCIX).
 * @param romanNumber   input Roman number
 */
export function convertRomanNumberToArabic(romanNumber: string): number {
    if (!isValidRomanNumber(romanNumber)) {
        throw new InvalidRomanNumberError(romanNumber);
    }

    let result = 0;
    for (let i=0; i < romanNumber.length; i++) {
        const currentSymbol = romanNumber[i];
        const nextSymbol = romanNumber[i+1];

        // Group with digit smaller than the next one means substraction
        result += isFirstRomanSymbolSmallerThanSecond(currentSymbol,nextSymbol) 
            ? -RomanSymbol[currentSymbol]
            : RomanSymbol[currentSymbol];
    }

    return result;
}

/**
 * Returns the value of a specific digit column (units, tens, hundreds or thousands) from an Arabic number.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit of interest
 */
function getSpecificDigitFromArabicNumber(arabicNumber: number, digitColumn: number): number {
    return Math.floor( arabicNumber%(digitColumn*10) / digitColumn);
}

/**
 * Converts the value of an Arabic number as a Roman number following the specific digit column : units, tens, hundreds or thousands.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit of interest
 */
function getRomanNotationByDigitColumn(arabicNumber: number, digitColumn: number): string {
    let oneSymbol = RomanSymbol[1*digitColumn];
    let fiveSymbol = RomanSymbol[5*digitColumn];
    let nextColumnSymbol = RomanSymbol[10*digitColumn];

    // Should throw error if arabicNumber > 3999
    switch (arabicNumber) {
        case 1:
        case 2:
        case 3:
            return oneSymbol.repeat(arabicNumber);
        case 4:
            return oneSymbol + fiveSymbol;
        case 5:
            return fiveSymbol ;
        case 6:
        case 7:
        case 8:
            return fiveSymbol + oneSymbol.repeat(arabicNumber-5);
        case 9:
            return oneSymbol + nextColumnSymbol;
        case 0:
        default: 
            return ""; // TOCHECK
    }
}

/**
 * Converts an Arabic number into Roman notation.
 * Only works up to 3999.
 * @param arabicNumber  input number (Arabic)
 */
function convertArabicNumberToRoman(arabicNumber: number): string {
    let romanNumber: string = "";

    for (let digitColumn = 1000; digitColumn >= 1 ; digitColumn /= 10) {
        const arabicDigit = getSpecificDigitFromArabicNumber(arabicNumber,digitColumn);
        romanNumber += getRomanNotationByDigitColumn(arabicDigit, digitColumn);
    }

    return romanNumber;
}
