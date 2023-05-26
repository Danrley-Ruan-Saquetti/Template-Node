import { RepoFindUsers } from './find'
import { RepoCreateUser } from './create'
import { RepoUpdatePasswordUser, RepoUpdateUser } from './update'
import { RepoDeleteUser } from './delete'

export const UserModel = {
    findMany: RepoFindUsers,
    create: RepoCreateUser,
    update: RepoUpdateUser,
    updatePassword: RepoUpdatePasswordUser,
    delete: RepoDeleteUser
}
