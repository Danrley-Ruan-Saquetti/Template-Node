import { IUCFunction } from '../../../uc'
import { MListUsers, MListUsersData } from '../../model/list'
import { IUser } from '../../schema'

export const UCListUsers: IUCFunction<MListUsersData> = async ({ filters: { email, username } }: { filters: Partial<IUser> }) => {
    const response = await MListUsers({ email, username })

    if (response.error) {
        return { data: { ...response }, status: response.error.status }
    }

    const { users } = response

    return { status: 200, data: { users } }
}
