import detectDarkMode from "./detectDarkMode";

const systemTheme = detectDarkMode();
if (localStorage.getItem("theme")) {
    document.body.setAttribute("data-theme", localStorage.getItem("theme"));
} else {
    document.body.setAttribute("data-theme", systemTheme);
}

export const toggleTheme = () => {
    let theme = document.body.getAttribute("data-theme");
    if (theme === "light") {
        theme = "dark";
    } else {
        theme = "light";
    }
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
};
