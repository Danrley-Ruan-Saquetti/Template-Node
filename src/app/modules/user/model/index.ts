import { IUser } from '../schema'
import { db, subscribeObs } from '../../../database'
import mongoose from 'mongoose'

export interface TDBUser extends mongoose.Document, IUser {
    createAt?: Date | null
}

const UserSchema = new mongoose.Schema<TDBUser>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    techs: {
        type: String[]
    },
    createAt: {
        type: Date,
        default: new Date(Date.now()),
    },
})

export let UserModel = db.model('User', UserSchema)

subscribeObs({
    code: '$database/connection/failed',
    obsFunction: () => {
        UserModel = db.model('User', UserSchema)
    },
})
subscribeObs({
    code: '$database/connection/success',
    obsFunction: () => {
        UserModel = db.model('User', UserSchema)
    },
})
