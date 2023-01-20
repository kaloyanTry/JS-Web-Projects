const display = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
};

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  if (awaitingNextValue) {
    display.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = display.textContent;
    display.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  if (awaitingNextValue) return;
  if (!display.textContent.includes('.')) {
    display.textContent = `${display.textContent}.`;
  }
}

function useOperator(operator) {
  const currentValue = Number(display.textContent);

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    display.textContent = calculation;
    firstValue = calculation;
  }
  awaitingNextValue = true;
  operatorValue = operator;
}

function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  display.textContent = '0';
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  }
  if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  }
  if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

clearBtn.addEventListener('click', resetAll);
