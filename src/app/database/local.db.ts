import { generatedId } from "../modules/user/util/generated-id"
import { ErrorGeneral } from "../util/error"

export type CollectionName = string
export type CollectionType = {
    [nameAttribute: string]: any
}
export interface Collection {
    name: CollectionName,
    data: any[],
    type: any
}

export function newLocalDB() {
    const localData: { [collectionName: CollectionName]: Collection } = {}

    const setup = () => {
        console.log(`Database local started`)
    }

    const connectCollection = (coll: Collection) => {
        const insertOne = (data: typeof coll.type) => {
            localData[coll.name].data.push({
                _id: generatedId(),
                ...data
            })
            return data

            // return { error: new ErrorGeneral({ title: "Database Local", message: [{ message: `Cannot insert in "${coll.name}"`, origin: "insert" }], status: 500 }) }
        }

        const insertMany = (datas: typeof coll.type[]) => {
            datas.forEach(_data => insertOne(_data))
        }

        const drop = () => {
            return removeCollection(coll.name)
        }

        const find = () => {
            return localData[coll.name].data
        }

        return {
            insertOne,
            insertMany,
            drop,
            find
        }
    }

    const newCollection = (collectionName: CollectionName, collectionType: CollectionType) => {
        let coll: Collection | null = getCollection(collectionName).collection || null

        if (!coll) {
            coll = { name: collectionName, data: [], type: collectionType }
            localData[collectionName] = coll
        }

        return connectCollection(coll)
    }

    // Model
    const getCollection: (name: CollectionName) => { collection?: Collection, error?: ErrorGeneral } = (name: CollectionName) => {
        const collection = localData[name]

        if (!collection) {
            return { error: new ErrorGeneral({ title: "Database Local", message: [{ message: `Collection "${name}" not found`, origin: "collection" }], status: 500 }) }
        }

        return { collection }
    }

    const removeCollection = (name: CollectionName) => {
        if (!localData[name]) {
            return { error: new ErrorGeneral({ title: "Database Local", message: [{ message: `Collection "${name}" not found`, origin: "collection" }], status: 500 }) }
        }

        delete localData[name]

        return true
    }

    setup()

    return {
        localData,
        newCollection
    }
}

export const localDB = newLocalDB()