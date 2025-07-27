"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Building,
  Globe,
  UserCheck,
  UserX,
} from "lucide-react";
import { getFirestoreSafe } from "@/lib/firebase-config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  university: string;
  status: "pending" | "in-progress" | "completed" | "rejected";
  progress: number;
  documents: {
    name: string;
    status: "pending" | "uploaded" | "approved" | "rejected";
    uploadedAt?: string;
    downloadUrl?: string;
  }[];
  timeline: {
    date: string;
    event: string;
    status: "completed" | "pending" | "in-progress";
  }[];
  createdAt?: string;
  updatedAt?: string;
}

type FilterStatus =
  | "all"
  | "pending"
  | "in-progress"
  | "completed"
  | "rejected";

export default function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(
    null,
  );

  // Load all students from Firestore
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const db = getFirestoreSafe();
        const studentsRef = collection(db, "students");
        const q = query(studentsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const studentsData: StudentData[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as StudentData[];

        setStudents(studentsData);
        setFilteredStudents(studentsData);
      } catch (error) {
        console.error("Error loading students:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadStudents();
    }
  }, [user]);

  // Filter students based on search term and status
  useEffect(() => {
    let filtered = students;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.university.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((student) => student.status === statusFilter);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter]);

  const handleStatusUpdate = async (
    studentId: string,
    newStatus: StudentData["status"],
  ) => {
    try {
      const db = getFirestoreSafe();
      await updateDoc(doc(db, "students", studentId), {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? { ...student, status: newStatus }
            : student,
        ),
      );
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  const handleDocumentApproval = async (
    studentId: string,
    documentName: string,
    approved: boolean,
  ) => {
    try {
      const db = getFirestoreSafe();
      const student = students.find((s) => s.id === studentId);
      if (!student) return;

      const updatedDocuments = student.documents.map((doc) =>
        doc.name === documentName
          ? {
              ...doc,
              status: approved ? ("approved" as const) : ("rejected" as const),
            }
          : doc,
      );

      await updateDoc(doc(db, "students", studentId), {
        documents: updatedDocuments,
        updatedAt: new Date().toISOString(),
      });

      // Update local state
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? { ...student, documents: updatedDocuments }
            : student,
        ),
      );
    } catch (error) {
      console.error("Error updating document status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-blue-600 bg-blue-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "rejected":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    total: students.length,
    pending: students.filter((s) => s.status === "pending").length,
    inProgress: students.filter((s) => s.status === "in-progress").length,
    completed: students.filter((s) => s.status === "completed").length,
    rejected: students.filter((s) => s.status === "rejected").length,
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            Please sign in to access the admin dashboard.
          </p>
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
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Manage student applications
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.pending}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.inProgress}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.completed}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-red-600">
                    {stats.rejected}
                  </p>
                </div>
                <UserX className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search Students</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, course, or university..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status-filter">Filter by Status</Label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as FilterStatus)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <div className="grid gap-6">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading students...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No students found.</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {student.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {student.email}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(student.status)}`}
                        >
                          {student.status.replace("-", " ").toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.course}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {student.university}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              Progress
                            </span>
                            <span className="text-sm font-bold text-blue-600">
                              {student.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setSelectedStudent(
                            selectedStudent?.id === student.id ? null : student,
                          )
                        }
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {selectedStudent?.id === student.id
                          ? "Hide"
                          : "View"}{" "}
                        Details
                      </Button>

                      <select
                        value={student.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            student.id,
                            e.target.value as StudentData["status"],
                          )
                        }
                        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedStudent?.id === student.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Documents
                      </h4>
                      <div className="space-y-3">
                        {student.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(doc.status)}
                              <div>
                                <p className="font-medium text-gray-900">
                                  {doc.name}
                                </p>
                                {doc.uploadedAt && (
                                  <p className="text-xs text-gray-500">
                                    Uploaded:{" "}
                                    {new Date(
                                      doc.uploadedAt,
                                    ).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}
                              >
                                {doc.status}
                              </span>
                              {doc.downloadUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    window.open(doc.downloadUrl, "_blank")
                                  }
                                >
                                  <Download className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              )}
                              {doc.status === "uploaded" && (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDocumentApproval(
                                        student.id,
                                        doc.name,
                                        true,
                                      )
                                    }
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <UserCheck className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      handleDocumentApproval(
                                        student.id,
                                        doc.name,
                                        false,
                                      )
                                    }
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <UserX className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="font-semibold text-gray-900 mb-4 mt-6">
                        Timeline
                      </h4>
                      <div className="space-y-3">
                        {student.timeline.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div
                              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}
                            >
                              {getStatusIcon(item.status)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.event}
                              </p>
                              <p className="text-sm text-gray-500">
                                {item.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
