import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await connectToDatabase();
        const properties = await db.collection('properties').find({}).toArray();
        res.status(200).json({ success: true, data: properties });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const { db } = await connectToDatabase();
        const properties = await db.collection('properties').insertMany(req.body);
        res.status(201).json({ success: true, data: properties });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}