'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Save, Eye, Globe, FileText, Users, MessageSquare, Settings, Plus, Trash2 } from 'lucide-react';
import { fetchAll, addItem, updateItem, deleteItem } from '@/lib/firestore-admin';

interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  lastUpdated: string;
  status: 'published' | 'draft' | 'archived';
  type: 'page' | 'blog' | 'resource';
}

export default function ContentManagement() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch pages from Firestore
  useEffect(() => {
    setLoading(true);
    fetchAll('pages').then((data) => {
      setPages(data as PageContent[]);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page': return <Globe className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      case 'resource': return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleSave = async (page: PageContent) => {
    setLoading(true);
    if (editingPage) {
      await updateItem('pages', page.id, page);
    } else {
      await addItem('pages', page);
    }
    const data = await fetchAll('pages');
    setPages(data as PageContent[]);
    setEditingPage(null);
    setIsDialogOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteItem('pages', id);
    const data = await fetchAll('pages');
    setPages(data as PageContent[]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600">Manage website pages, blog posts, and resources</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{editingPage ? 'Edit Content' : 'Add New Content'}</DialogTitle>
              <DialogDescription>
                Create a new page, blog post, or resource
              </DialogDescription>
            </DialogHeader>
            <ContentForm
              page={editingPage}
              onSave={handleSave}
              onCancel={() => {
                setEditingPage(null);
                setIsDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.type === 'page').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.type === 'blog').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.type === 'resource').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pages.filter(p => p.status === 'published').length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <ContentList 
            pages={pages} 
            onEdit={(page) => {
              setEditingPage(page);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <ContentList 
            pages={pages.filter(p => p.type === 'page')} 
            onEdit={(page) => {
              setEditingPage(page);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <ContentList 
            pages={pages.filter(p => p.type === 'blog')} 
            onEdit={(page) => {
              setEditingPage(page);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <ContentList 
            pages={pages.filter(p => p.type === 'resource')} 
            onEdit={(page) => {
              setEditingPage(page);
              setIsDialogOpen(true);
            }}
            onDelete={handleDelete}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ContentList({ pages, onEdit, onDelete, loading }: { 
  pages: PageContent[]; 
  onEdit: (page: PageContent) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) {
  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading content...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pages.map((page) => (
        <Card key={page.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              {getTypeIcon(page.type)}
              <Badge className={getStatusColor(page.status)}>
                {page.status}
              </Badge>
            </div>
            <CardTitle className="text-lg">{page.title}</CardTitle>
            <CardDescription>{page.slug}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-600 line-clamp-3">
              {page.content.substring(0, 150)}...
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Last updated: {page.lastUpdated}</span>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(page)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDelete(page.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ContentForm({ page, onSave, onCancel }: {
  page: PageContent | null;
  onSave: (page: PageContent) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<PageContent>(page || {
    id: '',
    title: '',
    slug: '',
    content: '',
    metaDescription: '',
    lastUpdated: new Date().toISOString().split('T')[0],
    status: 'draft',
    type: 'page'
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Page title"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Slug</label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="/page-slug"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Type</label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="page">Page</SelectItem>
              <SelectItem value="blog">Blog Post</SelectItem>
              <SelectItem value="resource">Resource</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium">Status</label>
          <Select
            value={formData.status}
            onValueChange={(value) => setFormData({ ...formData, status: value as any })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Meta Description</label>
        <Input
          value={formData.metaDescription}
          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          placeholder="SEO meta description"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Content</label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Page content..."
          rows={10}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)}>
          <Save className="w-4 h-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
} 