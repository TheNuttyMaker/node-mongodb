// const { MongoClient } = require('mongodb');
import { MongoClient, ObjectID } from "mongodb";

let client;

export const initializeDbConnection = async () => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */

  const uri = process.env.DB_URI + "?retryWrites=true&w=majority";

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);

    const user = await findUserByEmail(
      client.db("react-auth-db"),
      "abc@gmail.com"
    );
    // const db = getDbConnection('sample_trainings');
    // const user = await db.collection('zips').findOne({city: 'ALPINE'});
    console.log(user);
  } catch (e) {
    console.error(e);
  }
};

// initializeDbConnection().catch(console.error);

export const findUserByEmail = async (db, email) => {
  const user = await db.collection("users").findOne({ email: email });

  if (user) {
    console.log(`Found a user with email of ${email} /n`);
    console.log(user);
  } else {
    console.log(`No user found with email of ${email} `);
  }
  return user;
};

export const findAndUpdateUser = async (db, id, updates) => {
  const user = await db
    .collection("users")
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { info: updates } },
      { returnOriginal: false }
    );
  console.log("Update Success!");
  return user;
};

export const createUser = async (db, userInfo) => {
  const response = await db.collection("users").insertOne(userInfo);
  console.log("New user creation successful \n");
  return response;
};

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList?.databases?.forEach((db) => console.log(` - ${db.name}`));
}

export const getDbConnection = (dbName) => {
  const db = client.db(dbName);
  return db;
};

export async function closeDbConnection() {
  await client.close();
}
