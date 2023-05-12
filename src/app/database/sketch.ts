import db from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

db.Promise = global.Promise

const DB_DRIVER = process.env.DB_DRIVER || ''
const DB_HOST = process.env.DB_HOST || ''
const DB_PORT = process.env.DB_PORT || ''
const DB_SCHEMA = process.env.DB_SCHEMA || ''

const environment = process.env.ENVINROMENT || ''

const DB_URL = `${DB_DRIVER}://${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`

type ID = db.Schema.Types.ObjectId | null | string

async function newConnection() {
    console.log('[Database] Connecing...')

    try {
        await db.connect(DB_URL)
        console.log('[Database] Database started')
    } catch (err) {
        console.log('[Database] Database failed connection')
    }
}

newConnection()

export { db, ID }
