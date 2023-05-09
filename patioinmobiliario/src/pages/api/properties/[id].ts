import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  if (typeof id === 'undefined') {
    return res.status(404).json({ success: false });
  }

  switch (method) {
    case 'GET':
      try {
        const { db } = await connectToDatabase();
        const property = await db.collection('properties').findOne({ _id: new ObjectId(id as string) });
        res.status(200).json({ success: true, data: property });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const { db } = await connectToDatabase();
        const property = await db.collection('properties').updateOne({ _id: new ObjectId(id as string) }, { $set: req.body });
        res.status(200).json({ success: true, data: property });
      }
      catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const { db } = await connectToDatabase();
        const property = await db.collection('properties').deleteOne({ _id: new ObjectId(id as string) });
        res.status(200).json({ success: true, data: property });
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