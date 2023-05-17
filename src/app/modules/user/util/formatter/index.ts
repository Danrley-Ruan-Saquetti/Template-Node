import { z } from 'zod'
import { IUserDataRequest, UserSchema } from '@module/user/schema'
import { Result } from '@util/result'

type TSchemas = keyof typeof UserSchema

export const _formatterUser = {
    requestData: _formatterUserRequestData,
    inDatabase: _formatterUserInDatabase,
    outDatabase: _formatterUserOutDatabase,
}

async function formatterSchema<T extends TSchemas, U>(schema: T, schemaData: U) {
    try {
        const schemaDataFormatted = (await UserSchema[schema].parseAsync(schemaData)) as U
        return Result.success<U>(schemaDataFormatted)
    } catch (err: any) {
        if (err instanceof z.ZodError) {
            const dataErrors = err.errors.map(_err => {
                return { message: _err.message, origin: _err.path[0] }
            })

            return Result.failure<IUserDataRequest>({ title: 'Register User', message: dataErrors }, 400)
        }
        return Result.failure<IUserDataRequest>({ title: 'Register User', message: [{ message: err, origin: 'Format data request "User"' }] }, 400)
    }
}

async function _formatterUserRequestData(prop: IUserDataRequest) {
    return formatterSchema('requestData', prop)
}

async function _formatterUserInDatabase(prop: IUserDataRequest) {
    return formatterSchema('inDataBase', prop)
}

async function _formatterUserOutDatabase(prop: IUserDataRequest) {
    return formatterSchema('outDataBase', prop)
}
