/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/converter.ts":
/*!**************************!*\
  !*** ./src/converter.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertArabicNumberToRoman = exports.convertRomanNumberToArabic = exports.getRomanNotationByDigitColumn = void 0;
const InvalidRomanNumber_1 = __webpack_require__(/*! ./errors/InvalidRomanNumber */ "./src/errors/InvalidRomanNumber.ts");
const roman_symbol_1 = __webpack_require__(/*! ./roman-symbol */ "./src/roman-symbol.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 * Converts the value of an Arabic number as a Roman number following the specific digit column : units, tens, hundreds or thousands.
 * @param arabicNumber  input number (Arabic)
 * @param digitColumn   digit column of interest : 1 || 10 || 100 || 1000
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
exports.getRomanNotationByDigitColumn = getRomanNotationByDigitColumn;
/**
 * Converts Roman number into Arabic notation.
 * Only works up to 3999 (MMMCMXCIX).
 * @param romanNumberInput   input Roman number
 */
function convertRomanNumberToArabic(romanNumberInput) {
    if (!(0, utils_1.isValidRomanNumber)(romanNumberInput)) {
        throw new InvalidRomanNumber_1.InvalidRomanNumberError(romanNumberInput);
    }
    let result = 0;
    for (let i = 0; i < romanNumberInput.length; i++) {
        const currentSymbol = romanNumberInput[i];
        const nextSymbol = romanNumberInput[i + 1];
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
    constructor(input) {
        super('"' + input + '" is not a valid roman number');
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
exports.getSpecificDigitFromArabicNumber = exports.isFirstRomanSymbolSmallerThanSecond = exports.isValidRomanNumber = exports.invalidMoreThanOneRegex = exports.invalidMoreThanThreeRegex = exports.validRomanSymbolsRegex = exports.ROMAN_NOTATION_LIMIT = void 0;
const roman_symbol_1 = __webpack_require__(/*! ./roman-symbol */ "./src/roman-symbol.ts");
exports.ROMAN_NOTATION_LIMIT = 3999;
/* Constants */
// https://regex101.com/r/Xg4x3L/1 (delete : https://regex101.com/delete/pETuAcVIjplUymulU0zXekLV)
exports.validRomanSymbolsRegex = new RegExp('^[IVXLCDM]+$');
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
    ['input', 'onpaste'].forEach((event) => {
        firstNumberDom.addEventListener(event, () => {
            if (firstNumberDom.value.trim().length > 0) {
                if (!(0, utils_1.isValidRomanNumber)(firstNumberDom.value.trim())) {
                    displayErrorMessage(firstNumberDom, 1);
                    firstNumberArabicDom.textContent = "";
                    resultDom.textContent = "";
                    resultArabicDom.textContent = "";
                    button.disabled = true;
                }
                else {
                    removeErrorMessage(1);
                    firstNumberDom.value = firstNumberDom.value.trim();
                    firstNumberArabic = (0, converter_1.convertRomanNumberToArabic)(firstNumberDom.value.trim());
                    firstNumberArabicDom.textContent = firstNumberArabic.toString();
                    button.disabled = !(0, utils_1.isValidRomanNumber)(secondNumberDom.value);
                }
            }
            else {
                firstNumberArabicDom.textContent = "";
                removeErrorMessage(1);
            }
        });
        secondNumberDom.addEventListener(event, () => {
            if (secondNumberDom.value.trim().length > 0) {
                if (!(0, utils_1.isValidRomanNumber)(secondNumberDom.value.trim())) {
                    displayErrorMessage(secondNumberDom, 2);
                    secondNumberArabicDom.textContent = "";
                    resultDom.textContent = "";
                    resultArabicDom.textContent = "";
                    button.disabled = true;
                }
                else {
                    removeErrorMessage(2);
                    secondNumberDom.value = secondNumberDom.value.trim();
                    secondNumberArabic = (0, converter_1.convertRomanNumberToArabic)(secondNumberDom.value);
                    secondNumberArabicDom.textContent = secondNumberArabic.toString();
                    button.disabled = !(0, utils_1.isValidRomanNumber)(firstNumberDom.value);
                }
            }
            else {
                secondNumberArabicDom.textContent = "";
                removeErrorMessage(2);
            }
        });
    });
    // Listen to button click
    button.onclick = (event) => {
        event.preventDefault(); // Preventa auto-reload after one click
        if (!button.disabled) {
            const resultArabic = firstNumberArabic + secondNumberArabic;
            resultArabicDom.textContent = resultArabic.toString();
            if (resultArabic > utils_1.ROMAN_NOTATION_LIMIT) {
                resultDom.textContent = "Sorry, the number cannot be displayed : it is superior to 3999 :/";
            }
            else {
                resultDom.textContent = (0, converter_1.convertArabicNumberToRoman)(resultArabic);
            }
        }
    };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGtDQUFrQyxHQUFHLGtDQUFrQyxHQUFHLHFDQUFxQztBQUMvRyw2QkFBNkIsbUJBQU8sQ0FBQyx1RUFBNkI7QUFDbEUsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DLGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDZCQUE2QjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7Ozs7Ozs7Ozs7O0FDdkVyQjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7Ozs7Ozs7Ozs7O0FDVmxCO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHdDQUF3QyxtQkFBbUIsS0FBSzs7Ozs7Ozs7Ozs7QUNacEQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0NBQXdDLEdBQUcsMkNBQTJDLEdBQUcsMEJBQTBCLEdBQUcsK0JBQStCLEdBQUcsaUNBQWlDLEdBQUcsOEJBQThCLEdBQUcsNEJBQTRCO0FBQ3pQLHVCQUF1QixtQkFBTyxDQUFDLDZDQUFnQjtBQUMvQyw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QixpQ0FBaUMsb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSztBQUMvRSwrQkFBK0Isb0JBQW9CLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7Ozs7Ozs7VUN4Q3hDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekMsZ0JBQWdCLG1CQUFPLENBQUMsK0JBQVM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9jb252ZXJ0ZXIudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9lcnJvcnMvSW52YWxpZFJvbWFuTnVtYmVyLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvcm9tYW4tc3ltYm9sLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbiA9IGV4cG9ydHMuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMgPSBleHBvcnRzLmdldFJvbWFuTm90YXRpb25CeURpZ2l0Q29sdW1uID0gdm9pZCAwO1xuY29uc3QgSW52YWxpZFJvbWFuTnVtYmVyXzEgPSByZXF1aXJlKFwiLi9lcnJvcnMvSW52YWxpZFJvbWFuTnVtYmVyXCIpO1xuY29uc3Qgcm9tYW5fc3ltYm9sXzEgPSByZXF1aXJlKFwiLi9yb21hbi1zeW1ib2xcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIENvbnZlcnRzIHRoZSB2YWx1ZSBvZiBhbiBBcmFiaWMgbnVtYmVyIGFzIGEgUm9tYW4gbnVtYmVyIGZvbGxvd2luZyB0aGUgc3BlY2lmaWMgZGlnaXQgY29sdW1uIDogdW5pdHMsIHRlbnMsIGh1bmRyZWRzIG9yIHRob3VzYW5kcy5cbiAqIEBwYXJhbSBhcmFiaWNOdW1iZXIgIGlucHV0IG51bWJlciAoQXJhYmljKVxuICogQHBhcmFtIGRpZ2l0Q29sdW1uICAgZGlnaXQgY29sdW1uIG9mIGludGVyZXN0IDogMSB8fCAxMCB8fCAxMDAgfHwgMTAwMFxuICovXG5mdW5jdGlvbiBnZXRSb21hbk5vdGF0aW9uQnlEaWdpdENvbHVtbihhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKSB7XG4gICAgbGV0IG9uZVN5bWJvbCA9IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sWzEgKiBkaWdpdENvbHVtbl07XG4gICAgbGV0IGZpdmVTeW1ib2wgPSByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFs1ICogZGlnaXRDb2x1bW5dO1xuICAgIGxldCBuZXh0Q29sdW1uU3ltYm9sID0gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbMTAgKiBkaWdpdENvbHVtbl07XG4gICAgLy8gU2hvdWxkIHRocm93IGVycm9yIGlmIGFyYWJpY051bWJlciA+IDM5OTlcbiAgICBzd2l0Y2ggKGFyYWJpY051bWJlcikge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIG9uZVN5bWJvbC5yZXBlYXQoYXJhYmljTnVtYmVyKTtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgcmV0dXJuIG9uZVN5bWJvbCArIGZpdmVTeW1ib2w7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHJldHVybiBmaXZlU3ltYm9sO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIGZpdmVTeW1ib2wgKyBvbmVTeW1ib2wucmVwZWF0KGFyYWJpY051bWJlciAtIDUpO1xuICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICByZXR1cm4gb25lU3ltYm9sICsgbmV4dENvbHVtblN5bWJvbDtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7IC8vIFRPQ0hFQ0tcbiAgICB9XG59XG5leHBvcnRzLmdldFJvbWFuTm90YXRpb25CeURpZ2l0Q29sdW1uID0gZ2V0Um9tYW5Ob3RhdGlvbkJ5RGlnaXRDb2x1bW47XG4vKipcbiAqIENvbnZlcnRzIFJvbWFuIG51bWJlciBpbnRvIEFyYWJpYyBub3RhdGlvbi5cbiAqIE9ubHkgd29ya3MgdXAgdG8gMzk5OSAoTU1NQ01YQ0lYKS5cbiAqIEBwYXJhbSByb21hbk51bWJlcklucHV0ICAgaW5wdXQgUm9tYW4gbnVtYmVyXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKHJvbWFuTnVtYmVySW5wdXQpIHtcbiAgICBpZiAoISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikocm9tYW5OdW1iZXJJbnB1dCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEludmFsaWRSb21hbk51bWJlcl8xLkludmFsaWRSb21hbk51bWJlckVycm9yKHJvbWFuTnVtYmVySW5wdXQpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvbWFuTnVtYmVySW5wdXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN5bWJvbCA9IHJvbWFuTnVtYmVySW5wdXRbaV07XG4gICAgICAgIGNvbnN0IG5leHRTeW1ib2wgPSByb21hbk51bWJlcklucHV0W2kgKyAxXTtcbiAgICAgICAgLy8gR3JvdXAgd2l0aCBkaWdpdCBzbWFsbGVyIHRoYW4gdGhlIG5leHQgb25lIG1lYW5zIHN1YnN0cmFjdGlvblxuICAgICAgICByZXN1bHQgKz0gKDAsIHV0aWxzXzEuaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQpKGN1cnJlbnRTeW1ib2wsIG5leHRTeW1ib2wpXG4gICAgICAgICAgICA/IC1yb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXVxuICAgICAgICAgICAgOiByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFtjdXJyZW50U3ltYm9sXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMgPSBjb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYztcbi8qKlxuICogQ29udmVydHMgYW4gQXJhYmljIG51bWJlciBpbnRvIFJvbWFuIG5vdGF0aW9uLlxuICogT25seSB3b3JrcyB1cCB0byAzOTk5LlxuICogQHBhcmFtIGFyYWJpY051bWJlciAgaW5wdXQgbnVtYmVyIChBcmFiaWMpXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuKGFyYWJpY051bWJlcikge1xuICAgIGxldCByb21hbk51bWJlciA9IFwiXCI7XG4gICAgZm9yIChsZXQgZGlnaXRDb2x1bW4gPSAxMDAwOyBkaWdpdENvbHVtbiA+PSAxOyBkaWdpdENvbHVtbiAvPSAxMCkge1xuICAgICAgICBjb25zdCBhcmFiaWNEaWdpdCA9ICgwLCB1dGlsc18xLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKShhcmFiaWNOdW1iZXIsIGRpZ2l0Q29sdW1uKTtcbiAgICAgICAgcm9tYW5OdW1iZXIgKz0gZ2V0Um9tYW5Ob3RhdGlvbkJ5RGlnaXRDb2x1bW4oYXJhYmljRGlnaXQsIGRpZ2l0Q29sdW1uKTtcbiAgICB9XG4gICAgcmV0dXJuIHJvbWFuTnVtYmVyO1xufVxuZXhwb3J0cy5jb252ZXJ0QXJhYmljTnVtYmVyVG9Sb21hbiA9IGNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkludmFsaWRSb21hbk51bWJlckVycm9yID0gdm9pZCAwO1xuY2xhc3MgSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICAgICAgc3VwZXIoJ1wiJyArIGlucHV0ICsgJ1wiIGlzIG5vdCBhIHZhbGlkIHJvbWFuIG51bWJlcicpO1xuICAgICAgICAvLyBTZXQgdGhlIHByb3RvdHlwZSBleHBsaWNpdGx5LlxuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IucHJvdG90eXBlKTtcbiAgICB9XG59XG5leHBvcnRzLkludmFsaWRSb21hbk51bWJlckVycm9yID0gSW52YWxpZFJvbWFuTnVtYmVyRXJyb3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUm9tYW5TeW1ib2wgPSB2b2lkIDA7XG52YXIgUm9tYW5TeW1ib2w7XG4oZnVuY3Rpb24gKFJvbWFuU3ltYm9sKSB7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJJXCJdID0gMV0gPSBcIklcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIlZcIl0gPSA1XSA9IFwiVlwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiWFwiXSA9IDEwXSA9IFwiWFwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiTFwiXSA9IDUwXSA9IFwiTFwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiQ1wiXSA9IDEwMF0gPSBcIkNcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIkRcIl0gPSA1MDBdID0gXCJEXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJNXCJdID0gMTAwMF0gPSBcIk1cIjtcbn0pKFJvbWFuU3ltYm9sID0gZXhwb3J0cy5Sb21hblN5bWJvbCB8fCAoZXhwb3J0cy5Sb21hblN5bWJvbCA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXIgPSBleHBvcnRzLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kID0gZXhwb3J0cy5pc1ZhbGlkUm9tYW5OdW1iZXIgPSBleHBvcnRzLmludmFsaWRNb3JlVGhhbk9uZVJlZ2V4ID0gZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5UaHJlZVJlZ2V4ID0gZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4ID0gZXhwb3J0cy5ST01BTl9OT1RBVElPTl9MSU1JVCA9IHZvaWQgMDtcbmNvbnN0IHJvbWFuX3N5bWJvbF8xID0gcmVxdWlyZShcIi4vcm9tYW4tc3ltYm9sXCIpO1xuZXhwb3J0cy5ST01BTl9OT1RBVElPTl9MSU1JVCA9IDM5OTk7XG4vKiBDb25zdGFudHMgKi9cbi8vIGh0dHBzOi8vcmVnZXgxMDEuY29tL3IvWGc0eDNMLzEgKGRlbGV0ZSA6IGh0dHBzOi8vcmVnZXgxMDEuY29tL2RlbGV0ZS9wRVR1QWNWSWpwbFV5bXVsVTB6WGVrTFYpXG5leHBvcnRzLnZhbGlkUm9tYW5TeW1ib2xzUmVnZXggPSBuZXcgUmVnRXhwKCdeW0lWWExDRE1dKyQnKTtcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuVGhyZWVSZWdleCA9IG5ldyBSZWdFeHAoXCIoPzpJezQsfXxYezQsfXxDezQsfXxNezQsfSlcIik7IC8vIFRPQ0hFQ0tcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXggPSBuZXcgUmVnRXhwKFwiKD86VnsyLH18THsyLH18RHsyLH0pXCIpOyAvLyBUT0NIRUNLXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBhIHZhbGlkIFJvbWFuIG51bWJlciB3aXRoIHJlZ2V4LiBJdCBtdXN0IGNvbXBseSB3aXRoIHRoZSBmb2xsb3dpbmcgcnVsZXMgOlxuICogKyBJdCBjYW4gb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyAoY2FzZS1zZW5zaXRpdmUpIDogSSxWLFgsTCxDLEQsTVxuICogKyBJbnNpZGUgdGhlIHN0cmluZywgZm9yIHRoZSBzeW1ib2xzIEksIFgsIEMgb3IgTSB5b3UgY2FuJ3QgaGF2ZSBtb3JlIHRoYW4gdGhyZWUgbnVtZXJhbHMgb2YgZWFjaCBpbiBhIHJvdyAoZXg6IOKAnElJSUnigJ0gaXMgcHJvaGliaXRlZClcbiAqICsgSW5zaWRlIHRoZSBzdHJpbmcsIGZvciB0aGUgc3ltYm9scyBWLCBMIG9yIEQgeW91IGNhbid0IGhhdmUgbW9yZSB0aGFuIHRocmVlIG9uZSBvZiBlYWNoIGluIGEgcm93IChleDog4oCcRETigJ0gaXMgcHJvaGliaXRlZClcbiAqIEBwYXJhbSByb21hbk51bWJlciBhIFJvbWFuIG51bWJlclxuICovXG5mdW5jdGlvbiBpc1ZhbGlkUm9tYW5OdW1iZXIocm9tYW5OdW1iZXIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4LnRlc3Qocm9tYW5OdW1iZXIpICYmXG4gICAgICAgICFleHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXgudGVzdChyb21hbk51bWJlcikgJiZcbiAgICAgICAgIWV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXgudGVzdChyb21hbk51bWJlcik7XG59XG5leHBvcnRzLmlzVmFsaWRSb21hbk51bWJlciA9IGlzVmFsaWRSb21hbk51bWJlcjtcbi8qKlxuICogQ2hlY2tzIGlmIGEgZmlyc3QgUm9tYW4gc3ltYm9sIGlzIHNtYWxsZXIgdGhhbiBhIHNlY29uZCBvbmUuXG4gKiBAcGFyYW0gZmlyc3RTeW1ib2wgICBmaXJzdCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICogQHBhcmFtIHNlY29uZFN5bWJvbCAgIHNlY29uZCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICovXG5mdW5jdGlvbiBpc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZChmaXJzdFN5bWJvbCwgc2Vjb25kU3ltYm9sKSB7XG4gICAgcmV0dXJuIHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW2ZpcnN0U3ltYm9sXSA8IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW3NlY29uZFN5bWJvbF07XG59XG5leHBvcnRzLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kID0gaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQ7XG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgc3BlY2lmaWMgZGlnaXQgY29sdW1uICh1bml0cywgdGVucywgaHVuZHJlZHMgb3IgdGhvdXNhbmRzKSBmcm9tIGFuIEFyYWJpYyBudW1iZXIuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqIEBwYXJhbSBkaWdpdENvbHVtbiAgIGRpZ2l0IG9mIGludGVyZXN0XG4gKi9cbmZ1bmN0aW9uIGdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihhcmFiaWNOdW1iZXIgJSAoZGlnaXRDb2x1bW4gKiAxMCkgLyBkaWdpdENvbHVtbik7XG59XG5leHBvcnRzLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyID0gZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb252ZXJ0ZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnZlcnRlclwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZSBpbiB0aGUgRE9NIGZvciB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gaW5wdXREb21FbGVtZW50ICAgVGhlIGlucHV0IERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcG9zaXRpb24gICAgICAgICAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiBkaXNwbGF5RXJyb3JNZXNzYWdlKGlucHV0RG9tRWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGFuIGVycm9yIG1lc3NhZ2VcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVycm9yIG51bWJlci1cIiArIHBvc2l0aW9uKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAvLyBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgYmVsb3cgdGhlIGlucHV0XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBSb21hbiBOdW1iZXJcIik7XG4gICAgICAgIG51bWJlckVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJywgJ251bWJlci0nICsgcG9zaXRpb24pO1xuICAgICAgICBudW1iZXJFcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChudW1iZXJFcnJvckNvbnRlbnQpO1xuICAgICAgICBpbnB1dERvbUVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmQobnVtYmVyRXJyb3JDb250YWluZXIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlcnJvciBtZXNzYWdlIGluIHRoZSBET00gZm9yIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBwb3NpdGlvbiAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiByZW1vdmVFcnJvck1lc3NhZ2UocG9zaXRpb24pIHtcbiAgICBjb25zdCBwcmVzZW50RXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3IgbnVtYmVyLVwiICsgcG9zaXRpb24pWzBdO1xuICAgIGlmICh0eXBlb2YgcHJlc2VudEVycm9yQ29udGFpbmVyICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICBwcmVzZW50RXJyb3JDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwcmVzZW50RXJyb3JDb250YWluZXIpO1xufVxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgRE9NIEVsZW1lbnRzXG4gICAgY29uc3QgZmlyc3ROdW1iZXJEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0TnVtYmVyXCIpO1xuICAgIGNvbnN0IHNlY29uZE51bWJlckRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IGZpcnN0TnVtYmVyQXJhYmljRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaW50Rmlyc3ROdW1iZXJcIik7XG4gICAgY29uc3Qgc2Vjb25kTnVtYmVyQXJhYmljRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaW50U2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IHJlc3VsdERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0Q29udGVudFwiKTtcbiAgICBjb25zdCByZXN1bHRBcmFiaWNEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpbnRSZXN1bHRcIik7XG4gICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25cIik7XG4gICAgLy8gRGVjbGFyZSB2YXJpYWJsZXNcbiAgICBsZXQgZmlyc3ROdW1iZXJBcmFiaWM7XG4gICAgbGV0IHNlY29uZE51bWJlckFyYWJpYztcbiAgICAvLyBDbGVhbiBpbnB1dHMgYW5kIHJlc3VsdFxuICAgIGZpcnN0TnVtYmVyRG9tLnZhbHVlID0gXCJcIjtcbiAgICBzZWNvbmROdW1iZXJEb20udmFsdWUgPSBcIlwiO1xuICAgIGZpcnN0TnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBzZWNvbmROdW1iZXJBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIHJlc3VsdERvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIC8vIElucHV0IGNoYW5nZXMgbGlzdGVuZXJzXG4gICAgWydpbnB1dCcsICdvbnBhc3RlJ10uZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgZmlyc3ROdW1iZXJEb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGZpcnN0TnVtYmVyRG9tLnZhbHVlLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKGZpcnN0TnVtYmVyRG9tLnZhbHVlLnRyaW0oKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShmaXJzdE51bWJlckRvbSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROdW1iZXJEb20udmFsdWUgPSBmaXJzdE51bWJlckRvbS52YWx1ZS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0TnVtYmVyQXJhYmljID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKShmaXJzdE51bWJlckRvbS52YWx1ZS50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IGZpcnN0TnVtYmVyQXJhYmljLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKHNlY29uZE51bWJlckRvbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3ROdW1iZXJBcmFiaWNEb20udGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNlY29uZE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2Vjb25kTnVtYmVyRG9tLnZhbHVlLnRyaW0oKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKHNlY29uZE51bWJlckRvbS52YWx1ZS50cmltKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2Uoc2Vjb25kTnVtYmVyRG9tLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0QXJhYmljRG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgyKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kTnVtYmVyRG9tLnZhbHVlID0gc2Vjb25kTnVtYmVyRG9tLnZhbHVlLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljKShzZWNvbmROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmROdW1iZXJBcmFiaWNEb20udGV4dENvbnRlbnQgPSBzZWNvbmROdW1iZXJBcmFiaWMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoZmlyc3ROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpY0RvbS50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXJyb3JNZXNzYWdlKDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyBMaXN0ZW4gdG8gYnV0dG9uIGNsaWNrXG4gICAgYnV0dG9uLm9uY2xpY2sgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgLy8gUHJldmVudGEgYXV0by1yZWxvYWQgYWZ0ZXIgb25lIGNsaWNrXG4gICAgICAgIGlmICghYnV0dG9uLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHRBcmFiaWMgPSBmaXJzdE51bWJlckFyYWJpYyArIHNlY29uZE51bWJlckFyYWJpYztcbiAgICAgICAgICAgIHJlc3VsdEFyYWJpY0RvbS50ZXh0Q29udGVudCA9IHJlc3VsdEFyYWJpYy50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdEFyYWJpYyA+IHV0aWxzXzEuUk9NQU5fTk9UQVRJT05fTElNSVQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSBcIlNvcnJ5LCB0aGUgbnVtYmVyIGNhbm5vdCBiZSBkaXNwbGF5ZWQgOiBpdCBpcyBzdXBlcmlvciB0byAzOTk5IDovXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHREb20udGV4dENvbnRlbnQgPSAoMCwgY29udmVydGVyXzEuY29udmVydEFyYWJpY051bWJlclRvUm9tYW4pKHJlc3VsdEFyYWJpYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==