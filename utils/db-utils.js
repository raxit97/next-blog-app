import { MongoClient } from "mongodb";

const connectDatabse = async () => {
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.z8bnvsw.mongodb.net/?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(connectionString);
    return client;
};

const insertDocument = async (client, collection, document) => {
    const eventsDb = client.db(process.env.mongodb_database);
    const result = await eventsDb.collection(collection).insertOne(document);
    return result;
};

export { connectDatabse, insertDocument };
