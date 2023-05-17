import { UserModel } from '@module/user/model'
import { IUser } from '@module/user/schema'

export const UCListUsers = async ({ age, email, username, createAt, id }: Omit<Partial<IUser>, 'password'>) => {
    const response = await UserModel.findMany({ filters: { age, email, username, createAt, id } })

    return response.getResult()
}
