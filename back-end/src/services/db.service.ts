// External Dependencies
import * as mongoDB from "mongodb";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

// Initialize Connection
export async function connectToDB () {
  const dbInfo = {
    dbConn: "mongodb+srv://<user>:<password>@cluster0.k8cup.mongodb.net",
    // dbConn: "mongodb://localhost:27017",
    dbName: "camagru",
    userCollectionName: "users",
  };

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbInfo.dbConn);

  await client.connect();

  const db: mongoDB.Db = client.db(dbInfo.dbName);

  await db.command({
    "collMod": dbInfo.userCollectionName,
    "validator": {
      $jsonSchema: {
        bsontype: "object",
        required: ["username", "password", "email"],
        properties: {
          username: {
            bsontype: "string",
            description: "must be a string and is required"
          },
          password: {
            bsontype: "string",
            description: "must be a string and is required"
          },
          email: {
            bsontype: "string",
            description: "must be a string and is required"
          }
        }
      }
    }
  });

  collections.users = db.collection(dbInfo.userCollectionName);

  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${collections.users.collectionName}`);
}