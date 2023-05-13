import { db } from '@database'
import { IUser } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'

export type MRegisterUserData = { user?: IUser; error?: ErrorGeneral }

export async function MRegisterUser({ email, username, age, password }: IUser) {
    const response: MRegisterUserData = await db.user
        .create({ data: { email, username, age, password } })
        .then((res: IUser) => {
            return { user: res }
        })
        .catch((err) => {
            return { error: new ErrorGeneral({ title: 'Register User', message: [{ message: 'Cannot register user', origin: 'users' }], status: 400 }) }
        })

    return response
}
