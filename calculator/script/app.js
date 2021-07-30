const currentCalculationOutput = document.querySelector(".calculator-screen-top");
const currentResultOutput = document.querySelector(".calculator-screen-bottom");
const addBtn = document.querySelector(".add");
const subtractBtn = document.querySelector(".subtract");
const multiplyBtn = document.querySelector(".multiply");
const divideBtn = document.querySelector(".divide");
const clearBtn = document.querySelector(".clear-all");
const digits = document.querySelectorAll(".digit");
const equalSignBtn= document.querySelector(".equal-sign");
let enteredNumber;
let newEnteredNumber;
let operator;

for (const digit of digits) {
  digit.onclick = (event) => {
	const { target } = event;
	const { value } = target;
	currentResultOutput.value += value;
  };
}

function outputResult(result, text) {
  currentResultOutput.textContent = result;
  currentCalculationOutput.value = text;
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResultOutput, calcDescription);
}

function calculate(operation) {
	enteredNumber = currentResultOutput.value;
    currentCalculationOutput.value = currentResultOutput.value;
	currentResultOutput.value = "";

  if (operator != "" && operator != undefined) {
    answer();
  } else if (operation == "SUBTRACT") {
    operator = "-";
  } else if (operation == "ADD") {
    operator = "+";
  } else if (operation === "MULTIPLY") {
    operator = "*";
  } else if (operation === "DIVIDE") {
    operator = "/";
  } else if (operation == "CLEAR") {
    currentCalculationOutput.value = "";
    currentResultOutput.value = "";
    enteredNumber = "";
    operator = "";
  }
}

function answer() {
	newEnteredNumber = currentResultOutput.value;
	currentCalculationOutput.value = currentResultOutput.value;
  if (currentResultOutput.value == "") {
    alert("type number");
  } else if (operator == "-") {
    currentResultOutput.value = parseFloat((enteredNumber - newEnteredNumber).toFixed(7));
  } else if (operator == "+") {
    currentResultOutput.value = parseFloat(enteredNumber) + parseFloat(newEnteredNumber);
  } else if (operator === "*") {
    currentResultOutput.value = parseFloat((enteredNumber * newEnteredNumber).toFixed(7));
  } else if (operator === "/") {
    currentResultOutput.value = parseFloat((enteredNumber / newEnteredNumber).toFixed(7));
  }
  createAndWriteOutput(operator, enteredNumber, newEnteredNumber);
  operator = "";
}

addBtn.addEventListener("click", calculate.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculate.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculate.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculate.bind(this, "DIVIDE"));
clearBtn.addEventListener("click", calculate.bind(this, "CLEAR"));
equalSignBtn.addEventListener("click", answer);
