"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getAuthSafe } from "@/lib/firebase-config";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, PhoneAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailPassword: (email: string, password: string) => Promise<void>;
  // 2FA additions
  twoFARequired: boolean;
  twoFAStep: "none" | "pending" | "verifying" | "success" | "error";
  start2FA: (user: User) => Promise<void>;
  verify2FACode: (code: string) => Promise<boolean>;
  twoFAError: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const sendEmailCode = async (email: string, code: string) => {
  // Call your backend API to send the code via Resend
  await fetch("/api/send-2fa-code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // 2FA state
  const [twoFARequired, setTwoFARequired] = useState(false);
  const [twoFAStep, setTwoFAStep] = useState<"none" | "pending" | "verifying" | "success" | "error">("none");
  const [twoFAError, setTwoFAError] = useState("");
  const [twoFAUser, setTwoFAUser] = useState<User | null>(null);
  const [twoFACode, setTwoFACode] = useState<string | null>(null);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    const initializeAuth = async () => {
      try {
        const auth = getAuthSafe();
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
        });
      } catch (error) {
        console.warn("Auth state change listener failed:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    if (typeof window === "undefined") return;

    try {
      const auth = getAuthSafe();
      await firebaseSignOut(auth);
    } catch (error) {
      console.warn("Sign out failed:", error);
    }
  };

  const signInWithGoogle = async () => {
    if (typeof window === "undefined") return;

    try {
      const auth = getAuthSafe();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.warn("Google sign in failed:", error);
    }
  };

  // 2FA: Check Firestore for 2faEnabled after password login
  const signInWithEmailPassword = async (email: string, password: string) => {
    if (typeof window === "undefined") return;
    setTwoFARequired(false);
    setTwoFAStep("none");
    setTwoFAError("");
    try {
      const auth = getAuthSafe();
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // Check Firestore for 2faEnabled
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", cred.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      if (userData && userData["2faEnabled"]) {
        setTwoFARequired(true);
        setTwoFAStep("pending");
        setTwoFAUser(cred.user);
        // Do not setUser yet, require 2FA verification
      } else {
        setUser(cred.user);
        setTwoFARequired(false);
        setTwoFAStep("none");
      }
    } catch (error: any) {
      setTwoFAError(error?.message || "Login failed. Please try again.");
      setTwoFARequired(false);
      setTwoFAStep("error");
      throw error;
    }
  };

  // 2FA: Start 2FA (send code via SMS or email)
  const start2FA = async (user: User) => {
    setTwoFAStep("verifying");
    setTwoFAError("");
    try {
      // Fetch user role from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const role = userData.role || "student";
      if (role === "admin") {
        // Admin: Use Firebase Phone Auth for SMS
        // Assume phoneNumber is stored in userData.phoneNumber
        const phoneNumber = userData.phoneNumber;
        if (!phoneNumber) {
          setTwoFAError("No phone number on file for admin.");
          setTwoFAStep("error");
          return;
        }
        // Setup reCAPTCHA
        if (!(window as any).recaptchaVerifier) {
          const auth = getAuth();
          (window as any).recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            { size: "invisible" }
          );
        }
        const appVerifier = (window as any).recaptchaVerifier;
        const confirmationResult = await signInWithPhoneNumber(getAuth(), phoneNumber, appVerifier);
        (window as any).confirmationResult = confirmationResult;
        setTwoFAStep("verifying");
      } else {
        // Student: Generate code, store in Firestore, send via email
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setTwoFACode(code);
        await setDoc(doc(db, "2faCodes", user.uid), { code, createdAt: Date.now() });
        await sendEmailCode(user.email || "", code);
        setTwoFAStep("verifying");
      }
    } catch (error: any) {
      setTwoFAError(error?.message || "Failed to send verification code.");
      setTwoFAStep("error");
    }
  };

  // 2FA: Verify code
  const verify2FACode = async (code: string) => {
    try {
      // Fetch user role from Firestore
      const db = getFirestore();
      const userDoc = await getDoc(doc(db, "users", twoFAUser?.uid || ""));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const role = userData.role || "student";
      if (role === "admin") {
        // Admin: Confirm SMS code
        if ((window as any).confirmationResult) {
          await (window as any).confirmationResult.confirm(code);
          setUser(twoFAUser);
          setTwoFAStep("success");
          setTwoFARequired(false);
          setTwoFAError("");
          return true;
        } else {
          setTwoFAError("No confirmation result. Please try again.");
          setTwoFAStep("error");
          return false;
        }
      } else {
        // Student: Check code in Firestore
        const codeDoc = await getDoc(doc(db, "2faCodes", twoFAUser?.uid || ""));
        const codeData = codeDoc.exists() ? codeDoc.data() : {};
        if (codeData.code === code) {
          setUser(twoFAUser);
          setTwoFAStep("success");
          setTwoFARequired(false);
          setTwoFAError("");
          return true;
        } else {
          setTwoFAError("Invalid code. Please try again.");
          setTwoFAStep("error");
          return false;
        }
      }
    } catch (error: any) {
      setTwoFAError(error?.message || "Verification failed.");
      setTwoFAStep("error");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signOut,
        signInWithGoogle,
        signInWithEmailPassword,
        twoFARequired,
        twoFAStep,
        start2FA,
        verify2FACode,
        twoFAError,
      }}
    >
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
