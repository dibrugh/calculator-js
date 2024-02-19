import { expect, describe, test } from "@jest/globals";
import Operations from "../app/Operations";

describe("operationTests", () => {
    const operations = new Operations();
    // Тесты бинарных операций
    test("Divide", () => {
        expect(operations.execute("divide", 10, 2)).toBe(5);
        expect(operations.execute("divide", -10, -5)).toBe(2);
        expect(operations.execute("divide", 5.435, -5.435)).toBe(-1);
    });
    test("xToThePowerOfY", () => {
        expect(operations.execute("xToThePowerOfY", 3, 2)).toBe(9);
        expect(operations.execute("xToThePowerOfY", -10, 2)).toBe(100);
        expect(operations.execute("xToThePowerOfY", -10, -2)).toBe(0.01);
    });
    test("multiply", () => {
        expect(operations.execute("multiply", 10, 2)).toBe(20);
        expect(operations.execute("multiply", -10, -5)).toBe(50);
        expect(operations.execute("multiply", 10.5, 2)).toBe(21);
    });
    test("yRootOfX", () => {
        expect(operations.execute("yRootOfX", 9, 2)).toBe(3);
        expect(operations.execute("yRootOfX", 27, 3)).toBe(3);
        expect(operations.execute("yRootOfX", 4, 2)).toBe(2);
    });
    test("addition", () => {
        expect(operations.execute("addition", 10, 2)).toBe(12);
        expect(operations.execute("addition", -10, -5)).toBe(-15);
        expect(operations.execute("addition", 10.5, 2.05)).toBe(12.55);
    });
    test("substraction", () => {
        expect(operations.execute("substraction", 10, 2)).toBe(8);
        expect(operations.execute("substraction", -10, -5)).toBe(-5);
        expect(operations.execute("substraction", 10.5, 2.05)).toBe(8.45);
    });
    // Тесты унарных операций
    test("changeSign", () => {
        expect(operations.execute("changeSign", 10)).toBe(-10);
        expect(operations.execute("changeSign", -10)).toBe(10);
        expect(operations.execute("changeSign", 10.2)).toBe(-10.2);
    });
    test("getPercent", () => {
        expect(operations.execute("getPercent", 10)).toBe(0.1);
        expect(operations.execute("getPercent", -10)).toBe(-0.1);
        expect(operations.execute("getPercent", 10.2)).toBe(0.102);
    });
    test("square", () => {
        expect(operations.execute("square", 10)).toBe(100);
        expect(operations.execute("square", -10)).toBe(100);
        expect(operations.execute("square", 10.2)).toBe(104.04);
    });
    test("qube", () => {
        expect(operations.execute("qube", 10)).toBe(1000);
        expect(operations.execute("qube", -10)).toBe(-1000);
        expect(operations.execute("qube", 10.2)).toBe(1061.208);
    });
    test("tenToThePowerOfX", () => {
        expect(operations.execute("tenToThePowerOfX", 2)).toBe(100);
        expect(operations.execute("tenToThePowerOfX", -2)).toBe(0.01);
        expect(operations.execute("tenToThePowerOfX", 0)).toBe(1);
    });
    test("oneDivideByX", () => {
        expect(operations.execute("oneDivideByX", 10)).toBe(0.1);
        expect(operations.execute("oneDivideByX", -10)).toBe(-0.1);
        expect(operations.execute("oneDivideByX", 0.2)).toBe(5);
    });
    test("squareRoot", () => {
        expect(operations.execute("squareRoot", 9)).toBe(3);
        expect(operations.execute("squareRoot", 16)).toBe(4);
        expect(operations.execute("squareRoot", 0.04)).toBe(0.2);
    });
    test("cubeRoot", () => {
        expect(operations.execute("cubeRoot", 27)).toBe(3);
        expect(operations.execute("cubeRoot", -27)).toBe(-3);
        expect(operations.execute("cubeRoot", 0)).toBe(0);
    });
    test("factorial", () => {
        expect(operations.execute("factorial", 5)).toBe(120);
        expect(operations.execute("factorial", 6)).toBe(720);
        expect(operations.execute("factorial", 0)).toBe(1);
    });
});
