import { UserModel } from '@module/user/repository'
import { IUser } from '@module/user/schema'

export async function UCUpdateUser({
    data: { age, email, username },
    where: { id: uniqueId },
}: {
    where: Pick<IUser, 'id'>
    data: Omit<Partial<IUser>, 'id' | 'createAt' | 'password'>
}) {
    const responseModel = await UserModel.update({ where: { id: uniqueId }, data: { age, email, username } })

    return responseModel
}
