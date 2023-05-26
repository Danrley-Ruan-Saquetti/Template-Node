import { UserModel } from '@module/user/repository'

export async function UCDeleteUser({ id }: { id: number }) {
    const response = await UserModel.delete({ where: { id } })

    return response
}