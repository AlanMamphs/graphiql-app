import { NextApiHandler } from 'next';
import { auth, adapter } from '@/firebase/client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AdapterUser } from 'next-auth/adapters';
import { FirebaseError } from 'firebase/app';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405);
  }
  const { firstname, lastname, password, email } = JSON.parse(req.body);

  if (firstname && lastname && password && email) {
    // Registration
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      // if everything is good, create and return user
      await adapter.createUser?.({
        id: data.user.uid,
        name: `${firstname} ${lastname}`,
        email,
        emailVerified: data.user.emailVerified ? new Date() : null,
      } as AdapterUser);
    } catch (err) {
      const error = err as FirebaseError;
      return res.status(500).json({ message: error.code });
    }
    return res.status(200).json({ text: 'OK' });
  }

  return res.status(401);
};

export default handler;
