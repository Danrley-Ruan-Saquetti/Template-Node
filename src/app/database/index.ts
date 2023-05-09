import mongoose from "mongoose";
import dotenv from "dotenv";
import { newLocalDB } from "./local.db";
dotenv.config();

mongoose.Promise = global.Promise;

const DB_DRIVER = process.env.DB_DRIVER || "";
const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = process.env.DB_PORT || "";
const DB_SCHEMA = process.env.DB_SCHEMA || "";

type ID = mongoose.Schema.Types.ObjectId | null | String;

let db: typeof mongoose;

function onError() {
  console.log(`[Database] Database local started`);
  // @ts-expect-error
  db = newLocalDB();
}

function newConnection() {
  try {
    mongoose
      .connect(`${DB_DRIVER}://${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`)
      .catch((err) => {
        console.log(`[Database] Database lose connection`);
        onError();
      });

    console.log(`[Database] Database started`);

    db = mongoose;
  } catch (err) {
    console.log(`[Database] Database lose connection`);
    onError();
  }
}

newConnection();

export { db, ID };
