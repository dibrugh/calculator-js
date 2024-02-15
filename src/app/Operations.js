import { Command } from "./Command";

export class Operations extends Command {
    constructor() {
        super();
    }
    // Бинарные операции
    divide(firstOperand, secondOperand) {
        if (secondOperand === 0) {
            throw new Error("Error: divide by 0");
        }
        return parseFloat((firstOperand / secondOperand).toFixed(5));
    }
    xToThePowerOfY(firstOperand, secondOperand) {
        return parseFloat((firstOperand ** secondOperand).toFixed(5));
    }
    multiply(firstOperand, secondOperand) {
        return parseFloat((firstOperand * secondOperand).toFixed(5));
    }
    yRootOfX(firstOperand, secondOperand) {
        return parseFloat(Math.pow(firstOperand, 1 / secondOperand).toFixed(5));
    }
    addition(firstOperand, secondOperand) {
        return parseFloat((firstOperand + secondOperand).toFixed(5));
    }
    substraction(firstOperand, secondOperand) {
        return parseFloat((firstOperand - secondOperand).toFixed(5));
    }

    // Унарные операции
    changeSign(firstOperand) {
        return firstOperand * -1;
    }
    getPercent(firstOperand) {
        return parseFloat((firstOperand * 0.01).toFixed(5));
    }
    square(firstOperand) {
        return parseFloat((firstOperand ** 2).toFixed(5));
    }
    qube(firstOperand) {
        return parseFloat((firstOperand ** 3).toFixed(5));
    }
    tenToThePowerOfX(firstOperand) {
        return parseFloat((10 ** firstOperand).toFixed(5));
    }
    oneDivideByX(firstOperand) {
        if (firstOperand === 0) {
            throw new Error("Error: divide by 0");
        }
        return parseFloat((1 / firstOperand).toFixed(5));
    }
    squareRoot(firstOperand) {
        return parseFloat(Math.sqrt(firstOperand).toFixed(5));
    }
    cubeRoot(firstOperand) {
        return parseFloat(Math.cbrt(firstOperand).toFixed(5));
    }
    factorial(firstOperand) {
        return firstOperand != 1
            ? firstOperand * this.factorial(firstOperand - 1)
            : 1;
    }

    execute(operationName, ...operands) {
        try {
            if (operands.length === 1) {
                return this[operationName](parseFloat(operands[0]));
            } else {
                return this[operationName](
                    parseFloat(operands[0]),
                    parseFloat(operands[1])
                );
            }
        } catch (error) {
            return "Error: divide by 0";
        }
    }
}
