import { MListUsers } from '@module/user/model/list'
import { UCListUsers } from '@module/user/use-cases/list'
import { UCRegisterUser } from '@module/user/use-cases/register'
import { TRouterPath } from '@@types/router'

const userBaseURL = 'users'
const routersUser: TRouterPath[] = [
    {
        type: 'get',
        url: '/',
        listener: async ({ body }) => {
            const response = await UCListUsers(body)

            return response
        },
    },
    {
        type: 'post',
        url: '/register',
        listener: async ({ body }) => {
            const response = await UCRegisterUser(body)

            return response
        },
    },
]

export { routersUser, userBaseURL }
