import { IUCFunction } from '@@types/use-case'
import { TFindUsersData, UserModel } from '@module/user/model'
import { IUser } from '@module/user/schema'

export const UCListUsers: IUCFunction<TFindUsersData> = async ({ email, username, age }: Partial<IUser>) => {
    const response = await UserModel.findMany({ filters: { email, username, age } })

    if (response.error) {
        return { data: { ...response }, status: response.error.status }
    }

    const { users } = response

    return { status: 200, data: { users } }
}
