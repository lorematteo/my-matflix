import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

const validateEmail = (email:string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png'
]

export default async function handler(req: NextApiRequest, res: NextApiResponse){

  const defaultImage = images[Math.floor(Math.random() * 4)];

  if(req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;

    if(!name){
      return res.status(401).json({ error: 'Name missing'})
    };

    if(!email){
      return res.status(401).json({ error: 'Email missing'})
    };

    if(!password){
      return res.status(401).json({ error: 'Password missing'})
    };

    if(password.length < 6){
      return res.status(401).json({ error: 'Password must be at least 6 characters'})
    };

    if(!validateEmail(email)){
      return res.status(401).json({ error: 'Email invalid'})
    }

    const exisitingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    });

    if(exisitingUser) {
      return res.status(422).json({ error: 'Email already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: defaultImage,
        emailVerified: new Date(),
      }
    });

    return res.status(200).json(user);
  } catch(error) {
    console.log(error);
    return res.status(400).end();
  }
}