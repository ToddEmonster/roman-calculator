// HTML display
import { sum } from './calculator';

window.onload = function() {
    const resultDiv = document.getElementById("result");
    console.log(resultDiv.textContent);
    resultDiv.textContent = sum(1,2).toString();
}