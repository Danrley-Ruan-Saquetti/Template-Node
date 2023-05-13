import { db } from '@database'
import { IUser } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type MListUsersData = { users?: IUser[]; error?: ErrorGeneral }

export async function MListUsers({ email, username, age, password }: Partial<IUser>) {
    const response: MListUsersData = await db.user
        .findMany({ where: { email, username, age, password } })
        .then((res: IUser[]) => {
            return { users: res }
        })
        .catch((err) => {
            return {
                error: new ErrorGeneral({ title: 'List Users', message: [{ message: 'Cannot list users', origin: 'users' }], status: 400 }),
            }
        })

    return response
}
