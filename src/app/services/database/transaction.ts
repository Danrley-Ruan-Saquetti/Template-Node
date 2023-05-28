import { database } from '@database'
import { PrismaPromise } from '@prisma/client'
import { Result, TError } from '@esliph/util'

export async function transaction<T>(handler: PrismaPromise<T>, error: { info: TError; status: number }) {
    try {
        const res = await database.$transaction([handler])

        return Result.success<T>(res[0])
    } catch (err) {
        return Result.failure<T>(error.info, error.status)
    }
}
