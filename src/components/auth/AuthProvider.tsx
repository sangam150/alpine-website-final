'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import type { Auth } from "firebase/auth";

// Type the auth variable
const typedAuth = auth as Auth | null;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    if (!typedAuth) {
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(typedAuth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (error) {
      console.warn('Auth state change listener failed:', error);
      setLoading(false);
    }
  }, []);

  const signOut = async () => {
    if (typedAuth) {
      try {
        await firebaseSignOut(typedAuth);
      } catch (error) {
        console.warn('Sign out failed:', error);
      }
    }
  };

  const signInWithGoogle = async () => {
    if (typedAuth) {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(typedAuth, provider);
      } catch (error) {
        console.warn('Google sign in failed:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 