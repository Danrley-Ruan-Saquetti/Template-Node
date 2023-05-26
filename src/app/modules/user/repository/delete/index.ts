import { RepoUser, UserDeleteArgs } from '@module/user/repository/repo'

export async function RepoDeleteUser(args: UserDeleteArgs) {
    const response = await RepoUser.delete(args)

    return response
}