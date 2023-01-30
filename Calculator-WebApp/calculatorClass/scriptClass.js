class Calculator {
  constructor(prevOperandEl, currOperandEl) {
    this.prevOperandEl = prevOperandEl;
    this.currOperandEl = currOperandEl;
    this.clear();
  }

  clear() {
    this.prevOperand = '';
    this.currOperand = '';
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
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = '';
  }

  compute() {
    let computation;
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

  formatNumber(number) {
    const numString = number.toString();
    const intDigigts = parseFloat(numString.split('.')[0]);
    const decimalDigits = numString.split('.')[1];
    let intDislplay;

    if (isNaN(intDigigts)) {
      intDislplay = '';
    } else {
      intDislplay = intDigigts.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${intDislplay}.${decimalDigits}`;
    } else {
      return intDislplay;
    }
  }

  updateDisplay() {
    this.currOperandEl.textContent = this.formatNumber(this.currOperand);

    if (this.operation != null) {
      this.prevOperandEl.textContent = `${this.formatNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevOperandEl.textContent = '';
    }
  }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const clearAllBtn = document.querySelector('[data-clear-all]');
const deleteBtn = document.querySelector('[data-delete]');
const equalBtn = document.querySelector('[data-equal]');
const prevOperandEl = document.querySelector('[data-prev-operand]');
const currOperandEl = document.querySelector('[data-curr-operand]');

const calculator = new Calculator(prevOperandEl, currOperandEl);

numberBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendNumber(btn.textContent);
    calculator.updateDisplay();
  });
});

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

deleteBtn.addEventListener('click', (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener('click', (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});
