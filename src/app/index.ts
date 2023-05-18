import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { UserRouters } from '@module/user'

const app = fastify()

const ROUTERS = [
    { routers: (_app: FastifyInstance) => _app.get('/', (_, reply) => reply.send({ ok: true })), prefix: '' }, // base
    { routers: UserRouters, prefix: 'users' }, // user
]

app.register(cors, {
    origin: true,
})

ROUTERS.forEach(router => app.register(router.routers, { prefix: router.prefix }))

export { app }
