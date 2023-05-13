import prismadb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { data } = req.body;

    const movie = await prismadb.movie.create({
      data: {
        ...data,
        createdAt: new Date(),
      }
    })

    return res.status(200).json(movie);
  } catch(error) {
    console.log(error);
    return res.status(400).end();
  }
}