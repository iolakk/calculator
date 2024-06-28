const buttonsDiv = document.querySelector('.buttons');
const calculatorScreen = document.querySelector(".calculator-screen");
const buttons = document.querySelectorAll(".button")

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let firstNumber = null;
let secondNumber = null;
let result = null;
let operator = null;
let otherOperator = null;
let secondNumberChoosing = false;
let resetDisplay = false;

function isNumber(value) {
    return typeof value === "number" && !Number.isNaN(value);
  }

function operate(a, b, operator){
    let result;
    console.log(`a: ${a}, b: ${b}, operator: ${operator}`);
    switch(operator){
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }
    if((a == 0 || b == 0) && operator == '/'){
        calculatorScreen.textContent = 'Nicetry:3'
    } else {
        calculatorScreen.textContent = result;
        return result;
    }
    
    
}

function displayOnScreen(number){
    calculatorScreen.textContent += number;

}

Array.from(buttons).forEach(button => {
    button.addEventListener('click', (e) => {
        let number = +e.target.textContent;
    if((calculatorScreen.textContent == '0' || resetDisplay) && e.target.className == 'button'){
        resetDisplay = false;
        calculatorScreen.textContent = '';
    }

    if(e.target.className == 'button' && calculatorScreen.textContent.length < 9 && isNumber(number)){
        displayOnScreen(number);
    } else if (e.target.className == 'button operator' && e.target.textContent != '.') {
        otherOperator = e.target.textContent;
        if (!secondNumberChoosing) {
            operator = e.target.textContent;
            firstNumber = calculatorScreen.textContent;
            secondNumberChoosing = true;
            resetDisplay = true;
        } else {
            if(operator != '=' && typeof secondNumber != null){
                switch (e.target.textContent){
                    case '=':
                        secondNumber = calculatorScreen.textContent;
                        result = operate(+firstNumber, +secondNumber, operator);
                        secondNumberChoosing = false;
                        break;
                    case '/':
                    case '*':
                    case '-':
                    case '+':
                        secondNumber = calculatorScreen.textContent;
                        result = operate(+firstNumber, +secondNumber, operator);
                        firstNumber = result;
                        secondNumberChoosing = true;
                        resetDisplay = true;
                        break;
                    }
                }
        }
    }
    result = null;
    operator = otherOperator;
    if (e.target.textContent == 'C'){
        firstNumber = null;
        secondNumber = null;
        result = null;
        operator = null;
        otherOperator = null;
        secondNumberChoosing = false;
        resetDisplay = false;
        calculatorScreen.textContent = '0';
    }

    if ((e.target.textContent == '.')){
        if (!calculatorScreen.textContent.includes('.')) {
            if (calculatorScreen.textContent < 0) {
                calculatorScreen.textContent += '0.';
            } else {
                calculatorScreen.textContent += '.';
            }
            
        }
        
    }
    })

})

Array.from(buttons).forEach(button => {
    button.addEventListener('mousedown', (e) => {
        let clickedButton = e.target
        clickedButton.style['background-color'] = 'rgb(190, 145, 153)';
    })
})

Array.from(buttons).forEach(button => {
    button.addEventListener('mouseup', (e) => {
        let clickedButton = e.target
        clickedButton.style['background-color'] = 'rgb(243, 209, 215)';
    })
})
