"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Mail, 
  Search, 
  Filter,
  BookOpen,
  GraduationCap,
  FileCheck,
  Calendar,
  Star,
  Users,
  ArrowDown,
  ArrowUp,
  SortAsc,
  SortDesc
} from "lucide-react";
import { FirebaseService } from "@/lib/firebase-collections";
import { Timestamp } from "firebase/firestore";

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "pdf" | "guide" | "template" | "checklist";
  fileUrl: string;
  thumbnail?: string;
  downloads: number;
  rating: number;
  createdAt: Timestamp;
  tags: string[];
  size: string;
  pages?: number;
}

const categories = [
  "All Categories",
  "SOP & LOE",
  "Visa Documents",
  "Test Preparation",
  "University Applications",
  "Scholarships",
  "Country Guides",
  "Templates"
];

const types = [
  "All Types",
  "PDF",
  "Guide",
  "Template",
  "Checklist"
];

const filterAndSortResources = (
  resources: Resource[],
  searchTerm: string,
  selectedCategory: string,
  selectedType: string,
  sortBy: "title" | "downloads" | "rating" | "createdAt",
  sortOrder: "asc" | "desc"
) => {
  const filtered = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || resource.category === selectedCategory;
    const matchesType = selectedType === "All Types" || resource.type.toUpperCase() === selectedType.toUpperCase();
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort resources
  filtered.sort((a, b) => {
    let aValue: any = a[sortBy];
    let bValue: any = b[sortBy];
    
    if (sortBy === "createdAt") {
      aValue = typeof a.createdAt === "object" && "toDate" in a.createdAt ? a.createdAt.toDate().getTime() : new Date(a.createdAt).getTime();
      bValue = typeof b.createdAt === "object" && "toDate" in b.createdAt ? b.createdAt.toDate().getTime() : new Date(b.createdAt).getTime();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filtered;
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedType, setSelectedType] = useState("All Types");
  const [sortBy, setSortBy] = useState<"title" | "downloads" | "rating" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  useEffect(() => {
    const filtered = filterAndSortResources(
      resources,
      searchTerm,
      selectedCategory,
      selectedType,
      sortBy,
      sortOrder
    );
    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedCategory, selectedType, sortBy, sortOrder]);

  const loadResources = async () => {
    setLoading(true);
    try {
      // Fetch resources from Firestore
      const firestoreResources = await FirebaseService.getDocuments<any>("resources");
      // Ensure createdAt is a Timestamp
      const mappedResources = firestoreResources.filter((r: any) => r.createdAt).map((r: any) => ({
        ...r,
        createdAt: r.createdAt,
      }));
      setResources(mappedResources);
    } catch (error) {
      console.error("Error loading resources:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (resource: Resource) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = resource.fileUrl;
    link.download = resource.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Update download count
    setResources(prev => prev.map(r => 
      r.id === resource.id ? { ...r, downloads: r.downloads + 1 } : r
    ));
  };

  const handlePreview = (resource: Resource) => {
    setSelectedResource(resource);
    setShowPreview(true);
  };

  const handleEmail = async (resource: Resource) => {
    try {
      const response = await fetch("/api/send-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "student@example.com", // Replace with actual email
          category: resource.category,
          name: "Student",
          resourceId: resource.id
        }),
      });

      if (response.ok) {
        alert("Resource sent to your email!");
      } else {
        alert("Failed to send resource. Please try again.");
      }
    } catch (error) {
      console.error("Error sending resource:", error);
      alert("Failed to send resource. Please try again.");
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5" />;
      case "guide":
        return <BookOpen className="w-5 h-5" />;
      case "template":
        return <FileCheck className="w-5 h-5" />;
      case "checklist":
        return <FileCheck className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-800";
      case "guide":
        return "bg-blue-100 text-blue-800";
      case "template":
        return "bg-green-100 text-green-800";
      case "checklist":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Resources</h2>
          <p className="text-gray-600">Please wait while we load the latest study materials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <BookOpen className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Study Resources Library</h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Access comprehensive guides, templates, and checklists to help you succeed in your study abroad journey
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-blue-900">
              <FileText className="w-4 h-4 mr-2" />
              {resources.length} Resources
            </Badge>
            <Badge variant="secondary" className="text-blue-900">
              <Download className="w-4 h-4 mr-2" />
              {resources.reduce((sum, r) => sum + r.downloads, 0)} Downloads
            </Badge>
            <Badge variant="secondary" className="text-blue-900">
              <Star className="w-4 h-4 mr-2" />
              {resources.reduce((sum, r) => sum + r.rating, 0) / resources.length} Avg Rating
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="createdAt">Date</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="flex items-center gap-2"
            >
              {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              {sortOrder === "asc" ? "Asc" : "Desc"}
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
          <div className="text-sm text-gray-500">
            {searchTerm && `Search results for "${searchTerm}"`}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {resource.category}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {resource.type.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{resource.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {resource.downloads}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      {resource.rating}
                    </span>
                    <span>{resource.size}</span>
                  </div>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {resource.createdAt.toDate().toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handlePreview(resource)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEmail(resource)}
                  >
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All Categories");
                setSelectedType("All Types");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedResource && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedResource.title}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">PDF Preview</p>
                  <p className="text-sm text-gray-500">{selectedResource.size}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button 
                  onClick={() => handleDownload(selectedResource)}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleEmail(selectedResource)}
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send to Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
