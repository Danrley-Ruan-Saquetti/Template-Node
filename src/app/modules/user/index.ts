import { UserController } from '@module/user/use-case'
import { TRouterPath } from '@@types/router'

const userBaseURL = 'users'
const routersUser: TRouterPath[] = [
    {
        type: 'get',
        url: '/',
        listener: async ({ body }) => {
            const response = await UserController.list(body)

            return response
        },
    },
    {
        type: 'post',
        url: '/register',
        listener: async ({ body }) => {
            const response = await UserController.register(body)

            return response
        },
    },
]

export { routersUser, userBaseURL }
