import { database } from '@database'
import { IUser, IUserDataRequest } from '@module/user/schema'
import { Result } from '@util/result'

type TCreateUserData = { user: IUser }

export async function RepoCreateUser({ email, username, age, password }: IUserDataRequest) {
    const response: Result<TCreateUserData> = await database.user
        .create({ data: { email, username, age, password } })
        .then((res: IUser) => {
            return Result.success<TCreateUserData>({ user: res })
        })
        .catch(err => {
            return Result.failure<TCreateUserData>({ title: 'Register User', message: [{ message: 'Cannot register user', origin: 'users' }] }, 400)
        })

    return response
}
