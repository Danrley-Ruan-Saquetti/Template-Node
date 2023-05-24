import { UserSchema } from '@module/user/schema'
import { Formatter } from '@util/formatter'
import { z } from 'zod'

export const formatterUser = {
    requestData: formatterUserRequestData,
    inDatabase: formatterUserInDatabase,
    outDatabase: formatterUserOutDatabase,
}

async function formatterUserRequestData(prop: z.input<(typeof UserSchema)['requestData']>) {
    return await Formatter(UserSchema['requestData'], prop)
}

async function formatterUserInDatabase(prop: z.input<(typeof UserSchema)['inDataBase']>) {
    return await Formatter(UserSchema['inDataBase'], prop)
}

async function formatterUserOutDatabase(prop: z.input<(typeof UserSchema)['outDataBase']>) {
    return await Formatter(UserSchema['outDataBase'], prop)
}
