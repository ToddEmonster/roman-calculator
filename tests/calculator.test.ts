import { convertRomanNumberToArabic } from '../src/converter';
import { InvalidRomanNumberError } from '../src/errors/InvalidRomanNumber';

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

/* 
console.log(isSmallerThan("I", "V")); // true
console.log(isSmallerThan("V", "V")); // false 
console.log(isSmallerThan("M", "V")); // false


"DCCXCIXVV" => ["D", "C", "C", "XC", "IX", "V", "V"] => 799

 */

/* TODO Test good translation arabic -> roman */

// TODO : Set special error for number > 4000