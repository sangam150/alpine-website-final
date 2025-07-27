"use client";
import React from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
    if (user) {
      // Fetch user role from Firestore
      const fetchRole = async () => {
        setRoleLoading(true);
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setRole(userData.role || null);
        setRoleLoading(false);
        if (!['admin', 'editor', 'reviewer'].includes(userData.role)) {
          router.push("/admin/login");
        }
      };
      fetchRole();
    }
  }, [user, loading, router]);
  if (loading || !user || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading admin...</div>;
  }
  if (!['admin', 'editor', 'reviewer'].includes(role || '')) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Access denied. You do not have permission to view this page.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      <main className="md:ml-64 pt-16 p-6">{children}</main>
    </div>
  );
}
