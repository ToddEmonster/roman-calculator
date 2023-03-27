/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
// HTML display
function eventHandler(event) {
    if (event.type === "fullscreenchange") {
        /* handle a full screen toggle */
    }
    else {
        /* handle a full screen toggle error */
    }
}
window.onload = function () {
    // Get DOM Elements
    const firstNumberDom = document.getElementById("firstNumber");
    const secondNumberDom = document.getElementById("secondNumber");
    const resultDiv = document.getElementById("result");
    const button = document.getElementById("button");
    // Declare values variables
    let firstNumberRoman;
    let secondNumberRoman;
    let firstNumberArabic;
    let secondNumberArabic;
    let resultArabic;
    let resultRoman;
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
    resultDiv.textContent = "result here";
};

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb21hbi1jYWxjdWxhdG9yLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEhUTUwgZGlzcGxheVxuZnVuY3Rpb24gZXZlbnRIYW5kbGVyKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LnR5cGUgPT09IFwiZnVsbHNjcmVlbmNoYW5nZVwiKSB7XG4gICAgICAgIC8qIGhhbmRsZSBhIGZ1bGwgc2NyZWVuIHRvZ2dsZSAqL1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLyogaGFuZGxlIGEgZnVsbCBzY3JlZW4gdG9nZ2xlIGVycm9yICovXG4gICAgfVxufVxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBHZXQgRE9NIEVsZW1lbnRzXG4gICAgY29uc3QgZmlyc3ROdW1iZXJEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpcnN0TnVtYmVyXCIpO1xuICAgIGNvbnN0IHNlY29uZE51bWJlckRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2Vjb25kTnVtYmVyXCIpO1xuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzdWx0XCIpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dG9uXCIpO1xuICAgIC8vIERlY2xhcmUgdmFsdWVzIHZhcmlhYmxlc1xuICAgIGxldCBmaXJzdE51bWJlclJvbWFuO1xuICAgIGxldCBzZWNvbmROdW1iZXJSb21hbjtcbiAgICBsZXQgZmlyc3ROdW1iZXJBcmFiaWM7XG4gICAgbGV0IHNlY29uZE51bWJlckFyYWJpYztcbiAgICBsZXQgcmVzdWx0QXJhYmljO1xuICAgIGxldCByZXN1bHRSb21hbjtcbiAgICAvLyBDbGVhbiBpbnB1dHMgYW5kIHJlc3VsdFxuICAgIGZpcnN0TnVtYmVyRG9tLnZhbHVlID0gXCJcIjtcbiAgICBzZWNvbmROdW1iZXJEb20udmFsdWUgPSBcIlwiO1xuICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAvLyBUT0RPIFVwZ3JhZGUgaW50byBjbGVhbiB2YWxpZGF0aW9uXG4gICAgaWYgKGZpcnN0TnVtYmVyRG9tLnZhbHVlICE9PSBcIlwiICYmIHNlY29uZE51bWJlckRvbS52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gSW5wdXQgY2hhbmdlcyBsaXN0ZW5lcnNcbiAgICBmaXJzdE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBmaXJzdE51bWJlclJvbWFuID0gZmlyc3ROdW1iZXJEb20udmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKGZpcnN0TnVtYmVyUm9tYW4pO1xuICAgIH0pO1xuICAgIHNlY29uZE51bWJlckRvbS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgICBzZWNvbmROdW1iZXJSb21hbiA9IHNlY29uZE51bWJlckRvbS52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coc2Vjb25kTnVtYmVyUm9tYW4pO1xuICAgIH0pO1xuICAgIC8vIFJlc3VsdCBkaXNwbGF5IGluIERPTVxuICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IFwicmVzdWx0IGhlcmVcIjtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=