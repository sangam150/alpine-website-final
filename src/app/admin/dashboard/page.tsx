"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare
} from "lucide-react";
import { Line } from 'react-chartjs-2';
import { FirebaseService, COLLECTIONS, Student as FirestoreStudent, QuizResult as FirestoreQuizResult } from "@/lib/firebase-collections";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DashboardStats {
  totalStudents: number;
  pendingDocuments: number;
  approvedApplications: number;
  pendingApplications: number;
  conversionRate: number;
  monthlyGrowth: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected" | "in_review";
  documents: number;
  appliedDate: string;
  country: string;
  course: string;
}

interface QuizResult {
  id: string;
  name: string;
  email: string;
  quizType: string;
  score: number;
  completedAt: string;
  country: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    pendingDocuments: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    conversionRate: 0,
    monthlyGrowth: 0
  });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [studentChartData, setStudentChartData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      // Fetch students
      const firestoreStudents = await FirebaseService.getDocuments<FirestoreStudent>(COLLECTIONS.STUDENTS);
      // Map Firestore students to dashboard students
      const mappedStudents: Student[] = firestoreStudents.map((stu) => ({
        id: stu.id || "",
        name: `${stu.firstName} ${stu.lastName}`,
        email: stu.email,
        status: stu.isActive ? "approved" : "pending", // Adjust as needed
        documents: Object.values(stu.documents || {}).flat().length,
        appliedDate: stu.createdAt ? stu.createdAt.toDate().toISOString() : "",
        country: stu.nationality || "",
        course: stu.applications && stu.applications.length > 0 ? stu.applications[0] : "",
      }));
      setStudents(mappedStudents);

      // Fetch quiz results
      const firestoreQuizResults = await FirebaseService.getDocuments<FirestoreQuizResult>(COLLECTIONS.QUIZ_RESULTS);
      const mappedQuizResults: QuizResult[] = firestoreQuizResults.map((qr) => ({
        id: qr.id || "",
        name: qr.studentId || "", // You may want to join with student data for name
        email: "", // Not available directly
        quizType: qr.quizType || "",
        score: qr.score,
        completedAt: qr.completedAt ? qr.completedAt.toDate().toISOString() : "",
        country: "", // Not available directly
      }));
      setQuizResults(mappedQuizResults);

      // Compute stats
      const totalStudents = mappedStudents.length;
      const approvedApplications = mappedStudents.filter(s => s.status === "approved").length;
      const pendingApplications = mappedStudents.filter(s => s.status === "pending").length;
      const pendingDocuments = mappedStudents.reduce((acc, s) => acc + (8 - s.documents), 0); // Assuming 8 docs required
      const conversionRate = totalStudents > 0 ? Math.round((approvedApplications / totalStudents) * 100) : 0;
      setStats({
        totalStudents,
        pendingDocuments,
        approvedApplications,
        pendingApplications,
        conversionRate,
        monthlyGrowth: 0 // Placeholder, can be calculated with more data
      });

      // Group students by registration month
      const registrationsByMonth: Record<string, number> = {};
      mappedStudents.forEach((stu) => {
        if (stu.appliedDate) {
          const month = new Date(stu.appliedDate).toLocaleString('default', { month: 'short', year: 'numeric' });
          registrationsByMonth[month] = (registrationsByMonth[month] || 0) + 1;
        }
      });
      const months = Object.keys(registrationsByMonth).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      setStudentChartData({
        labels: months,
        datasets: [
          {
            label: 'Student Registrations',
            data: months.map((m) => registrationsByMonth[m]),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.2)',
            tension: 0.4,
          },
        ],
      });
    }
    fetchData();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesCountry = countryFilter === "all" || student.country === countryFilter;
    
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      in_review: "bg-blue-100 text-blue-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedApplications}</div>
            <p className="text-xs text-muted-foreground">
              {stats.conversionRate}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            <p className="text-xs text-muted-foreground">
              Under review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Application Funnel</CardTitle>
          <CardDescription>Track student journey from application to approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Applications Submitted</span>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <Progress value={100} className="w-full" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Documents Verified</span>
              <span className="text-sm text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="w-full" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Offers Received</span>
              <span className="text-sm text-muted-foreground">72%</span>
            </div>
            <Progress value={72} className="w-full" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Visa Approved</span>
              <span className="text-sm text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Student Registration Chart */}
      {studentChartData && (
        <Card>
          <CardHeader>
            <CardTitle>Student Registrations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <Line data={studentChartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students & Applications</TabsTrigger>
          <TabsTrigger value="quiz-results">Quiz Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Applications</CardTitle>
              <CardDescription>Manage student applications and documents</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Students Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{student.documents}/8</span>
                          {student.documents < 8 && (
                            <AlertCircle className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{student.country}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{student.course}</TableCell>
                      <TableCell>{new Date(student.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quiz-results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>Track student engagement through quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Quiz Type</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Completed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{result.name}</div>
                          <div className="text-sm text-muted-foreground">{result.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{result.quizType}</TableCell>
                      <TableCell>
                        <Badge variant={result.score >= 80 ? "default" : "secondary"}>
                          {result.score}%
                        </Badge>
                      </TableCell>
                      <TableCell>{result.country}</TableCell>
                      <TableCell>{new Date(result.completedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Most popular study destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Canada</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Australia</span>
                    <div className="flex items-center gap-2">
                      <Progress value={32} className="w-20" />
                      <span className="text-sm">32%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>UK</span>
                    <div className="flex items-center gap-2">
                      <Progress value={18} className="w-20" />
                      <span className="text-sm">18%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>USA</span>
                    <div className="flex items-center gap-2">
                      <Progress value={5} className="w-20" />
                      <span className="text-sm">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Courses</CardTitle>
                <CardDescription>Most selected programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Computer Science</span>
                    <div className="flex items-center gap-2">
                      <Progress value={38} className="w-20" />
                      <span className="text-sm">38%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Business Administration</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Engineering</span>
                    <div className="flex items-center gap-2">
                      <Progress value={22} className="w-20" />
                      <span className="text-sm">22%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Healthcare</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
