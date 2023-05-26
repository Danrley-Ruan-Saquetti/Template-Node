import { Prisma, PrismaClient, User as TModelUser } from '@prisma/client'
import { dbMemory } from './memory'
import { getEnv } from '@util/var-env'

const database =
    new PrismaClient({
        log: getEnv({ name: 'ENVIRONMENT', default: 'DEVELOPMENT' }) == 'PRODUCTION' ? [] : [{ level: 'query', emit: 'event' }, 'info', 'warn', 'error'],
    }) || dbMemory

async function main() {
    try {
        if (database instanceof PrismaClient) {
            await database.$connect()

            if (getEnv({ name: 'ENVIRONMENT', default: 'DEVELOPMENT' }) == 'DEVELOPMENT') {
                database.$on('query', e => {})
            }

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


database.$queryRaw``

export { database, TModelUser }
