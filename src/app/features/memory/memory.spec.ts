import { expect, test } from 'vitest'
import { memoryDB, DocumentDefination, ISchema, IModel } from '.'

interface IUser extends DocumentDefination {
    name: string
    email: string
    password: string
    age: number
    techs: String[]
}

const userSchema: ISchema<IUser> = {
    name: String,
    email: String,
    password: String,
    age: Number,
    techs: Array<String>(),
    createAt: Date,
}

const users: DocumentDefination<IUser>[] = [
    { name: 'Dan', email: 'dan@gmail.com', age: 19, password: '123', techs: ['Typescript', 'PHP', 'Java', 'Javascript', 'Node', 'BD'] },
    { name: 'Davi', email: 'davi@gmail.com', age: 18, password: '123', techs: ['PHP', 'Java'] },
    { name: 'Ruan', email: 'ruan@gmail.com', age: 19, password: '123', techs: ['Java', 'BD'] },
    { name: 'Nick', email: 'nick@gmail.com', age: 18, password: '123', techs: ['Java', 'C++'] },
    { name: 'Marcos', email: 'marcos@gmail.com', age: 17, password: '123', techs: ['PHP', 'Java', 'Python'] },
]

async function registerValues(model: IModel<IUser>, length = users.length) {
    const docs: DocumentDefination<IUser> = []

    for (let i = 0; i < length; i++) {
        const doc = await model.create(users[i])
        docs.push(doc)
    }

    return docs
}

test('Memory: Crete Model', async () => {
    const db = memoryDB()

    db.model('User', userSchema)

    expect(db.models.User).not.equal(undefined)
})

test('Memory: Register doc', async () => {
    const db = memoryDB()

    const userModel = db.model('User', userSchema)

    const doc = registerValues(userModel, 1)

    expect(doc).not.equal(undefined)
})

test('Memory: Filter doc', async () => {
    const db = memoryDB()

    const userModel = db.model('User', userSchema)

    await registerValues(userModel)

    const filter1 = await userModel.findOne({ name: 'Dan', email: 'dan@gmail.com', age: 19 })
    const filter2 = await userModel.findOne({ name: 'Dan', email: 'danrley@gmail.com', age: 20 })

    console.log(filter1)
    console.log(filter2)
})

test('Memory: Filter array', async () => {
    const db = memoryDB()

    const userModel = db.model('User', userSchema)

    await registerValues(userModel)

    const filter1 = await userModel.findOne({ techs: {} })

    console.log(filter1)
})
