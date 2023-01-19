const calculatroDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second value depending on operator
const calculate = {
  '/': (firstNumber, sendNumber) => firstNumber / sendNumber,
  '*': (firstNumber, sendNumber) => firstNumber * sendNumber,
  '+': (firstNumber, sendNumber) => firstNumber + sendNumber,
  '-': (firstNumber, sendNumber) => firstNumber - sendNumber,
  '=': (firstNumber, sendNumber) => sendNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    calculatroDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    //calculatroDisplay.textContent = number;
    const displayValue = calculatroDisplay.textContent;
    calculatroDisplay.textContent =
      displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // IF operator pressed, do not add decimal
  if (awaitingNextValue) return;
  if (!calculatroDisplay.textContent.includes('.')) {
    calculatroDisplay.textContent = `${calculatroDisplay.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(calculatroDisplay.textContent);
  // Prevent multyple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  // If no value, assign first value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatroDisplay.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatroDisplay.textContent = '0';
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener('click', resetAll);
