import { Prisma } from '@prisma/client'
import { db } from '@database'
import { IUser } from '@module/user/schema'
import { Result } from '@util/result'

type TUserGetPayload = boolean | null | undefined | { select?: Prisma.UserSelect | null }
export type UserGetPayload<T extends boolean | null | undefined | { select?: Prisma.UserSelect | null }> = Prisma.UserGetPayload<T>
export type UserCreateArgs = Prisma.UserCreateArgs
export type UserCreateResponse = { user: IUser }
export type UserFindFirstArgs = Prisma.UserFindFirstArgs
export type UserFindFirstResponse<T extends TUserGetPayload> = { user: UserGetPayload<T> }
export type UserFindManyArgs = Prisma.UserFindManyArgs
export type UserFindManyResponse<T extends TUserGetPayload> = { users: UserGetPayload<T>[] }

export const RepoUser = {
    create,
    findFirst,
    findMany
}

async function create<T extends UserCreateArgs>(args: T) {
    const response: Result<T> = await db.user.create(args).then((res) => {
        return Result.success({ user: res })
    }).catch(err => {
        return Result.failure({ title: 'Register User', message: [{ message: 'Cannot register user', origin: 'user' }] }, 400)
    }) as Result<T>

    return response
}

async function findFirst<T extends UserFindFirstArgs>(args: T) {
    const response: Result<UserFindFirstResponse<T>> = await db.user.findFirst(args).then((res) => {
        return Result.success({ user: res })
    }).catch(err => {
        return Result.failure({ title: 'Find User', message: [{ message: 'Cannot find user', origin: 'user' }] }, 400)
    }) as Result<UserFindFirstResponse<T>>

    return response
}

async function findMany<T extends UserFindManyArgs>(args: T) {
    const response: Result<UserFindManyResponse<T>> = await db.user.findMany(args).then((res) => {
        return Result.success({ users: res })
    }).catch(err => {
        return Result.failure({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }] }, 400)
    }) as Result<UserFindManyResponse<T>>

    return response
}
