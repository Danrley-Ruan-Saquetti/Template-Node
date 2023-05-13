import { db } from '../../../../database'
import { ErrorGeneral } from '../../../../util/error'
import { IUser } from '../../schema'

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
