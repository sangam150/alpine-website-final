"use client";

import BlogSidebar from "@/components/marketing/BlogSidebar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { getBlogPosts } from "@/lib/content-management";
import { BlogPost } from "@/types/cms";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 order-2 md:order-1">
          <BlogSidebar />
        </div>
        {/* Blog Posts */}
        <div className="flex-1 order-1 md:order-2">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Alpine Blog</h1>
          {loading ? (
            <div className="text-gray-400 py-8 text-center">Loading blog posts...</div>
          ) : posts.length === 0 ? (
            <div className="text-gray-400 py-8 text-center">No blog posts found.</div>
          ) : (
            <div className="grid gap-8">
              {posts.map((post) => (
                <Card
                  key={post.slug}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                        <User className="h-3 w-3 ml-2" />
                        <span>{post.authorName}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-2 py-0.5"
                        >
                          <Tag className="h-3 w-3 mr-1 inline" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <h2 className="text-xl font-semibold text-blue-700 group-hover:underline mb-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-700 mb-2 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="text-blue-600 font-medium group-hover:underline">
                        Read More &rarr;
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
