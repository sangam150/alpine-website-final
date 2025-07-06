'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated (you can implement your own auth logic)
    const checkAuth = async () => {
      try {
        // For now, we'll just set authenticated to false
        // In production, implement proper authentication
        setIsAuthenticated(false);
        setLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-gray-600">
              This area is restricted to authorized administrators only.
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={() => router.push('/admin/login')}
                className="w-full"
              >
                Login
              </Button>
              <Button 
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage Alpine Education & Visa Services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Students Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Students
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage student applications and profiles</p>
              <Button onClick={() => router.push('/admin/students')} className="w-full">
                View Students
              </Button>
            </CardContent>
          </Card>

          {/* Content Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Content
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage website content and pages</p>
              <Button onClick={() => router.push('/admin/content')} className="w-full">
                Manage Content
              </Button>
            </CardContent>
          </Card>

          {/* Countries Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Countries
                <Badge variant="secondary">12</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage country information and programs</p>
              <Button onClick={() => router.push('/admin/countries')} className="w-full">
                Manage Countries
              </Button>
            </CardContent>
          </Card>

          {/* Uploads Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Uploads
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage file uploads and documents</p>
              <Button onClick={() => router.push('/admin/uploads')} className="w-full">
                Manage Uploads
              </Button>
            </CardContent>
          </Card>

          {/* Users Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Users
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage admin users and permissions</p>
              <Button onClick={() => router.push('/admin/users')} className="w-full">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Analytics
                <Badge variant="secondary">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">View website analytics and reports</p>
              <Button variant="outline" className="w-full">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="mr-4"
          >
            Back to Website
          </Button>
          <Button variant="destructive">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
} 