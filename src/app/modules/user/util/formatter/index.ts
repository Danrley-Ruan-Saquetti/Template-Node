import { z } from 'zod'
import { IUser, IUserDataRequest, UserSchema } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'
import { FormatterResult } from '@@types/formatter'

export const _formatterUser = {
    requestData: _formatterUserRequestData,
    inDatabase: _formatterUserInDatabase,
    outDatabase: _formatterUserOutDatabase,
}

async function _formatterUserRequestData(prop: IUserDataRequest): FormatterResult<IUserDataRequest> {
    try {
        const dataFormatted = await UserSchema.requestData.parseAsync(prop)

        return { data: dataFormatted }
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const dataErrors = error.errors.map(_err => {
                return { message: _err.message, origin: _err.path[0] }
            })

            return { error: new ErrorGeneral({ title: 'Register User', message: dataErrors, status: 400 }) }
        }
        return {
            error: new ErrorGeneral({ title: 'Register User', message: error, status: 400 }),
        }
    }
}

async function _formatterUserInDatabase(prop: IUserDataRequest): FormatterResult<IUserDataRequest> {
    try {
        const dataFormatted = await UserSchema.inDataBase.parseAsync(prop)

        return { data: { ...prop, ...dataFormatted } }
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const dataErrors = error.errors.map(_err => {
                return { message: _err.message, origin: _err.path[0] }
            })

            return { error: new ErrorGeneral({ title: 'Register User', message: dataErrors, status: 400 }) }
        }
        return {
            error: new ErrorGeneral({ title: 'Register User', message: error, status: 400 }),
        }
    }
}

async function _formatterUserOutDatabase(prop: IUserDataRequest): FormatterResult<IUser> {
    try {
        const dataFormatted = await UserSchema.outDataBase.parseAsync(prop)

        return { data: { ...prop, ...dataFormatted } }
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            const dataErrors = error.errors.map(_err => {
                return { message: _err.message, origin: _err.path[0] }
            })

            return { error: new ErrorGeneral({ title: 'Register User', message: dataErrors, status: 400 }) }
        }
        return {
            error: new ErrorGeneral({ title: 'Register User', message: error, status: 400 }),
        }
    }
}
