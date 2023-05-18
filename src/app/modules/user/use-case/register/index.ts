import { UserModel } from '@module/user/model'
import { IUserDataRequest } from '@module/user/schema'
import { _formatterUser } from '@module/user/util/formatter'

export const UCRegisterUser = async ({ email, username, password, age }: IUserDataRequest) => {
    const userBody = await _formatterUser.requestData({ email, username, password, age })

    if (!userBody.isSuccess()) {
        return { data: userBody.getResult(), status: userBody.getStatus() }
    }

    const databaseBody = await _formatterUser.inDatabase(userBody.getResponse())

    if (!databaseBody.isSuccess()) {
        return { data: databaseBody.getResult(), status: databaseBody.getStatus() }
    }

    const responseRegister = await UserModel.create(databaseBody.getResponse())

    if (!responseRegister.isSuccess()) {
        return { data: responseRegister.getResult(), status: responseRegister.getStatus() }
    }

    const databaseOut = await _formatterUser.outDatabase(responseRegister.getResponse().user)

    return { status: databaseOut.getStatus(), data: databaseOut.getResult() }
}
