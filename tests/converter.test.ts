import { convertRomanNumberToArabic, getRomanNotationByDigitColumn, convertArabicNumberToRoman } from '../src/converter';
import { InvalidRomanNumberError } from '../src/errors/InvalidRomanNumber';

/* ROMAN -> ARABIC Conversion */
test('Must not validate fully incorrect input (A)', () => {
    expect(() => {
        convertRomanNumberToArabic("A")
    }).toThrow(new InvalidRomanNumberError("A"));
})

test('Must not validate partially incorrect input with letters (XA)', () => {
    expect(() => {
        convertRomanNumberToArabic("XA")
    }).toThrow(new InvalidRomanNumberError("XA"));
})


test('Must not validate partially incorrect input with numbers (L8)', () => {
    expect(() => {
        convertRomanNumberToArabic("L8")
    }).toThrow(new InvalidRomanNumberError("L8"));
})

test('Must not validate partially incorrect input with special character (D%)', () => {
    expect(() => {
        convertRomanNumberToArabic("D%")
    }).toThrow(new InvalidRomanNumberError("D%"));
})

test('Must validate correct simple input (I)', () => {
    expect(convertRomanNumberToArabic("I")).toBe(1);
})

test('Must validate correct long input (MMMCMXCIX)', () => {
    expect(convertRomanNumberToArabic("MMMCMXCIX")).toBe(3999);
})

/* TODO Test correct Roman decomposition
"DCCXCIXVV" => ["D", "C", "C", "XC", "IX", "V", "V"] => 799
*/

test('Must validate correct long input (MMMCMXCIX)', () => {
    expect(getRomanNotationByDigitColumn(1, 100)).toBe(3999);
})

// TODO test getRomanNotationByDigitColumn


/* TODO Test convertArabicNumberToRoman */

// TODO : Set special error for number > 4000