import { IUCFunction } from "../../../uc"
import { IUser } from "../../schema"
import { _formatterUser } from "../../util/formatter"

export const UCRegisterUser: IUCFunction = ({ email, name }: IUser) => {
    const user = { email, name }

    const resParse = _formatterUser(user)

    if (resParse.error) {
        return { data: resParse, status: 400 }
    }

    return { status: 200, data: { user } }
}
