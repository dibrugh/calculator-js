export const buttonsList = [
    { value: "(", attribute: ["operation-unary"] },
    { value: ")", attribute: ["operation-unary"] },
    { value: "MC", attribute: ["operation-memory", "memoryClear"] },
    { value: "M+", attribute: ["operation-memory", "memorySum"] },
    { value: "M-", attribute: ["operation-memory", "memorySubstract"] },
    { value: "MR", attribute: ["operation-memory", "memoryReset"] },
    { value: "AC", attribute: ["unary", "allClear"] },
    { value: "±", attribute: ["operation-unary", "changeSign"] },
    { value: "%", attribute: ["operation-unary", "getPercent"] },
    { value: "÷", attribute: ["operation-binary", "divide"], class: "orange" },
    { value: "2nd", attribute: ["operation-unary"] },
    { value: "x²", attribute: ["operation-unary", "square"] },
    { value: "x³", attribute: ["operation-unary", "qube"] },
    { value: "xʸ", attribute: ["operation-binary", "xToThePowerOfY"] },
    { value: "eˣ", attribute: ["operation-unary"] },
    { value: "10ˣ", attribute: ["operation-unary", "tenToThePowerOfX"] },
    { value: "7", attribute: ["number"] },
    { value: "8", attribute: ["number"] },
    { value: "9", attribute: ["number"] },
    {
        value: "x",
        attribute: ["operation-binary", "multiply"],
        class: "orange",
    },
    { value: "1/x", attribute: ["operation-unary", "oneDivideByX"] },
    { value: "√x", attribute: ["operation-unary", "squareRoot"] },
    { value: "∛x", attribute: ["operation-unary", "cubeRoot"] },
    { value: "y√x", attribute: ["operation-binary", "yRootOfX"] },
    { value: "ln", attribute: ["operation-unary"] },
    { value: "log10", attribute: ["operation-unary"] },
    { value: "4", attribute: ["number"] },
    { value: "5", attribute: ["number"] },
    { value: "6", attribute: ["number"] },
    {
        value: "-",
        attribute: ["operation-binary", "substraction"],
        class: "orange",
    },
    { value: "x!", attribute: ["operation-unary", "factorial"] },
    { value: "sin", attribute: ["operation-unary"] },
    { value: "cos", attribute: ["operation-unary"] },
    { value: "tan", attribute: ["operation-unary"] },
    { value: "e", attribute: ["operation-unary"] },
    { value: "EE", attribute: ["operation-unary"] },
    { value: "1", attribute: ["number"] },
    { value: "2", attribute: ["number"] },
    { value: "3", attribute: ["number"] },
    {
        value: "+",
        attribute: ["operation-binary", "addition"],
        class: "orange",
    },
    { value: "Rad", attribute: ["operation-unary"] },
    { value: "sinh", attribute: ["operation-unary"] },
    { value: "cosh", attribute: ["operation-unary"] },
    { value: "tanh", attribute: ["operation-unary"] },
    { value: "∏", attribute: ["operation-unary"] },
    { value: "Rand", attribute: ["operation-unary"] },
    { value: "0", attribute: ["number"], class: "double" },
    { value: ",", attribute: ["number", "."] },
    {
        value: "=",
        attribute: ["operation-unary", "equal"],
        class: "orange",
    },
];
