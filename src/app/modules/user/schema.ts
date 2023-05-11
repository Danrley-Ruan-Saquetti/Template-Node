import { z } from 'zod'

const UserSchema = z.object({
    name: z.string().nonempty({ message: '"Name" is required' }),
    email: z.string().email({ message: 'Format "e-mail" invalid' }).nonempty({ message: '"E-mail" is required' }),
    password: z
        .string()
        .nonempty({ message: '"Password" is required' })
        .min(8, { message: 'The password must have at least 8 characters' })
        .max(50, { message: 'The password must have a maximum of 50 characters' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/\\|])[A-Za-z\d@$!%*?&#/\\|]+$/, {
            message: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        }),
    techs: z.array(z.string()),
})

type IUser = z.infer<typeof UserSchema>

export { IUser, UserSchema }
