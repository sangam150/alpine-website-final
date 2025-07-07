'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { FileText, Calendar, MessageSquare, Download, Upload as UploadIcon, User, BookOpen, Target, LogOut, LogIn, CheckCircle, Clock, AlertCircle, ArrowRight, Shield, Lock, GraduationCap, Eye, EyeOff, Plus, Trash2, MapPin, Phone } from 'lucide-react';
import { auth, db, storage } from '@/lib/firebase-config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { FirebaseService, COLLECTIONS } from '@/lib/firebase-collections';
import type { Student, Application, Upload, QuizResult, Appointment } from '@/lib/firebase-collections';
import { getAuthSafe } from '@/lib/firebase-config';

interface StudentData {
  id: string;
  name: string;
  email: string;
  course: string;
  country: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  progress: number;
  documents: string[];
  appointments: any[];
  messages: any[];
  counselorId: string;
}

const features = [
  {
    icon: FileText,
    title: 'Application Tracking',
    description: 'Track your university applications and visa status in real-time'
  },
  {
    icon: UploadIcon,
    title: 'Document Upload',
    description: 'Securely upload and manage your application documents'
  },
  {
    icon: CheckCircle,
    title: 'Progress Monitoring',
    description: 'Monitor your application progress and next steps'
  },
  {
    icon: User,
    title: 'Personalized Dashboard',
    description: 'Access personalized guidance and recommendations'
  }
];

const securityFeatures = [
  'End-to-end encryption',
  'Secure document storage',
  'Two-factor authentication',
  'Regular security updates',
  'Privacy protection',
  'GDPR compliance'
];

interface StudentPortalData {
  student: Student | null;
  applications: Application[];
  uploads: Upload[];
  quizResults: QuizResult[];
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

export default function StudentPortal() {
  const [auth, setAuth] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [portalData, setPortalData] = useState<StudentPortalData>({
    student: null,
    applications: [],
    uploads: [],
    quizResults: [],
    appointments: [],
    loading: false,
    error: null
  });

  // Auth states
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [authError, setAuthError] = useState<string | null>(null);

  // File upload states
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState('academic');

  // Appointment states
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    time: '',
    type: 'initial',
    notes: ''
  });

  useEffect(() => {
    const auth = getAuthSafe();
    setAuth(auth);

    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);

      if (user) {
        fetchStudentData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchStudentData = async (uid: string) => {
    try {
      setPortalData(prev => ({ ...prev, loading: true, error: null }));

      const [student, applications, uploads, quizResults, appointments] = await Promise.all([
        FirebaseService.getStudentByUid(uid),
        FirebaseService.getApplicationsByStudent(uid),
        FirebaseService.getUploadsByStudent(uid),
        FirebaseService.getQuizResultsByStudent(uid),
        FirebaseService.getAppointmentsByStudent(uid)
      ]);

      setPortalData({
        student,
        applications,
        uploads,
        quizResults,
        appointments,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error fetching student data:', error);
      setPortalData(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to load student data'
      }));
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    try {
      if (authMode === 'login') {
        await signInWithEmailAndPassword(authForm.email, authForm.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(authForm.email, authForm.password);
        
        // Create student profile
        const studentData = {
          uid: userCredential.user.uid,
          email: authForm.email,
          firstName: authForm.firstName,
          lastName: authForm.lastName,
          phone: authForm.phone,
          nationality: 'Nepali',
          documents: {},
          applications: [],
          quizResults: [],
          appointments: [],
          counselingStage: 'initial' as const,
          isActive: true
        };

        await FirebaseService.addDocument(COLLECTIONS.STUDENTS, studentData);
      }
    } catch (error: any) {
      setAuthError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !user) return;

    try {
      setUploading(true);
      
      // Simulate file upload to Firebase Storage
      const uploadData = {
        fileName: selectedFile.name,
        originalName: selectedFile.name,
        fileType: selectedFile.type.includes('pdf') ? 'pdf' : 'image',
        mimeType: selectedFile.type,
        size: selectedFile.size,
        url: `https://storage.googleapis.com/alpine-uploads/${selectedFile.name}`,
        uploadedBy: user.uid,
        category: uploadCategory,
        tags: [uploadCategory],
        description: `Uploaded by ${portalData.student?.firstName} ${portalData.student?.lastName}`,
        isPublic: false,
        downloadCount: 0,
        studentId: user.uid
      };

      await FirebaseService.addDocument(COLLECTIONS.UPLOADS, uploadData);
      
      // Refresh uploads
      const uploads = await FirebaseService.getUploadsByStudent(user.uid);
      setPortalData(prev => ({ ...prev, uploads }));
      
      setSelectedFile(null);
      setUploadCategory('academic');
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAppointmentBooking = async () => {
    if (!user || !appointmentForm.date || !appointmentForm.time) return;

    try {
      const appointmentData = {
        studentId: user.uid,
        counselorId: 'counselor-1', // Default counselor
        date: new Date(`${appointmentForm.date}T${appointmentForm.time}`),
        duration: 60,
        type: appointmentForm.type as any,
        status: 'scheduled' as const,
        notes: appointmentForm.notes
      };

      await FirebaseService.addDocument(COLLECTIONS.APPOINTMENTS, appointmentData);
      
      // Refresh appointments
      const appointments = await FirebaseService.getAppointmentsByStudent(user.uid);
      setPortalData(prev => ({ ...prev, appointments }));
      
      setAppointmentForm({
        date: '',
        time: '',
        type: 'initial',
        notes: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const getCounselingStageProgress = () => {
    const stages = ['initial', 'documentation', 'application', 'visa', 'pre_departure', 'completed'];
    const currentStage = portalData.student?.counselingStage || 'initial';
    const currentIndex = stages.indexOf(currentStage);
    return ((currentIndex + 1) / stages.length) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
                <CardDescription>
                  {authMode === 'login' ? 'Sign in to access your portal' : 'Create your student account'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  {authMode === 'signup' && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            value={authForm.firstName}
                            onChange={(e) => setAuthForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            value={authForm.lastName}
                            onChange={(e) => setAuthForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <input
                          type="tel"
                          value={authForm.phone}
                          onChange={(e) => setAuthForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      value={authForm.email}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Password</label>
                    <input
                      type="password"
                      value={authForm.password}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  {authError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3">
                      <p className="text-red-800 text-sm">{authError}</p>
                    </div>
                  )}
                  <Button type="submit" className="w-full">
                    {authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Portal</h1>
              <p className="text-gray-600">
                Welcome back, {portalData.student?.firstName} {portalData.student?.lastName}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {portalData.loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your data...</p>
          </div>
        ) : portalData.error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-800">{portalData.error}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Progress Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Counseling Progress
                  </CardTitle>
                  <CardDescription>
                    Track your study abroad journey progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Current Stage</span>
                        <span className="text-sm text-gray-500">
                          {portalData.student?.counselingStage || 'initial'}
                        </span>
                      </div>
                      <Progress value={getCounselingStageProgress()} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
                      {['initial', 'documentation', 'application', 'visa', 'pre_departure', 'completed'].map((stage) => (
                        <div key={stage} className="text-center">
                          <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                            stage === portalData.student?.counselingStage 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <p className="text-xs capitalize">{stage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="quizzes">Quiz Results</TabsTrigger>
                  <TabsTrigger value="appointments">Appointments</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Applications</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{portalData.applications.length}</div>
                        <p className="text-xs text-muted-foreground">Active applications</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documents</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{portalData.uploads.length}</div>
                        <p className="text-xs text-muted-foreground">Uploaded files</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Quiz Results</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{portalData.quizResults.length}</div>
                        <p className="text-xs text-muted-foreground">Completed tests</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{portalData.appointments.length}</div>
                        <p className="text-xs text-muted-foreground">Scheduled sessions</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks and actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button className="h-20 flex-col">
                          <UploadIcon className="w-6 h-6 mb-2" />
                          Upload Document
                        </Button>
                        <Button className="h-20 flex-col">
                          <Calendar className="w-6 h-6 mb-2" />
                          Book Appointment
                        </Button>
                        <Button className="h-20 flex-col">
                          <BookOpen className="w-6 h-6 mb-2" />
                          Take Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upload Documents</CardTitle>
                      <CardDescription>Upload your academic and personal documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Document Category</label>
                          <select
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                          >
                            <option value="academic">Academic Transcripts</option>
                            <option value="language">Language Test Results</option>
                            <option value="passport">Passport</option>
                            <option value="financial">Financial Documents</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Select File</label>
                          <input
                            type="file"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          />
                        </div>
                        <Button 
                          onClick={handleFileUpload} 
                          disabled={!selectedFile || uploading}
                          className="w-full"
                        >
                          {uploading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Documents</CardTitle>
                      <CardDescription>Manage your uploaded files</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portalData.uploads.length > 0 ? (
                          portalData.uploads.map((upload) => (
                            <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-3">
                                <FileText className="w-5 h-5 text-blue-600" />
                                <div>
                                  <p className="font-medium">{upload.originalName}</p>
                                  <p className="text-sm text-gray-500">
                                    {formatFileSize(upload.size)} • {upload.category}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No documents uploaded yet</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Applications Tab */}
                <TabsContent value="applications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Applications</CardTitle>
                      <CardDescription>Track your university applications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portalData.applications.length > 0 ? (
                          portalData.applications.map((application) => (
                            <div key={application.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{application.program}</h3>
                                <Badge className={getStatusColor(application.status)}>
                                  {application.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">Intake: {application.intake}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>Application Fee: ${application.applicationFee}</span>
                                <span>Tuition Fee: ${application.tuitionFee}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <GraduationCap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No applications yet</p>
                            <Button className="mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Start Application
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Quiz Results Tab */}
                <TabsContent value="quizzes" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quiz Results</CardTitle>
                      <CardDescription>Your test scores and recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portalData.quizResults.length > 0 ? (
                          portalData.quizResults.map((quiz) => (
                            <div key={quiz.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold capitalize">{quiz.quizType} Test</h3>
                                <Badge variant="outline">
                                  Score: {quiz.score}/{quiz.maxScore}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                Completed: {formatDate(quiz.completedAt)}
                              </p>
                              <div className="text-sm text-gray-500">
                                Duration: {Math.round(quiz.duration / 60)} minutes
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No quiz results yet</p>
                            <Button className="mt-4">
                              <Plus className="w-4 h-4 mr-2" />
                              Take Quiz
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Appointments Tab */}
                <TabsContent value="appointments" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Book Appointment</CardTitle>
                      <CardDescription>Schedule a counseling session</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Date</label>
                            <input
                              type="date"
                              value={appointmentForm.date}
                              onChange={(e) => setAppointmentForm(prev => ({ ...prev, date: e.target.value }))}
                              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Time</label>
                            <input
                              type="time"
                              value={appointmentForm.time}
                              onChange={(e) => setAppointmentForm(prev => ({ ...prev, time: e.target.value }))}
                              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Session Type</label>
                          <select
                            value={appointmentForm.type}
                            onChange={(e) => setAppointmentForm(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                          >
                            <option value="initial">Initial Consultation</option>
                            <option value="follow_up">Follow-up Session</option>
                            <option value="visa_prep">Visa Preparation</option>
                            <option value="pre_departure">Pre-departure Briefing</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Notes</label>
                          <textarea
                            value={appointmentForm.notes}
                            onChange={(e) => setAppointmentForm(prev => ({ ...prev, notes: e.target.value }))}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                            rows={3}
                            placeholder="Any specific topics you'd like to discuss?"
                          />
                        </div>
                        <Button onClick={handleAppointmentBooking} className="w-full">
                          Book Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Your Appointments</CardTitle>
                      <CardDescription>Upcoming and past sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {portalData.appointments.length > 0 ? (
                          portalData.appointments.map((appointment) => (
                            <div key={appointment.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold capitalize">{appointment.type.replace('_', ' ')}</h3>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {appointment.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {formatDate(appointment.date)}
                              </p>
                              <p className="text-sm text-gray-500">
                                Duration: {appointment.duration} minutes
                              </p>
                              {appointment.notes && (
                                <p className="text-sm text-gray-600 mt-2">
                                  Notes: {appointment.notes}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                            <p>No appointments scheduled</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
} 