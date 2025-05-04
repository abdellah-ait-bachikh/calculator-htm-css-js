let totalCalculated = 0;
let currentTextWrite = "0";
const operators = ["÷", "×", "−", "+"];
let lastOperation = null;

const buttons = document.querySelectorAll("button");
const screenResult = document.querySelector(".final-result");
const prevResult = document.querySelector(".prev-result");
console.log(prevResult);
buttons.forEach((item) => {
  item.addEventListener("click", () => handleClick(item.textContent.trim()));
});

function handleClick(value) {
  if (operators.includes(value)) {
    calculate(value);
  } else if (value === "c") {
    resetAll();
  } else if (value === "←") {
    removeLastChar();
  } else if (value === "=" || value === "＝") {
    showResult();
  } else if (value === ".") {
    appendDot();
  } else {
    appendNumber(value);
  }
}

function appendNumber(value) {
  if (currentTextWrite === "0") {
    currentTextWrite = value;
  } else {
    currentTextWrite += value;
  }
  renderScreen();
}

function appendDot() {
  if (!currentTextWrite.includes(".")) {
    currentTextWrite += ".";
    renderScreen();
  }
}

function renderScreen() {
  screenResult.textContent = currentTextWrite;
  prevResult.textContent =
    lastOperation && totalCalculated !== 0
      ? `${totalCalculated} ${lastOperation}`
      : 0;
}

function removeLastChar() {
  currentTextWrite =
    currentTextWrite.length === 1 ? "0" : currentTextWrite.slice(0, -1);
  renderScreen();
}

function showResult() {
  calculate(lastOperation, true);
  renderScreen();
  prevResult.textContent = "";
  lastOperation = null;
}

function resetAll() {
  currentTextWrite = "0";
  totalCalculated = 0;
  lastOperation = null;
  renderScreen();
}

function setLastOperation(op) {
  lastOperation = op;
}

function calculate(op, isFinal = false) {
  const current = parseFloat(currentTextWrite);

  if (isNaN(current)) return;

  if (totalCalculated === 0 && lastOperation === null) {
    totalCalculated = current;
  } else {
    switch (lastOperation) {
      case "+":
        totalCalculated += current;
        break;
      case "−":
        totalCalculated -= current;
        break;
      case "×":
        totalCalculated *= current;
        break;
      case "÷":
        if (current === 0) {
          alert("Erreur : Division par zéro");
          resetAll();
          return;
        }
        totalCalculated /= current;
        break;
    }
  }

  currentTextWrite = isFinal ? String(totalCalculated) : "0";
  if (!isFinal) setLastOperation(op);
}
