import { MemoryOperations } from "./MemoryOperations";
import { Operations } from "./Operations";
import { result } from "./View";
const operationsHandler = new Operations();
const memoryOperationsHandler = new MemoryOperations(0);
class Calculator {
    constructor() {
        this.displayValue = "0";
        this.firstOperand = null;
        this.waitingForSecondOperand = false;
        this.operationName = undefined;
        this.result = "";
        this.memoryValue = null;
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

        if (this.waitingForSecondOperand === true) {
            this.displayValue = number;
            this.waitingForSecondOperand = false;
        } else {
            // Избегаем дублей 0
            this.displayValue =
                this.displayValue === "0" ? number : this.displayValue + number;
        }
    }

    handleMemoryOperations(operationButton) {
        const inputValue = parseFloat(this.displayValue);
        const operationName = operationButton.attributes["data-function"].value;
        let memoryResult;
        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;
        switch (operationName) {
            case "memoryRestore":
                memoryResult = memoryOperationsHandler.memoryRestore();
                break;
            case "memoryClear":
                memoryOperationsHandler.memoryClear();
                break;
            case "memoryAddition":
                memoryOperationsHandler.memoryAddition(inputValue);
                break;
            case "memorySubstraction":
                memoryOperationsHandler.memorySubstraction(inputValue);
                break;
            default:
                return;
        }
        if (memoryResult) {
            this.displayValue = memoryResult;
            this.firstOperand = this.displayValue;
        }
    }

    handleBinaryOperations(operationButton) {
        const inputValue = parseFloat(this.displayValue);
        console.log("значение inputValue для бинарных операций", inputValue);
        const operationName = operationButton.attributes["data-function"].value;

        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;

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
    }

    handleUnaryOperations(operationButton) {
        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;

        const inputValue = parseFloat(this.displayValue);
        const operationName = operationButton.attributes["data-function"].value;

        if (operationName) {
            this.result = operationsHandler.execute(operationName, inputValue);
            this.displayValue = `${String(this.result).length < 18 ? this.result : "Error: wrong length"}`;
            this.firstOperand = this.result;
        }
        this.waitingForSecondOperand = true;
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

const binaryOperationButtons = document.querySelectorAll(
    "[data-type=operation-binary]"
);
binaryOperationButtons.forEach((button) =>
    button.addEventListener("click", () => {
        calculator.handleBinaryOperations(button);
        calculator.updateDisplay();
    })
);

const unaryOperationButtons = document.querySelectorAll(
    "[data-type=operation-unary]"
);
unaryOperationButtons.forEach((button) =>
    button.addEventListener("click", () => {
        calculator.handleUnaryOperations(button);
        calculator.updateDisplay();
    })
);

const memoryOperationButtons = document.querySelectorAll(
    "[data-type=operation-memory]"
);
memoryOperationButtons.forEach((button) =>
    button.addEventListener("click", () => {
        calculator.handleMemoryOperations(button);
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
