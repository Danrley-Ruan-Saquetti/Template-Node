import { MFindUsers } from './find'
import { MCreateUser } from './create'
import { MUpdateUser } from './update'

export const UserModel = {
    findMany: MFindUsers,
    create: MCreateUser,
    update: MUpdateUser,
}
