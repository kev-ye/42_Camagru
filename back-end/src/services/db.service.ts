// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDB () {
  // init env
  dotenv.config();

  // database information
  const dbInfo = {
    dbConn: String(process.env.DB_CONN),
    dbName: String(process.env.DB_NAME),
    userCollectionName: String(process.env.DB_USER_COLL_NAME),
    schema: {
      bsonType: "object",
      required: ["username", "password", "email", "verified"],
      additionalProperties: false,
      properties: {
        _id: {},
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
        verified: {
          bsonType: "bool",
          description: "'verified' is required and is a boolean"
        }
      }
    }
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
            $jsonSchema: dbInfo.schema
          }
        })
        collections.users = db.collection(collInfo.name);
      }
      else {
        console.log(`debug: collection dont exist: create ${dbInfo.userCollectionName} & apply validator jasonSchema`);
        collections.users = await db.createCollection(dbInfo.userCollectionName, {
          "validator": {
            $jsonSchema: dbInfo.schema
          }
        })
      }
      console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.users.collectionName}`);
    })
}