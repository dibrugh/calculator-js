export default function detectDarkMode() {
    // Check dark theme on the level of OS settings
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    }
    return "light";
}
