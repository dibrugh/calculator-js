import { MemoryOperations } from "./MemoryOperations";
import { Operations } from "./Operations";
import { result } from "./View";

const operationsHandler = new Operations();
const memoryOperationsHandler = new MemoryOperations();
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
        // Избегаю дублирования точек
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

    handleMemoryOperations(operationName) {
        const inputValue = parseFloat(this.displayValue);
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

    handleBinaryOperations(operationName) {
        const inputValue = parseFloat(this.displayValue);
        /* const operationName = eventTarget.dataset.function; */

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

    handleUnaryOperations(operationName) {
        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;

        const inputValue = parseFloat(this.displayValue);

        if (operationName) {
            this.result = operationsHandler.execute(operationName, inputValue);
            console.log("Почему тут превышена длина ", this.result);
            this.displayValue = `${String(this.result).length < 18 ? this.result : "Error: wrong length"}`;
            this.firstOperand = this.result;
        }
        this.waitingForSecondOperand = true;
    }

    updateDisplay() {
        if (result.innerText.length < 18) {
            result.innerText = this.displayValue;
        } else {
            result.textContent = "Error: num length";
            this.displayValue = "0";
        }
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
    button.addEventListener("click", (event) => {
        console.log(event);
        calculator.handleBinaryOperations(event.target.dataset.function);
        calculator.updateDisplay();
    })
);

const unaryOperationButtons = document.querySelectorAll(
    "[data-type=operation-unary]"
);
unaryOperationButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
        calculator.handleUnaryOperations(event.target.dataset.function);
        calculator.updateDisplay();
    })
);

const memoryOperationButtons = document.querySelectorAll(
    "[data-type=operation-memory]"
);
memoryOperationButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
        calculator.handleMemoryOperations(event.target.dataset.function);
        calculator.updateDisplay();
    })
);

document
    .querySelector("[data-function=allClear]")
    .addEventListener("click", () => {
        calculator.allClear();
        calculator.updateDisplay();
    });

//! Написать отдельную функцию для обработки эвентов с клавиатуры
/* // Обрабатываем нажатия с клавиатуры
keyboard.addEventListener("click", (event) => {
    // Handle only clicks on a button tag
    if (!event.target.matches("button")) {
        return;
    }
});
document.addEventListener("keydown", (event) => {
    if (event.key.match(/[0-9.,]/)) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    } else if (event.key.match(/[/*-+]/)) {
        console.log(event);
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
}); */

/*     } else if (event.key.match(/[0-9%/*\-+=.]|Backspace|Enter/)) {
        calculator.handleEvent(event.key);
    } */
