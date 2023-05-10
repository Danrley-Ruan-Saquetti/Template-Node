import { expect, test } from 'vitest'
import { newLocalDB } from './local.db'

test('Local Database - Register', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertOneSpec({ ...user1 })
    UserCollection.insertOneSpec({ ...user2 })
    UserCollection.insertOneSpec({ ...user3 })
    UserCollection.insertOneSpec({ ...user4 })
    UserCollection.insertOneSpec({ ...user5 })

    const list = UserCollection.findSpec()

    expect(list).instanceOf(Array)
    expect(list.length).toEqual(5)
})

test('Local Database - Register Many', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([
        { ...user1 },
        { ...user2 },
        { ...user3 },
        { ...user4 },
        { ...user5 },
    ])

    const list = UserCollection.findSpec()

    expect(list).instanceOf(Array)
    expect(list.length).toEqual(5)
})

test('Local Database - Filters', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([
        { ...user1 },
        { ...user2 },
        { ...user3 },
        { ...user4 },
        { ...user5 },
    ])

    expect(UserCollection.findSpec({ name: 'Dan' }).length).toEqual(1)
    expect(UserCollection.findSpec({ name: '' }).length).toEqual(0)
    expect(UserCollection.findSpec({ age: 21 }).length).toEqual(1)
    expect(UserCollection.findSpec({ age: 18 }).length).toEqual(2)
    expect(UserCollection.findSpec({ age: 18, name: 'Dan' }).length).toEqual(0)
    expect(UserCollection.findOneSpec({ age: 18 }).name).toEqual('Davi')
    expect(UserCollection.findOneSpec({ age: 17 }).name).toEqual('Marcos')
    expect(UserCollection.findOneSpec({ age: 20 })).toEqual(null)
    expect(UserCollection.findOneSpec({ age: 18, name: 'Nick' }).name).toEqual(
        'Nick'
    )
    expect(UserCollection.findOneSpec({ age: 18, name: 'Dan' })).toEqual(null)
})

test('Local Database - Filters advanced', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([user1, user2, user3, user4, user5])

    expect(UserCollection.findSpec({ name: 'Dan' }).length).toEqual(1)
})

test('Local Database - Update (new data)', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([
        { ...user1 },
        { ...user2 },
        { ...user3 },
        { ...user4 },
        { ...user5 },
    ])

    const log = UserCollection.updateOneSpec(
        { name: 'marco' },
        { $set: { email: 'dan@gmail.com' } }
    )

    const data = UserCollection.findOneSpec({ name: 'marco' })

    expect(data.name).toEqual('marco')
    expect(data.email).toEqual('dan@gmail.com')
    expect(log.upsertedCount).toEqual(1)
})

test('Local Database - Update array (insert)', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Typescript'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([
        { ...user1 },
        { ...user2 },
        { ...user3 },
        { ...user4 },
        { ...user5 },
    ])

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $set: { techs: 'Typescript' } }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(1)

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $push: { techs: 'Typescript' } }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(2)

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $push: { techs: { $each: ['PHP', 'Java', 'Javascript'] } } }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(5)
    expect(UserCollection.findOneSpec({ name: 'Dan' }).age).toEqual(21)

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $set: { techs: { $each: ['PHP', 'Java', 'Javascript'] } }, age: 19 }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(5)
    expect(UserCollection.findOneSpec({ name: 'Dan' }).age).toEqual(19)
})

test('Local Database - Update array (remover)', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: [
            'Typescript',
            'PHP',
            'Java',
            'Javascript',
            'Node',
            'Python',
            'Typescript',
        ],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: [],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: [],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: [],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([
        { ...user1 },
        { ...user2 },
        { ...user3 },
        { ...user4 },
        { ...user5 },
    ])

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $pullAll: { techs: { $in: ['Typescript', 'Python'] } } }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(5)

    UserCollection.updateOneSpec(
        { name: 'Dan' },
        { $pullAll: { techs: { $in: ['Typescript'] } } }
    )

    expect(UserCollection.findOneSpec({ name: 'Dan' }).techs.length).toEqual(4)
})

test('Local Database - Filters arrays', () => {
    const localDB = newLocalDB()

    const user1 = {
        name: 'Dan',
        age: 21,
        techs: ['Javascript', 'PHP', 'Typescript', 'BD', 'Node', 'Python'],
    }
    const user2 = {
        name: 'Ruan',
        age: 19,
        techs: ['BD', 'Java'],
    }
    const user3 = {
        name: 'Davi',
        age: 18,
        techs: ['PHP', 'BD', 'Node'],
    }
    const user4 = {
        name: 'Nick',
        age: 18,
        techs: ['Node', 'Python'],
    }
    const user5 = {
        name: 'Marcos',
        age: 17,
        techs: ['Javascript', 'Python'],
    }

    const UserCollection = localDB.model('Use')

    UserCollection.insertManySpec([user1, user2, user3, user4, user5])

    expect(
        UserCollection.findSpec({ techs: { $in: ['Typescript'] } }).length
    ).toEqual(1)
    expect(
        UserCollection.findSpec({ techs: { $in: ['Javascript', 'Python'] } }).length
    ).toEqual(2)
    expect(
        UserCollection.findSpec({ techs: { $in: ['PHP', 'BD', 'Node'] } }).length
    ).toEqual(2)
})
