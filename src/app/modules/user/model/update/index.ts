import { TModelUser, db } from '@database'
import { Result } from '@util/result'

type TUpdateUserData = { user: TModelUser }

export async function MUpdateUser({ data, where }: { where: Pick<TModelUser, 'id' | 'email'>; data: Omit<Partial<TModelUser>, 'id' | 'createAt'> }) {
    const newData = { age: data.age, email: data.email, password: data.password, username: data.username }
    const filter = { id: where.id, email: where.email }

    const response: Result<TUpdateUserData> = await db.user
        .update({ where: filter, data: newData })
        .then(res => {
            return Result.success<TUpdateUserData>({ user: res })
        })
        .catch(err => {
            return Result.failure<TUpdateUserData>({ title: 'Find Users', message: [{ message: 'Cannot find users', origin: 'users' }] }, 400)
        })

    return response
}
