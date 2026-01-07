import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true

    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);