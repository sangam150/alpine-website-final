"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  Mail, 
  Plane,
  GraduationCap,
  Calendar,
  MapPin,
  DollarSign,
  MessageCircle,
  Phone
} from "lucide-react";
import { FirebaseService, COLLECTIONS, Application as FirestoreApplication } from "@/lib/firebase-collections";

interface ApplicationStatus {
  id: string;
  universityName: string;
  programName: string;
  intake: string;
  status: "Submitted" | "Docs Verified" | "Sent to University" | "Offer Letter" | "Visa Lodged" | "Approved" | "Fly Ready" | "Rejected";
  currentStep: number;
  totalSteps: number;
  submittedDate: string;
  lastUpdated: string;
  estimatedCompletion: string;
  documents: {
    name: string;
    status: "Uploaded" | "Pending" | "Rejected" | "Approved";
    uploadedDate?: string;
    comments?: string;
  }[];
  timeline: {
    step: string;
    status: "Completed" | "In Progress" | "Pending" | "Failed";
    date?: string;
    description: string;
    icon: React.ReactNode;
  }[];
  notifications: {
    id: string;
    type: "info" | "success" | "warning" | "error";
    title: string;
    message: string;
    date: string;
    read: boolean;
  }[];
}

const mockApplications: ApplicationStatus[] = [
  {
    id: "1",
    universityName: "University of Melbourne",
    programName: "Master of Computer Science",
    intake: "July 2025",
    status: "Offer Letter",
    currentStep: 4,
    totalSteps: 7,
    submittedDate: "2024-12-15",
    lastUpdated: "2025-01-20",
    estimatedCompletion: "2025-03-15",
    documents: [
      { name: "Academic Transcripts", status: "Approved", uploadedDate: "2024-12-15" },
      { name: "IELTS Certificate", status: "Approved", uploadedDate: "2024-12-15" },
      { name: "Statement of Purpose", status: "Approved", uploadedDate: "2024-12-16" },
      { name: "CV", status: "Approved", uploadedDate: "2024-12-16" },
      { name: "Letters of Recommendation", status: "Pending" },
      { name: "Financial Documents", status: "Pending" }
    ],
    timeline: [
      {
        step: "Application Submitted",
        status: "Completed",
        date: "2024-12-15",
        description: "Your application has been successfully submitted",
        icon: <FileText className="w-5 h-5" />
      },
      {
        step: "Documents Verified",
        status: "Completed",
        date: "2024-12-18",
        description: "All submitted documents have been verified",
        icon: <CheckCircle className="w-5 h-5" />
      },
      {
        step: "Sent to University",
        status: "Completed",
        date: "2024-12-20",
        description: "Application forwarded to University of Melbourne",
        icon: <Mail className="w-5 h-5" />
      },
      {
        step: "Offer Letter",
        status: "In Progress",
        date: "2025-01-20",
        description: "University is reviewing your application",
        icon: <Clock className="w-5 h-5" />
      },
      {
        step: "Visa Application",
        status: "Pending",
        description: "Will begin after receiving offer letter",
        icon: <Plane className="w-5 h-5" />
      },
      {
        step: "Visa Approval",
        status: "Pending",
        description: "Awaiting visa processing",
        icon: <CheckCircle className="w-5 h-5" />
      },
      {
        step: "Fly Ready",
        status: "Pending",
        description: "Final preparations for departure",
        icon: <GraduationCap className="w-5 h-5" />
      }
    ],
    notifications: [
      {
        id: "1",
        type: "success",
        title: "Documents Verified",
        message: "All your submitted documents have been verified and approved.",
        date: "2024-12-18",
        read: true
      },
      {
        id: "2",
        type: "info",
        title: "Application Under Review",
        message: "Your application is currently being reviewed by University of Melbourne.",
        date: "2025-01-20",
        read: false
      },
      {
        id: "3",
        type: "warning",
        title: "Missing Documents",
        message: "Please upload your Letters of Recommendation and Financial Documents.",
        date: "2025-01-19",
        read: false
      }
    ]
  },
  {
    id: "2",
    universityName: "University of Toronto",
    programName: "Master of Information Technology",
    intake: "September 2025",
    status: "Submitted",
    currentStep: 1,
    totalSteps: 7,
    submittedDate: "2025-01-10",
    lastUpdated: "2025-01-10",
    estimatedCompletion: "2025-04-15",
    documents: [
      { name: "Academic Transcripts", status: "Uploaded", uploadedDate: "2025-01-10" },
      { name: "IELTS Certificate", status: "Uploaded", uploadedDate: "2025-01-10" },
      { name: "Statement of Purpose", status: "Pending" },
      { name: "CV", status: "Pending" },
      { name: "Letters of Recommendation", status: "Pending" },
      { name: "Financial Documents", status: "Pending" }
    ],
    timeline: [
      {
        step: "Application Submitted",
        status: "Completed",
        date: "2025-01-10",
        description: "Your application has been successfully submitted",
        icon: <FileText className="w-5 h-5" />
      },
      {
        step: "Documents Verified",
        status: "In Progress",
        description: "Verifying submitted documents",
        icon: <Clock className="w-5 h-5" />
      },
      {
        step: "Sent to University",
        status: "Pending",
        description: "Will be sent after document verification",
        icon: <Mail className="w-5 h-5" />
      },
      {
        step: "Offer Letter",
        status: "Pending",
        description: "Awaiting university response",
        icon: <Clock className="w-5 h-5" />
      },
      {
        step: "Visa Application",
        status: "Pending",
        description: "Will begin after receiving offer letter",
        icon: <Plane className="w-5 h-5" />
      },
      {
        step: "Visa Approval",
        status: "Pending",
        description: "Awaiting visa processing",
        icon: <CheckCircle className="w-5 h-5" />
      },
      {
        step: "Fly Ready",
        status: "Pending",
        description: "Final preparations for departure",
        icon: <GraduationCap className="w-5 h-5" />
      }
    ],
    notifications: [
      {
        id: "4",
        type: "info",
        title: "Application Submitted",
        message: "Your application to University of Toronto has been submitted successfully.",
        date: "2025-01-10",
        read: true
      },
      {
        id: "5",
        type: "warning",
        title: "Document Upload Required",
        message: "Please upload your Statement of Purpose, CV, and other required documents.",
        date: "2025-01-11",
        read: false
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Pending":
      return "bg-gray-100 text-gray-800";
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    case "In Progress":
      return <Clock className="w-5 h-5 text-blue-600" />;
    case "Pending":
      return <Clock className="w-5 h-5 text-gray-400" />;
    case "Failed":
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    default:
      return <Clock className="w-5 h-5 text-gray-400" />;
  }
};

const getDocumentStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "Uploaded":
      return <FileText className="w-4 h-4 text-blue-600" />;
    case "Pending":
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case "Rejected":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-gray-400" />;
  }
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "info":
      return <MessageCircle className="w-4 h-4 text-blue-600" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <MessageCircle className="w-4 h-4 text-gray-600" />;
  }
};

export default function ApplicationTracker() {
  const [applications, setApplications] = useState<ApplicationStatus[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationStatus | null>(null);
  const [activeTab, setActiveTab] = useState<"timeline" | "documents" | "notifications">("timeline");

  useEffect(() => {
    async function fetchApplications() {
      // TODO: Replace with actual student ID from auth context
      const studentId = "demo-student-id";
      const firestoreApplications = await FirebaseService.getDocuments<FirestoreApplication>(COLLECTIONS.APPLICATIONS, [
        { field: "studentId", operator: "==", value: studentId }
      ]);
      // Map Firestore applications to ApplicationStatus (adjust mapping as needed)
      const mappedApplications: ApplicationStatus[] = firestoreApplications.map((app) => ({
        id: app.id || "",
        universityName: app.universityId || "",
        programName: app.program || "",
        intake: app.intake || "",
        status: "Submitted", // Map from app.status if needed
        currentStep: 1, // Map from app.timeline if available
        totalSteps: 7, // Adjust as needed
        submittedDate: app.createdAt ? app.createdAt.toDate().toISOString().split("T")[0] : "",
        lastUpdated: app.updatedAt ? app.updatedAt.toDate().toISOString().split("T")[0] : "",
        estimatedCompletion: "", // Calculate if available
        documents: [], // Map from app.documents if available
        timeline: [], // Map from app.timeline if available
        notifications: [], // Map from app.notifications if available
      }));
      setApplications(mappedApplications);
      setSelectedApplication(mappedApplications[0] || null);
    }
    fetchApplications();
  }, []);

  const markNotificationAsRead = (applicationId: string, notificationId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? {
            ...app,
            notifications: app.notifications.map(notif => 
              notif.id === notificationId ? { ...notif, read: true } : notif
            )
          }
        : app
    ));
  };

  const unreadNotifications = selectedApplication?.notifications.filter(n => !n.read).length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Application Tracker</h2>
          <p className="text-gray-600">Track your university applications</p>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {applications.length} Active Applications
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedApplication?.id === application.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{application.universityName}</h3>
                    <Badge 
                      variant="secondary" 
                      className={getStatusColor(application.status)}
                    >
                      {application.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{application.programName}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {application.intake}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {application.lastUpdated}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{application.currentStep}/{application.totalSteps}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(application.currentStep / application.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Application Details */}
        <div className="lg:col-span-2">
          {selectedApplication && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{selectedApplication.universityName}</CardTitle>
                    <p className="text-gray-600">{selectedApplication.programName}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(selectedApplication.status)}
                  >
                    {selectedApplication.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Application Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{selectedApplication.currentStep}</div>
                    <div className="text-xs text-gray-600">Current Step</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedApplication.documents.filter(d => d.status === "Approved").length}
                    </div>
                    <div className="text-xs text-gray-600">Documents Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{unreadNotifications}</div>
                    <div className="text-xs text-gray-600">New Notifications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {Math.round((selectedApplication.currentStep / selectedApplication.totalSteps) * 100)}%
                    </div>
                    <div className="text-xs text-gray-600">Complete</div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 mb-6">
                  <Button
                    variant={activeTab === "timeline" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("timeline")}
                  >
                    Timeline
                  </Button>
                  <Button
                    variant={activeTab === "documents" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("documents")}
                  >
                    Documents
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("notifications")}
                  >
                    Notifications ({unreadNotifications})
                  </Button>
                </div>

                {/* Timeline Tab */}
                {activeTab === "timeline" && (
                  <div className="space-y-4">
                    {selectedApplication.timeline.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === "Completed" ? "bg-green-100" :
                          step.status === "In Progress" ? "bg-blue-100" :
                          step.status === "Failed" ? "bg-red-100" : "bg-gray-100"
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{step.step}</h4>
                            <Badge variant="secondary" className={getStatusColor(step.status)}>
                              {step.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{step.description}</p>
                          {step.date && (
                            <p className="text-xs text-gray-500">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === "documents" && (
                  <div className="space-y-3">
                    {selectedApplication.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getDocumentStatusIcon(doc.status)}
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            {doc.uploadedDate && (
                              <p className="text-xs text-gray-500">Uploaded: {doc.uploadedDate}</p>
                            )}
                            {doc.comments && (
                              <p className="text-xs text-red-600">{doc.comments}</p>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary" className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-3">
                    {selectedApplication.notifications.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No notifications yet</p>
                      </div>
                    ) : (
                      selectedApplication.notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                          }`}
                          onClick={() => markNotificationAsRead(selectedApplication.id, notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900">{notification.title}</h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.date}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 