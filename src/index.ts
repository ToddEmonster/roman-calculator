import { convertArabicNumberToRoman, convertRomanNumberToArabic } from './converter';
import { isValidRomanNumber } from './utils';

/**
 * Displays an error message in the DOM for the input.
 * @param inputDomElement   The input DOM Element 
 * @param position          The position of the input in the list of all inputs (starting at 1)
 */
function displayErrorMessage(inputDomElement: HTMLInputElement, position: number) {
  // Check if there is already an error message
  if (document.getElementsByClassName("error number-"+position).length == 0) {

    // Display an error message below the input
    const numberErrorContainer = document.createElement("p");
    const numberErrorContent = document.createTextNode("This is not a valid Roman Number");
    numberErrorContainer.classList.add('error', 'number-'+position);
    numberErrorContainer.appendChild(numberErrorContent);

    inputDomElement.after(numberErrorContainer);
  }
}

/**
 * Removes an error message in the DOM for the input.
 * @param position  The position of the input in the list of all inputs (starting at 1)
 */
function removeErrorMessage(position: number) {
  const presentErrorContainer = document.getElementsByClassName("error number-"+position)[0];
  if (typeof presentErrorContainer !== "undefined") 
    presentErrorContainer.parentNode.removeChild(presentErrorContainer);
}

window.onload = function() {

    // Get DOM Elements
    const firstNumberDom = document.getElementById("firstNumber") as HTMLInputElement;
    const secondNumberDom = document.getElementById("secondNumber") as HTMLInputElement;
    const firstNumberArabicDom = document.getElementById("hintFirstNumber");
    const secondNumberArabicDom = document.getElementById("hintSecondNumber");
    const resultDom = document.getElementById("resultContent");
    const resultArabicDom = document.getElementById("hintResult");
    const button = document.getElementById("button")  as HTMLInputElement;
  
    // Declare variables
    let firstNumberArabic: number;
    let secondNumberArabic: number;

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
      if (!isValidRomanNumber(firstNumberDom.value)) {
        displayErrorMessage(firstNumberDom, 1)
        firstNumberArabic = NaN;
        firstNumberArabicDom.textContent = "";
        resultDom.textContent = "";
        resultArabicDom.textContent = "";
        button.disabled = true;
      } else {
        removeErrorMessage(1);
        firstNumberArabic = convertRomanNumberToArabic(firstNumberDom.value);
        firstNumberArabicDom.textContent = firstNumberArabic.toString();
        button.disabled = !isValidRomanNumber(secondNumberDom.value);
      }
    });

    secondNumberDom.addEventListener("input", () => {
        if (!isValidRomanNumber(secondNumberDom.value)) {
          displayErrorMessage(secondNumberDom, 2)
          secondNumberArabic = NaN;
          secondNumberArabicDom.textContent = "";
          resultDom.textContent = "";
          resultArabicDom.textContent = "";
          button.disabled = true;
        } else {
          removeErrorMessage(2);
          secondNumberArabic = convertRomanNumberToArabic(secondNumberDom.value);
          secondNumberArabicDom.textContent = secondNumberArabic.toString();
          button.disabled = !isValidRomanNumber(firstNumberDom.value);
        }
    });

    // Listen to button click
    button.onclick = (event: Event) => {
      event.preventDefault(); // Preventa auto-reload after one click
      if (!button.disabled) {
        const resultArabic: number = firstNumberArabic + secondNumberArabic;
        resultDom.textContent = convertArabicNumberToRoman(resultArabic);
        resultArabicDom.textContent = resultArabic.toString();
      }
    }
}