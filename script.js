const calculatorDigitButtons = document.querySelectorAll('.number');
const calculatorOperatorButtons = document.querySelectorAll('.operator');
const calculatorSpecialButtons = document.querySelectorAll('.special');
const calculatorScreen = document.querySelector('.screen');
const screenCurrentNumber = document.querySelector('.current-number');
const screenEquation = document.querySelector('.equation');

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '='];

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
        case '*':
            return multiply(+a, +b);
            break;
        case '/':
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
    if(screenCurrentNumber.textContent.length > 11) return;
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

function backspace() {
    let displayNumber = screenCurrentNumber.textContent
    screenCurrentNumber.textContent = displayNumber.slice(0, displayNumber.length - 1)

    if (firstNumber !== '' && operator !== '') secondNumber = screenCurrentNumber.textContent;
    else firstNumber = screenCurrentNumber.textContent;
}

function evaluateResult(event) {
    if(operator === '') {
        displayOperator(event);
    } else if(secondNumber !== '') {
        firstNumber = String(operate(firstNumber, secondNumber, operator));
        screenCurrentNumber.textContent = firstNumber.slice(0, 12);;
        cleanUp();
    }
}

calculatorDigitButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        // Limit numbers to 12
        displayNumber(e.target.textContent)
    })
})

calculatorOperatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        evaluateResult(e.target.textContent)
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

document.addEventListener('keydown', (e) => {
    if(keys.includes(e.key)) {
        displayNumber(e.key);
    } else if(operators.includes(e.key)) {
        evaluateResult(e.key)
    } else if(e.key === 'Backspace') {
        backspace();
    }
})
