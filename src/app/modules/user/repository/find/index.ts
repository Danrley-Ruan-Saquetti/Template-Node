import { RepoUser, UserFindFirstArgs, UserFindManyArgs } from '@module/user/repository/repo'

export async function RepoFindUsers(args: UserFindManyArgs) {
    const response = await RepoUser.findMany(args)

    return response
}

export async function RepoFindUser<T extends UserFindFirstArgs>(args: T) {
    const response = await RepoUser.findFirst<T>(args)

    return response
}