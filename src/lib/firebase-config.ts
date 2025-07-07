import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'alpine-website-final.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'alpine-website-final',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'alpine-website-final.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-XXXXXXXXXX'
};

// Initialize Firebase only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }

  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.warn('Firebase initialization failed:', error);
  // Create mock objects for development
  app = null;
  auth = null;
  db = null;
  storage = null;
}

// Export with error checking
export { auth, db, storage };
export default app;

// Helper function to check if Firebase is properly initialized
export const isFirebaseInitialized = () => {
  return app !== null && auth !== null && db !== null && storage !== null;
};

// Safe Firebase service functions
export const getFirestoreSafe = () => {
  if (!db) {
    throw new Error('Firestore is not initialized');
  }
  return db;
};

export const getAuthSafe = () => {
  if (!auth) {
    throw new Error('Auth is not initialized');
  }
  return auth;
};

export const getStorageSafe = () => {
  if (!storage) {
    throw new Error('Storage is not initialized');
  }
  return storage;
}; 