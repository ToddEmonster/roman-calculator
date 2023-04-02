import { InvalidRomanNumberError } from './errors/InvalidRomanNumber';
import { RomanSymbol } from './roman-symbol';
import { isValidRomanNumber, isFirstRomanSymbolSmallerThanSecond, getSpecificDigitFromArabicNumber } from './utils';

/**
 * Converts the value of an Arabic number as a Roman number following the specific digit column : units, tens, hundreds or thousands.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit column of interest : 1 || 10 || 100 || 1000
 */
export function getRomanNotationByDigitColumn(arabicNumber: number, digitColumn: number): string {
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
 * Converts Roman number into Arabic notation.
 * Only works up to 3999 (MMMCMXCIX).
 * @param romanNumberInput   input Roman number
 */
export function convertRomanNumberToArabic(romanNumberInput: string): number {
    if (!isValidRomanNumber(romanNumberInput)) {
        throw new InvalidRomanNumberError(romanNumberInput);
    }

    let result = 0;
    for (let i=0; i < romanNumberInput.length; i++) {
        const currentSymbol = romanNumberInput[i];
        const nextSymbol = romanNumberInput[i+1];

        // Group with digit smaller than the next one means substraction
        result += isFirstRomanSymbolSmallerThanSecond(currentSymbol,nextSymbol) 
            ? -RomanSymbol[currentSymbol]
            : RomanSymbol[currentSymbol];
    }

    return result;
}

/**
 * Converts an Arabic number into Roman notation.
 * Only works up to 3999.
 * @param arabicNumber  input number (Arabic)
 */
export function convertArabicNumberToRoman(arabicNumber: number): string {
    let romanNumber: string = "";

    for (let digitColumn = 1000; digitColumn >= 1 ; digitColumn /= 10) {
        const arabicDigit = getSpecificDigitFromArabicNumber(arabicNumber,digitColumn);
        romanNumber += getRomanNotationByDigitColumn(arabicDigit, digitColumn);
    }

    return romanNumber;
}
