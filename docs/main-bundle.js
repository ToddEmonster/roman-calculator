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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvY29udmVydGVyLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3IvLi9zcmMvZXJyb3JzL0ludmFsaWRSb21hbk51bWJlci50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL3JvbWFuLXN5bWJvbC50cyIsIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL3V0aWxzLnRzIiwid2VicGFjazovL3JvbWFuLWNhbGN1bGF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcm9tYW4tY2FsY3VsYXRvci8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29udmVydEFyYWJpY051bWJlclRvUm9tYW4gPSBleHBvcnRzLmNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljID0gdm9pZCAwO1xuY29uc3QgSW52YWxpZFJvbWFuTnVtYmVyXzEgPSByZXF1aXJlKFwiLi9lcnJvcnMvSW52YWxpZFJvbWFuTnVtYmVyXCIpO1xuY29uc3Qgcm9tYW5fc3ltYm9sXzEgPSByZXF1aXJlKFwiLi9yb21hbi1zeW1ib2xcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG4vKipcbiAqIENvbnZlcnRzIHRoZSB2YWx1ZSBvZiBhbiBBcmFiaWMgbnVtYmVyIGFzIGEgUm9tYW4gbnVtYmVyIGZvbGxvd2luZyB0aGUgc3BlY2lmaWMgZGlnaXQgY29sdW1uIDogdW5pdHMsIHRlbnMsIGh1bmRyZWRzIG9yIHRob3VzYW5kcy5cbiAqIEBwYXJhbSBhcmFiaWNOdW1iZXIgIGlucHV0IG51bWJlciAoQXJhYmljKVxuICogQHBhcmFtIGRpZ2l0Q29sdW1uICAgZGlnaXQgb2YgaW50ZXJlc3RcbiAqL1xuZnVuY3Rpb24gZ2V0Um9tYW5Ob3RhdGlvbkJ5RGlnaXRDb2x1bW4oYXJhYmljTnVtYmVyLCBkaWdpdENvbHVtbikge1xuICAgIGxldCBvbmVTeW1ib2wgPSByb21hbl9zeW1ib2xfMS5Sb21hblN5bWJvbFsxICogZGlnaXRDb2x1bW5dO1xuICAgIGxldCBmaXZlU3ltYm9sID0gcm9tYW5fc3ltYm9sXzEuUm9tYW5TeW1ib2xbNSAqIGRpZ2l0Q29sdW1uXTtcbiAgICBsZXQgbmV4dENvbHVtblN5bWJvbCA9IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sWzEwICogZGlnaXRDb2x1bW5dO1xuICAgIC8vIFNob3VsZCB0aHJvdyBlcnJvciBpZiBhcmFiaWNOdW1iZXIgPiAzOTk5XG4gICAgc3dpdGNoIChhcmFiaWNOdW1iZXIpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICBjYXNlIDI6XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBvbmVTeW1ib2wucmVwZWF0KGFyYWJpY051bWJlcik7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIHJldHVybiBvbmVTeW1ib2wgKyBmaXZlU3ltYm9sO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gZml2ZVN5bWJvbDtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICBjYXNlIDc6XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIHJldHVybiBmaXZlU3ltYm9sICsgb25lU3ltYm9sLnJlcGVhdChhcmFiaWNOdW1iZXIgLSA1KTtcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIG9uZVN5bWJvbCArIG5leHRDb2x1bW5TeW1ib2w7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcIlwiOyAvLyBUT0NIRUNLXG4gICAgfVxufVxuLyoqXG4gKiBDb252ZXJ0cyBSb21hbiBudW1iZXIgaW50byBBcmFiaWMgbm90YXRpb24uXG4gKiBPbmx5IHdvcmtzIHVwIHRvIDM5OTkgKE1NTUNNWENJWCkuXG4gKiBAcGFyYW0gcm9tYW5OdW1iZXIgICBpbnB1dCBSb21hbiBudW1iZXJcbiAqL1xuZnVuY3Rpb24gY29udmVydFJvbWFuTnVtYmVyVG9BcmFiaWMocm9tYW5OdW1iZXIpIHtcbiAgICBpZiAoISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikocm9tYW5OdW1iZXIpKSB7XG4gICAgICAgIHRocm93IG5ldyBJbnZhbGlkUm9tYW5OdW1iZXJfMS5JbnZhbGlkUm9tYW5OdW1iZXJFcnJvcihyb21hbk51bWJlcik7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm9tYW5OdW1iZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFN5bWJvbCA9IHJvbWFuTnVtYmVyW2ldO1xuICAgICAgICBjb25zdCBuZXh0U3ltYm9sID0gcm9tYW5OdW1iZXJbaSArIDFdO1xuICAgICAgICAvLyBHcm91cCB3aXRoIGRpZ2l0IHNtYWxsZXIgdGhhbiB0aGUgbmV4dCBvbmUgbWVhbnMgc3Vic3RyYWN0aW9uXG4gICAgICAgIHJlc3VsdCArPSAoMCwgdXRpbHNfMS5pc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZCkoY3VycmVudFN5bWJvbCwgbmV4dFN5bWJvbClcbiAgICAgICAgICAgID8gLXJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW2N1cnJlbnRTeW1ib2xdXG4gICAgICAgICAgICA6IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW2N1cnJlbnRTeW1ib2xdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0cy5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYyA9IGNvbnZlcnRSb21hbk51bWJlclRvQXJhYmljO1xuLyoqXG4gKiBDb252ZXJ0cyBhbiBBcmFiaWMgbnVtYmVyIGludG8gUm9tYW4gbm90YXRpb24uXG4gKiBPbmx5IHdvcmtzIHVwIHRvIDM5OTkuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqL1xuZnVuY3Rpb24gY29udmVydEFyYWJpY051bWJlclRvUm9tYW4oYXJhYmljTnVtYmVyKSB7XG4gICAgbGV0IHJvbWFuTnVtYmVyID0gXCJcIjtcbiAgICBmb3IgKGxldCBkaWdpdENvbHVtbiA9IDEwMDA7IGRpZ2l0Q29sdW1uID49IDE7IGRpZ2l0Q29sdW1uIC89IDEwKSB7XG4gICAgICAgIGNvbnN0IGFyYWJpY0RpZ2l0ID0gKDAsIHV0aWxzXzEuZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXIpKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pO1xuICAgICAgICByb21hbk51bWJlciArPSBnZXRSb21hbk5vdGF0aW9uQnlEaWdpdENvbHVtbihhcmFiaWNEaWdpdCwgZGlnaXRDb2x1bW4pO1xuICAgIH1cbiAgICByZXR1cm4gcm9tYW5OdW1iZXI7XG59XG5leHBvcnRzLmNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuID0gY29udmVydEFyYWJpY051bWJlclRvUm9tYW47XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSW52YWxpZFJvbWFuTnVtYmVyRXJyb3IgPSB2b2lkIDA7XG5jbGFzcyBJbnZhbGlkUm9tYW5OdW1iZXJFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3Rvcihtc2cpIHtcbiAgICAgICAgc3VwZXIoJ1wiJyArIG1zZyArICdcIiBpcyBub3QgYSB2YWxpZCByb21hbiBudW1iZXInKTtcbiAgICAgICAgLy8gU2V0IHRoZSBwcm90b3R5cGUgZXhwbGljaXRseS5cbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMsIEludmFsaWRSb21hbk51bWJlckVycm9yLnByb3RvdHlwZSk7XG4gICAgfVxufVxuZXhwb3J0cy5JbnZhbGlkUm9tYW5OdW1iZXJFcnJvciA9IEludmFsaWRSb21hbk51bWJlckVycm9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlJvbWFuU3ltYm9sID0gdm9pZCAwO1xudmFyIFJvbWFuU3ltYm9sO1xuKGZ1bmN0aW9uIChSb21hblN5bWJvbCkge1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiSVwiXSA9IDFdID0gXCJJXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJWXCJdID0gNV0gPSBcIlZcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIlhcIl0gPSAxMF0gPSBcIlhcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIkxcIl0gPSA1MF0gPSBcIkxcIjtcbiAgICBSb21hblN5bWJvbFtSb21hblN5bWJvbFtcIkNcIl0gPSAxMDBdID0gXCJDXCI7XG4gICAgUm9tYW5TeW1ib2xbUm9tYW5TeW1ib2xbXCJEXCJdID0gNTAwXSA9IFwiRFwiO1xuICAgIFJvbWFuU3ltYm9sW1JvbWFuU3ltYm9sW1wiTVwiXSA9IDEwMDBdID0gXCJNXCI7XG59KShSb21hblN5bWJvbCA9IGV4cG9ydHMuUm9tYW5TeW1ib2wgfHwgKGV4cG9ydHMuUm9tYW5TeW1ib2wgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyID0gZXhwb3J0cy5pc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZCA9IGV4cG9ydHMuaXNWYWxpZFJvbWFuTnVtYmVyID0gZXhwb3J0cy5pbnZhbGlkTW9yZVRoYW5PbmVSZWdleCA9IGV4cG9ydHMuaW52YWxpZE1vcmVUaGFuVGhyZWVSZWdleCA9IGV4cG9ydHMudmFsaWRSb21hblN5bWJvbHNSZWdleCA9IHZvaWQgMDtcbmNvbnN0IHJvbWFuX3N5bWJvbF8xID0gcmVxdWlyZShcIi4vcm9tYW4tc3ltYm9sXCIpO1xuLyogQ29uc3RhbnRzICovXG5leHBvcnRzLnZhbGlkUm9tYW5TeW1ib2xzUmVnZXggPSBuZXcgUmVnRXhwKFwiXltJVlhMQ0RNXSskXCIsIFwiaVwiKTsgLy8gQWxzbyBjaGVja3MgdGhhdCB0aGUgc3RyaW5nIGlzIG5vdCBlbXB0eSBcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuVGhyZWVSZWdleCA9IG5ldyBSZWdFeHAoXCIoPzpJezQsfXxYezQsfXxDezQsfXxNezQsfSlcIik7IC8vIFRPQ0hFQ0tcbmV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXggPSBuZXcgUmVnRXhwKFwiKD86VnsyLH18THsyLH18RHsyLH0pXCIpOyAvLyBUT0NIRUNLXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0cmluZyBpcyBhIHZhbGlkIFJvbWFuIG51bWJlciB3aXRoIHJlZ2V4LiBJdCBtdXN0IGNvbXBseSB3aXRoIHRoZSBmb2xsb3dpbmcgcnVsZXMgOlxuICogKyBJdCBjYW4gb25seSBjb250YWluIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVycyAoY2FzZS1zZW5zaXRpdmUpIDogSSxWLFgsTCxDLEQsTVxuICogKyBJbnNpZGUgdGhlIHN0cmluZywgZm9yIHRoZSBzeW1ib2xzIEksIFgsIEMgb3IgTSB5b3UgY2FuJ3QgaGF2ZSBtb3JlIHRoYW4gdGhyZWUgbnVtZXJhbHMgb2YgZWFjaCBpbiBhIHJvdyAoZXg6IOKAnElJSUnigJ0gaXMgcHJvaGliaXRlZClcbiAqICsgSW5zaWRlIHRoZSBzdHJpbmcsIGZvciB0aGUgc3ltYm9scyBWLCBMIG9yIEQgeW91IGNhbid0IGhhdmUgbW9yZSB0aGFuIHRocmVlIG9uZSBvZiBlYWNoIGluIGEgcm93IChleDog4oCcRETigJ0gaXMgcHJvaGliaXRlZClcbiAqIEBwYXJhbSByb21hbk51bWJlciBhIFJvbWFuIG51bWJlclxuICovXG5mdW5jdGlvbiBpc1ZhbGlkUm9tYW5OdW1iZXIocm9tYW5OdW1iZXIpIHtcbiAgICByZXR1cm4gZXhwb3J0cy52YWxpZFJvbWFuU3ltYm9sc1JlZ2V4LnRlc3Qocm9tYW5OdW1iZXIpICYmXG4gICAgICAgICFleHBvcnRzLmludmFsaWRNb3JlVGhhblRocmVlUmVnZXgudGVzdChyb21hbk51bWJlcikgJiZcbiAgICAgICAgIWV4cG9ydHMuaW52YWxpZE1vcmVUaGFuT25lUmVnZXgudGVzdChyb21hbk51bWJlcik7XG59XG5leHBvcnRzLmlzVmFsaWRSb21hbk51bWJlciA9IGlzVmFsaWRSb21hbk51bWJlcjtcbi8qKlxuICogQ2hlY2tzIGlmIGEgZmlyc3QgUm9tYW4gc3ltYm9sIGlzIHNtYWxsZXIgdGhhbiBhIHNlY29uZCBvbmUuXG4gKiBAcGFyYW0gZmlyc3RTeW1ib2wgICBmaXJzdCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICogQHBhcmFtIHNlY29uZFN5bWJvbCAgIHNlY29uZCBSb21hbiBzeW1ib2wgdG8gY29tcGFyZVxuICovXG5mdW5jdGlvbiBpc0ZpcnN0Um9tYW5TeW1ib2xTbWFsbGVyVGhhblNlY29uZChmaXJzdFN5bWJvbCwgc2Vjb25kU3ltYm9sKSB7XG4gICAgcmV0dXJuIHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW2ZpcnN0U3ltYm9sXSA8IHJvbWFuX3N5bWJvbF8xLlJvbWFuU3ltYm9sW3NlY29uZFN5bWJvbF07XG59XG5leHBvcnRzLmlzRmlyc3RSb21hblN5bWJvbFNtYWxsZXJUaGFuU2Vjb25kID0gaXNGaXJzdFJvbWFuU3ltYm9sU21hbGxlclRoYW5TZWNvbmQ7XG4vKipcbiAqIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgc3BlY2lmaWMgZGlnaXQgY29sdW1uICh1bml0cywgdGVucywgaHVuZHJlZHMgb3IgdGhvdXNhbmRzKSBmcm9tIGFuIEFyYWJpYyBudW1iZXIuXG4gKiBAcGFyYW0gYXJhYmljTnVtYmVyICBpbnB1dCBudW1iZXIgKEFyYWJpYylcbiAqIEBwYXJhbSBkaWdpdENvbHVtbiAgIGRpZ2l0IG9mIGludGVyZXN0XG4gKi9cbmZ1bmN0aW9uIGdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyKGFyYWJpY051bWJlciwgZGlnaXRDb2x1bW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihhcmFiaWNOdW1iZXIgJSAoZGlnaXRDb2x1bW4gKiAxMCkgLyBkaWdpdENvbHVtbik7XG59XG5leHBvcnRzLmdldFNwZWNpZmljRGlnaXRGcm9tQXJhYmljTnVtYmVyID0gZ2V0U3BlY2lmaWNEaWdpdEZyb21BcmFiaWNOdW1iZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb252ZXJ0ZXJfMSA9IHJlcXVpcmUoXCIuL2NvbnZlcnRlclwiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbi8qKlxuICogRGlzcGxheXMgYW4gZXJyb3IgbWVzc2FnZSBpbiB0aGUgRE9NIGZvciB0aGUgaW5wdXQuXG4gKiBAcGFyYW0gaW5wdXREb21FbGVtZW50ICAgVGhlIGlucHV0IERPTSBFbGVtZW50XG4gKiBAcGFyYW0gcG9zaXRpb24gICAgICAgICAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiBkaXNwbGF5RXJyb3JNZXNzYWdlKGlucHV0RG9tRWxlbWVudCwgcG9zaXRpb24pIHtcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGFuIGVycm9yIG1lc3NhZ2VcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImVycm9yIG51bWJlci1cIiArIHBvc2l0aW9uKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAvLyBEaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgYmVsb3cgdGhlIGlucHV0XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGNvbnN0IG51bWJlckVycm9yQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiVGhpcyBpcyBub3QgYSB2YWxpZCBSb21hbiBOdW1iZXJcIik7XG4gICAgICAgIG51bWJlckVycm9yQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Vycm9yJywgJ251bWJlci0nICsgcG9zaXRpb24pO1xuICAgICAgICBudW1iZXJFcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChudW1iZXJFcnJvckNvbnRlbnQpO1xuICAgICAgICBpbnB1dERvbUVsZW1lbnQuYWZ0ZXIobnVtYmVyRXJyb3JDb250YWluZXIpO1xuICAgIH1cbn1cbi8qKlxuICogUmVtb3ZlcyBhbiBlcnJvciBtZXNzYWdlIGluIHRoZSBET00gZm9yIHRoZSBpbnB1dC5cbiAqIEBwYXJhbSBwb3NpdGlvbiAgVGhlIHBvc2l0aW9uIG9mIHRoZSBpbnB1dCBpbiB0aGUgbGlzdCBvZiBhbGwgaW5wdXRzIChzdGFydGluZyBhdCAxKVxuICovXG5mdW5jdGlvbiByZW1vdmVFcnJvck1lc3NhZ2UocG9zaXRpb24pIHtcbiAgICBjb25zdCBwcmVzZW50RXJyb3JDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZXJyb3IgbnVtYmVyLVwiICsgcG9zaXRpb24pWzBdO1xuICAgIGlmICh0eXBlb2YgcHJlc2VudEVycm9yQ29udGFpbmVyICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICBwcmVzZW50RXJyb3JDb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChwcmVzZW50RXJyb3JDb250YWluZXIpO1xufVxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgRE9NIEVsZW1lbnRzXG4gICAgY29uc3QgZmlyc3ROdW1iZXJEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0TnVtYmVyXCIpO1xuICAgIGNvbnN0IHNlY29uZE51bWJlckRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IHJlc3VsdERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0Q29udGVudFwiKTtcbiAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKTtcbiAgICAvLyBEZWNsYXJlIHZhcmlhYmxlc1xuICAgIGxldCBmaXJzdE51bWJlckFyYWJpYztcbiAgICBsZXQgc2Vjb25kTnVtYmVyQXJhYmljO1xuICAgIC8vIENsZWFuIGlucHV0cyBhbmQgcmVzdWx0XG4gICAgZmlyc3ROdW1iZXJEb20udmFsdWUgPSBcIlwiO1xuICAgIHNlY29uZE51bWJlckRvbS52YWx1ZSA9IFwiXCI7XG4gICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gXCJcIjtcbiAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgIC8vIElucHV0IGNoYW5nZXMgbGlzdGVuZXJzXG4gICAgZmlyc3ROdW1iZXJEb20uYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgICAgaWYgKCEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKGZpcnN0TnVtYmVyRG9tLnZhbHVlKSkge1xuICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShmaXJzdE51bWJlckRvbSwgMSk7XG4gICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpYyA9IE5hTjtcbiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVFcnJvck1lc3NhZ2UoMSk7XG4gICAgICAgICAgICBmaXJzdE51bWJlckFyYWJpYyA9ICgwLCBjb252ZXJ0ZXJfMS5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYykoZmlyc3ROdW1iZXJEb20udmFsdWUpO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHNlY29uZE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBpZiAoISgwLCB1dGlsc18xLmlzVmFsaWRSb21hbk51bWJlcikoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKSkge1xuICAgICAgICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShzZWNvbmROdW1iZXJEb20sIDIpO1xuICAgICAgICAgICAgc2Vjb25kTnVtYmVyQXJhYmljID0gTmFOO1xuICAgICAgICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlbW92ZUVycm9yTWVzc2FnZSgyKTtcbiAgICAgICAgICAgIHNlY29uZE51bWJlckFyYWJpYyA9ICgwLCBjb252ZXJ0ZXJfMS5jb252ZXJ0Um9tYW5OdW1iZXJUb0FyYWJpYykoc2Vjb25kTnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9ICEoMCwgdXRpbHNfMS5pc1ZhbGlkUm9tYW5OdW1iZXIpKGZpcnN0TnVtYmVyRG9tLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIExpc3RlbiB0byBidXR0b24gY2xpY2tcbiAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFidXR0b24uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdEFyYWJpYyA9IGZpcnN0TnVtYmVyQXJhYmljICsgc2Vjb25kTnVtYmVyQXJhYmljO1xuICAgICAgICAgICAgcmVzdWx0RG9tLnRleHRDb250ZW50ID0gKDAsIGNvbnZlcnRlcl8xLmNvbnZlcnRBcmFiaWNOdW1iZXJUb1JvbWFuKShyZXN1bHRBcmFiaWMpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=