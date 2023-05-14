import { TModelUser, db } from '@database'
import { ErrorGeneral } from '@util/error'

export type TUpdateUserData = { user?: TModelUser; error?: ErrorGeneral }

export async function MUpdateUser() {
    const response: TUpdateUserData = await db.user.update({ where: {}, data: {} }).then(res => {
        return { user: res }
    }).catch((err) => {
        return {
            error: new ErrorGeneral({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }], status: 400 }),
        }
    })

    return response
}
