import fastify from 'fastify'
import cors from '@fastify/cors'
import { UserRouters } from '@module/user'

const app = fastify()

app.register(cors, {
    origin: true,
})

app.register(UserRouters, { prefix: 'users' })

export { app }
