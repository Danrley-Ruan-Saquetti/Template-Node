import { Model as _Model, SchemaDefinition as _SchemaDefinition, Document as _Document, SchemaDefinitionProperty as _SchemaProperty, FilterQuery, } from 'mongoose'
import { generatedId } from '../../util/generated-id'

// const templateModel: Partial<IModel<any>> = {}

type PropGeneric<T> = { [prop: string]: T }

export type DocumentDefinition<T = any> = Partial<_Document<T>> &
    Partial<T> & {
        createAt?: Date
    }

export type ISchema<T> = _SchemaDefinition<T> & {
    createAt?: _SchemaProperty<Date>
}

export interface IModel<T> extends Omit<Partial<_Model<T>>, 'schema' | 'create' | 'findOne'> {
    documents: DocumentDefinition<T>[]
    schema: Partial<ISchema<T>>
    create: (doc: DocumentDefinition<T>) => Promise<DocumentDefinition<T>>
    findOne: (filter?: FilterQuery<T>) => Promise<DocumentDefinition<T> | null>
}

export interface IMemoryDatabase {
    models: PropGeneric<IModel<any>>
    model: <T>(collectionName: string, schema: ISchema<T>) => IModel<T>
}

function Model<T>(collectionName: string, schemaDefinition: ISchema<T>): IModel<T> {
    const modelName = collectionName
    const documents: DocumentDefinition<T>[] = []
    const schema: ISchema<T> = transformSchema()

    function transformSchema() {
        const sch = schemaDefinition

        for (const key in sch) {
            // @ts-expect-error
            if (typeof sch[key] != 'object') {
                // @ts-expect-error
                sch[key] = { type: sch[key] }

                // @ts-expect-error
                if (!schemaDefinition[key]['default']) { continue }

                // sch[key]['default'] = () => { return schemaDefinition[key]['default'] }
            }
        }

        return sch
    }

    const create = async (doc: DocumentDefinition<T>): Promise<DocumentDefinition<T>> => {
        const newDoc: DocumentDefinition<T> = { ...doc, _id: generatedId() }

        for (const propDef in schema) {
            // @ts-expect-error
            if (typeof schema[propDef] != 'object' && !Array.isArray(schema[propDef])) { continue }

            // @ts-expect-error
            if (doc[propDef]) { continue }

            // @ts-expect-error
            newDoc[propDef] = schema[propDef]['type']()
        }

        documents.push(newDoc)

        return newDoc
    }

    const findOne = async (filters?: FilterQuery<T>) => {
        for (let i = 0; i < documents.length; i++) {
            const _document: PropGeneric<any> = documents[i]
            let isValid = true

            for (const _prop in filters) {
                if (typeof filters[_prop] == 'undefined') { continue }

                if (!_document[_prop]) { continue }

                if (typeof filters[_prop] != 'object') {

                    if (!Array.isArray(filters[_prop])) {
                        if (_document[_prop] != filters[_prop]) {
                            isValid = false
                            break
                        }
                    } // else {}

                } else {
                    if (filters[_prop]['$in']) {
                        if (!Array.isArray(filters[_prop]['$in']) || !Array.isArray(_document[_prop])) {
                            isValid = false
                            break
                        }

                        for (let i = 0; i < filters[_prop]['$in'].length; i++) {
                            if (!_document[_prop].find((_el: any) => { return _el == filters[_prop]['$in'][i] })) {
                                isValid = false
                                break
                            }
                        }
                    }
                }
            }

            if (isValid) { return _document as DocumentDefinition<T> }
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
