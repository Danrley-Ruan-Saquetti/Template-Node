import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

// @ts-expect-error
export async function newConnectionLocalDatabase(): typeof mongoose {
    const connection = await MongoMemoryServer.create()

    const uri = connection.getUri()

    await mongoose.connect(uri).then(res => {
        console.log('[Database] Database local started')
    }).catch(err => {
        console.log('[Database] Database local failed connection')
        console.log(err)
    })

    // @ts-expect-error
    return connection
}