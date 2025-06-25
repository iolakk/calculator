const calculatorDigitButtons = document.querySelectorAll('.number');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorSpecialButtons = document.querySelectorAll('.special');
const calculatorScreen = document.querySelector('.screen');
const screenCurrentNumber = document.querySelector('.current-number');
const screenEquation = document.querySelector('.equation');

let firstNumber = '';
let secondNumber = '';
let operator = '';

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    switch(operator) {
        case '+':
            return add(+a, +b);
            break;
        case '-':
            return subtract(+a, +b);
            break;
        case '×':
            return multiply(+a, +b);
            break;
        case '÷':
            return divide(+a, +b);
            break;
    }
}

function displayNumber(num) {
    // check if number is a dot
    if (num === '.') {
        // if it is a dot check whether there are currently any numbers or if there is already a dot
        if(screenCurrentNumber.textContent === '' || screenCurrentNumber.textContent.includes('.')) {
            return;
        }
    }
    screenCurrentNumber.textContent += num;
    if (firstNumber !== '' && operator !== '') secondNumber = screenCurrentNumber.textContent;
    else firstNumber = screenCurrentNumber.textContent;
}

function displayOperator(op) {;
    if(op === '=') return;
    operator = op;
    screenEquation.textContent += `${firstNumber} ${operator}`
    screenCurrentNumber.textContent = '';
}

function cleanUp() {
    secondNumber = '';
    operator = '';
    screenEquation.textContent = '';
}

function clearAll() {
    firstNumber = ''
    secondNumber = ''
    screenEquation.textContent = '';
    screenCurrentNumber.textContent = '';
}

calculatorDigitButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        displayNumber(e.target.textContent)
    })
})

calculatorOperatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if(operator === '') {
            displayOperator(e.target.textContent);
        } else if(secondNumber !== '') {
            firstNumber = String(operate(firstNumber, secondNumber, operator));
            screenCurrentNumber.textContent = firstNumber;
            cleanUp();
        }
    })
})

calculatorSpecialButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        switch(e.target.textContent) {
            case 'AC':
                clearAll();
                break;
            case 'C':
                screenCurrentNumber.textContent = '';
                break;
        }
    })
})
