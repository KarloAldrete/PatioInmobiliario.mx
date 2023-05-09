import { MongoClient, Db } from 'mongodb';

declare global {
  var mongo: any;
}

let cached = global.mongo || {};

if (!cached) cached = global.mongo = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('Returning cached connection');
    return cached.conn;
  }
  if (!cached.promise) {
    console.log('Creating new database connection');
    const uri = "mongodb+srv://KarloAldrete:wDVBwrZn7Wz138wz@patioinmobiliario.r805ery.mongodb.net/";
    cached.promise = MongoClient.connect(uri).then((client: MongoClient) => {
      const db = client.db('PatioInmobiliario') as Db;
      console.log(`Connected to database ${db.databaseName} at ${uri}`);
      return { client, db };
    });
  }
  console.log('Waiting for connection promise');
  cached.conn = await cached.promise;
  console.log('Connection promise resolved');
  return cached.conn;
}
