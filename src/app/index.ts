import bodyParser from "body-parser"
import express from "express"
import cors from "cors"
import { routersUser, userBaseURL } from "./modules/user"
import { InterfaceRouter } from "./router"

const app = express()

const MAP_ROUTERS: InterfaceRouter[] = [
    { paths: routersUser, baseURL: userBaseURL },
]

function newRouter({ baseURL, paths }: InterfaceRouter) {
    const router = express.Router()

    paths.forEach((_path) => {
        if (!router[`${_path.type}`]) { throw new Error(`Type request HTTP "${_path.type}" not valid`) }

        router[`${_path.type}`](`${_path.url}`, (req, res) => {
            try {
                const { body, params, headers } = req

                const response = _path.listener({ body, params, headers })

                res.status(response.status).send(response.data || {})
            } catch (err) {
                console.log(err)
                res.status(500).send({ ok: false })
            }
        })
    })

    app.use(`/${baseURL || ""}`, router)

    return router
}

function setup() {
    app.use(bodyParser.json())
    app.use(cors())

    MAP_ROUTERS.forEach((_router) => newRouter(_router))
}

setup()

export { app }
