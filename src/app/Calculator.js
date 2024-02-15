import MemoryOperations from "./MemoryOperations";
import Operations from "./Operations";
import { result, keyboard } from "./View";

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
            this.displayValue = `${String(this.result).length < 21 ? this.result : "Error: wrong length"}`;
            this.firstOperand = this.result;
        }
        this.waitingForSecondOperand = true;
        this.operationName = operationName;
    }

    handleUnaryOperations(operationName) {
        // Если нет операндов, ничего не делаем
        if (this.displayValue === "") return;

        const inputValue = parseFloat(this.displayValue);

        if (this.firstOperand === null && !isNaN(inputValue)) {
            this.result = operationsHandler.execute(operationName, inputValue);
            this.displayValue = `${String(this.result).length < 21 ? this.result : "Error: wrong length"}`;
            /* this.firstOperand = this.result; */
        }
        /*  this.waitingForSecondOperand = true; */
    }

    updateDisplay() {
        if (String(result.innerText.length) < 21) {
            result.innerText = this.displayValue;
        } else {
            result.textContent = "Error: wrong length";
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

// Обрабатываем только нажатия на кнопки
keyboard.addEventListener("click", (event) => {
    // Handle only clicks on a button tag
    if (!event.target.matches("button")) {
        return;
    }
});

// Обрабатываем нажатия на цифры и некоторые операции с клавиатуры
document.addEventListener("keydown", (event) => {
    // Проверка, что строка будет начинаться с цифры или .,
    if (event.key.match(/^[0-9.,]*$/)) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    switch (event.key) {
        case "/":
            calculator.handleBinaryOperations("divide");
            calculator.updateDisplay();
            break;
        case "*":
            calculator.handleBinaryOperations("multiply");
            calculator.updateDisplay();
            break;
        case "+":
            calculator.handleBinaryOperations("addition");
            calculator.updateDisplay();
            break;
        case "-":
            calculator.handleBinaryOperations("substraction");
            calculator.updateDisplay();
            break;
        case "%":
            calculator.handleUnaryOperations("getPercent");
            calculator.updateDisplay();
            break;
        case "Enter":
            calculator.handleBinaryOperations("equal");
            calculator.updateDisplay();
            break;
        default:
            break;
    }
});
