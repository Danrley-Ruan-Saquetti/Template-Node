import { expect, test } from "vitest";
import { CollectionType, newLocalDB } from "./local.db";

test("Local Database - Register", () => {
    const localDB = newLocalDB()

    const UserSchema: CollectionType = {
        name: "String",
        age: "number"
    } as const

    const UserCollection = localDB.newCollection("Users", UserSchema)

    const user1: typeof UserSchema = {
        name: "Dan",
        age: 21
    }
    const user2: typeof UserSchema = {
        name: "Ruan",
        age: 19
    }
    const user3: typeof UserSchema = {
        name: "Davi",
        age: 18
    }
    const user4: typeof UserSchema = {
        name: "Nick",
        age: 18
    }
    const user5: typeof UserSchema = {
        name: "Marcos",
        age: 17
    }

    UserCollection.insertOne(user1)
    UserCollection.insertOne(user2)
    UserCollection.insertOne(user3)
    UserCollection.insertOne(user4)
    UserCollection.insertOne(user5)

    expect(UserCollection.find()).instanceOf(Array)
    expect(UserCollection.find().length).toEqual(5)
})

test("Local Database - Register Many", () => {
    const localDB = newLocalDB()

    const UserSchema: CollectionType = {
        name: "String",
        age: "number"
    } as const

    const UserCollection = localDB.newCollection("Users", UserSchema)

    const user1: typeof UserSchema = {
        name: "Dan",
        age: 21
    }
    const user2: typeof UserSchema = {
        name: "Ruan",
        age: 19
    }
    const user3: typeof UserSchema = {
        name: "Davi",
        age: 18
    }
    const user4: typeof UserSchema = {
        name: "Nick",
        age: 18
    }
    const user5: typeof UserSchema = {
        name: "Marcos",
        age: 17
    }

    UserCollection.insertMany([user1, user2, user3, user4, user5])

    expect(UserCollection.find()).instanceOf(Array)
    expect(UserCollection.find().length).toEqual(5)
})