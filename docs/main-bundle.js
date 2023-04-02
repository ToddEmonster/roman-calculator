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
exports.validRomanSymbolsRegex = new RegExp("^[IVXLCDM]$", "i");
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
        inputDomElement.parentNode.append(numberErrorContainer);
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
        if (firstNumberDom.value.length > 0) {
            if (!(0, utils_1.isValidRomanNumber)(firstNumberDom.value)) {
                displayErrorMessage(firstNumberDom, 1);
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
        }
        else {
            removeErrorMessage(1);
        }
    });
    secondNumberDom.addEventListener("input", () => {
        if (secondNumberDom.value.length > 0) {
            if (!(0, utils_1.isValidRomanNumber)(secondNumberDom.value)) {
                displayErrorMessage(secondNumberDom, 2);
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
        }
        else {
            removeErrorMessage(2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2Vycm9ycy9JbnZhbGlkUm9tYW5OdW1iZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9yb21hbi1zeW1ib2wudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuID0gZXhwb3J0cy5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYyA9IHZvaWQgMDtcbmNvbnN0IEludmFsaWRSb21hbk51bWJlcl8xID0gcmVxdWlyZShcIi4vZXJyb3JzL0ludmFsaWRSb21hbk51bWJlclwiKTtcbmNvbnN0IHJvbWFuX3N5bWJvbF8xID0gcmVxdWlyZShcIi4vcm9tYW4tc3ltYm9sXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBDb252ZXJ0cyB0aGUgdmFsdWUgb2YgYW4gQXJhYmljIG51bWJlciBhcyBhIFJvbWFuIG51bWJlciBmb2xsb3dpbmcgdGhlIHNwZWNpZmljIGRpZ2l0IGNvbHVtbiA6IHVuaXRzLCB0ZW5zLCBodW5kcmVkcyBvciB0aG91c2FuZHMuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqIEBwYXJhbSBkaWdpdENvbHVtbiAgIGRpZ2l0IG9mIGludGVyZXN0XG4gKi9cbmZ1bmN0aW9uIGdldFJvbWFuTm90YXRpb25CeURpZ2l0Q29sdW1uKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pIHtcbiAgICBsZXQgb25lU3ltYm9sID0gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbMSAqIGRpZ2l0Q29sdW1uXTtcbiAgICBsZXQgZml2ZVN5bWJvbCA9IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sWzUgKiBkaWdpdENvbHVtbl07XG4gICAgbGV0IG5leHRDb2x1bW5TeW1ib2wgPSByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFsxMCAqIGRpZ2l0Q29sdW1uXTtcbiAgICAvLyBTaG91bGQgdGhyb3cgZXJyb3IgaWYgYXJhYmljTnVtYmVyID4gMzk5OVxuICAgIHN3aXRjaCAoYXJhYmljTnVtYmVyKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sLnJlcGVhdChhcmFiaWNOdW1iZXIpO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sICsgZml2ZVN5bWJvbDtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIGZpdmVTeW1ib2w7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gZml2ZVN5bWJvbCArIG9uZVN5bWJvbC5yZXBlYXQoYXJhYmljTnVtYmVyIC0gNSk7XG4gICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgIHJldHVybiBvbmVTeW1ib2wgKyBuZXh0Q29sdW1uU3ltYm9sO1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJcIjsgLy8gVE9DSEVDS1xuICAgIH1cbn1cbi8qKlxuICogQ29udmVydHMgUm9tYW4gbnVtYmVyIGludG8gQXJhYmljIG5vdGF0aW9uLlxuICogT25seSB3b3JrcyB1cCB0byAzOTk5IChNTU1DTVhDSVgpLlxuICogQHBhcmFtIHJvbWFuTnVtYmVyICAgaW5wdXQgUm9tYW4gbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKHJvbWFuTnVtYmVyKSB7XG4gICAgaWYgKCEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKHJvbWFuTnVtYmVyKSkge1xuICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFJvbWFuTnVtYmVyXzEuSW52YWxpZFJvbWFuTnVtYmVyRXJyb3Iocm9tYW5OdW1iZXIpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvbWFuTnVtYmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTeW1ib2wgPSByb21hbk51bWJlcltpXTtcbiAgICAgICAgY29uc3QgbmV4dFN5bWJvbCA9IHJvbWFuTnVtYmVyW2kgKyAxXTtcbiAgICAgICAgLy8gR3JvdXAgd2l0aCBkaWdpdCBzbWFsbGVyIHRoYW4gdGhlIG5leHQgb25lIG1lYW5zIHN1YnN0cmFjdGlvblxuICAgICAgICByZXN1bHQgKz0gKDAsIHV0aWxzXzEuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQpKGN1cnJlbnRTeW1ib2wsIG5leHRTeW1ib2wpXG4gICAgICAgICAgICA/IC1yb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXVxuICAgICAgICAgICAgOiByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMgPSBjb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYztcbi8qKlxuICogQ29udmVydHMgYW4gQXJhYmljIG51bWJlciBpbnRvIFJvbWFuIG5vdGF0aW9uLlxuICogT25seSB3b3JrcyB1cCB0byAzOTk5LlxuICogQHBhcmFtIGFyYWJpY051bWJlciAgaW5wdXQgbnVtYmVyIChBcmFiaWMpXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuKGFyYWJpY051bWJlcikge1xuICAgIGxldCByb21hbk51bWJlciA9IFwiXCI7XG4gICAgZm9yIChsZXQgZGlnaXRDb2x1bW4gPSAxMDAwOyBkaWdpdENvbHVtbiA+PSAxOyBkaWdpdENvbHVtbiAvPSAxMCkge1xuICAgICAgICBjb25zdCBhcmFiaWNEaWdpdCA9ICgwLCB1dGlsc18xLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKShhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKTtcbiAgICAgICAgcm9tYW5OdW1iZXIgKz0gZ2V0Um9tYW5Ob3RhdGlvbkJ5RGlnaXRDb2x1bW4oYXJhYmljRGlnaXQsIGRpZ2l0Q29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvbWFuTnVtYmVyO1xufVxuZXhwb3J0cy5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbiA9IGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWRSb21hbk51bWJlckVycm9yID0gdm9pZCAwO1xuY2xhc3MgSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IobXNnKSB7XG4gICAgICAgIHN1cGVyKCdcIicgKyBtc2cgKyAnXCIgaXMgbm90IGEgdmFsaWQgcm9tYW4gbnVtYmVyJyk7XG4gICAgICAgIC8vIFNldCB0aGUgcHJvdG90eXBlIGV4cGxpY2l0bHkuXG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBJbnZhbGlkUm9tYW5OdW1iZXJFcnJvci5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgPSBJbnZhbGlkUm9tYW5OdW1iZXJFcnJvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Sb21hblN5bWJvbCA9IHZvaWQgMDtcbnZhciBSb21hblN5bWJvbDtcbihmdW5jdGlvbiAoUm9tYW5TeW1ib2wpIHtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIklcIl0gPSAxXSA9IFwiSVwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiVlwiXSA9IDVdID0gXCJWXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJYXCJdID0gMTBdID0gXCJYXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJMXCJdID0gNTBdID0gXCJMXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJDXCJdID0gMTAwXSA9IFwiQ1wiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiRFwiXSA9IDUwMF0gPSBcIkRcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIk1cIl0gPSAxMDAwXSA9IFwiTVwiO1xufSkoUm9tYW5TeW1ib2wgPSBleHBvcnRzLlJvbWFuU3ltYm9sIHx8IChleHBvcnRzLlJvbWFuU3ltYm9sID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlciA9IGV4cG9ydHMuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQgPSBleHBvcnRzLmlzVmFsaWRSb21hbk51bWJlciA9IGV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXggPSBleHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXggPSBleHBvcnRzLnZhbGlkUm9tYW5TeW1ib2xzUmVnZXggPSB2b2lkIDA7XG5jb25zdCByb21hbl9zeW1ib2xfMSA9IHJlcXVpcmUoXCIuL3JvbWFuLXN5bWJvbFwiKTtcbi8qIENvbnN0YW50cyAqL1xuZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bSVZYTENETV0kXCIsIFwiaVwiKTtcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuVGhyZWVSZWdleCA9IG5ldyBSZWdFeHAoXCIoPzpJezQsfXxYezQsfXxDezQsfXxNezQsfSlcIik7IC8vIFRPQ0hFQ0tcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXggPSBuZXcgUmVnRXhwKFwiKD86VnsyLH18THsyLH18RHsyLH0pXCIpOyAvLyBUT0NIRUNLXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBhIHZhbGlkIFJvbWFuIG51bWJlciB3aXRoIHJlZ2V4LiBJdCBtdXN0IGNvbXBseSB3aXRoIHRoZSBmb2xsb3dpbmcgcnVsZXMgOlxuICogKyBJdCBjYW4gb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyAoY2FzZS1zZW5zaXRpdmUpIDogSSxWLFgsTCxDLEQsTVxuICogKyBJbnNpZGUgdGhlIHN0cmluZywgZm9yIHRoZSBzeW1ib2xzIEksIFgsIEMgb3IgTSB5b3UgY2FuJ3QgaGF2ZSBtb3JlIHRoYW4gdGhyZWUgbnVtZXJhbHMgb2YgZWFjaCBpbiBhIHJvdyAoZXg6IOKAnElJSUnigJ0gaXMgcHJvaGliaXRlZClcbiAqICsgSW5zaWRlIHRoZSBzdHJpbmcsIGZvciB0aGUgc3ltYm9scyBWLCBMIG9yIEQgeW91IGNhbid0IGhhdmUgbW9yZSB0aGFuIHRocmVlIG9uZSBvZiBlYWNoIGluIGEgcm93IChleDog4oCcRETigJ0gaXMgcHJvaGliaXRlZClcbiAqIEBwYXJhbSByb21hbk51bWJlciBhIFJvbWFuIG51bWJlclxuICovXG5mdW5jdGlvbiBpc1ZhbGlkUm9tYW5OdW1iZXIocm9tYW5OdW1iZXIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4LnRlc3Qocm9tYW5OdW1iZXIpICYmXG4gICAgICAgICFleHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXgudGVzdChyb21hbk51bWJlcikgJiZcbiAgICAgICAgIWV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXgudGVzdChyb21hbk51bWJlcik7XG59XG5leHBvcnRzLmlzVmFsaWRSb21hbk51bWJlciA9IGlzVmFsaWRSb21hbk51bWJlcjtcbi8qKlxuICogQ2hlY2tzIGlmIGEgZmlyc3QgUm9tYW4gc3ltYm9sIGlzIHNtYWxsZXIgdGhhbiBhIHNlY29uZCBvbmUuXG4gKiBAcGFyYW0gZmlyc3RTeW1ib2wgICBmaXJzdCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICogQHBhcmFtIHNlY29uZFN5bWJvbCAgIHNlY29uZCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICovXG5mdW5jdGlvbiBpc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZChmaXJzdFN5bWJvbCwgc2Vjb25kU3ltYm9sKSB7XG4gICAgcmV0dXJuIHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW2ZpcnN0U3ltYm9sXSA8IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW3NlY29uZFN5bWJvbF07XG59XG5leHBvcnRzLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kID0gaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQ7XG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgc3BlY2lmaWMgZGlnaXQgY29sdW1uICh1bml0cywgdGVucywgaHVuZHJlZHMgb3IgdGhvdXNhbmRzKSBmcm9tIGFuIEFyYWJpYyBudW1iZXIuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqIEBwYXJhbSBkaWdpdENvbHVtbiAgIGRpZ2l0IG9mIGludGVyZXN0XG4gKi9cbmZ1bmN0aW9uIGdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihhcmFiaWNOdW1iZXIgJSAoZGlnaXRDb2x1bW4gKiAxMCkgLyBkaWdpdENvbHVtbik7XG59XG5leHBvcnRzLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyID0gZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb252ZXJ0ZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnZlcnRlclwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZSBpbiB0aGUgRE9NIGZvciB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gaW5wdXREb21FbGVtZW50ICAgVGhlIGlucHV0IERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcG9zaXRpb24gICAgICAgICAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiBkaXNwbGF5RXJyb3JNZXNzYWdlKGlucHV0RG9tRWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGFuIGVycm9yIG1lc3NhZ2VcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVycm9yIG51bWJlci1cIiArIHBvc2l0aW9uKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAvLyBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgYmVsb3cgdGhlIGlucHV0XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBSb21hbiBOdW1iZXJcIik7XG4gICAgICAgIG51bWJlckVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJywgJ251bWJlci0nICsgcG9zaXRpb24pO1xuICAgICAgICBudW1iZXJFcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChudW1iZXJFcnJvckNvbnRlbnQpO1xuICAgICAgICBpbnB1dERvbUVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmQobnVtYmVyRXJyb3JDb250YWluZXIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlcnJvciBtZXNzYWdlIGluIHRoZSBET00gZm9yIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBwb3NpdGlvbiAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiByZW1vdmVFcnJvck1lc3NhZ2UocG9zaXRpb24pIHtcbiAgICBjb25zdCBwcmVzZW50RXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3IgbnVtYmVyLVwiICsgcG9zaXRpb24pWzBdO1xuICAgIGlmICh0eXBlb2YgcHJlc2VudEVycm9yQ29udGFpbmVyICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICBwcmVzZW50RXJyb3JDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwcmVzZW50RXJyb3JDb250YWluZXIpO1xufVxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgRE9NIEVsZW1lbnRzXG4gICAgY29uc3QgZmlyc3ROdW1iZXJEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0TnVtYmVyXCIpO1xuICAgIGNvbnN0IHNlY29uZE51bWJlckRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IGZpcnN0TnVtYmVyQXJhYmljRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaW50Rmlyc3ROdW1iZXJcIik7XG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyQXJhYmljRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaW50U2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IHJlc3VsdERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0Q29udGVudFwiKTtcbiAgICBjb25zdCByZXN1bHRBcmFiaWNEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpbnRSZXN1bHRcIik7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25cIik7XG4gICAgLy8gRGVjbGFyZSB2YXJpYWJsZXNcbiAgICBsZXQgZmlyc3ROdW1iZXJBcmFiaWM7XG4gICAgbGV0IHNlY29uZE51bWJlckFyYWJpYztcbiAgICAvLyBDbGVhbiBpbnB1dHMgYW5kIHJlc3VsdFxuICAgIGZpcnN0TnVtYmVyRG9tLnZhbHVlID0gXCJcIjtcbiAgICBzZWNvbmROdW1iZXJEb20udmFsdWUgPSBcIlwiO1xuICAgIGZpcnN0TnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBzZWNvbmROdW1iZXJBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHJlc3VsdERvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIC8vIElucHV0IGNoYW5nZXMgbGlzdGVuZXJzXG4gICAgZmlyc3ROdW1iZXJEb20uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgaWYgKGZpcnN0TnVtYmVyRG9tLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICghKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShmaXJzdE51bWJlckRvbS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGZpcnN0TnVtYmVyRG9tLCAxKTtcbiAgICAgICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXN1bHRBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFcnJvck1lc3NhZ2UoMSk7XG4gICAgICAgICAgICAgICAgZmlyc3ROdW1iZXJBcmFiaWMgPSAoMCwgY29udmVydGVyXzEuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMpKGZpcnN0TnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IGZpcnN0TnVtYmVyQXJhYmljLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgxKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNlY29uZE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoc2Vjb25kTnVtYmVyRG9tLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmICghKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShzZWNvbmROdW1iZXJEb20udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShzZWNvbmROdW1iZXJEb20sIDIpO1xuICAgICAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXN1bHRBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVFcnJvck1lc3NhZ2UoMik7XG4gICAgICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKShzZWNvbmROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IHNlY29uZE51bWJlckFyYWJpYy50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKGZpcnN0TnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgyKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIExpc3RlbiB0byBidXR0b24gY2xpY2tcbiAgICBidXR0b24ub25jbGljayA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBQcmV2ZW50YSBhdXRvLXJlbG9hZCBhZnRlciBvbmUgY2xpY2tcbiAgICAgICAgaWYgKCFidXR0b24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdEFyYWJpYyA9IGZpcnN0TnVtYmVyQXJhYmljICsgc2Vjb25kTnVtYmVyQXJhYmljO1xuICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuKShyZXN1bHRBcmFiaWMpO1xuICAgICAgICAgICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gcmVzdWx0QXJhYmljLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==