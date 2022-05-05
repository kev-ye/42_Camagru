// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: {
  users?: mongoDB.Collection,
  files?: mongoDB.Collection
} = {};

// Initialize Connection
export async function connectToDB () {
  // init env
  dotenv.config();

  // database information
  const dbInfo = {
    dbConn: String(process.env.DB_CONN),
    dbName: String(process.env.DB_NAME),
    userCollectionName: String(process.env.DB_USER_COLL_NAME),
    fileCollectionName: String(process.env.DB_FILE_COLL_NAME),
    userSchema: userSchema(),
    fileSchema: fileSchema()
  };

  // connect to database
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbInfo.dbConn);
  await client.connect();

  // check & create & apply collection json schema
  const db: mongoDB.Db = client.db(dbInfo.dbName);
  db.listCollections({ name: dbInfo.userCollectionName })
    .next(async (error, collInfo) => {
      if (collInfo) {
        console.log(`debug: collection exist: ${collInfo.name}: apply validator jasonSchema`);
        await db.command({
          "collMod": collInfo.name,
          "validator": {
            $jsonSchema: dbInfo.userSchema
          }
        });
        collections.users = db.collection(collInfo.name);
      }
      else {
        console.log(`debug: collection dont exist: create ${dbInfo.userCollectionName} & apply validator jasonSchema`);
        collections.users = await db.createCollection(dbInfo.userCollectionName, {
          "validator": {
            $jsonSchema: dbInfo.userSchema
          }
        })
      }
      console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.users.collectionName}`);
    });

    db.listCollections({ name: dbInfo.fileCollectionName })
    .next(async (error, collInfo) => {
      if (collInfo) {
        console.log(`debug: collection exist: ${collInfo.name}: apply validator jasonSchema`);
        await db.command({
          "collMod": collInfo.name,
          "validator": {
            $jsonSchema: dbInfo.fileSchema
          }
        });
        collections.files = db.collection(collInfo.name);
      }
      else {
        console.log(`debug: collection dont exist: create ${dbInfo.fileCollectionName} & apply validator jasonSchema`);
        collections.files = await db.createCollection(dbInfo.fileCollectionName, {
          "validator": {
            $jsonSchema: dbInfo.fileSchema
          }
        })
      }
      console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.files.collectionName}`);
    })
}

function userSchema() {
  return {
    title: "users",
    bsonType: "object",
    required: ["username", "password", "email", "notify"],
    additionalProperties: false,
    properties: {
      _id: {},
      _activated: {
        bsonType: "bool",
        description: "_activated is a boolean"
      },
      username: {
        bsonType: "string",
        description: "'username' is required and is a string"
      },
      password: {
        bsonType: "object",
        description: "'password' is required and is a object (encryption)"
      },
      email: {
        bsonType: "string",
        description: "'email' is required and is a string"
      },
      notify: {
        bsonType: "bool",
        description: "'notify' is required and is a boolean"
      }
    }
  };
}

function fileSchema() {
  return {
    title: "files",
    bsonType: "object",
    required: ["path", "user"],
    additionalProperties: false,
    properties: {
      _id: {},
      _date: {
        bsonType: "date",
        description: "'date' is a Date"
      },
      _social: {
        bsonType: "object",
        description: "'social' is a Oject"
      },
      user: {
        bsonType: "string",
        description: "'user' is required and is a string"
      },
      path: {
        bsonType: "string",
        description: "'path' is required and is a string"
      }
    }
  }
}