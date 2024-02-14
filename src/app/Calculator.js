import { Operations } from "./Operations";
import { result } from "./View";
const operationsHandler = new Operations();
class Calculator {
    constructor() {
        this.displayValue = "0";
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operationName = undefined;
        this.operationType = undefined;
        this.result = "";
    }

    appendNumber(number) {
        // Меняю запятую на точку чтобы получать дроби
        if (number === ",") {
            number = ".";
        }
        if (number === "." && this.displayValue === "0") {
            this.displayValue = "0.";
            this.waitingForSecondOperand = false;
            return;
        }
        if (number === "." && this.displayValue.includes(".")) {
            return;
        }

        /*         // Если нажимается только точка, ноль не стирается
        if (this.currentOperand === "0" && number === ".") {
            this.currentOperand = "0.";
        }
        // Избегаю дублей точек
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        } */

        if (this.waitingForSecondOperand === true) {
            this.displayValue = number;
            this.waitingForSecondOperand = false;
        } else {
            // Избегаем дублей 0
            this.displayValue =
                this.displayValue === "0" ? number : this.displayValue + number;
        }
    }

    chooseOperation(operationButton) {
        const inputValue = parseFloat(this.displayValue);
        const operationName = operationButton.attributes["data-function"].value;

        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;
        /* const operationType = operationButton.attributes["data-type"].value; */

        // Если оператор =, не передаём в execute
        if (operationName !== "equal" && this.waitingForSecondOperand) {
            this.operationName = operationName;
            return;
        }

        if (this.firstOperand === null && !isNaN(inputValue)) {
            this.firstOperand = inputValue;
        } else if (operationName) {
            this.result = operationsHandler.execute(
                this.operationName,
                this.firstOperand,
                inputValue
            );
            this.displayValue = `${String(this.result).length < 18 ? this.result : "Error: wrong length"}`;
            this.firstOperand = this.result;
        }
        this.waitingForSecondOperand = true;
        this.operationName = operationName;

        /* // Если есть первый операнд и операции унарная
        if (operationType === "operation-unary") {
            this.operationName = operationName;
            this.operationType = operationType;
            this.compute();
        }
        // Если есть два операнда и операция бинарная
        if (
            operationType === "operation-binary" &&
            this.currentOperand !== "0"
        ) {
            if (this.previousOperand !== "") {
                this.compute();
            }
            this.operationName = operationName;
            this.operationType = operationType;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "0";
        }
        this.updateDisplay(); */
    }

    compute() {
        const previousNumber = parseFloat(this.previousOperand);
        const currentNumber = parseFloat(this.currentOperand);

        // Если есть первый оператор и это унарная операция
        if (this.operationType === "operation-unary") {
            this.currentOperand = operationsHandler.execute(
                this.operationName,
                currentNumber
            );
        }
        // Если нет первого или второго и это бинарная операция, выходим
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;

        if (this.operationType === "operation-binary") {
            this.currentOperand = operationsHandler.execute(
                this.operationName,
                previousNumber,
                currentNumber
            );
        }
        // Обновляем данные
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        result.innerText = this.displayValue;
    }

    allClear() {
        this.displayValue = "0";
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operationName = undefined;
        result.textContent = this.displayValue;
    }
}

export const calculator = new Calculator();

const numberButtons = document.querySelectorAll("[data-type=number]");
numberButtons.forEach((button) =>
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
);

const operationButtons = document.querySelectorAll("[data-type|=operation]");
operationButtons.forEach((button) =>
    button.addEventListener("click", () => {
        calculator.chooseOperation(button);
        calculator.updateDisplay();
    })
);

document
    .querySelector("[data-function=allClear]")
    .addEventListener("click", () => {
        calculator.allClear();
        calculator.updateDisplay();
    });

/* // Handle key press
keyboard.addEventListener("click", (event) => {
    // Handle only clicks on a button tag
    if (!event.target.matches("button")) {
        return;
    }
    calculator.handleEvent(event.target.innerText);
});
document.addEventListener("keydown", (event) => {
    if (event.key.match(/[0-9%/*\-+=.]|Backspace|Enter/))
        calculator.handleEvent(event.key);
});
 */
