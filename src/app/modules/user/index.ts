import { FastifyInstance } from 'fastify'
import { UserController } from '@module/user/use-case'

export async function UserRouters(app: FastifyInstance) {
    app.get('/', async ({ body }, reply) => {
        const response = await UserController.list(body)

        return reply.status(response.status).send(response.data)
    })

    app.post('/', async ({ body }, reply) => {
        const { filters } = body

        const response = await UserController.list(filters)

        return reply.status(response.status).send(response.value || response.error)
    })

    app.post('/register', async ({ body }, reply) => {
        const response = await UserController.register(body)

        return reply.status(response.status).send(response.value || response.error)
    })
}
