import { Operations } from "./Operations";
import { result } from "./View";
const operationsHandler = new Operations();

/* Calculator LOGIC */
class Calculator {
    constructor(currentOperand) {
        this.currentOperand = currentOperand;
        this.previousOperand = "";
        this.operationName = undefined;
        /* this.calculation = 0; */
    }

    appendNumber(number) {
        if (number === "," && this.currentOperand.includes(",")) {
            return;
        }
        if (result.innerText === "0") {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand =
                this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operationButton) {
        // Если нет операндов, ничего не делаем
        if (this.currentOperand === "") return;

        const operationName = operationButton.attributes["data-function"].value;
        const operationType = operationButton.attributes["data-type"].value;

        // Если есть первый операнд и операции унарная || есть два операнца и операция бинарная
        if (this.currentOperand !== "" && operationType === "operation-unary") {
            this.compute(operationType);
        } else if (
            this.previousOperand !== "" &&
            operationType === "operation-binary"
        ) {
            this.compute(operationType);
        }
        this.operationName = operationName;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute(operationType) {
        let computation;
        const previousNumber = parseFloat(this.previousOperand);
        const currentNumber = parseFloat(this.currentOperand);
        // Если есть первый оператор и это унарная операция
        if (operationType === "operation-unary") {
            computation = operationsHandler.execute(
                this.operationName,
                currentNumber
            );
        }
        // Если нет первого или второго и это бинарная операция, выходим
        if (isNaN(previousNumber) || isNaN(currentNumber)) return;

        computation = operationsHandler.execute(
            this.operationName,
            previousNumber,
            currentNumber
        );

        // Обновляем данные
        this.currentOperand = computation;
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
