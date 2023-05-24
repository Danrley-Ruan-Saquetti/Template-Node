import { Prisma, user } from '@prisma/client'
import { db } from '@database'
import { Result } from '@util/result'
import { IUser } from '@module/user/schema'

type TModels = Prisma.userDelegate<false> | Prisma.testDelegate<false>

type TArgs = {
    'user': {
        createArgs: Prisma.userCreateArgs,
        createArgsResponse: user,
        findFirstArgs: Prisma.userFindFirstArgs,
        findFirstArgsResponse: Prisma.userFindFirstArgs,
    }
}

export const RepoUser = Repository('user', db.user)

export function Repository(modelName: Prisma.ModelName, repo: TModels) {

    async function create(args: any) {
        const response: Result = await repo.create(args).then((res) => {
            return Result.success(res)
        }).catch(err => {
            return Result.failure({ title: 'Register User', message: [{ message: `Cannot register "${modelName}"`, origin: `${modelName}` }] }, 400)
        })

        return response
    }

    // async function findFirst(args: Prisma.UserFindFirstArgs) {
    //     const response: Result<{ user: User }> = await db.user.findFirst(args).then((res) => {
    //         if (!res) {
    //             return Result.failure<{ user: User }>({ title: 'Find Users', message: [{ message: `Cannot find "${modelName}"`, origin: `${modelName}` }] }, 400)
    //         }

    //         return Result.success({ user: res })
    //     }).catch(err => {
    //         return Result.failure<{ user: User }>({ title: 'Find Users', message: [{ message: `Cannot find "${modelName}`, origin: `${modelName}` }] }, 400)
    //     })

    //     return response
    // }

    return {
        create,
        // findFirst
    }
}