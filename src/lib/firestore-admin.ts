import { db } from './firebase-config';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';

// Generic fetch all
export async function fetchAll(collectionName: string) {
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Generic fetch by ID
export async function fetchById(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

// Generic add
export async function addItem(collectionName: string, data: any) {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, { ...data, createdAt: serverTimestamp() });
  return docRef.id;
}

// Generic update
export async function updateItem(collectionName: string, id: string, data: any) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
}

// Generic delete
export async function deleteItem(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}

// Query with filters
export async function queryItems(collectionName: string, filters: any[] = [], order: string = '', lim: number = 0) {
  let q = query(collection(db, collectionName));
  if (filters.length > 0) {
    filters.forEach(([field, op, value]) => {
      q = query(q, where(field, op, value));
    });
  }
  if (order) q = query(q, orderBy(order));
  if (lim > 0) q = query(q, limit(lim));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} 