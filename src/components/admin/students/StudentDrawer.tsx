"use client";
import { Application, APPLICATION_STATUS } from "@/lib/firebase-collections";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  X,
  User,
  MapPin,
  BookOpen,
  Calendar,
  FileText,
  DollarSign,
  MessageSquare,
  Phone,
  Mail,
  MessageSquare as Chat,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Download,
  Eye,
  Edit,
  Trash2,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface Props {
  app: Application | null;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  COMPLETED: "bg-purple-100 text-purple-800",
};

const statusIcons = {
  PENDING: Clock,
  IN_PROGRESS: AlertCircle,
  APPROVED: CheckCircle,
  REJECTED: XCircle,
  COMPLETED: CheckCircle,
};

export default function StudentDrawer({
  app,
  onClose,
  onStatusChange,
  onDelete,
}: Props) {
  const [status, setStatus] = useState<keyof typeof APPLICATION_STATUS>(
    app?.status || "PENDING",
  );

  if (!app) return null;

  const StatusIcon = statusIcons[status as keyof typeof statusIcons] || Clock;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="w-full max-w-2xl bg-white h-full shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Application Details
              </h2>
              <p className="text-gray-600">Student ID: {app.studentId}</p>
            </div>
            <Button variant="ghost" onClick={onClose} size="sm">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <StatusIcon className="h-5 w-5 mr-2" />
                Application Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Badge
                  className={statusColors[status as keyof typeof statusColors]}
                >
                  <StatusIcon className="h-4 w-4 mr-1" />
                  {status.replace("_", " ")}
                </Badge>
                <select
                  value={status}
                  onChange={(e) => {
                    const newStatus = e.target
                      .value as keyof typeof APPLICATION_STATUS;
                    setStatus(newStatus);
                    onStatusChange(e.target.value);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(APPLICATION_STATUS).map(([key, val]) => (
                    <option key={key} value={val}>
                      {val.charAt(0).toUpperCase() +
                        val.slice(1).replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Student ID
                  </label>
                  <p className="text-gray-900">{app.studentId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Country
                  </label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{app.countryId}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Program
                  </label>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{app.program}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Intake
                  </label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900">{app.intake}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          {(app.applicationFee || app.tuitionFee || app.scholarshipAmount) && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {app.applicationFee && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Application Fee
                      </label>
                      <p className="text-gray-900">
                        Rs. {app.applicationFee.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {app.tuitionFee && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Tuition Fee
                      </label>
                      <p className="text-gray-900">
                        Rs. {app.tuitionFee.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {app.scholarshipAmount && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Scholarship
                      </label>
                      <p className="text-green-600">
                        Rs. {app.scholarshipAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {app.timeline?.applicationSubmitted && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">
                        Application Submitted
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(
                          app.timeline.applicationSubmitted.toDate(),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {app.timeline?.offerReceived && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Offer Received</p>
                      <p className="text-xs text-gray-500">
                        {format(
                          app.timeline.offerReceived.toDate(),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {app.timeline?.visaApplied && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Visa Applied</p>
                      <p className="text-xs text-gray-500">
                        {format(
                          app.timeline.visaApplied.toDate(),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {app.timeline?.visaApproved && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Visa Approved</p>
                      <p className="text-xs text-gray-500">
                        {format(
                          app.timeline.visaApproved.toDate(),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {app.timeline?.departureDate && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Departure Date</p>
                      <p className="text-xs text-gray-500">
                        {format(
                          app.timeline.departureDate.toDate(),
                          "MMM dd, yyyy",
                        )}
                      </p>
                    </div>
                  </div>
                )}
                {!app.timeline && (
                  <p className="text-gray-500 text-sm">
                    No timeline events recorded yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {app.documents?.academicTranscripts?.length ? (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Academic Transcripts
                    </label>
                    <div className="mt-1 space-y-1">
                      {app.documents.academicTranscripts.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{doc}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No academic transcripts uploaded.
                  </p>
                )}

                {app.documents?.languageTestResults?.length ? (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Language Test Results
                    </label>
                    <div className="mt-1 space-y-1">
                      {app.documents.languageTestResults.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded"
                        >
                          <span className="text-sm">{doc}</span>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No language test results uploaded.
                  </p>
                )}

                {app.documents?.statementOfPurpose && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Statement of Purpose
                    </label>
                    <div className="mt-1 flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">
                        {app.documents.statementOfPurpose}
                      </span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {app.documents?.cv && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      CV/Resume
                    </label>
                    <div className="mt-1 flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{app.documents.cv}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {app.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{app.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="flex-1">
              <Chat className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="flex-1">
              <Phone className="h-4 w-4 mr-2" />
              Call Student
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
