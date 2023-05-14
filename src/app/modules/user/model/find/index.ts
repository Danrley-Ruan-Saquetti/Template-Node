import { db } from '@database'
import { IUser } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type TFindUsersData = { users?: IUser[]; error?: ErrorGeneral }

export async function MFindUsers({ filters }: { filters: Omit<Partial<IUser>, 'password'>, caseSensitive?: boolean }) {
    const response: TFindUsersData = await db.user.findMany({ where: filters }).then((res: IUser[]) => {
        return { users: res }
    }).catch((err) => {
        return {
            error: new ErrorGeneral({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }], status: 400 }),
        }
    })

    return response
}
