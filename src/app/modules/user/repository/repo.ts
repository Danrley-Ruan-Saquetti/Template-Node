import { Prisma } from '@prisma/client'
import { database } from '@database'
import { IUser } from '@module/user/schema'
import { Result } from '@util/result'
import { catchMessageError } from '@service/database-error'

type TUserGetPayload = boolean | null | undefined | { select?: Prisma.UserSelect | null }
type UserPropSelect<T extends TUserGetPayload> = UserGetPayload<T>

export type UserGetPayload<T extends boolean | null | undefined | { select?: Prisma.UserSelect | null }> = Prisma.UserGetPayload<T>
export type UserCreateArgs = Prisma.UserCreateArgs
export type UserCreateResponse = { user: IUser }
export type UserUpsertArgs = Prisma.UserUpsertArgs
export type UserUpsertResponse = { user: IUser }
export type UserUpdateArgs = Prisma.UserUpdateArgs
export type UserUpdateResponse = { user: IUser }
export type UserUpdateManyArgs = Prisma.UserUpdateManyArgs
export type UserUpdateManyResponse = Prisma.BatchPayload
export type UserCreateManyArgs = Prisma.UserCreateManyArgs
export type UserCreateManyResponse = Prisma.BatchPayload
export type UserFindFirstArgs = Prisma.UserFindFirstArgs
export type UserFindFirstResponse<T extends TUserGetPayload> = { user: UserPropSelect<T> | null }
export type UserFindFirstOrThrowArgs = Prisma.UserFindFirstOrThrowArgs
export type UserFindFirstOrThrowResponse<T extends TUserGetPayload> = { user: UserPropSelect<T> }
export type UserFindUniqueArgs = Prisma.UserFindUniqueArgs
export type UserFindUniqueResponse<T extends TUserGetPayload> = { user: UserPropSelect<T> | null }
export type UserFindUniqueOrThrowArgs = Prisma.UserFindUniqueOrThrowArgs
export type UserFindUniqueOrThrowResponse<T extends TUserGetPayload> = { user: UserPropSelect<T> }
export type UserFindManyArgs = Prisma.UserFindManyArgs
export type UserFindManyResponse<T extends TUserGetPayload> = { users: UserPropSelect<T>[] }
export type UserDeleteArgs = Prisma.UserDeleteArgs
export type UserDeleteResponse = boolean
export type UserDeleteManyArgs = Prisma.UserDeleteManyArgs
export type UserDeleteManyResponse = Prisma.BatchPayload

export const RepoUser = {
    create,
    createMany,
    upsert,
    update,
    updateMany,
    findFirst,
    findFirstOrThrow,
    findUnique,
    findUniqueOrThrow,
    findMany,
    delete: remove,
    deleteMany: removeMany,
}

async function create<T extends UserCreateArgs>(args: T) {
    const response: Result<UserCreateResponse> = await database.user.create(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Register User', message: [{ message: catchMessageError('Register User', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function createMany<T extends UserCreateManyArgs>(args: T) {
    const response: Result<UserCreateManyResponse> = await database.user.createMany(args)
        .then(res =>
            Result.success(res)
        )
        .catch(err =>
            Result.failure({ title: 'Register Users', message: [{ message: catchMessageError('Register Users', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function upsert<T extends UserUpsertArgs>(args: T) {
    const response: Result<UserUpsertResponse> = await database.user.upsert(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Update/Register User', message: [{ message: catchMessageError('Update/Register User', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function update<T extends UserUpdateArgs>(args: T) {
    const response: Result<UserUpdateResponse> = await database.user.update(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Update User', message: [{ message: catchMessageError('Update User', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function updateMany<T extends UserUpdateManyArgs>(args: T) {
    const response: Result<UserUpdateManyResponse> = await database.user.updateMany(args)
        .then(res =>
            Result.success(res)
        )
        .catch(err =>
            Result.failure({ title: 'Update Users', message: [{ message: catchMessageError('Update Users', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function findFirst<T extends UserFindFirstArgs>(args: T) {
    const response: Result<UserFindFirstResponse<T>> = await database.user.findFirst(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Find User', message: [{ message: catchMessageError('Find User', err), origin: 'user' }] }, 400)
        ) as Result<UserFindFirstResponse<T>>

    return response.getResult()
}

async function findUnique<T extends UserFindUniqueArgs>(args: T) {
    const response: Result<UserFindUniqueResponse<T>> = await database.user.findFirst(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Find User', message: [{ message: catchMessageError('Find User', err), origin: 'user' }] }, 400)
        ) as Result<UserFindUniqueResponse<T>>

    return response.getResult()
}

async function findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args: T) {
    const response: Result<UserFindFirstOrThrowResponse<T>> = await database.user.findFirstOrThrow(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Find User', message: [{ message: catchMessageError('Find User', err), origin: 'user' }] }, 400)
        ) as Result<UserFindFirstOrThrowResponse<T>>

    return response.getResult()
}

async function findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: T) {
    const response: Result<UserFindUniqueOrThrowResponse<T>> = await database.user.findFirstOrThrow(args)
        .then(res =>
            Result.success({ user: res })
        )
        .catch(err =>
            Result.failure({ title: 'Find User', message: [{ message: catchMessageError('Find User', err), origin: 'user' }] }, 400)
        ) as Result<UserFindUniqueOrThrowResponse<T>>

    return response.getResult()
}

async function findMany<T extends UserFindManyArgs>(args: T) {
    const response: Result<UserFindManyResponse<T>> = await database.user.findMany(args)
        .then(res =>
            Result.success({ users: res })
        )
        .catch(err =>
            Result.failure({ title: 'Find Users', message: [{ message: catchMessageError('Find Users', err), origin: 'user' }] }, 400)
        ) as Result<UserFindManyResponse<T>>

    return response.getResult()
}

async function remove<T extends UserDeleteArgs>(args: T) {
    const response: Result<UserDeleteResponse> = await database.user.delete(args)
        .then(res =>
            Result.success(true)
        )
        .catch(err =>
            Result.failure({ title: 'Remove User', message: [{ message: catchMessageError('Remove User', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}

async function removeMany<T extends UserDeleteManyArgs>(args: T) {
    const response: Result<UserDeleteManyResponse> = await database.user.deleteMany(args)
        .then(res =>
            Result.success(res)
        )
        .catch(err =>
            Result.failure({ title: 'Remove Users', message: [{ message: catchMessageError('Remove Users', err), origin: 'user' }] }, 400)
        )

    return response.getResult()
}