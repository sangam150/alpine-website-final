import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Only initialize Firebase Admin if environment variables are available
let firebaseAdminConfig = null;
let app = null;
let adminDb = null;
let adminAuth = null;
let adminStorage = null;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  firebaseAdminConfig = {
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  };
  
  try {
    app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
    adminDb = getFirestore(app);
    adminAuth = getAuth(app);
    adminStorage = getStorage(app);
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
  }
}

export { adminDb, adminAuth, adminStorage };
export default app;

// Type exports for better TypeScript support
export type { Auth } from 'firebase-admin/auth';
export type { Storage } from 'firebase-admin/storage'; 