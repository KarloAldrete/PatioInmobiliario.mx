import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const { db } = await connectToDatabase();
        const stringId = Array.isArray(id) ? id[0] : id;
        const property = await db.collection('properties').findOne({ _id: new ObjectId(stringId) });
        if (!property) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: property });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
