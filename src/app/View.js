import { toggleTheme } from "../utils/setTheme";
import { buttonsList as buttons } from "../constants/buttonsList";

class View {
    renderView() {
        const calculatorView = document.createElement("div");
        calculatorView.classList.add("calculator");
        document.getElementById("root").appendChild(calculatorView);

        const result = document.createElement("div");
        result.classList.add("calculator__output");
        calculatorView.appendChild(result);

        const keyboard = document.createElement("div");
        keyboard.classList.add("calculator__keyboard");
        calculatorView.appendChild(keyboard);

        // Переключатель темы
        const themeToggler = document.createElement("div");
        themeToggler.classList.add("calculator__theme-toggler");
        calculatorView.appendChild(themeToggler);
        themeToggler.addEventListener("click", toggleTheme);

        // Отрисовка кнопок
        buttons.map((button) => {
            keyboard.insertAdjacentHTML(
                "beforeend",
                `<button ${button.disabled ? "disabled" : ""} data-type=${button.attribute[0]} ${button.attribute[1] ? `data-function=${button.attribute[1]}` : ""} ${button.class ? `class=${button.class}` : ""}>${button.value}</button>`
            );
        });

        return {
            result,
            keyboard,
        };
    }
}

const view = new View();
export const { result, keyboard } = view.renderView();
