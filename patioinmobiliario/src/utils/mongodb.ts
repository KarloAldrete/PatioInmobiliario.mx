import { MongoClient, Db } from 'mongodb';

declare global {
  var mongo: any;
}

let cached = global.mongo || {};

if (!cached) cached = global.mongo = { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const uri = "mongodb+srv://KarloAldrete:wDVBwrZn7Wz138wz@patioinmobiliario.r805ery.mongodb.net/";
    cached.promise = MongoClient.connect(uri).then((client: MongoClient) => {
      return { client, db: client.db(process.env.MONGODB_DB) as Db };
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
