import { MFindUsers, TFindUsersData } from './find'
import { MCreateUser, TCreateUserData } from './create'

export {
    TFindUsersData,
    TCreateUserData
}

export const UserModel = {
    findMany: MFindUsers,
    create: MCreateUser
}