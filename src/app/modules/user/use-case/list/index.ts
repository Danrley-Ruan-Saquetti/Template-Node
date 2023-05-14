import { IUCFunction } from '@@types/use-case'
import { MListUsers, MListUsersData } from '@module/user/model/list'
import { IUser } from '@module/user/schema'

export const UCListUsers: IUCFunction<MListUsersData> = async ({ email, username, age, password }: Partial<IUser>) => {
    const response = await MListUsers({ filters: { email, username, age, password } })

    if (response.error) {
        return { data: { ...response }, status: response.error.status }
    }

    const { users } = response

    return { status: 200, data: { users } }
}
