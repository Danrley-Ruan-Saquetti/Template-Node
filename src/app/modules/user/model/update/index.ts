import { TModelUser, db } from '@database'
import { Result } from '@util/result'

type TUpdateUserData = { user: TModelUser }

export async function MUpdateUser() {
    const response: Result<TUpdateUserData> = await db.user
        .update({ where: {}, data: {} })
        .then(res => {
            return Result.success<TUpdateUserData>({ user: res })
        })
        .catch(err => {
            return Result.failure<TUpdateUserData>({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }] }, 400)
        })

    return response
}
