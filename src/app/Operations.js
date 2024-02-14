import { Command } from "./Command";

export class Operations extends Command {
    constructor() {
        super();
    }
    // Бинарные операции
    divide(firstOperand, secondOperand) {
        if (secondOperand === 0) {
            throw new Error("Ошибка");
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
        if (secondOperand === 0) {
            throw new Error("Ошибка");
        }
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
        return firstOperand * 0.01;
    }
    square(firstOperand) {
        return firstOperand ** 2;
    }
    qube(firstOperand) {
        return firstOperand ** 3;
    }
    tenToThePowerOfX(firstOperand) {
        return 10 ** firstOperand;
    }
    oneDivideByX(firstOperand) {
        return 1 / firstOperand;
    }
    squareRoot(firstOperand) {
        return Math.sqrt(firstOperand);
    }
    cubeRoot(firstOperand) {
        return Math.cbrt(firstOperand);
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
            return "Ошибка";
        }
    }
}
