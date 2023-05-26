import { RepoUser, UserFindFirstArgs, UserFindManyArgs, UserFindUniqueArgs } from '@module/user/repository/repo'

export async function RepoFindUsers<T extends UserFindManyArgs>(args: T) {
    const response = await RepoUser.findMany<T>(args)

    return response
}

export async function RepoFindUser<T extends UserFindFirstArgs>(args: T) {
    const response = await RepoUser.findFirst<T>(args)

    return response
}

export async function RepoFindUserByUnique<T extends UserFindUniqueArgs>(args: T) {
    const response = await RepoUser.findUnique<T>(args)

    return response
}