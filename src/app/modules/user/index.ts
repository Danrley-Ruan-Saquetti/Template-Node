import { TRouterPath } from "../../router";
import { UCListUsers } from "./use-cases/list";
import { UCRegisterUser } from "./use-cases/register";

const userBaseURL = "users";
const routersUser: TRouterPath[] = [
  {
    type: "get",
    url: "/",
    listener: async ({ body }) => {
      const response = await UCListUsers(body);

      return response;
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
