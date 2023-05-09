import { IUCFunction } from "../../../uc";
import { MListUsers } from "../../model/list";
import { IUser } from "../../schema";

export const UCListUsers: IUCFunction = async ({
  email,
  name,
}: Partial<IUser>) => {
  const response = await MListUsers({ email, name });

  if (response.error) {
    return { data: { ...response }, status: response.error.status };
  }

  const { users } = response;

  return { status: 200, data: { users } };
};
