import { UserSchema } from '@module/user/schema'
import { Formatter } from '@util/formatter'
import { z } from 'zod'

export const _formatterUser = {
    requestData: _formatterUserRequestData,
    inDatabase: _formatterUserInDatabase,
    outDatabase: _formatterUserOutDatabase,
}

async function _formatterUserRequestData(prop: z.infer<(typeof UserSchema)['requestData']>) {
    return await Formatter(UserSchema['requestData'], prop)
}

async function _formatterUserInDatabase(prop: z.infer<(typeof UserSchema)['inDataBase']>) {
    return await Formatter(UserSchema['inDataBase'], prop)
}

async function _formatterUserOutDatabase(prop: z.infer<(typeof UserSchema)['outDataBase']>) {
    return await Formatter(UserSchema['outDataBase'], prop)
}
