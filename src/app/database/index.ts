import { PrismaClient, User as TModelUser } from '@prisma/client'
import { ErrorGeneral } from '@util/error'
import { dbMemory } from './memory'

export type ResultMethodData<T extends {}> = T & {
    error?: ErrorGeneral
}

const db = dbMemory || new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }) || dbMemory

async function main() {
    try {
        if (db instanceof PrismaClient) {
            await db.$connect()
            console.log('[Database] Database connected successfully')
        } else {
            // db.model('user')
            console.log('[Database] Database memory connected successfully')
        }
    } catch (err: any) {
        console.error('[Database] Database connection failed')
        throw new Error(err)
    }
}

main()

export { db, TModelUser }
