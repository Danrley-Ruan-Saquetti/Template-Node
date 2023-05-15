import { z } from 'zod'
import { IUser, IUserDataRequest, UserSchema } from '@module/user/schema'
import { ErrorGeneral } from '@util/error'
import { FormatterResult } from '@@types/formatter'

export const _formatterUser = {
    requestData: _formatterUserRequestData,
    inDatabase: _formatterUserInDatabase,
    outDatabase: _formatterUserOutDatabase,
}

function _formatterUserRequestData(prop: IUserDataRequest): FormatterResult<IUserDataRequest> {
    try {
        const dataFormatted = UserSchema.requestData.parse(prop)

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

function _formatterUserInDatabase(prop: IUserDataRequest): FormatterResult<IUserDataRequest> {
    try {
        const dataFormatted = UserSchema.inDataBase.parse(prop)

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

function _formatterUserOutDatabase(prop: IUserDataRequest): FormatterResult<IUser> {
    try {
        const dataFormatted = UserSchema.outDataBase.parse(prop)

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
