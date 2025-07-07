'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  university: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  progress: number;
  documents: string[];
  counselorId: string;
  counselorName: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+977-9841234567',
    country: 'Australia',
    course: 'Computer Science',
    university: 'University of Melbourne',
    status: 'in-progress',
    progress: 65,
    documents: ['passport.pdf', 'transcript.pdf', 'ielts.pdf'],
    counselorId: 'counselor1',
    counselorName: 'John Doe',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    notes: 'Student is progressing well. IELTS score submitted.'
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+977-9841234568',
    country: 'Canada',
    course: 'Business Administration',
    university: 'University of Toronto',
    status: 'completed',
    progress: 100,
    documents: ['passport.pdf', 'transcript.pdf', 'ielts.pdf', 'visa.pdf'],
    counselorId: 'counselor2',
    counselorName: 'Jane Smith',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
    notes: 'Visa approved. Student will start in September 2024.'
  },
  {
    id: '3',
    name: 'Anita Patel',
    email: 'anita@example.com',
    phone: '+977-9841234569',
    country: 'UK',
    course: 'Law',
    university: 'University of Manchester',
    status: 'pending',
    progress: 25,
    documents: ['passport.pdf'],
    counselorId: 'counselor1',
    counselorName: 'John Doe',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    notes: 'Initial consultation completed. Waiting for IELTS results.'
  }
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'rejected'>('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Get unique countries for filter
  const countries = [...new Set(students.map(student => student.country))];

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students;
    
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(student => student.status === statusFilter);
    }
    
    if (countryFilter !== 'all') {
      filtered = filtered.filter(student => student.country === countryFilter);
    }
    
    setFilteredStudents(filtered);
  }, [students, searchTerm, statusFilter, countryFilter]);

  const handleAddStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setStudents([...students, newStudent]);
    setIsAddDialogOpen(false);
  };

  const handleEditStudent = (studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedStudent) return;
    
    setStudents(students.map(student => 
      student.id === selectedStudent.id 
        ? { 
            ...studentData, 
            id: selectedStudent.id,
            createdAt: selectedStudent.createdAt,
            updatedAt: new Date().toISOString() 
          }
        : student
    ));
    setIsEditDialogOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(student => student.id !== id));
    }
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <BookOpen className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
          <p className="text-gray-600 mt-2">Manage student applications and track their progress</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Active applications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter(s => s.status === 'in-progress').length}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter(s => s.status === 'completed').length}</div>
            <p className="text-xs text-muted-foreground">Successfully placed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter(s => s.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{student.name}</h3>
                    <p className="text-sm text-gray-600">{student.email}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {student.country}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <GraduationCap className="w-3 h-3" />
                        {student.course}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <BookOpen className="w-3 h-3" />
                        {student.university}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={`${getStatusColor(student.status)} flex items-center gap-1`}>
                      {getStatusIcon(student.status)}
                      {student.status}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1">
                      Progress: {student.progress}%
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedStudent(student);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Application Progress</span>
                  <span>{student.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Add a new student application with all relevant information.
            </DialogDescription>
          </DialogHeader>
          <StudentForm
            onSubmit={handleAddStudent}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Student Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>
              Update the student information.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <StudentForm
              student={selectedStudent}
              onSubmit={handleEditStudent}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedStudent(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Student Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              View detailed information about the student.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.email}</p>
                  <Badge className={`${getStatusColor(selectedStudent.status)} mt-2`}>
                    {selectedStudent.status}
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{selectedStudent.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{selectedStudent.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{selectedStudent.course}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{selectedStudent.university}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Progress</h4>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedStudent.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{selectedStudent.progress}% complete</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-4">
                  <h4 className="font-semibold">Uploaded Documents</h4>
                  <div className="space-y-2">
                    {selectedStudent.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <h4 className="font-semibold">Counselor Notes</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {selectedStudent.notes}
                  </p>
                  <div className="text-xs text-gray-500">
                    Counselor: {selectedStudent.counselorName}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Student Form Component
interface StudentFormProps {
  student?: Student;
  onSubmit: (data: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

function StudentForm({ student, onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: student?.name || '',
    email: student?.email || '',
    phone: student?.phone || '',
    country: student?.country || '',
    course: student?.course || '',
    university: student?.university || '',
    status: student?.status || 'pending' as const,
    progress: student?.progress || 0,
    documents: student?.documents || [],
    counselorId: student?.counselorId || '',
    counselorName: student?.counselorName || '',
    notes: student?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Country</label>
          <select
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Country</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Germany">Germany</option>
            <option value="USA">USA</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Course</label>
          <Input
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">University</label>
          <Input
            value={formData.university}
            onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Progress (%)</label>
          <Input
            type="number"
            min="0"
            max="100"
            value={formData.progress}
            onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Counselor Name</label>
        <Input
          value={formData.counselorName}
          onChange={(e) => setFormData({ ...formData, counselorName: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded-md"
          rows={3}
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">
          {student ? 'Update Student' : 'Add Student'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
} 