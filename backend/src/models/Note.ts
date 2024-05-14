import mongoose, { Schema, Document, Types } from "mongoose";
import Task from "./Task";
import User from "./User";

/*
const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const  // This is a TypeScript feature called const assertion

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]// This is a TypeScript feature called indexed access types
*/
// Note debe estar relacionado con User y Task
export interface INote extends Document {
    content: string
    createBy: string
    //project: Types.ObjectId  // This is a reference to the Project model
    task: string
}

export const NoteSchema: Schema = new Schema({
    content: {
        type: String,
        required: true,
    },
    createBy: {
        type: String,
        required: true,
        ref: 'User'
    },
    task: {
        type: Types.ObjectId,
        ref: 'Task'
    },
}, { timestamps: true });

const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;