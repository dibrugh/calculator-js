import renderView from "./calculatorView";

/* CALCULATOR LOGIC */
export const handleCalculatorLogic = () => {
    // Object values
    const calculator = {
        displayValue: "0",
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };
    const { result, keyboard } = renderView();

    // Update display
    const updateDisplay = () => {
        if (result.textContent.length < 15) {
            result.textContent = calculator.displayValue;
        } else {
            result.textContent = "Error";
            calculator.displayValue = "0";
        }
    };
    // Set input/outout to 0
    updateDisplay();

    const handleEvent = (value) => {
        {
            if (value.match(/[^\d.AC%±Backspace]/)) {
                handleOperator(value);
                updateDisplay();
                return;
            }

            if (value.match(/[%±]/)) {
                handleUnaryOperator(value);
                updateDisplay();
                return;
            }

            if (value === ".") {
                inputDecimal(value);
                updateDisplay();
                return;
            }

            if (value === "AC") {
                resetCalculator();
                updateDisplay();
                return;
            }

            if (value === "Backspace") {
                handleDelete();
                updateDisplay();
                return;
            }

            inputDigit(value);
            updateDisplay();
        }
    };

    // Handle key press
    keyboard.addEventListener("click", (event) => {
        // Handle only clicks on a button tag
        if (!event.target.matches("button")) {
            return;
        }
        handleEvent(event.target.value);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key.match(/[0-9%/*\-+=.]|Backspace|Enter/))
            handleEvent(event.key);
    });

    // Input digit click
    const inputDigit = (digit) => {
        const { displayValue, waitingForSecondOperand } = calculator;

        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            // Avoiding "0" duplicates
            calculator.displayValue =
                displayValue === "0" ? digit : displayValue + digit;
        }
    };

    // Input decimal avoiding duplicates
    const inputDecimal = (dot) => {
        if (calculator.waitingForSecondOperand === true) {
            calculator.displayValue = "0.";
            calculator.waitingForSecondOperand = false;
            return;
        }
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    };

    // Handle operators
    const handleOperator = (nextOperator) => {
        const { firstOperand, displayValue, operator } = calculator;
        const inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }

        if (firstOperand === null && !isNaN(inputValue)) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            const result = calculate(firstOperand, inputValue, operator);
            calculator.displayValue = `${String(result).length < 18 ? result : "Error: wrong length"}`;
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    };

    // Handle unary operators (% and ±)
    const handleUnaryOperator = (unaryOperator) => {
        if (unaryOperator === "%") {
            calculator.displayValue = `${parseFloat((calculator.displayValue / 100).toFixed(7))}`;
        } else if (unaryOperator === "±") {
            calculator.displayValue = calculator.displayValue * -1;
        }
    };

    // Calculation logic
    const calculate = (firstOperand, secondOperand, operator) => {
        if (operator === "+") {
            return parseFloat((firstOperand + secondOperand).toFixed(7));
        }
        if (operator === "-") {
            return parseFloat((firstOperand - secondOperand).toFixed(7));
        }
        if (operator === "*") {
            return parseFloat((firstOperand * secondOperand).toFixed(7));
        }
        if (operator === "/") {
            return parseFloat((firstOperand / secondOperand).toFixed(7));
        }
        return secondOperand;
    };

    // Handle delete symbol via Backspace
    const handleDelete = () => {
        const stringValue = String(calculator.displayValue);
        if (stringValue.length > 1) {
            calculator.displayValue = stringValue.slice(0, -1);
        } else {
            calculator.displayValue = "0";
            result.classList.remove(
                "calculator__output-small",
                "calculator__output-medium"
            );
        }
    };

    // Reset calculator
    const resetCalculator = () => {
        // reset values
        calculator.displayValue = "0";
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
        result.textContent = calculator.displayValue;
        // reset styles
        result.classList.remove(
            "calculator__output-small",
            "calculator__output-medium"
        );
    };
};
