import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

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

export { db }
