import { sum } from '../src/sum';
import { convertRomanNumberToArabic } from '../src/roman-translator';
import { InvalidRomanNumberError } from '../src/errors/InvalidRomanNumber';

// Sum testing
test('Adds 1 + 2 to equal 3', () => {
    expect(sum(1,2)).toBe(3);
})

/*  TODO Is valid roman number :
- Must be string
- Must be min 1 char
- All char must be one of 7 sympols (regex)
 */

test('Must not validate A', () => {
    expect(() => {
        convertRomanNumberToArabic("A")
    }).toThrow(new InvalidRomanNumberError("A"));
})


/* TODO Test good translation roman -> arabic */

/* TODO Test good translation arabic -> roman */