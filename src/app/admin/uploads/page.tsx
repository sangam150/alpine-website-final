'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload, FileText, Image, File, Download, Trash2, Eye, FolderOpen, Plus } from 'lucide-react';
import { fetchAll, addItem, deleteItem } from '@/lib/firestore-admin';
import { storage } from '@/lib/firebase-config';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'document' | 'video';
  size: string;
  url: string;
  category: string;
  uploadDate: string;
  description: string;
  downloads: number;
  storagePath: string;
}

const categories = [
  'Study Guides',
  'University Lists',
  'Visa Guides',
  'Test Preparation',
  'Immigration Guides',
  'Application Forms',
  'Scholarship Information',
  'Country Information'
];

export default function UploadsManagement() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch files from Firestore
  useEffect(() => {
    setLoading(true);
    fetchAll('uploads').then((data) => {
      setFiles(data as UploadedFile[]);
      setLoading(false);
    });
  }, []);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-6 h-6 text-red-500" />;
      case 'image': return <Image className="w-6 h-6 text-green-500" />;
      case 'document': return <File className="w-6 h-6 text-blue-500" />;
      case 'video': return <File className="w-6 h-6 text-purple-500" />;
      default: return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      pdf: 'bg-red-100 text-red-800',
      image: 'bg-green-100 text-green-800',
      document: 'bg-blue-100 text-blue-800',
      video: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type.toUpperCase()}
      </Badge>
    );
  };

  const handleFileUpload = async (file: File, category: string, description: string) => {
    setUploading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Save metadata to Firestore
      const fileData = {
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('image') ? 'image' : 
              file.type.includes('video') ? 'video' : 'document',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        url: downloadURL,
        category,
        uploadDate: new Date().toISOString().split('T')[0],
        description,
        downloads: 0,
        storagePath: snapshot.ref.fullPath
      };

      await addItem('uploads', fileData);
      
      // Refresh file list
      const data = await fetchAll('uploads');
      setFiles(data as UploadedFile[]);
      setIsUploadDialogOpen(false);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (file: UploadedFile) => {
    setLoading(true);
    try {
      // Delete from Firebase Storage
      const storageRef = ref(storage, file.storagePath);
      await deleteObject(storageRef);
      
      // Delete from Firestore
      await deleteItem('uploads', file.id);
      
      // Refresh file list
      const data = await fetchAll('uploads');
      setFiles(data as UploadedFile[]);
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (file: UploadedFile) => {
    try {
      const response = await fetch(file.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Uploads</h1>
          <p className="text-gray-600">Manage and organize uploaded files and resources</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New File</DialogTitle>
              <DialogDescription>
                Select a file to upload to the server
              </DialogDescription>
            </DialogHeader>
            <FileUploadForm
              onUpload={handleFileUpload}
              onCancel={() => setIsUploadDialogOpen(false)}
              uploading={uploading}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.reduce((sum, file) => sum + file.downloads, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">PDF Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.type === 'pdf').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Images</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {files.filter(f => f.type === 'image').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                {getFileIcon(file.type)}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleDownload(file)}>
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteFile(file)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg truncate">{file.name}</CardTitle>
              <CardDescription>{file.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category</span>
                <Badge variant="outline">{file.category}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                {getTypeBadge(file.type)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Size</span>
                <span className="text-sm font-medium">{file.size}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Downloads</span>
                <span className="text-sm font-medium">{file.downloads}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Uploaded</span>
                <span className="text-sm font-medium">{file.uploadDate}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="text-center py-12 text-gray-500">Loading files...</div>
      )}
    </div>
  );
}

function FileUploadForm({ onUpload, onCancel, uploading }: {
  onUpload: (file: File, category: string, description: string) => void;
  onCancel: () => void;
  uploading: boolean;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && category && description) {
      onUpload(selectedFile, category, description);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">File</label>
        <Input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.mp4,.avi"
          required
        />
        {selectedFile && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium">Description</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter file description..."
          required
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel} disabled={uploading}>
          Cancel
        </Button>
        <Button type="submit" disabled={uploading || !selectedFile || !category || !description}>
          {uploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>
    </form>
  );
} 