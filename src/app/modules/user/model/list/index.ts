import { ErrorGeneral } from '../../../../util/error'
import { UserModel } from '../../model'
import { IUser } from '../../schema'

export async function MListUsers({ email, name, age, password, techs }: Partial<IUser>) {
    const response: { users?: IUser[]; error?: ErrorGeneral } = await UserModel.find({ email, name, age, password, techs })
        .then((res: IUser[]) => {
            return { users: res }
        })
        .catch(err => {
            return {
                error: new ErrorGeneral({ title: 'List Users', message: [{ message: 'Cannot list users', origin: 'users' }], status: 400 }),
            }
        })

    return response
}
