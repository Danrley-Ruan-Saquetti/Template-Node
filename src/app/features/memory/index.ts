import {
    Schema as _Schema,
    Model as _Model,
    SchemaDefinition as _SchemaDefinition,
    Document as _Document,
    SchemaDefinitionProperty as _SchemaProperty,
    FilterQuery,
} from 'mongoose'
import { generatedId } from '../../util/generated-id'

const templateModel: Partial<IModel<any>> = {}

type PropGeneric<T> = { [prop: string]: T }

export type DocumentDefination<T = any> = Partial<_Document<T>> &
    Partial<T> & {
        createAt?: Date
    }

export type ISchema<T> = _SchemaDefinition<T> & {
    createAt?: _SchemaProperty<Date>
}

export interface IModel<T> extends Omit<Partial<_Model<T>>, 'schema' | 'create' | 'findOne'> {
    documents: DocumentDefination<T>[]
    schema: Partial<ISchema<T>>
    create: (doc: DocumentDefination<T>) => Promise<DocumentDefination<T>>
    findOne: (filter?: FilterQuery<T>) => Promise<DocumentDefination<T> | null>
}

export interface IMemoryDatabase {
    models: PropGeneric<IModel<any>>
    model: <T>(collectionName: string, schema: ISchema<T>) => IModel<T>
}

function Model<T>(collectionName: string, schemaDefination: ISchema<T>): IModel<T> {
    const modelName = collectionName
    const documents: DocumentDefination<T>[] = []
    const schema: ISchema<T> = tranformSchema()

    function tranformSchema() {
        const sch = schemaDefination

        for (const key in sch) {
            // @ts-expect-error
            if (typeof sch[key] == 'object') {
                // @ts-expect-error
                sch[key] = { type: sch[key] }
            }
        }

        return sch
    }

    const create = async (doc: DocumentDefination<T>): Promise<DocumentDefination<T>> => {
        const newDoc: DocumentDefination<T> = { ...doc, _id: generatedId() }

        documents.push(newDoc)

        return newDoc
    }

    const findOne = async (filters?: FilterQuery<T>) => {
        for (let i = 0; i < documents.length; i++) {
            const _document: PropGeneric<any> = documents[i]
            let isValid = true

            for (const _prop in filters) {
                if (typeof filters[_prop] != 'object') {
                    if (!_document[_prop]) {
                        continue
                    }

                    if (_document[_prop] != filters[_prop]) {
                        isValid = false
                        break
                    }
                } else {
                }
            }

            if (isValid) {
                return _document as DocumentDefination<T>
            }
        }

        return null
    }

    return {
        documents,
        schema,
        create,
        modelName,
        findOne,
    }
}

export function memoryDB(): IMemoryDatabase {
    const models: PropGeneric<IModel<any>> = {}

    const model = function <T>(collectionName: string, schema: ISchema<T>) {
        const _model: IModel<T> = models[collectionName] || Model<T>(collectionName, schema)

        models[collectionName] = _model

        return _model
    }

    return {
        model,
        models,
    }
}
