import { Operations } from "./Operations";
import { result } from "./View";
const operationsHandler = new Operations();
class Calculator {
    constructor(currentOperand) {
        this.currentOperand = currentOperand;
        this.previousOperand = "";
        this.operationName = undefined;
        this.operationType = undefined;
    }

    appendNumber(number) {
        // Меняю запятую на точку чтобы получать дроби
        if (number === ",") {
            number = ".";
        }
        // Если нажимается только точка, ноль не стирается
        if (result.innerText === "0" && number === ".") {
            this.currentOperand = "0.";
        }
        // Избегаю дублей точек
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        }
        // Избегаем дублей 0
        if (result.innerText === "0") {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operationButton) {
        // Если нет операндов, ничего не делаем
        if (this.currentOperand === "") return;

        const operationName = operationButton.attributes["data-function"].value;
        const operationType = operationButton.attributes["data-type"].value;

        // Если есть первый операнд и операции унарная
        if (operationType === "operation-unary") {
            this.operationName = operationName;
            this.operationType = operationType;
            this.compute();
        }
        // Если есть два операнца и операция бинарная
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
            this.currentOperand = "";
        }
        this.updateDisplay();
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
        result.innerText = this.currentOperand;
    }

    allClear() {
        this.previousOperand = "";
        this.currentOperand = "0";
        this.operation = undefined;
    }
}

export const calculator = new Calculator(result.innerText);

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

const equalButton = document.querySelector("[data-function=equal]");
equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

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
