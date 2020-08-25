export const TYPES = {
    TEXT: "Text",
    TIME: "Time",
    API: "API",
    SCRIPT: "Script"
}

class Textbox {
    constructor(key) {
        this.key = key
        this.data = {
            type: TYPES.TEXT,

            data: "Enter Text..."
        }
    }
}

export default Textbox