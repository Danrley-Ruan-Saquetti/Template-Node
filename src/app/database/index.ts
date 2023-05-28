import { getEnv, getFlag } from '@esliph/util'
import { Prisma, PrismaClient, User as TModelUser } from '@prisma/client'
import { dbMemory } from './memory'

const ENV = getEnv({ name: 'NODE_ENV', default: 'development' })

const logs: ('query' | 'info' | 'warn' | 'error')[] = []

if (getFlag('--debug')) {
    /* eslint no-unused-expressions: ["off"] */
    getFlag('query') && logs.push('query')
    getFlag('info') && logs.push('info')
    getFlag('warn') && logs.push('warn')
    getFlag('error') && logs.push('error')

    if (logs.length == 0) {
        logs.push('query')
        logs.push('info')
        logs.push('warn')
        logs.push('error')
    }
}

const prismaClient = new PrismaClient({ log: logs })

const dbClient = ENV == 'production' ? prismaClient : getFlag('--db') == 'memory' ? dbMemory : prismaClient

// @ts-expect-error
const database: PrismaClient<{ log: ('info' | 'query' | 'warn' | 'error')[] }, never, false> = dbClient

async function main() {
    try {
        if (database instanceof PrismaClient) {
            await database.$connect()

            console.log('[Database] Database connected successfully')
        } else {
            console.log('[Database] Database memory connected successfully')
        }
    } catch (err: Prisma.PrismaClientKnownRequestError | any) {
        console.error('[Database] Database connection failed')
        throw new Error(err)
    }
}

main()

export { database, TModelUser }
