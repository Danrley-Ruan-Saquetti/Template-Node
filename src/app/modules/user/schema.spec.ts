import { expect, test } from 'vitest'
import { ErrorGeneral } from '../../util/error'
import { _formatterUser } from './util/formatter'
import { UserSchemaPassword } from './schema'

test('ZOD - User: Valid data', () => {
    const body = {
        name: 'Dan',
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
    }

    const res = _formatterUser(body)

    expect(res.error).toEqual(undefined)
    // @ts-expect-error
    expect(res.data.name).toEqual('Dan')
    // @ts-expect-error
    expect(res.data.email).toEqual('dan@gmail.com')
})

test('ZOD - User: Invalid data', () => {
    const body = {
        name: 65,
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
    }

    // @ts-expect-error
    const res = _formatterUser(body)

    expect(res.error).instanceOf(ErrorGeneral)
})

test('ZOD - User: Valid password', () => {
    const body = {
        name: 'Dan',
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
    }

    // @ts-expect-error
    const res = _formatterUser(body)

    expect(res.error).toEqual(undefined)
})

test('ZOD - User: Invalid password', () => {
    const body = {
        name: 'Dan',
        email: 'dan@gmail.com',
        password: '123%kk$',
    }

    // @ts-expect-error
    const res = _formatterUser(body)

    expect(res.error).instanceOf(ErrorGeneral)
})
