import { RepoFindUsers } from './find'
import { RepoCreateUser } from './create'
import { RepoUpdateUser } from './update'

export const UserModel = {
    findMany: RepoFindUsers,
    create: RepoCreateUser,
    update: RepoUpdateUser,
}
