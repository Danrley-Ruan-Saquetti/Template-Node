import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { UserRouters } from '@module/user'

const app = fastify()

const ROUTERS = [
    { routers: (_app: FastifyInstance) => _app.get('/', (_, reply) => reply.send({ ok: true })), prefix: '' }, // base
    { routers: UserRouters, prefix: 'users' }, // user
]

function setup() {
    app.register(cors, {
        origin: true,
    })
    app.register(jwt, {
        secret: 'eralith-me',
    })

    ROUTERS.forEach(router => app.register(router.routers, { prefix: router.prefix }))
}
setup()

export { app }
