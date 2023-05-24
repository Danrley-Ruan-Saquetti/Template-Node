import { z } from 'zod'
import { generateHash } from '@util/hash'
import { SchemaDefault, TModelUser } from '@database'

// Data request form
const UserSchemaRequestData = z.object({
    username: z.string().nonempty({ message: '"Username" is required' }),
    email: z.string().email({ message: 'Format "e-mail" invalid' }).nonempty({ message: '"E-mail" is required' }),
    age: z.number().min(0),
    password: z.string().nonempty({ message: '"Password" is required' }),
    // .min(8, { message: 'The password must have at least 8 characters' })
    // .max(50, { message: 'The password must have a maximum of 50 characters' })
    // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#/\\|])[A-Za-z\d@$!%*?&#/\\|]+$/, {
    //     message: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    // }),
})

// Data insert database
const UserSchemaInDatabase = z.object({
    username: z.string(),
    email: z.string().email(),
    age: z.number().min(0),
    createAt: z.date().optional().default(new Date(Date.now())),
    password: z.string().transform(async pass => {
        const passHash = await generateHash(pass)
        return passHash
    }),
})

// Data result database
const UserSchemaOutDatabase = SchemaDefault.extend({
    username: z.string(),
    email: z.string().email(),
    age: z.number().min(0),
})

// Data response request
const UserSchemaResponseData = z.object({})

export type IUserDataRequest = z.infer<typeof UserSchemaRequestData>
export type IUser = TModelUser

export const UserSchema = {
    requestData: UserSchemaRequestData,
    responseData: UserSchemaResponseData,
    inDataBase: UserSchemaInDatabase,
    outDataBase: UserSchemaOutDatabase,
}
