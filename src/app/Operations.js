import { Command } from "./Command";

export class Operations extends Command {
    constructor() {
        super();
    }
    // Бинарные операции
    divide(firstOperand, secondOperand) {
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
        return firstOperand + secondOperand;
    }
    substraction(firstOperand, secondOperand) {
        return firstOperand - secondOperand;
    }

    // Унарные операции

    execute(operationName, ...operands) {
        if (operands.length === 1) {
            return this[operationName](parseFloat(operands[0]));
        } else {
            return this[operationName](
                parseFloat(operands[0]),
                parseFloat(operands[1])
            );
        }
    }
}
