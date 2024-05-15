import mongoose, { Schema, Document, Types } from "mongoose";
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

// cambio de Itask a User
export interface IUser extends Document {
    name: string
    email: string
    password: string
    confirmedPassword: string

}
export const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    confirmedPassword: {
        type: String,
        required: true


    }
}, { timestamps: true });

const User = mongoose.model<IUser>('User', UserSchema);
export default User;