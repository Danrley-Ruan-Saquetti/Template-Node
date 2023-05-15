import { IUCFunction } from '@@types/use-case'
import { UserModel } from '@module/user/model'
import { IUser, IUserDataRequest } from '@module/user/schema'
import { _formatterUser } from '@module/user/util/formatter'

export const UCRegisterUser: IUCFunction<{ user: IUser }> = async ({ email, username, password, age }: IUserDataRequest) => {
    const userBody = _formatterUser.requestData({ email, username, password, age })

    if (userBody.error || !userBody.data) {
        return { data: userBody, status: userBody.error?.status || 400 }
    }

    const databaseBody = _formatterUser.inDatabase(userBody.data)

    if (databaseBody.error || !databaseBody.data) {
        return { data: databaseBody, status: userBody.error?.status || 400 }
    }

    const responseRegister = await UserModel.create(databaseBody.data)

    if (responseRegister.error) {
        return { data: responseRegister, status: responseRegister.error.status }
    }

    const databaseOut = _formatterUser.outDatabase(responseRegister.user)

    if (databaseOut.error || !databaseOut.data) {
        return { data: databaseOut, status: userBody.error?.status || 400 }
    }

    return { status: 200, data: databaseOut.data }
}
