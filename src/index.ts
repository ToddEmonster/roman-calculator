// HTML display
import { sum } from './calculator';

window.onload = function() {
    const firstNumber = document.getElementById("firstNumber");
    const secondNumber = document.getElementById("secondNumber");
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("button");

    // TODO check input content on first load
    if (firstNumber.textContent !== "" && firstNumber.textContent !== "") {
        (button as HTMLInputElement).disabled = false;
    }

    // TODO check input content on focus / on blur

    console.log("first : ", firstNumber.textContent);
    console.log("second : ", secondNumber.textContent);

    resultDiv.textContent = sum(1,2).toString();
}