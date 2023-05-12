import { IUCFunction } from '../../../uc'
import { MRegisterUser, MRegisterUserData } from '../../model/register'
import { IUser } from '../../schema'
import { _formatterUser } from '../../util/formatter'

export const UCRegisterUser: IUCFunction<MRegisterUserData> = async ({ email, username, password, age }: IUser) => {
    const userBody = { email, username, password, age }

    const resParse = _formatterUser(userBody)

    if (resParse.error || !resParse.data) {
        return { data: resParse, status: resParse.error?.status || 400 }
    }

    const responseRegister = await MRegisterUser(resParse.data)

    if (responseRegister.error) {
        return { data: responseRegister, status: responseRegister.error.status }
    }

    const { user } = responseRegister

    return { status: 200, data: { user } }
}
