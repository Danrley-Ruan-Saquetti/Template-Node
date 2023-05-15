import { IUCFunction } from '@@types/use-case'
import { UserModel } from '@module/user/model'
import { IUser } from '@module/user/schema'

export const UCListUsers: IUCFunction<{ users: IUser[] }> = async ({ age, email, username, createAt, id }: Omit<Partial<IUser>, 'password'>) => {
    const response = await UserModel.findMany({ filters: { age, email, username, createAt, id } })

    if (response.error) {
        return { data: { ...response }, status: response.error.status }
    }

    const { users } = response

    return { status: 200, data: { users } }
}
