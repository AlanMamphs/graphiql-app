import * as firebase from 'firebase/app';
import { FirestoreAdapter } from '@auth/firebase-adapter';

import { getAuth } from 'firebase/auth';
import { cert } from 'firebase-admin/app';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebase?.getApps().length) {
  firebase.initializeApp(clientCredentials);
}

const app = firebase.getApp();
const auth = getAuth();

const adapter = FirestoreAdapter({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? atob(process.env.FIREBASE_PRIVATE_KEY)
      : undefined,
  }),
});

export default firebase;
export { auth, app, adapter };
