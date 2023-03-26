// HTML display
import { sum } from './sum';

function eventHandler(event) {
    if (event.type === "fullscreenchange") {
      /* handle a full screen toggle */
    } else {
      /* handle a full screen toggle error */
    }
  }

  
window.onload = function() {
    // Get DOM Elements
    const firstNumberDom = document.getElementById("firstNumber") as HTMLInputElement;
    const secondNumberDom = document.getElementById("secondNumber") as HTMLInputElement;
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("button")  as HTMLInputElement;

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

    // TODO Upgrade into clean validation
    if (firstNumberDom.value !== "" && secondNumberDom.value !== "") {
        button.disabled = false;
    }

    // Input changes listeners
    firstNumberDom.addEventListener("input", () => {
        firstNumberRoman = firstNumberDom.value;
        console.log(firstNumberRoman);
    });
    secondNumberDom.addEventListener("input", () => {
        secondNumberRoman = secondNumberDom.value;
        console.log(secondNumberRoman);
    });


    // Result display in DOM
    resultDiv.textContent = sum(1,2).toString();
}