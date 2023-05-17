import { db, ResultMethodData } from '@database'
import { IUser } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type TFindUsersData = ResultMethodData<{ users?: IUser[] }>

export async function MFindUsers({ filters: { age, email, username, createAt, id } }: { filters: Omit<Partial<IUser>, 'password'> }) {
    const response: TFindUsersData = await db.user
        .findMany({ where: { age, email, username, createAt, id } })
        .then((res: IUser[]) => {
            return { users: res }
        })
        .catch(err => {
            return {
                error: new ErrorGeneral({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }], status: 400 }),
            }
        })

    return response
}
