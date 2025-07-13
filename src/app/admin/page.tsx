'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  MessageSquare,
  BarChart3,
  PieChart,
  Activity,
  Target,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Search,
  Edit,
  Trash2,
  Settings,
  Bell,
  Star,
  Award,
  BookOpen,
  GraduationCap,
  User
} from 'lucide-react';
import Link from 'next/link';

// Disable SSR for this page to avoid Firebase initialization issues
export const dynamic = 'force-dynamic';
import { useAuth } from "@/components/auth/AuthProvider";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  createdAt: string;
  lastContact: string;
  notes: string;
};

type Analytics = { 
  users: number; 
  leads: number; 
  applications: number;
  revenue: number;
  conversionRate: number;
  averageResponseTime: number;
};

interface DashboardStats {
  totalStudents: number;
  totalUploads: number;
  totalCountries: number;
  statusCounts: Record<string, number>;
  recentStudents: any[];
  monthlyGrowth: number;
  topCountries: Array<{country: string; count: number}>;
  leadSources: Array<{source: string; count: number}>;
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }>;
}

export default function AdminDashboard() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = React.useState(true);
  const [analytics, setAnalytics] = React.useState<Analytics>({ 
    users: 0, 
    leads: 0, 
    applications: 0,
    revenue: 0,
    conversionRate: 0,
    averageResponseTime: 0
  });
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalUploads: 0,
    totalCountries: 0,
    statusCounts: {},
    recentStudents: [],
    monthlyGrowth: 0,
    topCountries: [],
    leadSources: []
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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
          applications: 45,
          revenue: 125000,
          conversionRate: 23.5,
          averageResponseTime: 2.3
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
          setStats({
            ...data.data,
            monthlyGrowth: 15.2,
            topCountries: [
              { country: 'Canada', count: 25 },
              { country: 'Australia', count: 18 },
              { country: 'UK', count: 12 },
              { country: 'USA', count: 8 },
              { country: 'Germany', count: 6 }
            ],
            leadSources: [
              { source: 'Website', count: 45 },
              { source: 'Social Media', count: 28 },
              { source: 'Referral', count: 15 },
              { source: 'Google Ads', count: 12 }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'qualified':
        return 'bg-green-100 text-green-800';
      case 'converted':
        return 'bg-purple-100 text-purple-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'contacted':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'qualified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'converted':
        return <Star className="h-4 w-4 text-purple-500" />;
      case 'lost':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-semibold">Admin access only</h2>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.displayName || user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                  <p className="text-xs text-green-600">+{stats.monthlyGrowth}% this month</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.leads}</p>
                  <p className="text-xs text-blue-600">{analytics.conversionRate}% conversion</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{analytics.revenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+12.5% this month</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.averageResponseTime}h</p>
                  <p className="text-xs text-green-600">Avg response time</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                  <CardDescription>Most popular study destinations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topCountries.map((item, index) => (
                      <div key={item.country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <span className="font-medium">{item.country}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={(item.count / stats.totalStudents) * 100} className="w-20" />
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lead Sources</CardTitle>
                  <CardDescription>Where our leads come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.leadSources.map((item, index) => (
                      <div key={item.source} className="flex items-center justify-between">
                        <span className="font-medium">{item.source}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={(item.count / analytics.leads) * 100} className="w-20" />
                          <span className="text-sm text-gray-600">{item.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">New student application approved</p>
                      <p className="text-sm text-gray-600">University of Toronto - Master of Computer Science</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">New lead inquiry received</p>
                      <p className="text-sm text-gray-600">From website contact form</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">4 hours ago</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Upload className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Document uploaded</p>
                      <p className="text-sm text-gray-600">IELTS Score Report - Student ID: STU001</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">6 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Lead Management</CardTitle>
                    <CardDescription>Manage and track all leads</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{lead.name}</h3>
                          <p className="text-sm text-gray-600">{lead.email}</p>
                          <p className="text-xs text-gray-500">{lead.country} • {lead.source}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Created: {lead.createdAt}</p>
                          <p className="text-xs text-gray-500">Last contact: {lead.lastContact}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Student Management</CardTitle>
                    <CardDescription>Track all student applications and progress</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stats.recentStudents.map((student: any) => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{student.name}</h3>
                          <p className="text-sm text-gray-600">{student.university}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                        </div>
                        <Progress value={student.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{student.country}</span>
                          <span>{student.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Conversion Rate</span>
                      <span className="font-semibold">{analytics.conversionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Response Time</span>
                      <span className="font-semibold">{analytics.averageResponseTime} hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Student Satisfaction</span>
                      <span className="font-semibold">4.8/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Visa Success Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Financial performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Monthly Revenue</span>
                      <span className="font-semibold">₹{analytics.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Growth Rate</span>
                      <span className="font-semibold text-green-600">+{stats.monthlyGrowth}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Deal Size</span>
                      <span className="font-semibold">₹25,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Customer Lifetime Value</span>
                      <span className="font-semibold">₹75,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage website content and resources</CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Content
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <div>
                        <h3 className="font-semibold">Blog Posts</h3>
                        <p className="text-sm text-gray-600">50+ articles</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View All</Button>
                      <Button variant="outline" size="sm">Add New</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="h-8 w-8 text-green-600" />
                      <div>
                        <h3 className="font-semibold">Resources</h3>
                        <p className="text-sm text-gray-600">25+ downloads</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View All</Button>
                      <Button variant="outline" size="sm">Add New</Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Globe className="h-8 w-8 text-purple-600" />
                      <div>
                        <h3 className="font-semibold">Countries</h3>
                        <p className="text-sm text-gray-600">12 destinations</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View All</Button>
                      <Button variant="outline" size="sm">Add New</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 