// import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const handleRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { file } = req.body;
        console.log(file);
        return res.status(200).json({ message: 'Archivo cargado exitosamente.' });
      } catch (error) {
        return res.status(500).json({ error: 'No se pudo cargar el archivo.' });
      }
    default:
      return res.status(405).json({ error: 'Método no permitido.' });
  }
};

export default handleRequest;