import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { newConnectionLocalDatabase } from '../features/memory'
dotenv.config()

mongoose.Promise = global.Promise

const DB_DRIVER = process.env.DB_DRIVER || ''
const DB_HOST = process.env.DB_HOST || ''
const DB_PORT = process.env.DB_PORT || ''
const DB_SCHEMA = process.env.DB_SCHEMA || ''

const environment = process.env.ENVINROMENT || ''

const DB_URL = `${DB_DRIVER}://${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`

type ID = mongoose.Schema.Types.ObjectId | null | string

async function connectDB() {
    try {
        await mongoose
            .connect(DB_URL)
            .then(res => {
                console.log('[Database] Database started')
            })
            .catch(async (err) => {
                console.log('[Database] Database failed connection')
            })
        return mongoose
    } catch (err) {
        console.log('[Database] Database failed connection')
        return mongoose
    }
}

async function connectLocalDB() {
    const connect = await newConnectionLocalDatabase()

    return connect
}

// function newConnection() {
//         // if (environment == 'DEVELOPMENT') {
//         //     const conn = await connectLocalDB()

//         //     return conn
//         // }

//         const conn = await connectDB()

//         return conn
// }

const db: typeof mongoose = mongoose

export { db, ID }
