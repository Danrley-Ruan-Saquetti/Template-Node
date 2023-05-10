import { TDBUser, UserModel } from '..'
import { ErrorGeneral } from '../../../../util/error'
import { IUser } from '../../schema'

export async function MRegisterUser({ email, name }: IUser) {
    const response: { user?: TDBUser, error?: ErrorGeneral } = await UserModel.create({ email, name }).then(res => {
        return { user: res }
    }).catch(err => {
        return { error: new ErrorGeneral({ title: 'Register User', message: [{ message: 'Cannot register user', origin: 'users' }], status: 400 }) }
    })

    return response
}