import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Firebase Admin configuration
let app: any = null;
let adminDb: any = null;
let adminAuth: any = null;
let adminStorage: any = null;

// Check if we're in a server environment and have the required credentials
const isServer = typeof window === 'undefined';
const hasCredentials = process.env.FIREBASE_PROJECT_ID && 
                      process.env.FIREBASE_CLIENT_EMAIL && 
                      process.env.FIREBASE_PRIVATE_KEY;

if (isServer && hasCredentials) {
  try {
    const firebaseAdminConfig = {
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    };
    
    app = getApps().length === 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];
    adminDb = getFirestore(app);
    adminAuth = getAuth(app);
    adminStorage = getStorage(app);
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
  }
} else if (isServer) {
  console.warn('Firebase Admin credentials not found. Admin functionality will be limited.');
}

export { adminDb, adminAuth, adminStorage };
export default app;

// Helper function to check if admin is properly initialized
export const isAdminInitialized = () => {
  return app !== null && adminDb !== null && adminAuth !== null && adminStorage !== null;
};

// Type exports for better TypeScript support
export type { Auth } from 'firebase-admin/auth';
export type { Storage } from 'firebase-admin/storage'; 