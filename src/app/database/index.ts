import { PrismaClient, User as TModelUser } from '@prisma/client'
import { z } from 'zod'
import { ErrorGeneral } from '@util/error'
import { dbMemory } from './memory'

type ISchemaDefault = z.infer<typeof SchemaDefault>
export type ResultMethodData<T extends {}> = T & {
    error?: ErrorGeneral
}

const db = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] }) || dbMemory

const SchemaDefault = z.object({
    id: z.number(),
    createAt: z.optional(z.date()).default(new Date(Date.now())),
})

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

export { db, TModelUser, ISchemaDefault, SchemaDefault }
