import { z } from 'zod'
import { ErrorGeneral } from '../../../../util/error'
import { IUser, UserSchema } from '../../schema'

type FormatterResult = { data?: IUser, error?: ErrorGeneral }

export function _formatterUser(prop: IUser): FormatterResult {
	try {
		const { email, name } = UserSchema.parse(prop)

		return { data: { email, name } }
	} catch (error: any) {
		if (error instanceof z.ZodError) {
			const dataErrors = error.errors.map(_err => {
				return { message: _err.message, origin: _err.path[0] }
			})

			return { error: new ErrorGeneral({ title: 'Register User', message: dataErrors, status: 400, }) }
		}
		return {
			error: new ErrorGeneral({ title: 'Register User', message: error, status: 400, }),
		}
	}
}
