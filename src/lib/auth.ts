import { getAuthSafe } from './firebase-config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';

export interface AuthUser {
  uid: string;
  email: string | null;
  role: 'admin' | 'counselor' | 'student';
}

export const signInAdmin = async (email: string, password: string) => {
  try {
    const auth = getAuthSafe();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signOutAdmin = async () => {
  try {
    const auth = getAuthSafe();
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  const auth = getAuthSafe();
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const auth = getAuthSafe();
  return onAuthStateChanged(auth, callback);
}; 