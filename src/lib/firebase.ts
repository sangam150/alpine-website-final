import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRUIo7fIVU_5RN3QSh9SWMF7FsHSXUXX8",
  authDomain: "alpine-website-final.firebaseapp.com",
  projectId: "alpine-website-final",
  storageBucket: "alpine-website-final.firebasestorage.app",
  messagingSenderId: "717233032769",
  appId: "1:717233032769:web:1432b2b3889b5c2123c0c0",
  measurementId: "G-6ZDBWCRWMT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app }; 