'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Globe, 
  FileText, 
  Upload, 
  TrendingUp,
  Eye,
  Download,
  Plus,
  Calendar,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

// Disable SSR for this page to avoid Firebase initialization issues
export const dynamic = 'force-dynamic';
import { useAuth } from "@/components/auth/AuthProvider";

type Lead = {
  id: string;
  name: string;
  email: string;
  status?: string;
};

type Analytics = { users: number; leads: number };

interface DashboardStats {
  totalStudents: number;
  totalUploads: number;
  totalCountries: number;
  statusCounts: Record<string, number>;
  recentStudents: any[];
}

export default function AdminDashboard() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = React.useState(true);
  const [analytics, setAnalytics] = React.useState<Analytics>({ users: 0, leads: 0 });
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalUploads: 0,
    totalCountries: 0,
    statusCounts: {},
    recentStudents: []
  });
  const [loadingStats, setLoadingStats] = useState(true);

  React.useEffect(() => {
    if (!user) return;
    // Check admin status via API
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/auth/check-admin');
        const data = await response.json();
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  React.useEffect(() => {
    if (!isAdmin) return;
    const fetchLeads = async () => {
      setLoadingLeads(true);
      try {
        const response = await fetch('/api/leads');
        const data = await response.json();
        if (data.success) {
          setLeads(data.data);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
      }
      setLoadingLeads(false);
    };
    fetchLeads();
  }, [isAdmin]);

  // Analytics: count users, leads, uploads
  React.useEffect(() => {
    if (!isAdmin) return;
    const fetchAnalytics = async () => {
      try {
        const [usersResponse, leadsResponse] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/leads')
        ]);
        
        const usersData = await usersResponse.json();
        const leadsData = await leadsResponse.json();
        
        setAnalytics({
          users: usersData.success ? usersData.data.length : 0,
          leads: leadsData.success ? leadsData.data.length : 0,
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, [isAdmin]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard-stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

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

  if (loadingStats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Alpine Education Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.statusCounts['in-progress'] || 0} active applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Countries</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCountries}</div>
            <p className="text-xs text-muted-foreground">
              Study destinations available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUploads}</div>
            <p className="text-xs text-muted-foreground">
              Documents and resources
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">
              Visa approval rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button asChild className="w-full">
                <Link href="/admin/students">
                  <Users className="w-4 h-4 mr-2" />
                  View Students
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/countries">
                  <Globe className="w-4 h-4 mr-2" />
                  Manage Countries
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/uploads">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Files
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/content">
                  <FileText className="w-4 h-4 mr-2" />
                  Edit Content
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Pending</span>
                <span className="text-sm text-gray-600">{stats.statusCounts['pending'] || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">In Progress</span>
                <span className="text-sm text-blue-600">{stats.statusCounts['in-progress'] || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm text-green-600">{stats.statusCounts['completed'] || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rejected</span>
                <span className="text-sm text-red-600">{stats.statusCounts['rejected'] || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Students */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Students</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentStudents.length > 0 ? (
            <div className="space-y-4">
              {stats.recentStudents.map((student: any) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        {student.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name || 'Student'}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'completed' ? 'bg-green-100 text-green-800' :
                      student.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      student.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {student.status || 'pending'}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No students yet</p>
              <Button asChild className="mt-4">
                <Link href="/admin/students">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No appointments scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              New Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No new messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Recent Downloads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No recent downloads</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 