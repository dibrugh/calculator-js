import { toggleTheme } from "../utils/setTheme";

/* 
CALCULATOR VIEW
*/
const renderView = () => {
    const calculatorView = document.createElement("div");
    calculatorView.classList.add("calculator");
    document.getElementById("root").appendChild(calculatorView);

    const result = document.createElement("div");
    result.classList.add("calculator__output");
    calculatorView.appendChild(result);

    const keyboard = document.createElement("div");
    keyboard.classList.add("calculator__keyboard");
    calculatorView.appendChild(keyboard);

    // Theme toggle
    const themeToggler = document.createElement("div");
    themeToggler.classList.add("calculator__theme-toggler");
    calculatorView.appendChild(themeToggler);
    themeToggler.addEventListener("click", toggleTheme);

    const buttons = [
        { name: "AC", value: "AC" },
        { name: "+/-", value: "±" },
        { name: "%", value: "%" },
        { name: "÷", value: "/" },
        { name: 7, value: 7 },
        { name: 8, value: 8 },
        { name: 9, value: 9 },
        { name: "x", value: "*" },
        { name: 4, value: 4 },
        { name: 5, value: 5 },
        { name: 6, value: 6 },
        { name: "-", value: "-" },
        { name: 1, value: "1" },
        { name: 2, value: 2 },
        { name: 3, value: 3 },
        { name: "+", value: "+" },
        { name: 0, value: 0 },
        { name: ".", value: "." },
        { name: "=", value: "=" },
    ];

    // Create buttons
    buttons.map(({ name, value }) => {
        keyboard.insertAdjacentHTML(
            "beforeend",
            `<button value="${value}">${name}</button>`
        );
    });

    // Add general styles
    document.querySelectorAll("button").forEach((btn) => {
        if (btn.value === "0") {
            btn.classList.add("double");
        }
        if (btn.value.match(/[0-9.]/)) {
            btn.classList.add("number");
        } else if (btn.value.match(/[AC%±]/)) {
            btn.classList.add("operation");
        } else {
            btn.classList.add("operation-orange");
        }
    });

    // Change input/output styles depending on character length
    document.querySelectorAll("button").forEach((button) => {
        const handleClasses = () => {
            if (result.innerText.length > 3 && result.innerText.length < 6) {
                result.classList.add("calculator__output-medium");
            } else if (result.innerText.length > 5) {
                result.classList.add("calculator__output-small");
            }
        };
        button.addEventListener("click", handleClasses);
        document.addEventListener("keydown", handleClasses);
    });

    return {
        result,
        keyboard,
    };
};

export default renderView;
