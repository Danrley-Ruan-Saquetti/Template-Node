import { IUCFunction } from '@@types/use-case'
import { UserModel } from '@module/user/model'
import { IUser, IUserDataRequest } from '@module/user/schema'
import { _formatterUser } from '@module/user/util/formatter'

export const UCRegisterUser: IUCFunction<{ user: IUser }> = async ({ email, username, password, age }: IUserDataRequest) => {
    const userBody = await _formatterUser.requestData({ email, username, password, age })

    if (userBody.error || !userBody.data) {
        return { data: userBody, status: userBody.error?.status || 400 }
    }

    const databaseBody = await _formatterUser.inDatabase(userBody.data)

    if (databaseBody.error || !databaseBody.data) {
        return { data: databaseBody, status: databaseBody.error?.status || 400 }
    }

    const responseRegister = await UserModel.create(databaseBody.data)

    if (responseRegister.error || !responseRegister.user) {
        return { data: responseRegister, status: responseRegister.error?.status || 400 }
    }

    const databaseOut = await _formatterUser.outDatabase(responseRegister.user)

    if (databaseOut.error || !databaseOut.data) {
        return { data: databaseOut, status: databaseOut.error?.status || 400 }
    }

    return { status: 200, data: databaseOut.data }
}
