import { UserModel } from '@module/user/repository'
import { IUserDataRequest } from '@module/user/schema'
import { formatterUser } from '@module/user/util/formatter'

export async function UCRegisterUser({ email, username, password, age }: IUserDataRequest) {
    const userBody = await formatterUser.requestData({ email, username, password, age })

    if (!userBody.isSuccess()) {
        return { data: userBody.getResult(), status: userBody.getStatus() }
    }

    const databaseBody = await formatterUser.inDatabase(userBody.getResponse())

    if (!databaseBody.isSuccess()) {
        return { data: databaseBody.getResult(), status: databaseBody.getStatus() }
    }

    const responseRegister = await UserModel.create({ data: databaseBody.getResponse() })

    if (!responseRegister.ok) {
        return { data: responseRegister, status: responseRegister.status }
    }

    const databaseOut = await formatterUser.outDatabase(responseRegister.value.user)

    return { status: databaseOut.getStatus(), data: databaseOut.getResult() }
}
