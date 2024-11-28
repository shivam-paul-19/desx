import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last_updated: {
        type: Date
    },
    canvas_state: {
        type: Object
    }
});

export const Canvas = mongoose.model("Canvas", canvasSchema);