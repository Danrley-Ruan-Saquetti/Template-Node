import { IUCFunction } from '@@types/use-case'
import { MListUsers, MListUsersData } from '@module/user/model/list'
import { IUser } from '@module/user/schema'

export const UCListUsers: IUCFunction<MListUsersData> = async ({ filters: { email, username } }: { filters: Partial<IUser> }) => {
    const response = await MListUsers({ email, username })

    if (response.error) {
        return { data: { ...response }, status: response.error.status }
    }

    const { users } = response

    return { status: 200, data: { users } }
}
