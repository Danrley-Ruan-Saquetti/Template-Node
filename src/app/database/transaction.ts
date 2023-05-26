import { TError } from '@@types/error'
import { PrismaPromise } from '@prisma/client'
import { Result } from '@util/result'
import { database } from '.'

export async function transaction<T>(handler: PrismaPromise<T>, error: { info: TError; status: number }) {
    try {
        const res = await database.$transaction([handler])

        return Result.success<T>(res[0])
    } catch (err) {
        return Result.failure<T>(error.info, error.status)
    }
}
