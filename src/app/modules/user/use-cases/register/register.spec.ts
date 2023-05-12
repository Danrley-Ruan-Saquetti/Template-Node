import { expect, test } from 'vitest'
import { UCRegisterUser } from '.'
import { ErrorGeneral } from '../../../../util/error'

test('UC Register - User: Correct', async () => {
    const body = {
        username: 'Dan',
        email: 'dan@gmail.com',
        password: '1234R5&aasd',
    }

    const res = await UCRegisterUser(body)

    expect(res.status).toEqual(200)
    expect(res.data.error).toEqual(undefined)
})

test('UC Register - User: Invalid data', async () => {
    const body1 = {
        username: 'Dan',
        email: 'dan@gmail.com',
        password: '1234R5&aasd',
    }

    const res1 = await UCRegisterUser(body1)

    expect(res1.data.error).toEqual(undefined)

    const body2 = {
        username: 'Dan',
        email: 'dangmail.com',
        password: '1asd',
    }

    const res2 = await UCRegisterUser(body2)

    expect(res2.data.error).instanceOf(ErrorGeneral)
    expect(res2.data.error.message[0].origin).toEqual('email')
    expect(res2.data.error.message[1].origin).toEqual('password')
})
