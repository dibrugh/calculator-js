import { toggleTheme } from "../utils/setTheme";
import { buttonsList as buttons } from "../constants/buttonsList";
/* 
CALCULATOR VIEW
*/

class View {
    renderView() {
        const calculatorView = document.createElement("div");
        calculatorView.classList.add("calculator");
        document.getElementById("root").appendChild(calculatorView);

        const result = document.createElement("div");
        result.innerText = 0;
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

        // Create buttons
        buttons.map((button) => {
            keyboard.insertAdjacentHTML(
                "beforeend",
                `<button data-type=${button.attribute[0]} ${button.attribute[1] ? `data-function=${button.attribute[1]}` : ""} ${button.class ? `class=${button.class}` : ""}>${button.value}</button>`
            );
        });

        // Change input/output styles depending on character length
        document.querySelectorAll("button").forEach((button) => {
            const handleClasses = () => {
                if (
                    result.innerText.length > 3 &&
                    result.innerText.length < 6
                ) {
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
    }
}

const view = new View();
export const { result, keyboard } = view.renderView();
