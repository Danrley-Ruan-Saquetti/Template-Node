import mongoose, { SchemaDefinition, Schema, model, Connection } from 'mongoose'

const memoryConnection: Connection = mongoose.createConnection('mongodb://localhost/teste-memory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const ModelUser = async () => {
    const UserSchema = new Schema({
        name: String,
        age: Number,
        email: String,
    })

    interface IUser {
        name: string;
        age: number;
        email: string;
    }

    const UserModel = memoryConnection.model<IUser>('User', UserSchema)

    const result1 = await UserModel.findOne({ name: 'João' })

    console.log(result1)

    const user: IUser = {
        name: 'João',
        age: 30,
        email: 'joao@example.com',
    }

    await UserModel.create(user)

    const result = await UserModel.findOne({ name: 'João' })
}
ModelUser()