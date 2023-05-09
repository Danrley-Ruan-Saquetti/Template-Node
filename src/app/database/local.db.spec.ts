import { expect, test } from "vitest";
import { CollectionType, newLocalDB } from "./local.db";

const UserSchema: CollectionType = {
  name: "String",
  age: "number",
  techs: "string[]",
} as const;

test("Local Database - Register", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertOne({ ...user1 });
  UserCollection.insertOne({ ...user2 });
  UserCollection.insertOne({ ...user3 });
  UserCollection.insertOne({ ...user4 });
  UserCollection.insertOne({ ...user5 });

  const list = UserCollection.find();

  expect(list).instanceOf(Array);
  expect(list.length).toEqual(5);
});

test("Local Database - Register Many", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([
    { ...user1 },
    { ...user2 },
    { ...user3 },
    { ...user4 },
    { ...user5 },
  ]);

  const list = UserCollection.find();

  expect(list).instanceOf(Array);
  expect(list.length).toEqual(5);
});

test("Local Database - Filters", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([
    { ...user1 },
    { ...user2 },
    { ...user3 },
    { ...user4 },
    { ...user5 },
  ]);

  expect(UserCollection.find({ name: "Dan" }).length).toEqual(1);
  expect(UserCollection.find({ age: 21 }).length).toEqual(1);
  expect(UserCollection.find({ age: 18 }).length).toEqual(2);
  expect(UserCollection.findOne({ age: 18 }).name).toEqual("Davi");
  expect(UserCollection.findOne({ age: 17 }).name).toEqual("Marcos");
  expect(UserCollection.findOne({ age: 20 })).toEqual(null);
  expect(UserCollection.findOne({ age: 18, name: "Nick" }).name).toEqual(
    "Nick"
  );
  expect(UserCollection.findOne({ age: 18, name: "Dan" })).toEqual(null);
});

test("Local Database - Filters advanced", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([user1, user2, user3, user4, user5]);

  expect(UserCollection.find({ name: "Dan" }).length).toEqual(1);
});

test("Local Database - Update (new data)", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([
    { ...user1 },
    { ...user2 },
    { ...user3 },
    { ...user4 },
    { ...user5 },
  ]);

  const log = UserCollection.updateOne(
    { name: "marco" },
    { $set: { email: "dan@gmail.com" } }
  );

  const data = UserCollection.findOne({ name: "marco" });

  expect(data.name).toEqual("marco");
  expect(data.email).toEqual("dan@gmail.com");
  expect(log.upsertedCount).toEqual(1);
});

test("Local Database - Update array (insert)", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Typescript"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([
    { ...user1 },
    { ...user2 },
    { ...user3 },
    { ...user4 },
    { ...user5 },
  ]);

  UserCollection.updateOne({ name: "Dan" }, { $set: { techs: "Typescript" } });

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(1);

  UserCollection.updateOne({ name: "Dan" }, { $push: { techs: "Typescript" } });

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(2);

  UserCollection.updateOne(
    { name: "Dan" },
    { $push: { techs: { $each: ["PHP", "Java", "Javascript"] } } }
  );

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(5);
  expect(UserCollection.findOne({ name: "Dan" }).age).toEqual(21);

  UserCollection.updateOne(
    { name: "Dan" },
    { $set: { techs: { $each: ["PHP", "Java", "Javascript"] } }, age: 19 }
  );

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(5);
  expect(UserCollection.findOne({ name: "Dan" }).age).toEqual(19);
});

test("Local Database - Update array (remover)", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: [
      "Typescript",
      "PHP",
      "Java",
      "Javascript",
      "Node",
      "Python",
      "Typescript",
    ],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: [],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: [],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: [],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([
    { ...user1 },
    { ...user2 },
    { ...user3 },
    { ...user4 },
    { ...user5 },
  ]);

  UserCollection.updateOne(
    { name: "Dan" },
    { $pullAll: { techs: { $in: ["Typescript", "Python"] } } }
  );

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(5);

  UserCollection.updateOne(
    { name: "Dan" },
    { $pullAll: { techs: { $in: ["Typescript"] } } }
  );

  expect(UserCollection.findOne({ name: "Dan" }).techs.length).toEqual(4);
});

test("Local Database - Filters arrays", () => {
  const localDB = newLocalDB();

  const user1: typeof UserSchema = {
    name: "Dan",
    age: 21,
    techs: ["Javascript", "PHP", "Typescript", "BD", "Node", "Python"],
  };
  const user2: typeof UserSchema = {
    name: "Ruan",
    age: 19,
    techs: ["BD", "Java"],
  };
  const user3: typeof UserSchema = {
    name: "Davi",
    age: 18,
    techs: ["PHP", "BD", "Node"],
  };
  const user4: typeof UserSchema = {
    name: "Nick",
    age: 18,
    techs: ["Node", "Python"],
  };
  const user5: typeof UserSchema = {
    name: "Marcos",
    age: 17,
    techs: ["Javascript", "Python"],
  };

  const UserCollection = localDB.newCollection("Users", UserSchema);

  UserCollection.insertMany([user1, user2, user3, user4, user5]);

  expect(
    UserCollection.find({ techs: { $in: ["Typescript"] } }).length
  ).toEqual(1);
  expect(
    UserCollection.find({ techs: { $in: ["Javascript", "Python"] } }).length
  ).toEqual(2);
  expect(
    UserCollection.find({ techs: { $in: ["PHP", "BD", "Node"] } }).length
  ).toEqual(2);
});
