const calculatorButtons = document.querySelectorAll('.buttons');
const calculatorScreen = document.querySelector('.screen');

let firstNumber = 0;
let secondNumber = 0;
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
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
    }
}

function displayNumber(num) {
    // Check if the button that was pressed is a number
    const numbers = '0123456789';
    if (!numbers.includes(num)) return;

    calculatorScreen.textContent += num;
    firstNumber = calculatorScreen.textContent;
}

calculatorButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        displayNumber(e.target.textContent)
    })
})