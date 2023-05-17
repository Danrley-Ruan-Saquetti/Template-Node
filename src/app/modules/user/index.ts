import { FastifyInstance } from 'fastify'
import { UserController } from '@module/user/use-case'

export async function UserRouters(app: FastifyInstance) {
    app.get('/', async ({ body }) => {
        const response = await UserController.list(body)

        return response
    })

    app.post('/register', async ({ body }) => {
        const response = await UserController.register(body)

        return response
    })
}