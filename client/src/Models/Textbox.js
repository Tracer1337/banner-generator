import { COLORS } from "../config/constants.js"

export const TYPES = {
    TEXT: "Text",
    TIME: "Time"
}

class Textbox {
    constructor(key) {
        this.key = key
        this.data = {
            type: TYPES.TEXT,

            data: "Enter Text...",

            position: {
                x: 0,
                y: 0
            },

            dimensions: {
                width: 100,
                height: 50
            },

            typography: {
                fontSize: 16,
                color: COLORS["Black"]
            }
        }
    }
}

export default Textbox