import { TRouterPath } from "../../router"
import { UCRegisterUser } from "./use-cases/register"

const userBaseURL = "users"
const routersUser: TRouterPath[] = [
    {
        type: "get",
        url: "/",
        listener: (req) => {
            return { status: 200, data: { ok: true } }
        },
    },
    {
        type: "post",
        url: "/register",
        listener: ({ body }) => UCRegisterUser(body),
    },
]

export { routersUser, userBaseURL }
