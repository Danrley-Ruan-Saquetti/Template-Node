import { db } from "../../../database"

export interface TDBUser extends db.Document {
    username: String
    email: String
    createAt?: Date | null
}

const UserSchema = new db.Schema<TDBUser>({})

export const UserModel = db.model("User", UserSchema)
