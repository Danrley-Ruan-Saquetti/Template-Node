import { IUser } from '@module/user/schema'
import { generatedId } from '@util/generate-id'

type PropGeneric<TProp> = { [nameProp: string]: TProp }
type TModel<TDcoument = any> = {
    name: string
    documents: TDcoument[]
}
type TDocument = {
    id: number
    createAt: Date
}
type SelectType<T> = { [K in keyof Partial<T>]: boolean }

function DatabaseMemory() {
    const models: PropGeneric<TModel> = {}

    function getModel<T extends TDocument>(name: string) {
        if (!models[name]) {
            throw new Error('Model not defined')
        }

        // Util
        const selectDoc = (doc: T, filters: Partial<T>) => {
            for (let prop in filters) {
                if (!doc[prop] || !filters[prop]) {
                    continue
                }

                if (doc[prop] != filters[prop]) {
                    return false
                }
            }

            return true
        }

        const selectPropsInDoc = (doc: T, props?: SelectType<Partial<T>>) => {
            if (!props || Object.keys(props).length == 0) {
                return doc as Partial<T>
            }

            if (
                Object.keys(props).some(prop => {
                    // @ts-expect-error
                    return props[prop]
                })
            ) {
                const docFiltried: PropGeneric<any> = {}

                for (const prop in props) {
                    if (!doc[prop] || !props[prop]) {
                        continue
                    }

                    docFiltried[prop] = doc[prop]
                }

                return docFiltried as Partial<T>
            }

            const docFiltried: PropGeneric<any> = {}

            for (const prop in doc) {
                if (typeof props[prop] != 'undefined') {
                    continue
                }

                docFiltried[prop] = doc[prop]
            }

            return docFiltried
        }

        const findIndex = (doc: T) => {
            return models[name].documents.findIndex(_doc => {
                return doc.id == _doc.id
            })
        }

        const deleteDoc = (doc: T) => {
            const indexDoc = findIndex(doc)

            if (indexDoc < 0) {
                return
            }

            models[name].documents.splice(indexDoc, 1)
        }

        const updateDoc = (doc: T, docData: Partial<T>) => {
            const indexDoc = findIndex(doc)

            if (indexDoc < 0) {
                return doc
            }

            const docNewData = {
                ...doc,
                ...docData,
            }

            models[name].documents[indexDoc] = docNewData

            return docNewData
        }

        // UC
        const create = async ({ data }: { data: Omit<T, 'id' | 'createAt'> }) => {
            // @ts-expect-error
            const document: T = { ...data, id: generatedId('number'), createAt: new Date(Date.now()) }

            models[name].documents.push(document)

            return document
        }

        const update = async ({ where, data }: { where: Partial<T>; data: Partial<T> }) => {
            const doc = (await findFirst({ where })) as T

            return updateDoc(doc, data)
        }

        const updateMany = async ({ where, data }: { where: Partial<T>; data: Partial<T> }) => {
            const docs = (await findMany({ where })) as T[]

            docs.forEach(_doc => {
                updateDoc(_doc, data)
            })
        }

        const findFirst = async ({ where, select }: { where: Partial<T>; select?: SelectType<Partial<T>> }) => {
            return (
                (selectPropsInDoc(
                    models[name].documents.find(_doc => {
                        return selectDoc(_doc, where)
                    }),
                    select
                ) as T) || null
            )
        }

        const findMany = async ({ where, select }: { where: Partial<T>; select?: SelectType<Partial<T>> }) => {
            const docs = models[name].documents
                .filter(_doc => {
                    return selectDoc(_doc, where)
                })
                .map(doc => {
                    return selectPropsInDoc(doc, select)
                })

            return docs as T[]
        }

        const findAll = async () => {
            return models[name].documents
        }

        const deleteUnique = async ({ where }: { where: Partial<T> }) => {
            const doc = await findFirst({ where })

            if (!doc) {
                return
            }

            return deleteDoc(doc)
        }

        const deleteMany = async ({ where }: { where: Partial<T> }) => {
            const docs = (await findMany({ where })) as T[]

            docs.forEach(_doc => {
                deleteDoc(_doc)
            })
        }

        return {
            findFirst,
            findMany,
            create,
            delete: deleteUnique,
            deleteMany,
            update,
            updateMany,
            findAll,
        }
    }

    function model<T>(name: string) {
        if (!models[name]) {
            models[name] = {
                documents: [],
                name,
            }
        }

        return getModel<T & TDocument>(name)
    }

    return {
        user: model<IUser>('user'),
        model,
    }
}

export const dbMemory = DatabaseMemory()

async function UserModelMain() {
    await dbMemory.user.create({
        data: {
            'username': 'Dan',
            'email': 'dan@gmail.com',
            'password': '123',
            'age': 18,
        },
    })
    await dbMemory.user.create({
        data: {
            'username': 'Davi',
            'email': 'davi@gmail.com',
            'password': '123',
            'age': 18,
        },
    })

    const users = await dbMemory.user.findMany({
        where: {
            'age': 18,
        },
        select: {
            username: false,
            password: false,
            age: false,
        },
    })

    console.log(users)
}

// UserModelMain()
