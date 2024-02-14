export class MemoryOperations {
    constructor() {
        this.memoryState = 0;
    }
    // Операции с памятью
    memoryRestore() {
        return this.memoryState;
    }
    memoryClear() {
        this.memoryState = 0;
    }
    memoryAddition(valueToAdd) {
        if (valueToAdd) {
            this.memoryState = parseFloat(
                (this.memoryState + valueToAdd).toFixed(5)
            );
        }
    }
    memorySubstraction(valueToSubstract) {
        if (valueToSubstract) {
            this.memoryState = parseFloat(
                (this.memoryState - valueToSubstract).toFixed(5)
            );
        }
    }
}
