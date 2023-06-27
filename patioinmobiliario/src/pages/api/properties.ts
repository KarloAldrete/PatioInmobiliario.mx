import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://admin:1pXsyV0SAp8KkU8B@patioinmobiliario.wsiehfm.mongodb.net/';


export default async function properties(req, res) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db('patioinmobiliario');
        const collection = database.collection('properties');
        const properties = await collection.find({}).toArray();
        res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ error });
    } finally {
        await client.close();
    }
}