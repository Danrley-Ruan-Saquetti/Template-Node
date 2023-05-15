import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { routersUser, userBaseURL } from '@module/user'
import { InterfaceRouter } from '@@types/router'

const app = express()

const MAP_ROUTERS: InterfaceRouter[] = [
    { paths: routersUser, baseURL: userBaseURL }, // users
]

function newRouter({ baseURL, paths }: InterfaceRouter) {
    const router = express.Router()

    paths.forEach(_path => {
        if (!router[`${_path.type}`]) {
            throw new Error(`Type request HTTP "${_path.type}" not valid`)
        }

        router[`${_path.type}`](`${_path.url}`, async (req, res) => {
            try {
                const response = await _path.listener(req)

                if (response.status) {
                    return res.status(response.status).send(response.data || {})
                }

                return res.send(response.data || {})
            } catch (err) {
                console.log(err)
                return res.status(500).send({ ok: false })
            }
        })
    })

    app.use(`/${baseURL || ''}`, router)

    return router
}

function setup() {
    app.use(bodyParser.json())
    app.use(cors())

    MAP_ROUTERS.forEach(_router => newRouter(_router))
}

setup()

export { app }
