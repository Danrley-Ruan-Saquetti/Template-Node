// import { IUser } from "../schema";
import { db } from "../../../database";
// import mongoose from "mongoose"

export interface TDBUser {
  createAt?: Date | null;
}

// const UserSchema = new mongoose.Schema<TDBUser>({
//     name: {
//         type: String,
//         require: true
//     },
//     email: {
//         type: String,
//         require: true
//     },
//     createAt: {
//         type: Date,
//         default: new Date(Date.now())
//     }
// })

// export const UserModel = db.model("User", UserSchema)

export const UserModel = db.newCollection("User");
