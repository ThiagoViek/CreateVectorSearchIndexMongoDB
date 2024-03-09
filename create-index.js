import { MongoClient } from "mongodb";

async function run(uriMongoDB, databaseName, collectionName, indexName, indexDefinition) {
  const uri = uriMongoDB;
  const client = new MongoClient(uri);

  try {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    
    const index = {
        name: indexName,
        definition: indexDefinition
    }

    const result = await collection.createSearchIndex(index);
    console.log(result);
  } finally {
    await client.close();
  }
}

const uriMongoDB = process.argv[2];
const databaseName = process.argv[3];
const collectionName = process.argv[3];
const indexName = process.argv[4];
const indexDefinition = process.argv[5];

run(uriMongoDB, databaseName, collectionName, indexName, indexDefinition).catch(console.dir);