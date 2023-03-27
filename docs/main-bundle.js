/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/converter.ts":
/*!**************************!*\
  !*** ./src/converter.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertArabicNumberToRoman = exports.convertRomanNumberToArabic = void 0;
const InvalidRomanNumber_1 = __webpack_require__(/*! ./errors/InvalidRomanNumber */ "./src/errors/InvalidRomanNumber.ts");
const roman_symbol_1 = __webpack_require__(/*! ./roman-symbol */ "./src/roman-symbol.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 * Converts the value of an Arabic number as a Roman number following the specific digit column : units, tens, hundreds or thousands.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit of interest
 */
function getRomanNotationByDigitColumn(arabicNumber, digitColumn) {
    let oneSymbol = roman_symbol_1.RomanSymbol[1 * digitColumn];
    let fiveSymbol = roman_symbol_1.RomanSymbol[5 * digitColumn];
    let nextColumnSymbol = roman_symbol_1.RomanSymbol[10 * digitColumn];
    // Should throw error if arabicNumber > 3999
    switch (arabicNumber) {
        case 1:
        case 2:
        case 3:
            return oneSymbol.repeat(arabicNumber);
        case 4:
            return oneSymbol + fiveSymbol;
        case 5:
            return fiveSymbol;
        case 6:
        case 7:
        case 8:
            return fiveSymbol + oneSymbol.repeat(arabicNumber - 5);
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
 * @param romanNumber   input Roman number
 */
function convertRomanNumberToArabic(romanNumber) {
    if (!(0, utils_1.isValidRomanNumber)(romanNumber)) {
        throw new InvalidRomanNumber_1.InvalidRomanNumberError(romanNumber);
    }
    let result = 0;
    for (let i = 0; i < romanNumber.length; i++) {
        const currentSymbol = romanNumber[i];
        const nextSymbol = romanNumber[i + 1];
        // Group with digit smaller than the next one means substraction
        result += (0, utils_1.isFirstRomanSymbolSmallerThanSecond)(currentSymbol, nextSymbol)
            ? -roman_symbol_1.RomanSymbol[currentSymbol]
            : roman_symbol_1.RomanSymbol[currentSymbol];
    }
    return result;
}
exports.convertRomanNumberToArabic = convertRomanNumberToArabic;
/**
 * Converts an Arabic number into Roman notation.
 * Only works up to 3999.
 * @param arabicNumber  input number (Arabic)
 */
function convertArabicNumberToRoman(arabicNumber) {
    let romanNumber = "";
    for (let digitColumn = 1000; digitColumn >= 1; digitColumn /= 10) {
        const arabicDigit = (0, utils_1.getSpecificDigitFromArabicNumber)(arabicNumber, digitColumn);
        romanNumber += getRomanNotationByDigitColumn(arabicDigit, digitColumn);
    }
    return romanNumber;
}
exports.convertArabicNumberToRoman = convertArabicNumberToRoman;


/***/ }),

/***/ "./src/errors/InvalidRomanNumber.ts":
/*!******************************************!*\
  !*** ./src/errors/InvalidRomanNumber.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidRomanNumberError = void 0;
class InvalidRomanNumberError extends Error {
    constructor(msg) {
        super('"' + msg + '" is not a valid roman number');
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, InvalidRomanNumberError.prototype);
    }
}
exports.InvalidRomanNumberError = InvalidRomanNumberError;


/***/ }),

/***/ "./src/roman-symbol.ts":
/*!*****************************!*\
  !*** ./src/roman-symbol.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RomanSymbol = void 0;
var RomanSymbol;
(function (RomanSymbol) {
    RomanSymbol[RomanSymbol["I"] = 1] = "I";
    RomanSymbol[RomanSymbol["V"] = 5] = "V";
    RomanSymbol[RomanSymbol["X"] = 10] = "X";
    RomanSymbol[RomanSymbol["L"] = 50] = "L";
    RomanSymbol[RomanSymbol["C"] = 100] = "C";
    RomanSymbol[RomanSymbol["D"] = 500] = "D";
    RomanSymbol[RomanSymbol["M"] = 1000] = "M";
})(RomanSymbol = exports.RomanSymbol || (exports.RomanSymbol = {}));


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSpecificDigitFromArabicNumber = exports.isFirstRomanSymbolSmallerThanSecond = exports.isValidRomanNumber = exports.invalidMoreThanOneRegex = exports.invalidMoreThanThreeRegex = exports.validRomanSymbolsRegex = void 0;
const roman_symbol_1 = __webpack_require__(/*! ./roman-symbol */ "./src/roman-symbol.ts");
/* Constants */
exports.validRomanSymbolsRegex = new RegExp("^[IVXLCDM]+$", "i"); // Also checks that the string is not empty 
exports.invalidMoreThanThreeRegex = new RegExp("(?:I{4,}|X{4,}|C{4,}|M{4,})"); // TOCHECK
exports.invalidMoreThanOneRegex = new RegExp("(?:V{2,}|L{2,}|D{2,})"); // TOCHECK
/**
 * Checks if a string is a valid Roman number with regex. It must comply with the following rules :
 * + It can only contain the following characters (case-sensitive) : I,V,X,L,C,D,M
 * + Inside the string, for the symbols I, X, C or M you can't have more than three numerals of each in a row (ex: “IIII” is prohibited)
 * + Inside the string, for the symbols V, L or D you can't have more than three one of each in a row (ex: “DD” is prohibited)
 * @param romanNumber a Roman number
 */
function isValidRomanNumber(romanNumber) {
    return exports.validRomanSymbolsRegex.test(romanNumber) &&
        !exports.invalidMoreThanThreeRegex.test(romanNumber) &&
        !exports.invalidMoreThanOneRegex.test(romanNumber);
}
exports.isValidRomanNumber = isValidRomanNumber;
/**
 * Checks if a first Roman symbol is smaller than a second one.
 * @param firstSymbol   first Roman symbol to compare
 * @param secondSymbol   second Roman symbol to compare
 */
function isFirstRomanSymbolSmallerThanSecond(firstSymbol, secondSymbol) {
    return roman_symbol_1.RomanSymbol[firstSymbol] < roman_symbol_1.RomanSymbol[secondSymbol];
}
exports.isFirstRomanSymbolSmallerThanSecond = isFirstRomanSymbolSmallerThanSecond;
/**
 * Returns the value of a specific digit column (units, tens, hundreds or thousands) from an Arabic number.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit of interest
 */
function getSpecificDigitFromArabicNumber(arabicNumber, digitColumn) {
    return Math.floor(arabicNumber % (digitColumn * 10) / digitColumn);
}
exports.getSpecificDigitFromArabicNumber = getSpecificDigitFromArabicNumber;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const converter_1 = __webpack_require__(/*! ./converter */ "./src/converter.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 * Displays an error message in the DOM for the input.
 * @param inputDomElement   The input DOM Element
 * @param position          The position of the input in the list of all inputs (starting at 1)
 */
function displayErrorMessage(inputDomElement, position) {
    // Check if there is already an error message
    if (document.getElementsByClassName("error number-" + position).length == 0) {
        // Display an error message below the input
        const numberErrorContainer = document.createElement("p");
        const numberErrorContent = document.createTextNode("This is not a valid Roman Number");
        numberErrorContainer.classList.add('error', 'number-' + position);
        numberErrorContainer.appendChild(numberErrorContent);
        inputDomElement.after(numberErrorContainer);
    }
}
/**
 * Removes an error message in the DOM for the input.
 * @param position  The position of the input in the list of all inputs (starting at 1)
 */
function removeErrorMessage(position) {
    const presentErrorContainer = document.getElementsByClassName("error number-" + position)[0];
    if (typeof presentErrorContainer !== "undefined")
        presentErrorContainer.parentNode.removeChild(presentErrorContainer);
}
window.onload = function () {
    // Get DOM Elements
    const firstNumberDom = document.getElementById("firstNumber");
    const secondNumberDom = document.getElementById("secondNumber");
    const firstNumberArabicDom = document.getElementById("hintFirstNumber");
    const secondNumberArabicDom = document.getElementById("hintSecondNumber");
    const resultDom = document.getElementById("resultContent");
    const resultArabicDom = document.getElementById("hintResult");
    const button = document.getElementById("button");
    // Declare variables
    let firstNumberArabic;
    let secondNumberArabic;
    // Clean inputs and result
    firstNumberDom.value = "";
    secondNumberDom.value = "";
    firstNumberArabicDom.textContent = "";
    secondNumberArabicDom.textContent = "";
    resultDom.textContent = "";
    resultArabicDom.textContent = "";
    button.disabled = true;
    // Input changes listeners
    firstNumberDom.addEventListener("input", () => {
        if (!(0, utils_1.isValidRomanNumber)(firstNumberDom.value)) {
            displayErrorMessage(firstNumberDom, 1);
            firstNumberArabic = NaN;
            firstNumberArabicDom.textContent = "";
            resultDom.textContent = "";
            resultArabicDom.textContent = "";
            button.disabled = true;
        }
        else {
            removeErrorMessage(1);
            firstNumberArabic = (0, converter_1.convertRomanNumberToArabic)(firstNumberDom.value);
            firstNumberArabicDom.textContent = firstNumberArabic.toString();
            button.disabled = !(0, utils_1.isValidRomanNumber)(secondNumberDom.value);
        }
    });
    secondNumberDom.addEventListener("input", () => {
        if (!(0, utils_1.isValidRomanNumber)(secondNumberDom.value)) {
            displayErrorMessage(secondNumberDom, 2);
            secondNumberArabic = NaN;
            secondNumberArabicDom.textContent = "";
            resultDom.textContent = "";
            resultArabicDom.textContent = "";
            button.disabled = true;
        }
        else {
            removeErrorMessage(2);
            secondNumberArabic = (0, converter_1.convertRomanNumberToArabic)(secondNumberDom.value);
            secondNumberArabicDom.textContent = secondNumberArabic.toString();
            button.disabled = !(0, utils_1.isValidRomanNumber)(firstNumberDom.value);
        }
    });
    // Listen to button click
    button.onclick = (event) => {
        event.preventDefault(); // Preventa auto-reload after one click
        if (!button.disabled) {
            const resultArabic = firstNumberArabic + secondNumberArabic;
            resultDom.textContent = (0, converter_1.convertArabicNumberToRoman)(resultArabic);
            resultArabicDom.textContent = resultArabic.toString();
        }
    };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtDQUFrQyxHQUFHLGtDQUFrQztBQUN2RSw2QkFBNkIsbUJBQU8sQ0FBQyx1RUFBNkI7QUFDbEUsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DLGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQzs7Ozs7Ozs7Ozs7QUN0RXJCO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjs7Ozs7Ozs7Ozs7QUNWbEI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDLG1CQUFtQixLQUFLOzs7Ozs7Ozs7OztBQ1pwRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3Q0FBd0MsR0FBRywyQ0FBMkMsR0FBRywwQkFBMEIsR0FBRywrQkFBK0IsR0FBRyxpQ0FBaUMsR0FBRyw4QkFBOEI7QUFDMU4sdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsOEJBQThCLG9DQUFvQztBQUNsRSxpQ0FBaUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSztBQUMvRSwrQkFBK0Isb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7Ozs7Ozs7VUN0Q3hDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekMsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2Vycm9ycy9JbnZhbGlkUm9tYW5OdW1iZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9yb21hbi1zeW1ib2wudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuID0gZXhwb3J0cy5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYyA9IHZvaWQgMDtcbmNvbnN0IEludmFsaWRSb21hbk51bWJlcl8xID0gcmVxdWlyZShcIi4vZXJyb3JzL0ludmFsaWRSb21hbk51bWJlclwiKTtcbmNvbnN0IHJvbWFuX3N5bWJvbF8xID0gcmVxdWlyZShcIi4vcm9tYW4tc3ltYm9sXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdmFsdWUgb2YgYW4gQXJhYmljIG51bWJlciBhcyBhIFJvbWFuIG51bWJlciBmb2xsb3dpbmcgdGhlIHNwZWNpZmljIGRpZ2l0IGNvbHVtbiA6IHVuaXRzLCB0ZW5zLCBodW5kcmVkcyBvciB0aG91c2FuZHMuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqIEBwYXJhbSBkaWdpdENvbHVtbiAgIGRpZ2l0IG9mIGludGVyZXN0XG4gKi9cbmZ1bmN0aW9uIGdldFJvbWFuTm90YXRpb25CeURpZ2l0Q29sdW1uKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pIHtcbiAgICBsZXQgb25lU3ltYm9sID0gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbMSAqIGRpZ2l0Q29sdW1uXTtcbiAgICBsZXQgZml2ZVN5bWJvbCA9IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sWzUgKiBkaWdpdENvbHVtbl07XG4gICAgbGV0IG5leHRDb2x1bW5TeW1ib2wgPSByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFsxMCAqIGRpZ2l0Q29sdW1uXTtcbiAgICAvLyBTaG91bGQgdGhyb3cgZXJyb3IgaWYgYXJhYmljTnVtYmVyID4gMzk5OVxuICAgIHN3aXRjaCAoYXJhYmljTnVtYmVyKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sLnJlcGVhdChhcmFiaWNOdW1iZXIpO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sICsgZml2ZVN5bWJvbDtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIGZpdmVTeW1ib2w7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gZml2ZVN5bWJvbCArIG9uZVN5bWJvbC5yZXBlYXQoYXJhYmljTnVtYmVyIC0gNSk7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBvbmVTeW1ib2wgKyBuZXh0Q29sdW1uU3ltYm9sO1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJcIjsgLy8gVE9DSEVDS1xuICAgIH1cbn1cbi8qKlxuICogQ29udmVydHMgUm9tYW4gbnVtYmVyIGludG8gQXJhYmljIG5vdGF0aW9uLlxuICogT25seSB3b3JrcyB1cCB0byAzOTk5IChNTU1DTVhDSVgpLlxuICogQHBhcmFtIHJvbWFuTnVtYmVyICAgaW5wdXQgUm9tYW4gbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKHJvbWFuTnVtYmVyKSB7XG4gICAgaWYgKCEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKHJvbWFuTnVtYmVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFJvbWFuTnVtYmVyXzEuSW52YWxpZFJvbWFuTnVtYmVyRXJyb3Iocm9tYW5OdW1iZXIpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvbWFuTnVtYmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTeW1ib2wgPSByb21hbk51bWJlcltpXTtcbiAgICAgICAgY29uc3QgbmV4dFN5bWJvbCA9IHJvbWFuTnVtYmVyW2kgKyAxXTtcbiAgICAgICAgLy8gR3JvdXAgd2l0aCBkaWdpdCBzbWFsbGVyIHRoYW4gdGhlIG5leHQgb25lIG1lYW5zIHN1YnN0cmFjdGlvblxuICAgICAgICByZXN1bHQgKz0gKDAsIHV0aWxzXzEuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQpKGN1cnJlbnRTeW1ib2wsIG5leHRTeW1ib2wpXG4gICAgICAgICAgICA/IC1yb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXVxuICAgICAgICAgICAgOiByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMgPSBjb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYztcbi8qKlxuICogQ29udmVydHMgYW4gQXJhYmljIG51bWJlciBpbnRvIFJvbWFuIG5vdGF0aW9uLlxuICogT25seSB3b3JrcyB1cCB0byAzOTk5LlxuICogQHBhcmFtIGFyYWJpY051bWJlciAgaW5wdXQgbnVtYmVyIChBcmFiaWMpXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuKGFyYWJpY051bWJlcikge1xuICAgIGxldCByb21hbk51bWJlciA9IFwiXCI7XG4gICAgZm9yIChsZXQgZGlnaXRDb2x1bW4gPSAxMDAwOyBkaWdpdENvbHVtbiA+PSAxOyBkaWdpdENvbHVtbiAvPSAxMCkge1xuICAgICAgICBjb25zdCBhcmFiaWNEaWdpdCA9ICgwLCB1dGlsc18xLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKShhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKTtcbiAgICAgICAgcm9tYW5OdW1iZXIgKz0gZ2V0Um9tYW5Ob3RhdGlvbkJ5RGlnaXRDb2x1bW4oYXJhYmljRGlnaXQsIGRpZ2l0Q29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvbWFuTnVtYmVyO1xufVxuZXhwb3J0cy5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbiA9IGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWRSb21hbk51bWJlckVycm9yID0gdm9pZCAwO1xuY2xhc3MgSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnKSB7XG4gICAgICAgIHN1cGVyKCdcIicgKyBtc2cgKyAnXCIgaXMgbm90IGEgdmFsaWQgcm9tYW4gbnVtYmVyJyk7XG4gICAgICAgIC8vIFNldCB0aGUgcHJvdG90eXBlIGV4cGxpY2l0bHkuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnZhbGlkUm9tYW5OdW1iZXJFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgPSBJbnZhbGlkUm9tYW5OdW1iZXJFcnJvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Sb21hblN5bWJvbCA9IHZvaWQgMDtcbnZhciBSb21hblN5bWJvbDtcbihmdW5jdGlvbiAoUm9tYW5TeW1ib2wpIHtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIklcIl0gPSAxXSA9IFwiSVwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiVlwiXSA9IDVdID0gXCJWXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJYXCJdID0gMTBdID0gXCJYXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJMXCJdID0gNTBdID0gXCJMXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJDXCJdID0gMTAwXSA9IFwiQ1wiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiRFwiXSA9IDUwMF0gPSBcIkRcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIk1cIl0gPSAxMDAwXSA9IFwiTVwiO1xufSkoUm9tYW5TeW1ib2wgPSBleHBvcnRzLlJvbWFuU3ltYm9sIHx8IChleHBvcnRzLlJvbWFuU3ltYm9sID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlciA9IGV4cG9ydHMuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQgPSBleHBvcnRzLmlzVmFsaWRSb21hbk51bWJlciA9IGV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXggPSBleHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXggPSBleHBvcnRzLnZhbGlkUm9tYW5TeW1ib2xzUmVnZXggPSB2b2lkIDA7XG5jb25zdCByb21hbl9zeW1ib2xfMSA9IHJlcXVpcmUoXCIuL3JvbWFuLXN5bWJvbFwiKTtcbi8qIENvbnN0YW50cyAqL1xuZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bSVZYTENETV0rJFwiLCBcImlcIik7IC8vIEFsc28gY2hlY2tzIHRoYXQgdGhlIHN0cmluZyBpcyBub3QgZW1wdHkgXG5leHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXggPSBuZXcgUmVnRXhwKFwiKD86SXs0LH18WHs0LH18Q3s0LH18TXs0LH0pXCIpOyAvLyBUT0NIRUNLXG5leHBvcnRzLmludmFsaWRNb3JlVGhhbk9uZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIig/OlZ7Mix9fEx7Mix9fER7Mix9KVwiKTsgLy8gVE9DSEVDS1xuLyoqXG4gKiBDaGVja3MgaWYgYSBzdHJpbmcgaXMgYSB2YWxpZCBSb21hbiBudW1iZXIgd2l0aCByZWdleC4gSXQgbXVzdCBjb21wbHkgd2l0aCB0aGUgZm9sbG93aW5nIHJ1bGVzIDpcbiAqICsgSXQgY2FuIG9ubHkgY29udGFpbiB0aGUgZm9sbG93aW5nIGNoYXJhY3RlcnMgKGNhc2Utc2Vuc2l0aXZlKSA6IEksVixYLEwsQyxELE1cbiAqICsgSW5zaWRlIHRoZSBzdHJpbmcsIGZvciB0aGUgc3ltYm9scyBJLCBYLCBDIG9yIE0geW91IGNhbid0IGhhdmUgbW9yZSB0aGFuIHRocmVlIG51bWVyYWxzIG9mIGVhY2ggaW4gYSByb3cgKGV4OiDigJxJSUlJ4oCdIGlzIHByb2hpYml0ZWQpXG4gKiArIEluc2lkZSB0aGUgc3RyaW5nLCBmb3IgdGhlIHN5bWJvbHMgViwgTCBvciBEIHlvdSBjYW4ndCBoYXZlIG1vcmUgdGhhbiB0aHJlZSBvbmUgb2YgZWFjaCBpbiBhIHJvdyAoZXg6IOKAnERE4oCdIGlzIHByb2hpYml0ZWQpXG4gKiBAcGFyYW0gcm9tYW5OdW1iZXIgYSBSb21hbiBudW1iZXJcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZFJvbWFuTnVtYmVyKHJvbWFuTnVtYmVyKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMudmFsaWRSb21hblN5bWJvbHNSZWdleC50ZXN0KHJvbWFuTnVtYmVyKSAmJlxuICAgICAgICAhZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5UaHJlZVJlZ2V4LnRlc3Qocm9tYW5OdW1iZXIpICYmXG4gICAgICAgICFleHBvcnRzLmludmFsaWRNb3JlVGhhbk9uZVJlZ2V4LnRlc3Qocm9tYW5OdW1iZXIpO1xufVxuZXhwb3J0cy5pc1ZhbGlkUm9tYW5OdW1iZXIgPSBpc1ZhbGlkUm9tYW5OdW1iZXI7XG4vKipcbiAqIENoZWNrcyBpZiBhIGZpcnN0IFJvbWFuIHN5bWJvbCBpcyBzbWFsbGVyIHRoYW4gYSBzZWNvbmQgb25lLlxuICogQHBhcmFtIGZpcnN0U3ltYm9sICAgZmlyc3QgUm9tYW4gc3ltYm9sIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSBzZWNvbmRTeW1ib2wgICBzZWNvbmQgUm9tYW4gc3ltYm9sIHRvIGNvbXBhcmVcbiAqL1xuZnVuY3Rpb24gaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQoZmlyc3RTeW1ib2wsIHNlY29uZFN5bWJvbCkge1xuICAgIHJldHVybiByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtmaXJzdFN5bWJvbF0gPCByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtzZWNvbmRTeW1ib2xdO1xufVxuZXhwb3J0cy5pc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZCA9IGlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIHNwZWNpZmljIGRpZ2l0IGNvbHVtbiAodW5pdHMsIHRlbnMsIGh1bmRyZWRzIG9yIHRob3VzYW5kcykgZnJvbSBhbiBBcmFiaWMgbnVtYmVyLlxuICogQHBhcmFtIGFyYWJpY051bWJlciAgaW5wdXQgbnVtYmVyIChBcmFiaWMpXG4gKiBAcGFyYW0gZGlnaXRDb2x1bW4gICBkaWdpdCBvZiBpbnRlcmVzdFxuICovXG5mdW5jdGlvbiBnZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlcihhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoYXJhYmljTnVtYmVyICUgKGRpZ2l0Q29sdW1uICogMTApIC8gZGlnaXRDb2x1bW4pO1xufVxuZXhwb3J0cy5nZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlciA9IGdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29udmVydGVyXzEgPSByZXF1aXJlKFwiLi9jb252ZXJ0ZXJcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIERpc3BsYXlzIGFuIGVycm9yIG1lc3NhZ2UgaW4gdGhlIERPTSBmb3IgdGhlIGlucHV0LlxuICogQHBhcmFtIGlucHV0RG9tRWxlbWVudCAgIFRoZSBpbnB1dCBET00gRWxlbWVudFxuICogQHBhcmFtIHBvc2l0aW9uICAgICAgICAgIFRoZSBwb3NpdGlvbiBvZiB0aGUgaW5wdXQgaW4gdGhlIGxpc3Qgb2YgYWxsIGlucHV0cyAoc3RhcnRpbmcgYXQgMSlcbiAqL1xuZnVuY3Rpb24gZGlzcGxheUVycm9yTWVzc2FnZShpbnB1dERvbUVsZW1lbnQsIHBvc2l0aW9uKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhbiBlcnJvciBtZXNzYWdlXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlcnJvciBudW1iZXItXCIgKyBwb3NpdGlvbikubGVuZ3RoID09IDApIHtcbiAgICAgICAgLy8gRGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIGJlbG93IHRoZSBpbnB1dFxuICAgICAgICBjb25zdCBudW1iZXJFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBjb25zdCBudW1iZXJFcnJvckNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlRoaXMgaXMgbm90IGEgdmFsaWQgUm9tYW4gTnVtYmVyXCIpO1xuICAgICAgICBudW1iZXJFcnJvckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlcnJvcicsICdudW1iZXItJyArIHBvc2l0aW9uKTtcbiAgICAgICAgbnVtYmVyRXJyb3JDb250YWluZXIuYXBwZW5kQ2hpbGQobnVtYmVyRXJyb3JDb250ZW50KTtcbiAgICAgICAgaW5wdXREb21FbGVtZW50LmFmdGVyKG51bWJlckVycm9yQ29udGFpbmVyKTtcbiAgICB9XG59XG4vKipcbiAqIFJlbW92ZXMgYW4gZXJyb3IgbWVzc2FnZSBpbiB0aGUgRE9NIGZvciB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gcG9zaXRpb24gIFRoZSBwb3NpdGlvbiBvZiB0aGUgaW5wdXQgaW4gdGhlIGxpc3Qgb2YgYWxsIGlucHV0cyAoc3RhcnRpbmcgYXQgMSlcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXJyb3JNZXNzYWdlKHBvc2l0aW9uKSB7XG4gICAgY29uc3QgcHJlc2VudEVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVycm9yIG51bWJlci1cIiArIHBvc2l0aW9uKVswXTtcbiAgICBpZiAodHlwZW9mIHByZXNlbnRFcnJvckNvbnRhaW5lciAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgcHJlc2VudEVycm9yQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQocHJlc2VudEVycm9yQ29udGFpbmVyKTtcbn1cbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gR2V0IERPTSBFbGVtZW50c1xuICAgIGNvbnN0IGZpcnN0TnVtYmVyRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaXJzdE51bWJlclwiKTtcbiAgICBjb25zdCBzZWNvbmROdW1iZXJEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY29uZE51bWJlclwiKTtcbiAgICBjb25zdCBmaXJzdE51bWJlckFyYWJpY0RvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGludEZpcnN0TnVtYmVyXCIpO1xuICAgIGNvbnN0IHNlY29uZE51bWJlckFyYWJpY0RvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGludFNlY29uZE51bWJlclwiKTtcbiAgICBjb25zdCByZXN1bHREb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc3VsdENvbnRlbnRcIik7XG4gICAgY29uc3QgcmVzdWx0QXJhYmljRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaW50UmVzdWx0XCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uXCIpO1xuICAgIC8vIERlY2xhcmUgdmFyaWFibGVzXG4gICAgbGV0IGZpcnN0TnVtYmVyQXJhYmljO1xuICAgIGxldCBzZWNvbmROdW1iZXJBcmFiaWM7XG4gICAgLy8gQ2xlYW4gaW5wdXRzIGFuZCByZXN1bHRcbiAgICBmaXJzdE51bWJlckRvbS52YWx1ZSA9IFwiXCI7XG4gICAgc2Vjb25kTnVtYmVyRG9tLnZhbHVlID0gXCJcIjtcbiAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgc2Vjb25kTnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHJlc3VsdEFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAvLyBJbnB1dCBjaGFuZ2VzIGxpc3RlbmVyc1xuICAgIGZpcnN0TnVtYmVyRG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGlmICghKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShmaXJzdE51bWJlckRvbS52YWx1ZSkpIHtcbiAgICAgICAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZmlyc3ROdW1iZXJEb20sIDEpO1xuICAgICAgICAgICAgZmlyc3ROdW1iZXJBcmFiaWMgPSBOYU47XG4gICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVFcnJvck1lc3NhZ2UoMSk7XG4gICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpYyA9ICgwLCBjb252ZXJ0ZXJfMS5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYykoZmlyc3ROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgZmlyc3ROdW1iZXJBcmFiaWNEb20udGV4dENvbnRlbnQgPSBmaXJzdE51bWJlckFyYWJpYy50b1N0cmluZygpO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNlY29uZE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKSkge1xuICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShzZWNvbmROdW1iZXJEb20sIDIpO1xuICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljID0gTmFOO1xuICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgIHJlc3VsdERvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICByZXN1bHRBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgyKTtcbiAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpYyA9ICgwLCBjb252ZXJ0ZXJfMS5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYykoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IHNlY29uZE51bWJlckFyYWJpYy50b1N0cmluZygpO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoZmlyc3ROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gTGlzdGVuIHRvIGJ1dHRvbiBjbGlja1xuICAgIGJ1dHRvbi5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIFByZXZlbnRhIGF1dG8tcmVsb2FkIGFmdGVyIG9uZSBjbGlja1xuICAgICAgICBpZiAoIWJ1dHRvbi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0QXJhYmljID0gZmlyc3ROdW1iZXJBcmFiaWMgKyBzZWNvbmROdW1iZXJBcmFiaWM7XG4gICAgICAgICAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSAoMCwgY29udmVydGVyXzEuY29udmVydEFyYWJpY051bWJlclRvUm9tYW4pKHJlc3VsdEFyYWJpYyk7XG4gICAgICAgICAgICByZXN1bHRBcmFiaWNEb20udGV4dENvbnRlbnQgPSByZXN1bHRBcmFiaWMudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9