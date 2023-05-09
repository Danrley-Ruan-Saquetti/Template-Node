import { TRouterPath } from "../../router";
import { UCRegisterUser } from "./use-cases/register";

const userBaseURL = "users";
const routersUser: TRouterPath[] = [
  {
    type: "get",
    url: "/",
    listener: async (req) => {
      return { status: 200, data: { ok: true } };
    },
  },
  {
    type: "post",
    url: "/register",
    listener: async ({ body }) => {
      const response = await UCRegisterUser(body);

      return response;
    },
  },
];

export { routersUser, userBaseURL };
