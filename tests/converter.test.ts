import { convertRomanNumberToArabic, getRomanNotationByDigitColumn, convertArabicNumberToRoman } from '../src/converter';
import { DigitColumn } from '../src/digit-column';
import { InvalidRomanNumberError } from '../src/errors/InvalidRomanNumberError';
import { ReachMaxRomanNumberError } from '../src/errors/ReachMaxRomanNumberError';

/* --- ROMAN -> ARABIC Conversion */

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

/* --- ARABIC -> ROMAN Conversion */

/* UNITS */
test('Must convert 1 of UNITS to "I" (1)', () => {
    expect(getRomanNotationByDigitColumn(1, DigitColumn.UNITS)).toBe('I');
})

test('Must convert 2 of UNITS to "II" (2)', () => {
    expect(getRomanNotationByDigitColumn(2, DigitColumn.UNITS)).toBe('II');
})

test('Must convert 4 of UNITS to "IV" (4)', () => {
    expect(getRomanNotationByDigitColumn(4, DigitColumn.UNITS)).toBe('IV');
})

test('Must convert 5 of UNITS to "V" (5)', () => {
    expect(getRomanNotationByDigitColumn(5, DigitColumn.UNITS)).toBe('V');
})

test('Must convert 7 of UNITS to "VII" (7)', () => {
    expect(getRomanNotationByDigitColumn(7, DigitColumn.UNITS)).toBe('VII');
})

test('Must convert 9 of UNITS to "IV" (9)', () => {
    expect(getRomanNotationByDigitColumn(9, DigitColumn.UNITS)).toBe('IX');
})

/* TENS */

test('Must convert 1 of TENS to "X" (10)', () => {
    expect(getRomanNotationByDigitColumn(1,  DigitColumn.TENS)).toBe('X');
})

test('Must convert 2 of TENS to "XX" (20)', () => {
    expect(getRomanNotationByDigitColumn(2, DigitColumn.TENS)).toBe('XX');
})

test('Must convert 4 of TENS to "XL" (40)', () => {
    expect(getRomanNotationByDigitColumn(4, DigitColumn.TENS)).toBe('XL');
})

test('Must convert 5 of TENS to "L" (50)', () => {
    expect(getRomanNotationByDigitColumn(5, DigitColumn.TENS)).toBe('L');
})

test('Must convert 8 of TENS to "LXXX" (80)', () => {
    expect(getRomanNotationByDigitColumn(8, DigitColumn.TENS)).toBe('LXXX');
})

test('Must convert 9 of TENS to "XC" (90)', () => {
    expect(getRomanNotationByDigitColumn(9, DigitColumn.TENS)).toBe('XC');
})

/* HUNDREDS */

test('Must convert 1 oF HUNDREDS to "C" (100)', () => {
    expect(getRomanNotationByDigitColumn(1, DigitColumn.HUNDREDS)).toBe('C');
})

test('Must convert 3 of HUNDREDS to "CCC" (300)', () => {
    expect(getRomanNotationByDigitColumn(3, DigitColumn.HUNDREDS)).toBe('CCC');
})

test('Must convert 4 of HUNDREDS to "CD" (400)', () => {
    expect(getRomanNotationByDigitColumn(4, DigitColumn.HUNDREDS)).toBe('CD');
})

test('Must convert 5 of HUNDREDS to "D" (500)', () => {
    expect(getRomanNotationByDigitColumn(5, DigitColumn.HUNDREDS)).toBe('D');
})

test('Must convert 7 of HUNDREDS to "DCC" (700)', () => {
    expect(getRomanNotationByDigitColumn(7, DigitColumn.HUNDREDS)).toBe('DCC');
})

test('Must convert 9 of HUNDREDS to "CM" (900)', () => {
    expect(getRomanNotationByDigitColumn(9, DigitColumn.HUNDREDS)).toBe('CM');
})

/* THOUSANDS */

test('Must convert 1 of THOUSANDS to "M" (1000)', () => {
    expect(getRomanNotationByDigitColumn(1, DigitColumn.THOUSANDS)).toBe('M');
})

test('Must convert 3 of THOUSANDS to "MMM" (3000)', () => {
    expect(getRomanNotationByDigitColumn(3, DigitColumn.THOUSANDS)).toBe('MMM');
})

test('Must not be able to convert 4 of  THOUSANDS (4000))', () => {
    expect(() => {
        getRomanNotationByDigitColumn(4, DigitColumn.THOUSANDS)
    }).toThrow(new ReachMaxRomanNumberError("4000"));
})


/* Full numbers */

test('Must convert 1 to "I"', () => {
    expect(convertArabicNumberToRoman(1)).toBe('I');
})

test('Must convert 3999 to "MMMCMXCIX"', () => {
    expect(convertArabicNumberToRoman(3999)).toBe('MMMCMXCIX');
})

test('Must convert 1444 to "MCDXLIV"', () => {
    expect(convertArabicNumberToRoman(1444)).toBe('MCDXLIV');
})

test('Must not be able to convert 4000 or more )', () => {
    expect(() => {
        convertArabicNumberToRoman(4000)
    }).toThrow(new ReachMaxRomanNumberError("4000"));
})
