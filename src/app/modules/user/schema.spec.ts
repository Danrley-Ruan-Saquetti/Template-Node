import { expect, test } from 'vitest'
import { ErrorGeneral } from '../../util/error'
import { _formatterUserRequestData } from './util/formatter'

test('ZOD - User: Valid data', () => {
    const body = {
        username: 'Dan',
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
        age: 18,
    }

    const res = _formatterUserRequestData(body)

    expect(res.error).toEqual(undefined)
    expect(res.data.username).toEqual('Dan')
    expect(res.data.email).toEqual('dan@gmail.com')
})

test('ZOD - User: Invalid data', () => {
    const body = {
        username: 65,
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
        age: 18,
    }

    const res = _formatterUserRequestData(body)

    expect(res.error).instanceOf(ErrorGeneral)
})

test('ZOD - User: Valid password', () => {
    const body = {
        username: 'Dan',
        email: 'dan@gmail.com',
        password: '123AabT%kk$',
        age: 18,
    }

    const res = _formatterUserRequestData(body)

    expect(res.error).toEqual(undefined)
})

test('ZOD - User: Invalid password', () => {
    const body = {
        username: 'Dan',
        email: 'dan@gmail.com',
        password: '123%kk$',
        age: 18,
    }

    const res = _formatterUserRequestData(body)

    expect(res.error).instanceOf(ErrorGeneral)
})
