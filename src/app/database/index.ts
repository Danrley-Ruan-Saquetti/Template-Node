import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { newLocalDB } from './local.db'
import { Observer, useObserver } from '../util/observer'
dotenv.config()

mongoose.Promise = global.Promise

const DB_DRIVER = process.env.DB_DRIVER || ''
const DB_HOST = process.env.DB_HOST || ''
const DB_PORT = process.env.DB_PORT || ''
const DB_SCHEMA = process.env.DB_SCHEMA || ''

type ID = mongoose.Schema.Types.ObjectId | null | string

const observer = useObserver()
// @ts-expect-error
let db: typeof mongoose = newLocalDB()

function onError() {
	console.log('[Database] Database local started')
	// @ts-expect-error
	db = newLocalDB()
}


function subscribeObs(obs: Observer) {
	observer.subscribeObserver(obs)
}

function newConnection() {
	try {
		mongoose
			.connect(`${DB_DRIVER}://${DB_HOST}:${DB_PORT}/${DB_SCHEMA}`).then(res => {
				db = mongoose
				observer.notifyObs({ code: '$database/connection/success' })
				console.log('[Database] Database started')
			})
			.catch((err) => {
				console.log('[Database] Database failed connection')
				observer.notifyObs({ code: '$database/connection/failed' })
				onError()
			})

	} catch (err) {
		console.log('[Database] Database lose connection')
		onError()
	}
}

newConnection()

export { db, ID, subscribeObs }
