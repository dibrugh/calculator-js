export class MemoryOperations {
    constructor() {
        this.memoryState = null;
    }
    // На уровне UI показываем, есть ли что-то в памяти
    buttonMemoryRestore = document.querySelector(
        "[data-function=memoryRestore]"
    );
    updateButton() {
        if (
            this.buttonMemoryRestore.classList.value === "" &&
            this.memoryState
        ) {
            this.buttonMemoryRestore.classList.add("active");
        } else if (
            !this.memoryState &&
            this.buttonMemoryRestore.classList.value !== ""
        ) {
            this.buttonMemoryRestore.classList.remove("active");
        }
    }
    // Операции с памятью
    memoryRestore() {
        return this.memoryState;
    }
    memoryClear() {
        this.memoryState = null;
        this.updateButton();
    }
    memoryAddition(valueToAdd) {
        if (valueToAdd) {
            this.memoryState = parseFloat(
                (this.memoryState + valueToAdd).toFixed(5)
            );
        }
        this.updateButton();
    }
    memorySubstraction(valueToSubstract) {
        if (valueToSubstract) {
            this.memoryState = parseFloat(
                (this.memoryState - valueToSubstract).toFixed(5)
            );
        }
        this.updateButton();
    }
}
