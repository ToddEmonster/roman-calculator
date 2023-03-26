import { InvalidRomanNumberError } from './errors/InvalidRomanNumber';

/* 
There are some rules to a Roman number:

+ Numerals can be concatenated to form a larger numeral (“XX” + “II” = “XXII”)
+ If a lesser numeral is put before a bigger it means subtraction of the lesser from the bigger (“IV” means four, “CM” means ninehundred)
+ If the numeral is I, X or C you can’t have more than three (“II” + “II” = “IV”)
+ If the numeral is V, L or D you can’t have more than one (“D” + “D” = “M”)
*/

/**
 * Couvre aussi le cas "chaîne de caractères vide"
 */
const validRomanSymbolsRegex = new RegExp("^[IVXLCDM]+$", "i");
const invalidMoreThanThreeRegex = new RegExp("(?:I{4,}|X{4,}|C{4,})"); // TOCHECK
const invalidMoreThanOneRegex = new RegExp("(?:V{2,}|L{2,}|D{2,})"); // TOCHECK


/**
 * TODOC
 * @param romanNumber a Roman number
 */
export function isValidRomanNumber(romanNumber: string): boolean {
    if (!validRomanSymbolsRegex.test(romanNumber) || 
        invalidMoreThanThreeRegex.test(romanNumber) || 
        invalidMoreThanOneRegex.test(romanNumber) )
        return false;

    return true;
}

export function isSmallerThan(symbol1: string, symbol2: string) : boolean {
    return RomanSymbol[symbol1] < RomanSymbol[symbol2];
}

export function convertRomanNumberToArabic(romanNumber: string): number {
    // try catch
    if (!isValidRomanNumber(romanNumber)) {
        throw new InvalidRomanNumberError(romanNumber);
    }

    let result = 0;
    for (let i=0; i < romanNumber.length; i++) {
        const currentSymbol = romanNumber[i];
        const nextSymbol = romanNumber[i+1];

        // Group with digit smaller than the next one means substraction
        result += isSmallerThan(currentSymbol,nextSymbol) 
            ? -RomanSymbol[currentSymbol]
            : RomanSymbol[currentSymbol];
    }

    return result;
}

// TODO ArabicToRoman
export function convertArabicNumberToRoman(arabicNumber: number): string {

    
    return "";
}
