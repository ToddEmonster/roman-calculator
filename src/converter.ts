import { InvalidRomanNumberError } from './errors/InvalidRomanNumberError';
import { ReachMaxRomanNumberError } from './errors/ReachMaxRomanNumberError';
import { DigitColumn, digitColumnsValues } from './digit-column';
import { RomanSymbol } from './roman-symbol';
import { 
    getSpecificDigitFromArabicNumber,
    isValidRomanNumber, 
    isFirstRomanSymbolSmallerThanSecond,
    ROMAN_NOTATION_LIMIT
} from './utils';

/**
 * Converts the value of an Arabic number as a Roman number following the specific digit column : units, tens, hundreds or thousands.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit column of interest : 1 || 10 || 100 || 1000
 */
export function getRomanNotationByDigitColumn(arabicNumber: number, digitColumn: DigitColumn): string {
    let oneSymbol = RomanSymbol[1*digitColumn];
    let fiveSymbol = RomanSymbol[5*digitColumn];
    let nextColumnSymbol = RomanSymbol[10*digitColumn];

    if (digitColumn == DigitColumn.THOUSANDS && arabicNumber > 3) {
        throw new ReachMaxRomanNumberError((arabicNumber*DigitColumn.THOUSANDS).toString());
    }

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

    if (arabicNumber > ROMAN_NOTATION_LIMIT) {
        throw new ReachMaxRomanNumberError(arabicNumber.toString());
    }

    // Reverse to begin conversion with biggest digits
    for (let digitColumn of [...digitColumnsValues].reverse()) {
        const arabicDigit = getSpecificDigitFromArabicNumber(arabicNumber, digitColumn);
        romanNumber += getRomanNotationByDigitColumn(arabicDigit, digitColumn);
    }

    return romanNumber;
}
