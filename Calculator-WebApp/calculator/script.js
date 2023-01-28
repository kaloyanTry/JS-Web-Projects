const calculatorDisplay = document.querySelector('h2');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// Variables for calculation:
let firstValue = 0;
let operatorValue = '';
let awaitNextValue = false;

function takeFirstValue(num) {
  if (awaitNextValue) {
    calculatorDisplay.textContent = num;
    console.log(num);
    awaitNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === '0' ? num : displayValue + num;
  }
}

// const calculate = {
//   '/': (firstNum, sendNum) => firstNum / sendNum,
//   '*': (firstNum, sendNum) => firstNum * sendNum,
//   '+': (firstNum, sendNum) => firstNum + sendNum,
//   '-': (firstNum, sendNum) => firstNum - sendNum,
//   '=': (firstNum, sendNum) => sendNum,
//   // pi: (firstNum, sendNum) => firstNum * (22 / 7),
//   // 'n!': (firstNum, sendNum) => firstNum * 1,
//   // 'n!': (firstNum, sendNum) => firstNum * 1,
//   'n*n': (firstNum) => firstNum * firstNum,
//   // root: (firstNum) => Math.root(firstNum),
//   // percent: (firstNum) => Math.percent(firstNum),
// };

// function takeNumberValue(num) {
//   if (awaitNextValue) {
//     calculatorDisplay.textContent = num;
//     awaitNextValue = false;
//   } else {
//     const displayValue = calculatorDisplay.textContent;
//     calculatorDisplay.textContent =
//       displayValue === '0' ? num : displayValue + num;
//   }
// }

// function addDecimal() {
//   if (awaitNextValue) return;

//   if (!calculatorDisplay.textContent.includes('.')) {
//     calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
//   }
// }

// function useOperator(operator) {
//   const currentValue = Number(calculatorDisplay.textContent);

//   if (operatorValue && awaitNextValue) {
//     operatorValue = operator;
//     return;
//   }

//   if (!firstValue) {
//     firstValue = currentValue;
//   } else {
//     let calculation = calculate[operatorValue](firstValue, currentValue);
//     calculatorDisplay.textContent = calculation;
//     firstValue = calculation;

//     if (calculate[operator] === 'n*n') {
//       calculation = firstValue * firstValue;
//       calculatorDisplay.textContent = calculation;
//     }
//   }

//   awaitNextValue = true;
//   operatorValue = operator;
// }

function resetAll() {
  let firstValue = 0;
  let operatorValue = '';
  let awaitNextValue = false;
  calculatorDisplay.textContent = '0';
}

// inputBtns.forEach((btn) => {
//   if (btn.classList.length === 0) {
//     btn.addEventListener('click', () => takeFirstValue(btn.value));
//   } else if (btn.classList.contains('operator')) {
//     btn.addEventListener('click', () => useOperator(btn.value));
//   } else if (btn.classList.contains('decimal')) {
//     btn.addEventListener('click', () => addDecimal());
//   }
// });

inputBtns.forEach((btn) => {
  if (btn.classList.length === 0) {
    btn.addEventListener('click', () => takeFirstValue(btn.value));
    console.log(takeFirstValue(btn.value));
  }
});

clearBtn.addEventListener('click', resetAll);
