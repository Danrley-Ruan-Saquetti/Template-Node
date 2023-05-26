import { UserModel } from '@module/user/repository'
import { IUser } from '@module/user/schema'

export async function UCListUsers({ age, email, username, createAt, id }: Omit<Partial<IUser>, 'password'>) {
    const response = await UserModel.findMany({ where: { age, email, username, createAt, id }, select: { id: true, username: true, email: true, age: true, createAt: true } })

    return response
}
