import { IUCFunction } from '@@types/use-case'
import { UserModel } from '@module/user/model'
import { IUser } from '@module/user/schema'
import { _formatterUser } from '@module/user/util/formatter'

export const UCRegisterUser: IUCFunction<{ user: IUser }> = async ({ email, username, password, age }: IUser) => {
    const userBody = { email, username, password, age }

    const resParse = _formatterUser(userBody)

    if (resParse.error || !resParse.data) {
        return { data: resParse, status: resParse.error?.status || 400 }
    }

    const responseRegister = await UserModel.create(resParse.data)

    if (responseRegister.error) {
        return { data: responseRegister, status: responseRegister.error.status }
    }

    const { user } = responseRegister

    return { status: 200, data: { user } }
}
