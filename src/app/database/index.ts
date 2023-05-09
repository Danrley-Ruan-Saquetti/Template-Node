// import db from "mongoose"
// import dotenv from "dotenv"
// dotenv.config()

import { newLocalDB } from "./local.db";

// type ID = db.Schema.Types.ObjectId | null

// db.connect(process.env.DB_URL_CONNECTION || "")
// db.Promise = global.Promise

type ID = String | null;

const db = newLocalDB();

export { db, ID };
