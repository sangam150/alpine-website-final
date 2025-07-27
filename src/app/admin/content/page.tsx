"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Save,
  Eye,
  Globe,
  FileText,
  Users,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Search,
  Filter,
  Calendar,
  Tag,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PDFGenerator from "@/components/admin/PDFGenerator";

interface Page {
  id: string;
  title: string;
  slug: string;
  content: any;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  lastUpdated: string;
  createdAt?: string;
  status: "published" | "draft" | "archived";
  type: "page" | "blog" | "resource";
  author?: string;
  category?: string;
  featuredImage?: string;
  excerpt?: string;
  tags?: string[];
}

export default function ContentManagement() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isAddPageDialogOpen, setIsAddPageDialogOpen] = useState(false);
  const [isViewPageDialogOpen, setIsViewPageDialogOpen] = useState(false);

  // Fetch pages from API
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      if (data.success) {
        setPages(data.data);
      }
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPages = pages.filter((page) => {
    const matchesSearch =
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || page.status === statusFilter;
    const matchesType = typeFilter === "all" || page.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-100 text-blue-800";
      case "blog":
        return "bg-purple-100 text-purple-800";
      case "resource":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSave = async (page: Page) => {
    setLoading(true);
    try {
      if (selectedPage) {
        const response = await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(page),
        });

        if (response.ok) {
          await fetchPages();
        }
      } else {
        const response = await fetch("/api/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(page),
        });

        if (response.ok) {
          await fetchPages();
        }
      }
    } catch (error) {
      console.error("Error saving page:", error);
    }

    setSelectedPage(null);
    setIsAddPageDialogOpen(false);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/content?pageId=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchPages();
      }
    } catch (error) {
      console.error("Error deleting page:", error);
    }
    setLoading(false);
  };

  const stats = {
    total: pages.length,
    published: pages.filter((p) => p.status === "published").length,
    draft: pages.filter((p) => p.status === "draft").length,
    pages: pages.filter((p) => p.type === "page").length,
    blogs: pages.filter((p) => p.type === "blog").length,
    resources: pages.filter((p) => p.type === "resource").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Content Management
            </h1>
            <p className="text-gray-600">
              Manage website pages, blog posts, and resources
            </p>
          </div>
          <Dialog
            open={isAddPageDialogOpen}
            onOpenChange={setIsAddPageDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedPage ? "Edit Content" : "Add New Content"}
                </DialogTitle>
                <DialogDescription>
                  Create a new page, blog post, or resource
                </DialogDescription>
              </DialogHeader>
              <ContentForm
                page={selectedPage ?? undefined}
                onSave={handleSave}
                onCancel={() => {
                  setSelectedPage(null);
                  setIsAddPageDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.published}
                  </p>
                </div>
                <Globe className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Draft</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {stats.draft}
                  </p>
                </div>
                <Edit className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pages</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.pages}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Blog Posts
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.blogs}
                  </p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Resources</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.resources}
                  </p>
                </div>
                <Settings className="h-8 w-8 text-orange-500" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="page">Pages</SelectItem>
                    <SelectItem value="blog">Blog Posts</SelectItem>
                    <SelectItem value="resource">Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
              pages={filteredPages}
              onEdit={(page) => {
                setSelectedPage(page);
                setIsAddPageDialogOpen(true);
              }}
              onView={(page) => {
                setSelectedPage(page);
                setIsViewPageDialogOpen(true);
              }}
              onDelete={handleDelete}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <ContentList
              pages={filteredPages.filter((p) => p.type === "page")}
              onEdit={(page) => {
                setSelectedPage(page);
                setIsAddPageDialogOpen(true);
              }}
              onView={(page) => {
                setSelectedPage(page);
                setIsViewPageDialogOpen(true);
              }}
              onDelete={handleDelete}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="blog" className="space-y-4">
            <ContentList
              pages={filteredPages.filter((p) => p.type === "blog")}
              onEdit={(page) => {
                setSelectedPage(page);
                setIsAddPageDialogOpen(true);
              }}
              onView={(page) => {
                setSelectedPage(page);
                setIsViewPageDialogOpen(true);
              }}
              onDelete={handleDelete}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <ContentList
              pages={filteredPages.filter((p) => p.type === "resource")}
              onEdit={(page) => {
                setSelectedPage(page);
                setIsAddPageDialogOpen(true);
              }}
              onView={(page) => {
                setSelectedPage(page);
                setIsViewPageDialogOpen(true);
              }}
              onDelete={handleDelete}
              loading={loading}
            />
          </TabsContent>
        </Tabs>

        {/* View Content Dialog */}
        <Dialog
          open={isViewPageDialogOpen}
          onOpenChange={setIsViewPageDialogOpen}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Content Preview</DialogTitle>
              <DialogDescription>
                Preview content before publishing
              </DialogDescription>
            </DialogHeader>
            {selectedPage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title</Label>
                    <p className="text-sm font-medium">{selectedPage.title}</p>
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <p className="text-sm font-medium">{selectedPage.slug}</p>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Badge className={getTypeColor(selectedPage.type)}>
                      {selectedPage.type}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedPage.status)}>
                      {selectedPage.status}
                    </Badge>
                  </div>
                </div>

                {selectedPage.excerpt && (
                  <div>
                    <Label>Excerpt</Label>
                    <p className="text-sm text-gray-700 mt-1">
                      {selectedPage.excerpt}
                    </p>
                  </div>
                )}

                {selectedPage.tags && selectedPage.tags.length > 0 && (
                  <div>
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedPage.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label>SEO Title</Label>
                  <p className="text-sm font-medium">
                    {selectedPage.seo.title}
                  </p>
                </div>

                <div>
                  <Label>SEO Description</Label>
                  <p className="text-sm text-gray-700 mt-1">
                    {selectedPage.seo.description}
                  </p>
                </div>

                <div>
                  <Label>Content</Label>
                  <div className="mt-1 p-4 bg-gray-50 rounded-md max-h-96 overflow-y-auto">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedPage.content, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Last Updated</Label>
                    <p className="text-sm text-gray-600">
                      {new Date(selectedPage.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <Label>Author</Label>
                    <p className="text-sm text-gray-600">
                      {selectedPage.author || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Content Dialog */}
        <Dialog
          open={!!selectedPage && isAddPageDialogOpen}
          onOpenChange={() => {
            setSelectedPage(null);
            setIsAddPageDialogOpen(false);
          }}
        >
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Content</DialogTitle>
              <DialogDescription>Update content information</DialogDescription>
            </DialogHeader>
            {selectedPage && (
              <ContentForm
                page={selectedPage}
                onSave={handleSave}
                onCancel={() => {
                  setSelectedPage(null);
                  setIsAddPageDialogOpen(false);
                }}
              />
            )}
          </DialogContent>
        </Dialog>

        {/* PDF Generator Section */}
        <div className="mt-8">
          <PDFGenerator 
            type="application"
            data={{
              studentName: "Sample Student",
              email: "student@example.com",
              university: "Sample University",
              program: "Sample Program",
              level: "Master's",
              intake: "September 2025"
            }}
            studentName="Sample Student"
            studentEmail="student@example.com"
          />
        </div>
      </div>
    </div>
  );
}

function ContentList({
  pages,
  onEdit,
  onView,
  onDelete,
  loading,
}: {
  pages: Page[];
  onEdit: (page: Page) => void;
  onView: (page: Page) => void;
  onDelete: (id: string) => void;
  loading: boolean;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "page":
        return "bg-blue-100 text-blue-800";
      case "blog":
        return "bg-purple-100 text-purple-800";
      case "resource":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content ({pages.length})</CardTitle>
        <CardDescription>
          Manage and organize your website content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{page.title}</div>
                    <div className="text-sm text-gray-500">{page.slug}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(page.type)}>{page.type}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(page.status)}>
                    {page.status}
                  </Badge>
                </TableCell>
                <TableCell>{page.author || "Unknown"}</TableCell>
                <TableCell>
                  {new Date(page.lastUpdated).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(page)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(page)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(page.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ContentForm({
  page,
  onSave,
  onCancel,
}: {
  page?: Page;
  onSave: (page: Page) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    type: page?.type || ("page" as const),
    status: page?.status || ("draft" as const),
    content: page?.content || {},
    seo: {
      title: page?.seo?.title || "",
      description: page?.seo?.description || "",
      keywords: page?.seo?.keywords || [],
    },
    author: page?.author || "",
    category: page?.category || "",
    featuredImage: page?.featuredImage || "",
    excerpt: page?.excerpt || "",
    tags: page?.tags || [],
  });

  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (page) {
      // Update existing page
      onSave({
        ...page,
        ...formData,
        lastUpdated: new Date().toISOString(),
      });
    } else {
      // Create new page
      onSave({
        id: "",
        ...formData,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      });
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const addKeyword = () => {
    if (
      newKeyword.trim() &&
      !formData.seo.keywords.includes(newKeyword.trim())
    ) {
      setFormData({
        ...formData,
        seo: {
          ...formData.seo,
          keywords: [...formData.seo.keywords, newKeyword.trim()],
        },
      });
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData({
      ...formData,
      seo: {
        ...formData.seo,
        keywords: formData.seo.keywords.filter(
          (keyword) => keyword !== keywordToRemove,
        ),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as any })
            }
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
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as any })
            }
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
        <div>
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) =>
            setFormData({ ...formData, excerpt: e.target.value })
          }
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="featuredImage">Featured Image URL</Label>
        <Input
          id="featuredImage"
          value={formData.featuredImage}
          onChange={(e) =>
            setFormData({ ...formData, featuredImage: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer"
              onClick={() => removeTag(tag)}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <Button type="button" variant="outline" onClick={addTag}>
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">SEO Settings</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input
              id="seoTitle"
              value={formData.seo.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, title: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Textarea
              id="seoDescription"
              value={formData.seo.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  seo: { ...formData.seo, description: e.target.value },
                })
              }
              rows={3}
            />
          </div>
          <div>
            <Label>SEO Keywords</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.seo.keywords.map((keyword, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => removeKeyword(keyword)}
                >
                  {keyword} ×
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <Input
                placeholder="Add keyword..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addKeyword())
                }
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="content">Content (JSON)</Label>
        <Textarea
          id="content"
          value={JSON.stringify(formData.content, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setFormData({ ...formData, content: parsed });
            } catch (error) {
              // Invalid JSON, keep the string value
            }
          }}
          rows={10}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {page ? "Update Content" : "Create Content"}
        </Button>
      </div>
    </form>
  );
}
