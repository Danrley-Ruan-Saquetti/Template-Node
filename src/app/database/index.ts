import { PrismaClient, User as TModelUser } from '@prisma/client'
import { ErrorGeneral } from '@util/error'

export type ResultMethodData<T extends {}> = T & {
    error?: ErrorGeneral,
}

const db = new PrismaClient({
    log: ['query', 'info', 'warn', 'error']
})

async function main() {
    try {
        await db.$connect()
        console.log('[Database] Database connected successfully')
    } catch (err: any) {
        console.error('[Database] Database connection failed')
        throw new Error(err)
    }
}

main()

export { db, TModelUser }
