'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  Image,
  File,
  Download,
  Calendar,
  User,
  Folder,
  HardDrive,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface UploadItem {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'other';
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  tags: string[];
  description: string;
  studentId?: string;
  studentName?: string;
}

const mockUploads: UploadItem[] = [
  {
    id: '1',
    name: 'IELTS_Certificate.pdf',
    type: 'document',
    size: 2048576, // 2MB
    url: '/uploads/ielts_certificate.pdf',
    uploadedBy: 'priya@example.com',
    uploadedAt: '2024-01-15T10:30:00Z',
    status: 'completed',
    tags: ['ielts', 'certificate', 'english'],
    description: 'IELTS Academic Test Report Form',
    studentId: '1',
    studentName: 'Priya Sharma'
  },
  {
    id: '2',
    name: 'Transcript_University.pdf',
    type: 'document',
    size: 3145728, // 3MB
    url: '/uploads/transcript.pdf',
    uploadedBy: 'rajesh@example.com',
    uploadedAt: '2024-01-10T14:20:00Z',
    status: 'completed',
    tags: ['transcript', 'academic', 'university'],
    description: 'Official university transcript',
    studentId: '2',
    studentName: 'Rajesh Kumar'
  },
  {
    id: '3',
    name: 'Passport_Photo.jpg',
    type: 'image',
    size: 524288, // 512KB
    url: '/uploads/passport_photo.jpg',
    uploadedBy: 'anita@example.com',
    uploadedAt: '2024-01-20T09:15:00Z',
    status: 'processing',
    tags: ['passport', 'photo', 'identification'],
    description: 'Passport size photograph',
    studentId: '3',
    studentName: 'Anita Patel'
  },
  {
    id: '4',
    name: 'Statement_of_Purpose.pdf',
    type: 'document',
    size: 1048576, // 1MB
    url: '/uploads/sop.pdf',
    uploadedBy: 'priya@example.com',
    uploadedAt: '2024-01-18T16:45:00Z',
    status: 'completed',
    tags: ['sop', 'personal_statement', 'application'],
    description: 'Statement of Purpose for university application',
    studentId: '1',
    studentName: 'Priya Sharma'
  }
];

export default function UploadsPage() {
  const [uploads, setUploads] = useState<UploadItem[]>(mockUploads);
  const [filteredUploads, setFilteredUploads] = useState<UploadItem[]>(mockUploads);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'failed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'document' | 'image' | 'video' | 'other'>('all');
  const [selectedUpload, setSelectedUpload] = useState<UploadItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter uploads based on search and filters
  useEffect(() => {
    let filtered = uploads;
    
    if (searchTerm) {
      filtered = filtered.filter(upload => 
        upload.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        upload.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        upload.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(upload => upload.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
      filtered = filtered.filter(upload => upload.type === typeFilter);
    }
    
    setFilteredUploads(filtered);
  }, [uploads, searchTerm, statusFilter, typeFilter]);

  const handleAddUpload = (uploadData: Omit<UploadItem, 'id' | 'uploadedAt'>) => {
    const newUpload: UploadItem = {
      ...uploadData,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    setUploads([...uploads, newUpload]);
    setIsAddDialogOpen(false);
  };

  const handleEditUpload = (uploadData: Omit<UploadItem, 'id' | 'uploadedAt'>) => {
    if (!selectedUpload) return;
    
    setUploads(uploads.map(upload => 
      upload.id === selectedUpload.id 
        ? { 
            ...uploadData, 
            id: selectedUpload.id,
            uploadedAt: selectedUpload.uploadedAt
          }
        : upload
    ));
    setIsEditDialogOpen(false);
    setSelectedUpload(null);
  };

  const handleDeleteUpload = (id: string) => {
    if (confirm('Are you sure you want to delete this upload?')) {
      setUploads(uploads.filter(upload => upload.id !== id));
    }
  };

  const getStatusColor = (status: UploadItem['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: UploadItem['status']) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'processing': return <Upload className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: UploadItem['type']) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'video': return <File className="w-4 h-4" />;
      case 'other': return <File className="w-4 h-4" />;
      default: return <File className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Uploads Management</h1>
          <p className="text-gray-600 mt-2">Manage file uploads and track their processing status</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Upload
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploads.length}</div>
            <p className="text-xs text-muted-foreground">All files</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploads.filter(u => u.status === 'completed').length}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(uploads.reduce((sum, u) => sum + u.size, 0))}</div>
            <p className="text-xs text-muted-foreground">Storage used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploads.filter(u => u.status === 'processing').length}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
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
                  placeholder="Search uploads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'processing' | 'completed' | 'failed')}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | 'document' | 'image' | 'video' | 'other')}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uploads List */}
      <div className="space-y-4">
        {filteredUploads.map((upload) => (
          <Card key={upload.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(upload.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{upload.name}</h3>
                    <p className="text-sm text-gray-600">{upload.uploadedBy}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FileText className="w-3 h-3" />
                        {formatFileSize(upload.size)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(upload.uploadedAt).toLocaleDateString()}
                      </div>
                      {upload.studentName && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <User className="w-3 h-3" />
                          {upload.studentName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge className={`${getStatusColor(upload.status)} flex items-center gap-1`}>
                      {getStatusIcon(upload.status)}
                      {upload.status}
                    </Badge>
                    <div className="text-sm text-gray-500 mt-1">
                      {upload.type}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUpload(upload);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedUpload(upload);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteUpload(upload.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(upload.url, '_blank')}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {upload.description && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700">{upload.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {upload.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Upload Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Upload</DialogTitle>
            <DialogDescription>
              Add a new file upload with all relevant information.
            </DialogDescription>
          </DialogHeader>
          <UploadForm
            onSubmit={handleAddUpload}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Upload Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Upload</DialogTitle>
            <DialogDescription>
              Update the upload information.
            </DialogDescription>
          </DialogHeader>
          {selectedUpload && (
            <UploadForm
              upload={selectedUpload}
              onSubmit={handleEditUpload}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedUpload(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Upload Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Details</DialogTitle>
            <DialogDescription>
              View detailed information about the upload.
            </DialogDescription>
          </DialogHeader>
          {selectedUpload && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  {getTypeIcon(selectedUpload.type)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUpload.name}</h3>
                  <p className="text-gray-600">{selectedUpload.uploadedBy}</p>
                  <Badge className={`${getStatusColor(selectedUpload.status)} mt-2`}>
                    {selectedUpload.status}
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="tags">Tags</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{formatFileSize(selectedUpload.size)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{new Date(selectedUpload.uploadedAt).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{selectedUpload.type}</span>
                    </div>
                    {selectedUpload.studentName && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">{selectedUpload.studentName}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedUpload.description}
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">File Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>File Name:</span>
                        <span className="font-medium">{selectedUpload.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>File Size:</span>
                        <span className="font-medium">{formatFileSize(selectedUpload.size)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>File Type:</span>
                        <span className="font-medium">{selectedUpload.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Upload Date:</span>
                        <span className="font-medium">{new Date(selectedUpload.uploadedAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Download</h4>
                    <Button 
                      onClick={() => window.open(selectedUpload.url, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download File
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="tags" className="space-y-4">
                  <h4 className="font-semibold">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUpload.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
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

// Upload Form Component
interface UploadFormProps {
  upload?: UploadItem;
  onSubmit: (data: Omit<UploadItem, 'id' | 'uploadedAt'>) => void;
  onCancel: () => void;
}

function UploadForm({ upload, onSubmit, onCancel }: UploadFormProps) {
  const [formData, setFormData] = useState({
    name: upload?.name || '',
    type: upload?.type || 'document' as const,
    size: upload?.size || 0,
    url: upload?.url || '',
    uploadedBy: upload?.uploadedBy || '',
    status: upload?.status || 'pending' as const,
    tags: upload?.tags || [],
    description: upload?.description || '',
    studentId: upload?.studentId || '',
    studentName: upload?.studentName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">File Name</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">File Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'document' | 'image' | 'video' | 'other' })}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="document">Document</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">File Size (bytes)</label>
          <Input
            type="number"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: parseInt(e.target.value) })}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'pending' | 'processing' | 'completed' | 'failed' })}
            className="w-full p-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">File URL</label>
        <Input
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Uploaded By</label>
        <Input
          value={formData.uploadedBy}
          onChange={(e) => setFormData({ ...formData, uploadedBy: e.target.value })}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Student ID (Optional)</label>
          <Input
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Student Name (Optional)</label>
          <Input
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded-md"
          rows={3}
        />
      </div>
      
      <div>
        <label className="text-sm font-medium">Tags (comma-separated)</label>
        <Input
          value={formData.tags.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
          placeholder="ielts, certificate, english"
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit">
          {upload ? 'Update Upload' : 'Add Upload'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
} 