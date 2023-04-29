import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if(req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { name, image } = req.body;

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          name: name || currentUser.name,
          image: image || currentUser.image,
        }
      });

      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error){
    console.log(error);
    return res.status(400).end();
  }
}