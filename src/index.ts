import { isValidRomanNumber } from './utils';

/**
 * Check if the input value is a valid roman number and return a boolean. 
 * Displays an error message if it's invalid
 * @param inputDomElement   The input DOM Element 
 * @param position          The position of the input in the list of all inputs (starting at 1)
 */
function isInputValid(inputDomElement: HTMLInputElement, position: number = 1): boolean {
  if (!isValidRomanNumber(inputDomElement.value)) {
    // Check if there is already an error message
    if (document.getElementsByClassName("error number-"+position).length == 0) {

    // Display an error message below the input
    const numberErrorContainer = document.createElement("p");
    const numberErrorContent = document.createTextNode("This is not a valid Roman Number");
    numberErrorContainer.classList.add('error', 'number-'+position);
    numberErrorContainer.appendChild(numberErrorContent);

    inputDomElement.after(numberErrorContainer);
    }
    return false;
  } else {
    // Remove error message
    const errorContainer = document.getElementsByClassName("error number-"+position)[0];
    if (typeof errorContainer !== "undefined") errorContainer.parentNode.removeChild(errorContainer);

    return true;
  }
}

window.onload = function() {

    // Get DOM Elements
    const firstNumberDom = document.getElementById("firstNumber") as HTMLInputElement;
    const secondNumberDom = document.getElementById("secondNumber") as HTMLInputElement;
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("button")  as HTMLInputElement;

    // TODO Create DOM Elements (for errors)  
    const firstNumberErrorDiv = document.createElement("div");
    const secondNumberErrorDiv = document.createElement("div");
    const numberErrorContent = document.createTextNode("This is not a valid Roman Number");
    firstNumberErrorDiv.appendChild(numberErrorContent);
    secondNumberErrorDiv.appendChild(numberErrorContent);

    // Declare values variables
    let firstNumberRoman: string;
    let secondNumberRoman: string;
    let firstNumberArabic: number;
    let secondNumberArabic: number;
    let resultArabic: number;
    let resultRoman: string;

    // Clean inputs and result
    firstNumberDom.value = "";
    secondNumberDom.value = "";
    resultDiv.textContent = "";
    button.disabled = true;

    // Input changes listeners
    firstNumberDom.addEventListener("input", () => {
      if (!isInputValid(firstNumberDom, 1)) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    });

    secondNumberDom.addEventListener("input", () => {
        if (!isInputValid(secondNumberDom, 2)) {
          button.disabled = true;
        } else {
          button.disabled = false;
        }
    });


    // Result display in DOM
    resultDiv.textContent = "result here2 ";
}