import { Result } from '@esliph/util'
import { FastifyInstance } from 'fastify'
import { UserController } from '@module/user/use-case'

export async function UserRouters(app: FastifyInstance) {
    app.get('/', async ({ body }, reply) => {
        try {
            const response = await UserController.list({})

            return reply.status(response.status).send(response)
        } catch (err) {
            console.error(err)
            return reply.status(500).send(Result.failure({ title: 'Server Error', message: [{ message: 'Error Server process', origin: 'Get "Users"' }] }, 500))
        }
    })

    app.post('/', async ({ body }, reply) => {
        try {
            const { filters } = body

            const response = await UserController.list(filters)

            return reply.status(response.status).send(response.value || response.error)
        } catch (err) {
            console.error(err)
            return reply.status(500).send(Result.failure({ title: 'Server Error', message: [{ message: 'Error Server process', origin: 'Get "Users" by filters' }] }, 500))
        }
    })

    app.post('/register', async ({ body }, reply) => {
        try {
            const response = await UserController.register(body)

            return reply.status(response.status).send(response)
        } catch (err) {
            console.error(err)
            return reply.status(500).send(Result.failure({ title: 'Server Error', message: [{ message: 'Error Server process', origin: 'Register "User"' }] }, 500))
        }
    })

    app.put('/update/:id', async ({ body, params }, reply) => {
        try {
            const { id } = params

            const response = await UserController.update({ where: { id }, data: body })

            return reply.status(response.status).send(response)
        } catch (err) {
            console.error(err)
            return reply.status(500).send(Result.failure({ title: 'Server Error', message: [{ message: 'Error Server process', origin: 'Register "User"' }] }, 500))
        }
    })

    app.delete('/delete/:id', async ({ body, params }, reply) => {
        try {
            const { id } = params

            const response = await UserController.delete({ id: Number(id) })

            return reply.status(response.status).send(response)
        } catch (err) {
            console.error(err)
            return reply.status(500).send(Result.failure({ title: 'Server Error', message: [{ message: 'Error Server process', origin: 'Delete "User"' }] }, 500))
        }
    })
}
