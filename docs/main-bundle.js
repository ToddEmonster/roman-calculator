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
    const button = document.getElementById("button");
    // Declare variables
    let firstNumberArabic;
    let secondNumberArabic;
    // Clean inputs and result
    firstNumberDom.value = "";
    secondNumberDom.value = "";
    resultDom.textContent = "";
    button.disabled = true;
    // Input changes listeners
    firstNumberDom.addEventListener("input", () => {
        if (!(0, utils_1.isValidRomanNumber)(firstNumberDom.value)) {
            displayErrorMessage(firstNumberDom, 1);
            firstNumberArabic = NaN;
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
    button.onclick = () => {
        if (!button.disabled) {
            const resultArabic = firstNumberArabic + secondNumberArabic;
            resultDom.textContent = (0, converter_1.convertArabicNumberToRoman)(resultArabic);
        }
    };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtDQUFrQyxHQUFHLGtDQUFrQztBQUN2RSw2QkFBNkIsbUJBQU8sQ0FBQyx1RUFBNkI7QUFDbEUsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DLGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQzs7Ozs7Ozs7Ozs7QUN0RXJCO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjs7Ozs7Ozs7Ozs7QUNWbEI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDLG1CQUFtQixLQUFLOzs7Ozs7Ozs7OztBQ1pwRDtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3Q0FBd0MsR0FBRywyQ0FBMkMsR0FBRywwQkFBMEIsR0FBRywrQkFBK0IsR0FBRyxpQ0FBaUMsR0FBRyw4QkFBOEI7QUFDMU4sdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DO0FBQ0EsOEJBQThCLG9DQUFvQztBQUNsRSxpQ0FBaUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSztBQUMvRSwrQkFBK0Isb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7Ozs7Ozs7VUN0Q3hDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekMsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9jb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9lcnJvcnMvSW52YWxpZFJvbWFuTnVtYmVyLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvcm9tYW4tc3ltYm9sLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbiA9IGV4cG9ydHMuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMgPSB2b2lkIDA7XG5jb25zdCBJbnZhbGlkUm9tYW5OdW1iZXJfMSA9IHJlcXVpcmUoXCIuL2Vycm9ycy9JbnZhbGlkUm9tYW5OdW1iZXJcIik7XG5jb25zdCByb21hbl9zeW1ib2xfMSA9IHJlcXVpcmUoXCIuL3JvbWFuLXN5bWJvbFwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogQ29udmVydHMgdGhlIHZhbHVlIG9mIGFuIEFyYWJpYyBudW1iZXIgYXMgYSBSb21hbiBudW1iZXIgZm9sbG93aW5nIHRoZSBzcGVjaWZpYyBkaWdpdCBjb2x1bW4gOiB1bml0cywgdGVucywgaHVuZHJlZHMgb3IgdGhvdXNhbmRzLlxuICogQHBhcmFtIGFyYWJpY051bWJlciAgaW5wdXQgbnVtYmVyIChBcmFiaWMpXG4gKiBAcGFyYW0gZGlnaXRDb2x1bW4gICBkaWdpdCBvZiBpbnRlcmVzdFxuICovXG5mdW5jdGlvbiBnZXRSb21hbk5vdGF0aW9uQnlEaWdpdENvbHVtbihhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKSB7XG4gICAgbGV0IG9uZVN5bWJvbCA9IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sWzEgKiBkaWdpdENvbHVtbl07XG4gICAgbGV0IGZpdmVTeW1ib2wgPSByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFs1ICogZGlnaXRDb2x1bW5dO1xuICAgIGxldCBuZXh0Q29sdW1uU3ltYm9sID0gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbMTAgKiBkaWdpdENvbHVtbl07XG4gICAgLy8gU2hvdWxkIHRocm93IGVycm9yIGlmIGFyYWJpY051bWJlciA+IDM5OTlcbiAgICBzd2l0Y2ggKGFyYWJpY051bWJlcikge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIG9uZVN5bWJvbC5yZXBlYXQoYXJhYmljTnVtYmVyKTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIG9uZVN5bWJvbCArIGZpdmVTeW1ib2w7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHJldHVybiBmaXZlU3ltYm9sO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIGZpdmVTeW1ib2wgKyBvbmVTeW1ib2wucmVwZWF0KGFyYWJpY051bWJlciAtIDUpO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sICsgbmV4dENvbHVtblN5bWJvbDtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7IC8vIFRPQ0hFQ0tcbiAgICB9XG59XG4vKipcbiAqIENvbnZlcnRzIFJvbWFuIG51bWJlciBpbnRvIEFyYWJpYyBub3RhdGlvbi5cbiAqIE9ubHkgd29ya3MgdXAgdG8gMzk5OSAoTU1NQ01YQ0lYKS5cbiAqIEBwYXJhbSByb21hbk51bWJlciAgIGlucHV0IFJvbWFuIG51bWJlclxuICovXG5mdW5jdGlvbiBjb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYyhyb21hbk51bWJlcikge1xuICAgIGlmICghKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShyb21hbk51bWJlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSb21hbk51bWJlcl8xLkludmFsaWRSb21hbk51bWJlckVycm9yKHJvbWFuTnVtYmVyKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb21hbk51bWJlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U3ltYm9sID0gcm9tYW5OdW1iZXJbaV07XG4gICAgICAgIGNvbnN0IG5leHRTeW1ib2wgPSByb21hbk51bWJlcltpICsgMV07XG4gICAgICAgIC8vIEdyb3VwIHdpdGggZGlnaXQgc21hbGxlciB0aGFuIHRoZSBuZXh0IG9uZSBtZWFucyBzdWJzdHJhY3Rpb25cbiAgICAgICAgcmVzdWx0ICs9ICgwLCB1dGlsc18xLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kKShjdXJyZW50U3ltYm9sLCBuZXh0U3ltYm9sKVxuICAgICAgICAgICAgPyAtcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbY3VycmVudFN5bWJvbF1cbiAgICAgICAgICAgIDogcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbY3VycmVudFN5bWJvbF07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljID0gY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWM7XG4vKipcbiAqIENvbnZlcnRzIGFuIEFyYWJpYyBudW1iZXIgaW50byBSb21hbiBub3RhdGlvbi5cbiAqIE9ubHkgd29ya3MgdXAgdG8gMzk5OS5cbiAqIEBwYXJhbSBhcmFiaWNOdW1iZXIgIGlucHV0IG51bWJlciAoQXJhYmljKVxuICovXG5mdW5jdGlvbiBjb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbihhcmFiaWNOdW1iZXIpIHtcbiAgICBsZXQgcm9tYW5OdW1iZXIgPSBcIlwiO1xuICAgIGZvciAobGV0IGRpZ2l0Q29sdW1uID0gMTAwMDsgZGlnaXRDb2x1bW4gPj0gMTsgZGlnaXRDb2x1bW4gLz0gMTApIHtcbiAgICAgICAgY29uc3QgYXJhYmljRGlnaXQgPSAoMCwgdXRpbHNfMS5nZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlcikoYXJhYmljTnVtYmVyLCBkaWdpdENvbHVtbik7XG4gICAgICAgIHJvbWFuTnVtYmVyICs9IGdldFJvbWFuTm90YXRpb25CeURpZ2l0Q29sdW1uKGFyYWJpY0RpZ2l0LCBkaWdpdENvbHVtbik7XG4gICAgfVxuICAgIHJldHVybiByb21hbk51bWJlcjtcbn1cbmV4cG9ydHMuY29udmVydEFyYWJpY051bWJlclRvUm9tYW4gPSBjb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5JbnZhbGlkUm9tYW5OdW1iZXJFcnJvciA9IHZvaWQgMDtcbmNsYXNzIEludmFsaWRSb21hbk51bWJlckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKG1zZykge1xuICAgICAgICBzdXBlcignXCInICsgbXNnICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHJvbWFuIG51bWJlcicpO1xuICAgICAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBleHBsaWNpdGx5LlxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG5leHBvcnRzLkludmFsaWRSb21hbk51bWJlckVycm9yID0gSW52YWxpZFJvbWFuTnVtYmVyRXJyb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUm9tYW5TeW1ib2wgPSB2b2lkIDA7XG52YXIgUm9tYW5TeW1ib2w7XG4oZnVuY3Rpb24gKFJvbWFuU3ltYm9sKSB7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJJXCJdID0gMV0gPSBcIklcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIlZcIl0gPSA1XSA9IFwiVlwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiWFwiXSA9IDEwXSA9IFwiWFwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiTFwiXSA9IDUwXSA9IFwiTFwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiQ1wiXSA9IDEwMF0gPSBcIkNcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIkRcIl0gPSA1MDBdID0gXCJEXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJNXCJdID0gMTAwMF0gPSBcIk1cIjtcbn0pKFJvbWFuU3ltYm9sID0gZXhwb3J0cy5Sb21hblN5bWJvbCB8fCAoZXhwb3J0cy5Sb21hblN5bWJvbCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXIgPSBleHBvcnRzLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kID0gZXhwb3J0cy5pc1ZhbGlkUm9tYW5OdW1iZXIgPSBleHBvcnRzLmludmFsaWRNb3JlVGhhbk9uZVJlZ2V4ID0gZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5UaHJlZVJlZ2V4ID0gZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4ID0gdm9pZCAwO1xuY29uc3Qgcm9tYW5fc3ltYm9sXzEgPSByZXF1aXJlKFwiLi9yb21hbi1zeW1ib2xcIik7XG4vKiBDb25zdGFudHMgKi9cbmV4cG9ydHMudmFsaWRSb21hblN5bWJvbHNSZWdleCA9IG5ldyBSZWdFeHAoXCJeW0lWWExDRE1dKyRcIiwgXCJpXCIpOyAvLyBBbHNvIGNoZWNrcyB0aGF0IHRoZSBzdHJpbmcgaXMgbm90IGVtcHR5IFxuZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5UaHJlZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIig/Okl7NCx9fFh7NCx9fEN7NCx9fE17NCx9KVwiKTsgLy8gVE9DSEVDS1xuZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5PbmVSZWdleCA9IG5ldyBSZWdFeHAoXCIoPzpWezIsfXxMezIsfXxEezIsfSlcIik7IC8vIFRPQ0hFQ0tcbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RyaW5nIGlzIGEgdmFsaWQgUm9tYW4gbnVtYmVyIHdpdGggcmVnZXguIEl0IG11c3QgY29tcGx5IHdpdGggdGhlIGZvbGxvd2luZyBydWxlcyA6XG4gKiArIEl0IGNhbiBvbmx5IGNvbnRhaW4gdGhlIGZvbGxvd2luZyBjaGFyYWN0ZXJzIChjYXNlLXNlbnNpdGl2ZSkgOiBJLFYsWCxMLEMsRCxNXG4gKiArIEluc2lkZSB0aGUgc3RyaW5nLCBmb3IgdGhlIHN5bWJvbHMgSSwgWCwgQyBvciBNIHlvdSBjYW4ndCBoYXZlIG1vcmUgdGhhbiB0aHJlZSBudW1lcmFscyBvZiBlYWNoIGluIGEgcm93IChleDog4oCcSUlJSeKAnSBpcyBwcm9oaWJpdGVkKVxuICogKyBJbnNpZGUgdGhlIHN0cmluZywgZm9yIHRoZSBzeW1ib2xzIFYsIEwgb3IgRCB5b3UgY2FuJ3QgaGF2ZSBtb3JlIHRoYW4gdGhyZWUgb25lIG9mIGVhY2ggaW4gYSByb3cgKGV4OiDigJxEROKAnSBpcyBwcm9oaWJpdGVkKVxuICogQHBhcmFtIHJvbWFuTnVtYmVyIGEgUm9tYW4gbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRSb21hbk51bWJlcihyb21hbk51bWJlcikge1xuICAgIHJldHVybiBleHBvcnRzLnZhbGlkUm9tYW5TeW1ib2xzUmVnZXgudGVzdChyb21hbk51bWJlcikgJiZcbiAgICAgICAgIWV4cG9ydHMuaW52YWxpZE1vcmVUaGFuVGhyZWVSZWdleC50ZXN0KHJvbWFuTnVtYmVyKSAmJlxuICAgICAgICAhZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5PbmVSZWdleC50ZXN0KHJvbWFuTnVtYmVyKTtcbn1cbmV4cG9ydHMuaXNWYWxpZFJvbWFuTnVtYmVyID0gaXNWYWxpZFJvbWFuTnVtYmVyO1xuLyoqXG4gKiBDaGVja3MgaWYgYSBmaXJzdCBSb21hbiBzeW1ib2wgaXMgc21hbGxlciB0aGFuIGEgc2Vjb25kIG9uZS5cbiAqIEBwYXJhbSBmaXJzdFN5bWJvbCAgIGZpcnN0IFJvbWFuIHN5bWJvbCB0byBjb21wYXJlXG4gKiBAcGFyYW0gc2Vjb25kU3ltYm9sICAgc2Vjb25kIFJvbWFuIHN5bWJvbCB0byBjb21wYXJlXG4gKi9cbmZ1bmN0aW9uIGlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kKGZpcnN0U3ltYm9sLCBzZWNvbmRTeW1ib2wpIHtcbiAgICByZXR1cm4gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbZmlyc3RTeW1ib2xdIDwgcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbc2Vjb25kU3ltYm9sXTtcbn1cbmV4cG9ydHMuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQgPSBpc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZDtcbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgb2YgYSBzcGVjaWZpYyBkaWdpdCBjb2x1bW4gKHVuaXRzLCB0ZW5zLCBodW5kcmVkcyBvciB0aG91c2FuZHMpIGZyb20gYW4gQXJhYmljIG51bWJlci5cbiAqIEBwYXJhbSBhcmFiaWNOdW1iZXIgIGlucHV0IG51bWJlciAoQXJhYmljKVxuICogQHBhcmFtIGRpZ2l0Q29sdW1uICAgZGlnaXQgb2YgaW50ZXJlc3RcbiAqL1xuZnVuY3Rpb24gZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXIoYXJhYmljTnVtYmVyLCBkaWdpdENvbHVtbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKGFyYWJpY051bWJlciAlIChkaWdpdENvbHVtbiAqIDEwKSAvIGRpZ2l0Q29sdW1uKTtcbn1cbmV4cG9ydHMuZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXIgPSBnZXRTcGVjaWZpY0RpZ2l0RnJvbUFyYWJpY051bWJlcjtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbnZlcnRlcl8xID0gcmVxdWlyZShcIi4vY29udmVydGVyXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuLyoqXG4gKiBEaXNwbGF5cyBhbiBlcnJvciBtZXNzYWdlIGluIHRoZSBET00gZm9yIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBpbnB1dERvbUVsZW1lbnQgICBUaGUgaW5wdXQgRE9NIEVsZW1lbnRcbiAqIEBwYXJhbSBwb3NpdGlvbiAgICAgICAgICBUaGUgcG9zaXRpb24gb2YgdGhlIGlucHV0IGluIHRoZSBsaXN0IG9mIGFsbCBpbnB1dHMgKHN0YXJ0aW5nIGF0IDEpXG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlFcnJvck1lc3NhZ2UoaW5wdXREb21FbGVtZW50LCBwb3NpdGlvbikge1xuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYW4gZXJyb3IgbWVzc2FnZVxuICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3IgbnVtYmVyLVwiICsgcG9zaXRpb24pLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIC8vIERpc3BsYXkgYW4gZXJyb3IgbWVzc2FnZSBiZWxvdyB0aGUgaW5wdXRcbiAgICAgICAgY29uc3QgbnVtYmVyRXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgY29uc3QgbnVtYmVyRXJyb3JDb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJUaGlzIGlzIG5vdCBhIHZhbGlkIFJvbWFuIE51bWJlclwiKTtcbiAgICAgICAgbnVtYmVyRXJyb3JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXJyb3InLCAnbnVtYmVyLScgKyBwb3NpdGlvbik7XG4gICAgICAgIG51bWJlckVycm9yQ29udGFpbmVyLmFwcGVuZENoaWxkKG51bWJlckVycm9yQ29udGVudCk7XG4gICAgICAgIGlucHV0RG9tRWxlbWVudC5hZnRlcihudW1iZXJFcnJvckNvbnRhaW5lcik7XG4gICAgfVxufVxuLyoqXG4gKiBSZW1vdmVzIGFuIGVycm9yIG1lc3NhZ2UgaW4gdGhlIERPTSBmb3IgdGhlIGlucHV0LlxuICogQHBhcmFtIHBvc2l0aW9uICBUaGUgcG9zaXRpb24gb2YgdGhlIGlucHV0IGluIHRoZSBsaXN0IG9mIGFsbCBpbnB1dHMgKHN0YXJ0aW5nIGF0IDEpXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUVycm9yTWVzc2FnZShwb3NpdGlvbikge1xuICAgIGNvbnN0IHByZXNlbnRFcnJvckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlcnJvciBudW1iZXItXCIgKyBwb3NpdGlvbilbMF07XG4gICAgaWYgKHR5cGVvZiBwcmVzZW50RXJyb3JDb250YWluZXIgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHByZXNlbnRFcnJvckNvbnRhaW5lci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHByZXNlbnRFcnJvckNvbnRhaW5lcik7XG59XG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIEdldCBET00gRWxlbWVudHNcbiAgICBjb25zdCBmaXJzdE51bWJlckRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlyc3ROdW1iZXJcIik7XG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWNvbmROdW1iZXJcIik7XG4gICAgY29uc3QgZmlyc3ROdW1iZXJBcmFiaWNEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpbnRGaXJzdE51bWJlclwiKTtcbiAgICBjb25zdCBzZWNvbmROdW1iZXJBcmFiaWNEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpbnRTZWNvbmROdW1iZXJcIik7XG4gICAgY29uc3QgcmVzdWx0RG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bHRDb250ZW50XCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uXCIpO1xuICAgIC8vIERlY2xhcmUgdmFyaWFibGVzXG4gICAgbGV0IGZpcnN0TnVtYmVyQXJhYmljO1xuICAgIGxldCBzZWNvbmROdW1iZXJBcmFiaWM7XG4gICAgLy8gQ2xlYW4gaW5wdXRzIGFuZCByZXN1bHRcbiAgICBmaXJzdE51bWJlckRvbS52YWx1ZSA9IFwiXCI7XG4gICAgc2Vjb25kTnVtYmVyRG9tLnZhbHVlID0gXCJcIjtcbiAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgLy8gSW5wdXQgY2hhbmdlcyBsaXN0ZW5lcnNcbiAgICBmaXJzdE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoZmlyc3ROdW1iZXJEb20udmFsdWUpKSB7XG4gICAgICAgICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGZpcnN0TnVtYmVyRG9tLCAxKTtcbiAgICAgICAgICAgIGZpcnN0TnVtYmVyQXJhYmljID0gTmFOO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgxKTtcbiAgICAgICAgICAgIGZpcnN0TnVtYmVyQXJhYmljID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKShmaXJzdE51bWJlckRvbS52YWx1ZSk7XG4gICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IGZpcnN0TnVtYmVyQXJhYmljLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShzZWNvbmROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgc2Vjb25kTnVtYmVyRG9tLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICAgIGlmICghKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShzZWNvbmROdW1iZXJEb20udmFsdWUpKSB7XG4gICAgICAgICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKHNlY29uZE51bWJlckRvbSwgMik7XG4gICAgICAgICAgICBzZWNvbmROdW1iZXJBcmFiaWMgPSBOYU47XG4gICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlRXJyb3JNZXNzYWdlKDIpO1xuICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKShzZWNvbmROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gc2Vjb25kTnVtYmVyQXJhYmljLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBidXR0b24uZGlzYWJsZWQgPSAhKDAsIHV0aWxzXzEuaXNWYWxpZFJvbWFuTnVtYmVyKShmaXJzdE51bWJlckRvbS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGNsaWNrXG4gICAgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgIGlmICghYnV0dG9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRBcmFiaWMgPSBmaXJzdE51bWJlckFyYWJpYyArIHNlY29uZE51bWJlckFyYWJpYztcbiAgICAgICAgICAgIHJlc3VsdERvbS50ZXh0Q29udGVudCA9ICgwLCBjb252ZXJ0ZXJfMS5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbikocmVzdWx0QXJhYmljKTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9