import mongoose, { Model, Schema as TypeSchema, SchemaDefinition } from 'mongoose'
import { EventEmitter } from 'events'

class InMemoryDatabase extends EventEmitter {
    private _models: { [key: string]: Model<any> } = {}
    private _data: { [key: string]: any[] } = {}
    private _connected = false

    async connect(): Promise<void> {
        this._connected = true
        this.emit('connected')
    }

    async disconnect(): Promise<void> {
        this._connected = false
        this.emit('disconnected')
    }

    model<T>(name: string, schema: TypeSchema): Model<T> {
        if (this._models[name]) {
            return this._models[name] as Model<T>
        }
        const model = mongoose.model(name, schema) as Model<T>
        this._models[name] = model
        this._data[name] = []
        return model
    }

    Schema(obj: SchemaDefinition): TypeSchema {
        return new mongoose.Schema(obj)
    }

    async save<T>(name: string, doc: T): Promise<T> {
        this._data[name].push(doc)
        return doc
    }

    async find<T>(name: string, query: any): Promise<T[]> {
        return this._data[name].filter((doc) => {
            return Object.keys(query).every((key) => {
                return query[key] === doc[key]
            })
        })
    }

    async findOne<T>(name: string, query: any): Promise<T> {
        const result = await this.find<T>(name, query)
        return result[0]
    }
}

const db = new InMemoryDatabase()

async function MUser() {
    await db.connect().then(res => {
        console.log(res)
    })

    const UserSchema = db.Schema({
        name: String,
        age: Number,
        email: String,
    })

    interface IUser {
        name: string;
        age: number;
        email: string;
    }

    const UserModel = db.model<IUser>('User', UserSchema)

    const result1 = await UserModel.findOne({ name: 'João' })

    console.log(result1)

    const user: IUser = {
        name: 'João',
        age: 30,
        email: 'joao@example.com',
    }

    await UserModel.create(user)

    const result = await UserModel.findOne({ name: 'João' })

    await db.disconnect()
}

MUser()