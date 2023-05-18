import { TModelUser } from '@database'
import { UserModel } from '@module/user/model'

export async function UCUpdateUser({
    data: { age, email, username },
    where: { email: uniqueQmail, id: uniqueId },
}: {
    where: Pick<TModelUser, 'id' | 'email'>
    data: Omit<Partial<TModelUser>, 'id' | 'createAt' | 'password'>
}) {
    const responseModel = await UserModel.update({ where: { email: uniqueQmail, id: uniqueId }, data: { age, email, username } })

    return responseModel.getResult()
}
