import NextAuth, { User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import firebase, { auth, adapter } from '@/firebase/client';

import { signInWithEmailAndPassword } from 'firebase/auth';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set');
}

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  // @ts-expect-error adapter is ok
  adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jane.doe@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { password, email } = credentials as Record<string, string>;

        if (email && password) {
          try {
            // Authorization
            const data = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            // if everything is good, find and return user
            return adapter.getUserByEmail?.(data.user.email as string) as User;
          } catch (err) {
            throw new Error((err as firebase.FirebaseError).code);
          }
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    newUser: '/login',
    error: '/login',
  },
});
