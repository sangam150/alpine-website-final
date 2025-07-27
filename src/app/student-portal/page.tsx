"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  GraduationCap, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Download,
  Mail,
  Eye,
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  DollarSign,
  TrendingUp,
  Target,
  BookOpen,
  Users,
  Globe,
  Star,
  Award,
  Phone,
  Mail as MailIcon,
  Globe as GlobeIcon,
  Bell,
  Settings,
  LogOut,
  Home,
  Briefcase,
  FolderOpen,
  MessageSquare,
  HelpCircle
} from "lucide-react";
import PDFGenerator from "@/components/admin/PDFGenerator";
import DocumentUpload from "@/components/student/DocumentUpload";
import CurriculumViewer from "@/components/student/CurriculumViewer";
import EligibilityEstimator from "@/components/student/EligibilityEstimator";

interface Application {
  id: string;
  university: string;
  program: string;
  level: string;
  intake: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  submittedDate: string;
  lastUpdated: string;
  progress: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: "pending" | "uploaded" | "verified" | "rejected";
  uploadedDate: string;
  size: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  date: string;
  read: boolean;
}

export default function StudentPortalPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  const [pdfType, setPdfType] = useState<"quiz" | "application" | "career" | "offerPackage">("quiz");
  const [pdfData, setPdfData] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Application Submitted",
      message: "Your application to University of Toronto has been successfully submitted.",
      type: "success",
      date: "2025-01-15",
      read: false
    },
    {
      id: "2",
      title: "Document Required",
      message: "Please upload your updated IELTS certificate for verification.",
      type: "warning",
      date: "2025-01-14",
      read: false
    },
    {
      id: "3",
      title: "Visa Interview Scheduled",
      message: "Your visa interview has been scheduled for January 25, 2025.",
      type: "info",
      date: "2025-01-13",
      read: true
    }
  ]);

  const [applications, setApplications] = useState<Application[]>([
    {
      id: "1",
      university: "University of Toronto",
      program: "Master of Computer Science",
      level: "Master's",
      intake: "September 2025",
      status: "submitted",
      submittedDate: "2025-01-15",
      lastUpdated: "2025-01-15",
      progress: 75
    },
    {
      id: "2",
      university: "University of British Columbia",
      program: "Master of Data Science",
      level: "Master's",
      intake: "September 2025",
      status: "draft",
      submittedDate: "",
      lastUpdated: "2025-01-10",
      progress: 30
    }
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Academic Transcript",
      type: "Academic",
      status: "verified",
      uploadedDate: "2025-01-10",
      size: "2.5 MB"
    },
    {
      id: "2",
      name: "IELTS Certificate",
      type: "Language",
      status: "uploaded",
      uploadedDate: "2025-01-12",
      size: "1.8 MB"
    },
    {
      id: "3",
      name: "Statement of Purpose",
      type: "Personal",
      status: "pending",
      uploadedDate: "",
      size: "0 KB"
    }
  ]);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-blue-800";
      case "under_review": return "bg-yellow-100 text-yellow-800";
      case "accepted": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "uploaded": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const generatePDF = (type: "quiz" | "application" | "career", data: any) => {
    setPdfType(type);
    setPdfData(data);
    setShowPDFGenerator(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, John Doe</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 text-xs">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <FolderOpen className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="university-explorer" className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Universities
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents Uploaded</p>
                      <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === "verified").length}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                      <p className="text-2xl font-bold text-gray-900">{documents.filter(d => d.status === "pending").length}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">85%</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                        notification.read ? 'bg-gray-50' : 'bg-blue-50'
                      }`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === 'success' ? 'bg-green-500' :
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'error' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => generatePDF("quiz", { countries: [] })}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Quiz Results
                    </Button>
                    <Button 
                      onClick={() => generatePDF("career", [])}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Career Report
                    </Button>
                    <Button 
                      onClick={() => generatePDF("application", applications[0])}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Application Summary
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Start New Application
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Counselor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <EligibilityEstimator />
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{application.university}</h3>
                          <p className="text-gray-600">{application.program} - {application.level}</p>
                          <p className="text-sm text-gray-500">Intake: {application.intake}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          Last updated: {application.lastUpdated}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{application.progress}%</span>
                      </div>
                      <Progress value={application.progress} className="w-full" />
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPdfType("offerPackage");
                          setPdfData({
                            ...application,
                            studentName: "John Doe",
                            studentEmail: "john.doe@email.com",
                            tuitionFee: "$25,000 AUD",
                            livingCosts: "$18,000 AUD",
                            otherFees: "$2,000 AUD",
                            totalCost: "$45,000 AUD",
                            checklist: [
                              "Submit all academic transcripts",
                              "Upload English proficiency certificate",
                              "Provide passport copy",
                              "Pay application fee",
                              "Complete financial documents",
                            ],
                            paymentLink: "https://pay.alpineeducation.com/appfee",
                            timeline: [
                              "Application Submission",
                              "Document Verification",
                              "University Review",
                              "Offer Letter Issued",
                              "Visa Application",
                              "Pre-departure Orientation",
                              "Fly to Destination",
                            ],
                          });
                          setShowPDFGenerator(true);
                        }}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Download Offer Package
                      </Button>
                      <CurriculumViewer
                        curriculum={{
                          courseName: application.program,
                          description: "A comprehensive program covering advanced topics in the field, designed to prepare students for global careers.",
                          duration: "2 years (full-time)",
                          entryRequirements: [
                            "Bachelor's degree in related field",
                            "IELTS 6.5 or equivalent",
                            "Academic transcripts",
                            "Statement of Purpose",
                          ],
                          modules: [
                            "Core Concepts & Foundations",
                            "Advanced Specialization Modules",
                            "Research Project",
                            "Internship/Industry Placement",
                            "Capstone Thesis",
                          ],
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Documents</h2>
              <DocumentUpload 
                uid="STU2024001"
                onUploadComplete={() => { /* handle completion */ }}
                onUploadError={(err) => console.error('Upload error:', err)}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <Badge className={getDocumentStatusColor(document.status)}>
                        {document.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{document.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{document.type}</p>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Size: {document.size}</div>
                      {document.uploadedDate && (
                        <div>Uploaded: {document.uploadedDate}</div>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* University Explorer Tab */}
          <TabsContent value="university-explorer" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">University Explorer</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "University of Toronto", country: "Canada", programs: 150, acceptance: "15%" },
                { name: "University of British Columbia", country: "Canada", programs: 120, acceptance: "18%" },
                { name: "University of Melbourne", country: "Australia", programs: 200, acceptance: "25%" },
                { name: "University of Sydney", country: "Australia", programs: 180, acceptance: "22%" },
                { name: "University College London", country: "UK", programs: 300, acceptance: "12%" },
                { name: "King's College London", country: "UK", programs: 250, acceptance: "14%" }
              ].map((university, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge variant="outline">{university.country}</Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-2">{university.name}</h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Programs:</span>
                        <span className="font-medium">{university.programs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Acceptance Rate:</span>
                        <span className="font-medium">{university.acceptance}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Explore
                      </Button>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Messages</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Message
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Messages Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start a conversation with your counselor or check for updates on your applications.
                  </p>
                  <Button>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Support & Help</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Quick Help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Application Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Document Requirements
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Visa Information
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Cost Calculator
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-2 text-gray-600" />
                      +977-1-4444444
                    </div>
                    <div className="flex items-center text-sm">
                      <MailIcon className="w-4 h-4 mr-2 text-gray-600" />
                      support@alpineeducation.com
                    </div>
                    <div className="flex items-center text-sm">
                      <GlobeIcon className="w-4 h-4 mr-2 text-gray-600" />
                      www.alpineeducation.com
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-3">Available Hours:</p>
                    <p className="text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-sm">Saturday: 10:00 AM - 4:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* PDF Generator Modal */}
      {showPDFGenerator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <PDFGenerator 
                type={pdfType}
                data={pdfData}
                studentName="John Doe"
                studentEmail="john.doe@email.com"
              />
              <div className="flex justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPDFGenerator(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
