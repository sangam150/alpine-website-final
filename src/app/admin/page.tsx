'use client';
import React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';

type Lead = {
  id: string;
  name: string;
  email: string;
  status?: string;
};

export default function AdminPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = React.useState(true);
  const [analytics, setAnalytics] = React.useState<unknown>({});

  React.useEffect(() => {
    if (!user) return;
    const checkAdmin = async () => {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
    };
    checkAdmin();
  }, [user]);

  React.useEffect(() => {
    if (!isAdmin) return;
    const fetchLeads = async () => {
      setLoadingLeads(true);
      const leadsSnap = await getDocs(collection(db, 'leads'));
      setLeads(leadsSnap.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Lead, 'id'>) })));
      setLoadingLeads(false);
    };
    fetchLeads();
  }, [isAdmin]);

  // Analytics: count users, leads, uploads
  React.useEffect(() => {
    if (!isAdmin) return;
    const fetchAnalytics = async () => {
      const usersSnap = await getDocs(collection(db, 'users'));
      const leadsSnap = await getDocs(collection(db, 'leads'));
      setAnalytics({
        users: usersSnap.size,
        leads: leadsSnap.size,
      });
    };
    fetchAnalytics();
  }, [isAdmin]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Admin access only</h2>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        {/* Add email/password sign-in here later */}
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 w-full">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <div>Users: {analytics?.users || 0}</div>
          <div>Leads: {analytics?.leads || 0}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">Leads</h2>
          {loadingLeads ? (
            <div>Loading leads...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr key={lead.id} className="border-t">
                    <td>{lead.name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.status || 'New'}</td>
                    <td>
                      <Button size="sm" onClick={async () => {
                        await updateDoc(doc(db, 'leads', lead.id), { status: 'Contacted' });
                        setLeads(leads.map(l => l.id === lead.id ? { ...l, status: 'Contacted' } : l));
                      }}>Mark Contacted</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* File management and more admin modules can be added here */}
    </main>
  );
} 