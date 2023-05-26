import { RepoUser, UserCreateArgs } from '../repo'

export async function RepoCreateUser(args: UserCreateArgs) {
    const response = await RepoUser.create(args)

    return response
}
