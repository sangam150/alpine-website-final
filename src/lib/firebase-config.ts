import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth as firebaseGetAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import {
  getStorage as firebaseGetStorage,
  FirebaseStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "alpine-website-final.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "alpine-website-final",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "alpine-website-final.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX",
};

// Initialize Firebase only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

// Initialize Firebase only on client side
const initializeFirebase = () => {
  if (typeof window === "undefined") {
    return; // Don't initialize on server side
  }

  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    // Initialize Firebase services
    auth = firebaseGetAuth(app);
    db = getFirestore(app);
    storage = firebaseGetStorage(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
    // Create mock objects for development
    app = null;
    auth = null;
    db = null;
    storage = null;
  }
};

// Initialize Firebase on first client-side access
let isInitialized = false;
const ensureInitialized = () => {
  if (!isInitialized && typeof window !== "undefined") {
    initializeFirebase();
    isInitialized = true;
  }
};

// Export with lazy initialization
export const getAuthInstance = () => {
  ensureInitialized();
  return auth;
};

export const getDbInstance = () => {
  ensureInitialized();
  return db;
};

export const getStorageInstance = () => {
  ensureInitialized();
  return storage;
};

// Helper function to check if Firebase is initialized
export const isFirebaseInitialized = () => {
  ensureInitialized();
  return app !== null && db !== null;
};

// Safe Firebase service functions
export const getFirestoreSafe = () => {
  const firestore = getDbInstance();
  if (!firestore) {
    throw new Error("Firestore is not initialized");
  }
  return firestore;
};

export const getAuthSafe = () => {
  const authInstance = getAuthInstance();
  if (!authInstance) {
    throw new Error("Auth is not initialized");
  }
  return authInstance;
};

export const getStorageSafe = () => {
  const storageInstance = getStorageInstance();
  if (!storageInstance) {
    throw new Error("Storage is not initialized");
  }
  return storageInstance;
};

export { firebaseConfig };
