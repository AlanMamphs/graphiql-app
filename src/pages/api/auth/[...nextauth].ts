import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import firebase, { auth } from '@/firebase/client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not set');
}
const adapter = FirestoreAdapter();
export default NextAuth({
  secret: process.env.AUTH_SECRET,
  adapter,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        firstname: {
          label: 'First name',
          type: 'text',
        },
        lastname: {
          label: 'Last name',
          type: 'text',
        },
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      // @ts-expect-error AdaptUser returned is ok
      async authorize(credentials) {
        const { firstname, lastname, password, email } = credentials as Record<
          string,
          string
        >;

        if (firstname && lastname && password && email) {
          // Registration

          try {
            const data = await createUserWithEmailAndPassword(
              auth,
              credentials?.email as string,
              credentials?.password as string
            );
            // if everything is good, create and return user
            await adapter.createUser?.({
              name: `${firstname} ${lastname}`,
              email,
              emailVerified: data.user.emailVerified ? new Date() : null,
            });
          } catch (err) {
            throw new Error((err as firebase.FirebaseError).code);
          }

          return (await adapter.getUserByEmail?.(email)) ?? null;
        }

        if (email && password) {
          try {
            // Authorization
            const data = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            // if everything is good, find and return user
            return adapter.getUserByEmail?.(data.user.email as string);
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
