import { IUCFunction } from '../../../uc'
import { MListUsers } from '../../model/list'
import { IUser } from '../../schema'

export const UCListUsers: IUCFunction = async ({ filters: { email, name } }: { filters: Partial<IUser> }) => {
  const response = await MListUsers({ email, name })

  if (response.error) {
    return { data: { ...response }, status: response.error.status }
  }

  const { users } = response

  return { status: 200, data: { users } }
}
