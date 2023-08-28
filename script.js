//? Calculator class
class Calculator {

    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = '';
    }
    //Whenever we create our calculator, all values are automatically cleared.
    //We are also declaring these properties/variables at the same time

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
        // This works by turning our current operand to a string and then slice off the last character of the string
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            // This prevents multiple '.' from being added -> if this.currentOperand string already includes one, and the current number trying to be appended is a '.', we RETURN OUTSIDE OF THE FUNCTION so nothing is triggered.
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
        // This is how we can append the numbers -> kinda like a summation formula but with strings 
        // (using strings because numbers would be added)


    }

    chooseOperation(operationInput) {
        if (this.currentOperand === '') {
            // If there is nothing in the current operand, we don't want this to do anything
            return;
        };

        if (this.previousOperand !== '') {
            // If there is already something in the previous operand, we want to compute if we press an operation button again
            this.compute();
        }

        this.operation = operationInput;
        // Setting our operation property to the inputted operation
        this.previousOperand = this.currentOperand;
        // Setting previous operand to the current operand 
        this.currentOperand = '';
        // Clearing current operand

    }

    compute() {
        let computaton;

        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // parseFloat basically converts string into number

        if (isNaN(prev) || isNaN(current)) {
            return;
        };

        switch (this.operation) {
            case '+':
                computaton = prev + current;
                break;
            case '-':
                computaton = prev - current;
                break;
            case '*':
                computaton = prev * current;
                break;
            case '÷':
                computaton = prev / current;
                break;
            default:
                return;

        }

        this.currentOperand = computaton;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        // to ensure what we get is a string
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        //  to get only integers, we split the stringNumber (an array) using split method at the '.' and then we take the first index of the array (which is only integers)
        const decimalDigits = stringNumber.split('.')[1];
        // same as integerDigits but we take the 2nd index
        let integerDisplay;

        if (isNaN(integerDigits)) {
            // if integerDigits is not a number, we empty it
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
            // basically for the integers, it changes the local so that there are commas (111,111,111.09090909) and no commas for decimal

        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
            // basically reforming the digits properly
        } else {
            return integerDisplay;
            // if no decimals return
        }

        // const floatNumber = parseFloat(number);
        // // number is converted into a number (since it's actually sometimes string (textcontent))
        // if (isNaN(floatNumber)) {
        //     // if it isn't a number, we don't actually know what it is so we return an empty string
        //     return '';
        // }
        // return floatNumber.toLocaleString('en');
        // // locale basically formats the number back into a string but into a certain format (english)
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
            // basically putting the currentOperand into the previousOperand and then also showing the operation
        } else {
            this.previousOperandElement.textContent = '';
        }
    }
}

//? DOM ELEMENTS
const numberButtons = document.querySelectorAll('#calc-number');
const operationButtons = document.querySelectorAll('#calc-operation');
const equalsButton = document.querySelector('#calc-equals');
const deleteButton = document.querySelector('#calc-delete');
const allclearButton = document.querySelector('#calc-AC');
const previousOperandElement = document.querySelector('#calc-previous-operand');
const currentOperandElement = document.querySelector('#calc-current-operand');




//? Creating calc functions/event listeners
const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(numberButton => {
    numberButton.addEventListener('click', () => {
        // console.log('click');
        calculator.appendNumber(numberButton.innerHTML);
        calculator.updateDisplay();
    });
});
// This is saying that for each "button/value" inside the numberButtons array/element, we are ATTACHING AN EVENT LISTENER SO THAT WHENEVER ONE IS CLICKED we append a number on our calculator and also update the display

operationButtons.forEach(operationButton => {
    operationButton.addEventListener('click', () => {
        // console.log('click');
        calculator.chooseOperation(operationButton.innerHTML);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    // console.log('click');
    calculator.compute();
    calculator.updateDisplay();
});

allclearButton.addEventListener('click', () => {
    console.log('click');
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
