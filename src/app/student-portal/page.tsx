'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  GraduationCap, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

interface Application {
  id: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  university: string;
  program: string;
  country: string;
  appliedDate: string;
  updatedDate: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'uploaded' | 'approved' | 'rejected';
  uploadedDate?: string;
  size?: string;
}

interface Message {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export default function StudentPortalPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setApplications([
        {
          id: '1',
          status: 'completed',
          university: 'University of Toronto',
          program: 'Master of Computer Science',
          country: 'Canada',
          appliedDate: '2024-01-15',
          updatedDate: '2024-02-20'
        },
        {
          id: '2',
          status: 'in-progress',
          university: 'University of British Columbia',
          program: 'Master of Data Science',
          country: 'Canada',
          appliedDate: '2024-02-01',
          updatedDate: '2024-02-25'
        }
      ]);

      setDocuments([
        {
          id: '1',
          name: 'Academic Transcript',
          type: 'Academic',
          status: 'approved',
          uploadedDate: '2024-01-10',
          size: '2.5 MB'
        },
        {
          id: '2',
          name: 'IELTS Score Report',
          type: 'Language Test',
          status: 'approved',
          uploadedDate: '2024-01-12',
          size: '1.8 MB'
        },
        {
          id: '3',
          name: 'Statement of Purpose',
          type: 'Application',
          status: 'uploaded',
          uploadedDate: '2024-02-15',
          size: '500 KB'
        },
        {
          id: '4',
          name: 'Letter of Recommendation',
          type: 'Reference',
          status: 'pending',
          size: '1.2 MB'
        }
      ]);

      setMessages([
        {
          id: '1',
          from: 'Admissions Team',
          subject: 'Application Update - UBC',
          message: 'Your application for Master of Data Science has been reviewed. Please upload your updated CV.',
          date: '2024-02-25',
          read: false
        },
        {
          id: '2',
          from: 'Visa Department',
          subject: 'Visa Application Status',
          message: 'Your visa application documents have been submitted. Processing time: 4-6 weeks.',
          date: '2024-02-20',
          read: true
        }
      ]);
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
      case 'uploaded':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress':
      case 'uploaded':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      case 'rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Student Portal</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Track your application progress, manage documents, and stay updated on your study abroad journey
              </p>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
                <CardDescription className="text-center">
                  Sign in to access your student portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    onClick={signInWithGoogle} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign in with Google
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/contact" className="text-blue-600 hover:text-blue-700">
                      Contact us to get started
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
              <p className="text-gray-600">Welcome back, {user.displayName || user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{applications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active applications
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Documents Uploaded</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {documents.filter(d => d.status === 'uploaded' || d.status === 'approved').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Out of {documents.length} total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {messages.filter(m => !m.read).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    New messages
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Mar 15</div>
                  <p className="text-xs text-muted-foreground">
                    Document submission
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Your latest application updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(app.status)}
                        <div>
                          <p className="font-medium">{app.university}</p>
                          <p className="text-sm text-gray-600">{app.program}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('-', ' ')}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          Updated: {new Date(app.updatedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Upload className="h-6 w-6" />
                    <span className="text-sm">Upload Documents</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm">Schedule Meeting</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">View Resources</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm">Track Progress</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>
                      Track all your university applications
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Application
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{app.university}</h3>
                          <p className="text-gray-600">{app.program}</p>
                          <p className="text-sm text-gray-500">{app.country}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Applied:</span>
                          <p>{new Date(app.appliedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Updated:</span>
                          <p>{new Date(app.updatedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <p className="capitalize">{app.status}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Documents</CardTitle>
                    <CardDescription>
                      Manage your application documents
                    </CardDescription>
                  </div>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-blue-500" />
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-sm text-gray-600">{doc.type}</p>
                          {doc.uploadedDate && (
                            <p className="text-xs text-gray-500">
                              Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        {doc.size && (
                          <span className="text-sm text-gray-500">{doc.size}</span>
                        )}
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Communication from our team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`border rounded-lg p-4 ${!msg.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{msg.subject}</h4>
                            {!msg.read && (
                              <Badge variant="secondary" className="text-xs">New</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{msg.message}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>From: {msg.from}</span>
                            <span>{new Date(msg.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 