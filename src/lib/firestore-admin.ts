import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore, CollectionReference, Query } from 'firebase-admin/firestore';

// Initialize Firebase Admin
let app;
if (!getApps().length) {
  try {
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccount) {
      app = initializeApp({
        credential: cert(JSON.parse(serviceAccount)),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    } else {
      // Fallback for development
      app = initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    // Initialize without credentials for development
    app = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
  }
}

const db = getFirestore(app!);

// Generic fetch all
export async function fetchAll(collectionName: string) {
  try {
    const snapshot = await db.collection(collectionName).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return [];
  }
}

// Generic fetch by ID
export async function fetchById(collectionName: string, id: string) {
  try {
    const doc = await db.collection(collectionName).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error(`Error fetching ${collectionName} by ID:`, error);
    return null;
  }
}

// Generic add
export async function addItem(collectionName: string, data: any) {
  try {
    const docRef = await db.collection(collectionName).add({
      ...data,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error adding to ${collectionName}:`, error);
    throw error;
  }
}

// Generic update
export async function updateItem(collectionName: string, id: string, data: any) {
  try {
    await db.collection(collectionName).doc(id).update({
      ...data,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error(`Error updating ${collectionName}:`, error);
    throw error;
  }
}

// Generic delete
export async function deleteItem(collectionName: string, id: string) {
  try {
    await db.collection(collectionName).doc(id).delete();
  } catch (error) {
    console.error(`Error deleting from ${collectionName}:`, error);
    throw error;
  }
}

// Query with filters
export async function queryItems(collectionName: string, filters: any[] = [], order: string = '', lim: number = 0) {
  try {
    let queryRef: CollectionReference | Query = db.collection(collectionName);
    
    if (filters.length > 0) {
      filters.forEach(([field, op, value]) => {
        queryRef = (queryRef as Query).where(field, op, value);
      });
    }
    
    if (order) {
      queryRef = (queryRef as Query).orderBy(order);
    }
    
    if (lim > 0) {
      queryRef = (queryRef as Query).limit(lim);
    }
    
    const snapshot = await (queryRef as Query).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
    return [];
  }
} 