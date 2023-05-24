import { UserModel } from '@module/user/model'
import { IUser } from '@module/user/schema'

export async function UCUpdateUser({
    data: { age, email, username },
    where: { email: uniqueQmail, id: uniqueId },
}: {
    where: Pick<IUser, 'id' | 'email'>
    data: Omit<Partial<IUser>, 'id' | 'createAt' | 'password'>
}) {
    const responseModel = await UserModel.update({ where: { email: uniqueQmail, id: uniqueId }, data: { age, email, username } })

    return responseModel.getResult()
}
