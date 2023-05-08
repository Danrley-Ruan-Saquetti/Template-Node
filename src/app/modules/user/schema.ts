import { z } from "zod"

const UserSchema = z.object({
	name: z
		.string()
		.nonempty({ message: '"Name" is required' }),
	email: z
		.string()
		.email({ message: 'Format "e-mail" invalid' })
		.nonempty({ message: '"E-mail" is required' }),
})

type IUser = z.infer<typeof UserSchema>

export { IUser, UserSchema }
