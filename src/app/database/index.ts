import db from "mongoose"
import dotenv from "dotenv"
dotenv.config()

type ID = db.Schema.Types.ObjectId | null

db.connect(process.env.DB_URL_CONNECTION || "")
db.Promise = global.Promise

export { db, ID }
