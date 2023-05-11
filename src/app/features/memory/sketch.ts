import { Schema, Model as ModelDefinition, SchemaDefinition, Document, ObjectId, FilterQuery, UpdateQuery, Query } from 'mongoose'
import { DeleteResult, UpdateQueryResult } from 'mongodb'

export interface IModel<T> extends Partial<ModelDefinition<T>> {
    documents: SchemaDefinition<T>[]
    aggregate(pipeline?: any[]): Query<T[], T>
    create(doc: T): Promise<T & Document<any, any, T>>
    deleteMany(filter: FilterQuery<T>): Query<DeleteResult, T>
    deleteOne(filter: FilterQuery<T>): Query<DeleteResult, T>
    find(filter?: FilterQuery<T>): Query<T[], T>
    findById(id: string | number | ObjectId | any): Query<T | null, T>
    updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Query<UpdateQueryResult, T>
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Query<UpdateQueryResult, T>
}

export interface DocumentDefination extends Document {
    createAt?: Date
}

class SchemaOptions {
    versionKey: boolean

    constructor() {
        this.versionKey = false
    }
}

export class Model<T> implements IModel<T> {
    documents: SchemaDefinition<T>[]

    constructor(collectionName: string, schema: SchemaDefinition<T>) {
        this.documents = []
    }

    aggregate(pipeline?: any[]): Query<T[], T> {
        return null as any // Implementação do método
    }

    create(doc: T): Promise<T & Document<any, any, T>> {
        return null as any // Implementação do método
    }

    deleteMany(filter: FilterQuery<T>): Query<DeleteResult, T> {
        return null as any // Implementação do método
    }

    deleteOne(filter: FilterQuery<T>): Query<DeleteResult, T> {
        return null as any // Implementação do método
    }

    find(filter?: FilterQuery<T>): Query<T[], T> {
        return null as any // Implementação do método
    }

    findById(id: string | number | ObjectId | any): Query<T | null, T> {
        return null as any // Implementação do método
    }

    updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Query<UpdateQueryResult, T> {
        return null as any // Implementação do método
    }

    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Query<UpdateQueryResult, T> {
        return null as any // Implementação do método
    }
}

type PropGeneric<T> = { [prop: string]: T }

export function memoryDB() {
    const models: PropGeneric<Partial<IModel<any>>> = {}

    const model = function <T>(collectionName: string, schema: SchemaDefinition<T>) {
        const _model: Model<T> = new Model(collectionName, schema)

        models[collectionName] = _model

        return _model
    }

    return {
        model,
        models,
    }
}
