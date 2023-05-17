import { db } from '@database'
import { IUser } from '@module/user/schema'
import { Result } from '@util/result'

type TFindUsersData = { users: IUser[] }

export async function MFindUsers({ filters: { age, email, username, createAt, id } }: { filters: Omit<Partial<IUser>, 'password'> }) {
    const response: Result<TFindUsersData> = await db.user
        .findMany({ where: { age, email, username, createAt, id } })
        .then((res: IUser[]) => {
            return Result.success<TFindUsersData>({ users: res })
        })
        .catch(err => {
            return Result.failure<TFindUsersData>({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }] }, 400)
        })

    return response
}
