'use client';
import React, { useState, useEffect } from "react";

// Disable SSR for this page to avoid Firebase initialization issues
export const dynamic = 'force-dynamic';
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Globe, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Award,
  Download,
  Mail,
  User,
  LogOut,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { db, storage } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';

type Document = {
  name: string;
  status?: string;
  url?: string | null;
  date?: string | null;
};

export default function DashboardPage() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [documents, setDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const methods = useForm();

  useEffect(() => {
    if (!user) return;
    const fetchDocuments = async () => {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setDocuments(userDocSnap.data().documents || []);
      } else {
        setDocuments([
          { name: 'Passport Copy', status: 'required', url: null },
          { name: 'Academic Transcripts', status: 'required', url: null },
          { name: 'IELTS Certificate', status: 'required', url: null },
          { name: 'Financial Documents', status: 'required', url: null },
        ]);
      }
    };
    fetchDocuments();
  }, [user]);

  const handleDocumentUpload = async (data: FieldValues) => {
    const { file, docName } = data as { file: File[]; docName: string };
    if (!user) return;
    setUploading(true);
    try {
      const selectedFile = file[0];
      const storageRef = ref(storage, `documents/${user.uid}/${docName}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);
      const userDocRef = doc(db, 'users', user.uid);
      const updatedDocs = documents.map((d) =>
        d.name === docName ? { ...d, status: 'uploaded', url } : d
      );
      await setDoc(userDocRef, { documents: updatedDocs }, { merge: true });
      setDocuments(updatedDocs);
      methods.reset();
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-xl">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
                <CardDescription>
                  Sign in to access your personalized dashboard and track your study abroad journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={signInWithGoogle} 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign in with Google
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Secure login powered by Google
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Mock data for demonstration
  const dashboardData = {
    progress: 65,
    documents: [
      { name: "Passport Copy", status: "uploaded", date: "2024-01-15" },
      { name: "Academic Transcripts", status: "pending", date: "2024-01-20" },
      { name: "IELTS Certificate", status: "uploaded", date: "2024-01-10" },
      { name: "Financial Documents", status: "required", date: null }
    ],
    applications: [
      { university: "University of Melbourne", country: "Australia", status: "In Progress", progress: 75 },
      { university: "University of Toronto", country: "Canada", status: "Submitted", progress: 100 },
      { university: "University of Manchester", country: "UK", status: "Under Review", progress: 90 }
    ],
    countryGuides: [
      { name: "Australia", status: "Available", lastUpdated: "2024-01-15" },
      { name: "United Kingdom", status: "Available", lastUpdated: "2024-01-10" },
      { name: "Canada", status: "Available", lastUpdated: "2024-01-12" },
      { name: "Germany", status: "Coming Soon", lastUpdated: null }
    ]
  };

  const generateHandbook = () => {
    // Implement PDF generation
    console.log("Generating personalized handbook");
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      <span>Application Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>{dashboardData.progress}%</span>
                        </div>
                        <Progress value={dashboardData.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-gray-600">
                        {dashboardData.documents.filter(d => d.status === "uploaded").length} of {dashboardData.documents.length} documents uploaded
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>Active Applications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {dashboardData.applications.length}
                  </div>
                  <p className="text-sm text-gray-600">Applications in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span>Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Upload remaining documents</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span>Schedule counseling session</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Complete these tasks to move forward with your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={generateHandbook} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Handbook
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Upload all required documents to complete your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            {doc.url && (
                              <div className="text-sm text-blue-600 underline"><a href={doc.url} target="_blank" rel="noopener noreferrer">View Uploaded</a></div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                      <Badge 
                        variant={
                          doc.status === "uploaded" ? "default" : 
                          doc.status === "pending" ? "secondary" : "destructive"
                        }
                      >
                        {doc.status}
                      </Badge>
                      {doc.status !== "uploaded" && (
                        <FormProvider {...methods}>
                          <form onSubmit={methods.handleSubmit(handleDocumentUpload)} className="flex items-center gap-2">
                            <input type="hidden" {...methods.register('docName')} value={doc.name} />
                            <input type="file" accept="application/pdf,image/*" {...methods.register('file', { required: true })} className="block" />
                            <Button type="submit" size="sm" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</Button>
                          </form>
                        </FormProvider>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track the progress of your university applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.applications.map((app, index) => (
                    <div key={app.university} className="border rounded-lg p-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{app.university}</h3>
                            <p className="text-sm text-gray-600">{app.country}</p>
                          </div>
                          <Badge variant="outline">{app.status}</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} className="h-2" />
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Country Guides & Resources</CardTitle>
                <CardDescription>
                  Access comprehensive guides for your study destinations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardData.countryGuides.map((guide, index) => (
                    <div key={guide.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{guide.name}</h3>
                            <p className="text-sm text-gray-600">
                              {guide.lastUpdated ? `Updated: ${guide.lastUpdated}` : 'Coming Soon'}
                            </p>
                          </div>
                          <Button size="sm" variant="outline" disabled={guide.status === "Coming Soon"}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            {guide.status === "Available" ? "View Guide" : "Coming Soon"}
                          </Button>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personalized Handbook */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Handbook</CardTitle>
                <CardDescription>
                  Generate a custom handbook based on your quiz results and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Based on your quiz results, we can generate a personalized handbook with:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Recommended universities and programs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Country-specific visa requirements</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Application timeline and deadlines</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Cost estimates and scholarship opportunities</span>
                    </li>
                  </ul>
                  <div className="flex space-x-2">
                    <Button onClick={generateHandbook}>
                      <Download className="w-4 h-4 mr-2" />
                      Generate PDF Handbook
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Handbook
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 