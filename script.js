class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
          this.previousOperandTextElement = previousOperandTextElement
          this.currentOperandTextElement = currentOperandTextElement
          this.toReset = false
          //clear when calculator is restarted
          this.clear()
    }

    //clear function
    clear(){
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }

    //delete function
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

     //square-root function
     squareRoot(){
        this.currentOperand = Math.sqrt(this.currentOperand)
    }

    //append function, to append numbers after typing a first number
    appendNumber(number){
     if (number === '.' && this.currentOperand.includes('.')) return
     this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    //function to choose operation
    chooseOperation(operation){
        if (this.currentOperand === '') return
        //to get a displaying figure or answer to continue another computation
        if (this.previousOperand !== '') {
             this.compute()
        }
      //to get the actual operation clicked
      this.operation = operation
      // the previous operand now equals current operand for new input
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  
    //function to carry out the task
    compute(){
      let computation
      //converting strings to number for computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      //to check if numbers were actually inputed before any computation
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+' :
          computation = prev + current
          break
        case '-' :
          computation = prev - current
          break
        case '×' :
          computation = prev * current
          break
        case '÷' :
          computation = prev / current
          break
        default:
        return
      }
      this.toReset = true,
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }

    //assigned commas to display numbers and to be able to add more zeros before your decimal like 0.00002
    getDisplayNumber(number){
        const stringNumber = number.toString()
        //split turns numbers into an array after first number
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //getting numbers after the decimal place
        const decimalDigits = (stringNumber.split('.')[1])
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            //maxfrac to ensure only on decimal point
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

     //to set state of current computations
    updateDisplay(){
       this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
       if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
       } else {
           this.previousOperandTextElement.innerText = ''
       }
    }
}


const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const squareRootButton = document.querySelector('[data-square-root]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//event listener to get numbers to the display
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === "" &&
        calculator.currentOperand !== "" &&
        calculator.toReset) {
            calculator.currentOperand = "";
            calculator.toReset = false;
            }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

//event listener to get symbols to the display
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

//event listener for the equal operation
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

//event listener for the clear operation
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

//event listener for the delete operation
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

//event listener for the square root operation
squareRootButton.addEventListener('click', button => {
    calculator.squareRoot()
    calculator.updateDisplay()
})

