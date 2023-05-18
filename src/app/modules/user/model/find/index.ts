import { db } from '@database'
import { IUser } from '@module/user/schema'
import { Result } from '@util/result'

type TFindData<U, T extends { [k in keyof U]?: boolean }> = {
    [key in keyof T]: key extends keyof T ? U[key] extends true ? U[key] : undefined : undefined
}

export async function MFindUsers({
    filters: { age: _ageF, email: _emailF, username: _usernameF, createAt: _createAtF, id: _idF },
    select = { age: true, createAt: true, email: true, id: true, username: true },
}: {
    filters: Omit<Partial<IUser>, 'password'>
    select?: { [K in keyof Partial<IUser>]: boolean }
}) {
    const { age: _ageS, email: _emailS, username: _usernameS, createAt: _createAtS, id: _idS } = select

    type TFindUsersData = { users: TFindData<IUser, typeof select>[] }

    const response: Result<TFindUsersData> = await db.user
        .findMany({
            where: { age: _ageF, email: _emailF, username: _usernameF, createAt: _createAtF, id: _idF },
            select,
        })
        .then(res => {
            return Result.success<TFindUsersData>({ users: res })
        })
        .catch(err => {
            return Result.failure<TFindUsersData>({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }] }, 400)
        })

    return response
}

type IA = {
    username: string
    email: string
    age: number
}

type ExtractProps<U, T> = {
    // @ts-expect-error
    [key in keyof T]: key extends keyof T ? U[key] : undefined
}

const propsVale = {
    username: true,
}

type IUserResult = ExtractProps<IA, typeof propsVale>

const select = { username: true, age: false }

type TFindUsersData = { users: TFindData<IUser, typeof select>[] }

const a: TFindUsersData = {
    users: [],
}