import mongoose, {Schema, Document, Types} from "mongoose";

const taskStatus = {
    PENDING: 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const  // This is a TypeScript feature called const assertion

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]// This is a TypeScript feature called indexed access types

export interface ITask extends Document  {
    name: string
    description: string
    project:  Types.ObjectId  // This is a reference to the Project model
    status: TaskStatus
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    description: {
        type: String, 
        required: true,
        trim: true
    },
    project: {
        type: Types.ObjectId, 
        ref: 'Project'
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),// This is a TypeScript feature called mapped types
        default: taskStatus.PENDING
    }
}, {timestamps: true});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;