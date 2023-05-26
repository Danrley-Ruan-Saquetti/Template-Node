import { RepoUser } from '@module/user/repository/repo'
import { IUser } from '@module/user/schema'

export async function RepoUpdateUser({ data, where }: { where: Pick<IUser, 'id'>; data: Omit<Partial<IUser>, 'id' | 'createAt' | 'password'> }) {
    const response = await RepoUser.update({ where: { id: where.id }, data: { age: data.age, email: data.email, username: data.username } })

    return response
}

export async function RepoUpdatePasswordUser({ data, where }: { where: Pick<IUser, 'id'>; data: Pick<IUser, 'password'> }) {
    const response = await RepoUser.update({ where: { id: where.id }, data: { password: data.password } })

    return response
}
