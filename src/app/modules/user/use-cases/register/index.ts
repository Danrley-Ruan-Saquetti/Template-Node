import { IUCFunction } from "../../../uc"
import { MRegisterUser } from "../../model/register"
import { IUser } from "../../schema"
import { _formatterUser } from "../../util/formatter"

export const UCRegisterUser: IUCFunction = async ({ email, name }: IUser) => {
    const userBody = { email, name }

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