import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  DollarSign,
  MessageSquare,
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Upload,
  Target,
  LogOut,
  Settings
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Portal - Track Your Application | Alpine Education',
  description: 'Access your student portal to track application progress, upload documents, view payments, and communicate with Alpine Education counselors. Real-time updates and status tracking.',
  keywords: 'student portal, application tracking, document upload, payment status, study abroad progress, Alpine Education portal, visa application tracking',
  openGraph: {
    title: 'Student Portal - Track Your Application | Alpine Education',
    description: 'Access your student portal to track application progress, upload documents, view payments, and communicate with Alpine Education counselors.',
    url: 'https://alpinevisa.com.np/student-portal',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Student Portal - Track Your Application',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Portal - Track Your Application | Alpine Education',
    description: 'Access your student portal to track application progress, upload documents, view payments, and communicate with Alpine Education counselors.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/student-portal',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const applicationStatus = {
  status: 'In Progress',
  stage: 'Document Verification',
  progress: 65,
  nextStep: 'Visa Application',
  estimatedCompletion: '2 weeks'
};

const documents = [
  {
    name: 'Academic Transcripts',
    status: 'uploaded',
    required: true,
    uploadedAt: '2024-03-15'
  },
  {
    name: 'IELTS Score Report',
    status: 'pending',
    required: true,
    uploadedAt: null
  },
  {
    name: 'Statement of Purpose',
    status: 'uploaded',
    required: true,
    uploadedAt: '2024-03-14'
  },
  {
    name: 'Financial Documents',
    status: 'uploaded',
    required: true,
    uploadedAt: '2024-03-13'
  },
  {
    name: 'Passport Copy',
    status: 'uploaded',
    required: true,
    uploadedAt: '2024-03-12'
  }
];

const payments = [
  {
    description: 'Application Processing Fee',
    amount: 'Rs. 25,000',
    status: 'paid',
    date: '2024-03-10',
    receipt: 'REC-001'
  },
  {
    description: 'Visa Application Fee',
    amount: 'Rs. 35,000',
    status: 'pending',
    date: '2024-03-20',
    receipt: null
  },
  {
    description: 'University Application Fee',
    amount: 'Rs. 15,000',
    status: 'paid',
    date: '2024-03-05',
    receipt: 'REC-002'
  }
];

const recentMessages = [
  {
    from: 'Alpine Education',
    subject: 'Document Verification Complete',
    message: 'Your academic transcripts have been verified successfully. Please upload your IELTS score report.',
    time: '2 hours ago',
    unread: true
  },
  {
    from: 'University of Melbourne',
    subject: 'Application Received',
    message: 'We have received your application for Master of Computer Science. Processing time: 4-6 weeks.',
    time: '1 day ago',
    unread: false
  },
  {
    from: 'Alpine Education',
    subject: 'Visa Interview Preparation',
    message: 'Your visa interview is scheduled for March 25, 2024. Please attend the preparation session on March 23.',
    time: '2 days ago',
    unread: false
  }
];

const upcomingEvents = [
  {
    title: 'IELTS Mock Test',
    date: 'March 22, 2024',
    time: '9:00 AM',
    type: 'test',
    location: 'Alpine Education Center'
  },
  {
    title: 'Visa Interview Preparation',
    date: 'March 23, 2024',
    time: '2:00 PM',
    type: 'workshop',
    location: 'Alpine Education Center'
  },
  {
    title: 'University Fair - Australia',
    date: 'March 25, 2024',
    time: '10:00 AM',
    type: 'event',
    location: 'Hotel Yak & Yeti'
  }
];

export default function StudentPortalPage() {
  // Check if user is authenticated (this would be replaced with actual auth logic)
  const isAuthenticated = false; // Set to false to show login redirect

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
            <p className="text-gray-600">Please sign in to access your application progress</p>
          </div>
          
          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Authentication Required
                  </h2>
                  <p className="text-gray-600 mb-6">
                    You need to be logged in to access your student portal dashboard.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Link href="/student-portal/login">
                    <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Sign In to Portal
                    </Button>
                  </Link>
                  
                  <Link href="/student-portal/register">
                    <Button variant="outline" className="w-full h-12">
                      Create New Account
                    </Button>
                  </Link>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Don't have an account? Register to get started with your application.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              ← Back to Alpine Education
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
              <p className="text-gray-600">Welcome back, Sarah! Track your application progress here.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{applicationStatus.status}</h3>
                    <p className="text-gray-600">Current Stage: {applicationStatus.stage}</p>
                  </div>
                  <Badge variant={applicationStatus.status === 'In Progress' ? 'default' : 'secondary'}>
                    {applicationStatus.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{applicationStatus.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${applicationStatus.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Next Step</h4>
                  <p className="text-blue-700">{applicationStatus.nextStep}</p>
                  <p className="text-sm text-blue-600 mt-1">
                    Estimated completion: {applicationStatus.estimatedCompletion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents and Payments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {doc.status === 'uploaded' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                      )}
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">
                          {doc.status === 'uploaded' 
                            ? `Uploaded on ${doc.uploadedAt}` 
                            : 'Pending upload'
                          }
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant={doc.status === 'uploaded' ? 'outline' : 'default'}>
                      {doc.status === 'uploaded' ? 'View' : 'Upload'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Payment Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{payment.description}</p>
                      <p className="text-sm text-gray-600">{payment.amount}</p>
                      <p className="text-xs text-gray-500">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                        {payment.status}
                      </Badge>
                      {payment.receipt && (
                        <Button size="sm" variant="outline" className="mt-2">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Messages and Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${message.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-sm">{message.from}</p>
                          {message.unread && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                        </div>
                        <p className="font-medium text-sm mb-1">{message.subject}</p>
                        <p className="text-sm text-gray-600 mb-2">{message.message}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                        <Badge variant="outline" className="mt-2">
                          {event.type}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 