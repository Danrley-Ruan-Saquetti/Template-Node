import { UserModel } from '@module/user/model'
import { IUserDataRequest } from '@module/user/schema'
import { _formatterUser } from '@module/user/util/formatter'

export const UCRegisterUser = async ({ email, username, password, age }: IUserDataRequest) => {
    const userBody = await _formatterUser.requestData({ email, username, password, age })

    if (userBody.data.error) {
        return { data: userBody, status: userBody.data.error?.status || 400 }
    }

    const databaseBody = await _formatterUser.inDatabase(userBody.data)

    if (databaseBody.data.error || !databaseBody.data) {
        return { data: databaseBody, status: databaseBody.error?.status || 400 }
    }

    const responseRegister = await UserModel.create(databaseBody.data)

    if (responseRegister.error) {
        return { data: responseRegister, status: responseRegister.error?.status || 400 }
    }

    const databaseOut = await _formatterUser.outDatabase(responseRegister.user)

    if (databaseOut.data.error) {
        return { data: databaseOut, status: databaseOut.data.error?.status || 400 }
    }

    return { status: 200, data: databaseOut.data }
}
