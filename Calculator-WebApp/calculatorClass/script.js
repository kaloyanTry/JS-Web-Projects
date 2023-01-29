class Calculator {
  // constructor for taking all the inputs and functions for calculator
  constructor(prevOperandTextEl, currOperandTextEl) {
    this.prevOperandTextEl = prevOperandTextEl;
    this.currOperandTextEl = currOperandTextEl;
    this.clear();
  }

  clear() {
    this.currOperand = '';
    this.prevOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currOperand.includes('.')) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currOperand === '') return;
    if (this.prevOperand !== '') this.compute();
    this.operation = operation; // set the operation
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let computation; // variable for the computation
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case '*':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '+':
        computation = prev + curr;
        break;
      default:
        return;
    }
    
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currOperandTextEl.textContent = this.getDisplayNumber(
      this.currOperand
    );
    
    if (this.operation != null) {
      this.prevOperandTextEl.textContent = `${this.getDisplayNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandTextEl.textContent = '';
    }
  }
}

const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const deleteBtn = document.querySelector('[data-delete]');
const clearAllBtn = document.querySelector('[data-clear-all]');
const prevOperandTextEl = document.querySelector('[data-prev-operand]');
const currOperandTextEl = document.querySelector('[data-curr-operand]');

// Create a calculator - instance of the class
const calculator = new Calculator(prevOperandTextEl, currOperandTextEl);

// Take the input numbers when clicked each button
numBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.textContent);
    calculator.updateDisplay();
  });
});

// Take the input operation when clicked each button
operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.textContent);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', (btn) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});
