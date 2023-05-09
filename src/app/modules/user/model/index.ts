import { db } from "../../../database"
import mongoose from "mongoose"
import { IUser } from "../schema"

export interface TDBUser extends mongoose.Document, IUser {
    createAt?: Date | null
}

const UserSchema = new mongoose.Schema<TDBUser>({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: new Date(Date.now())
    }
})

export const UserModel = db.model("User", UserSchema)