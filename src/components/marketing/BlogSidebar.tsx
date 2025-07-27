"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Tag, Clock, User } from "lucide-react";
import { BlogPost } from "@/types/cms";
import { getBlogPosts, getBlogCategories } from "@/lib/content-management";

export default function BlogSidebar() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [postsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getBlogCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (e) {
        setError("Failed to load blog sidebar");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-400">Loading blog sidebar...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <aside className="w-full max-w-xs mx-auto md:mx-0 md:w-80 space-y-8">
      {/* Search */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Search className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-base font-semibold">Search Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg"
          />
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((cat: string) => (
              <li key={cat} className="flex items-center justify-between">
                <Link
                  href={`/blog/category/${cat.toLowerCase()}`}
                  className="hover:underline text-blue-700 font-medium"
                >
                  {cat}
                </Link>
                {/* If you have a count, add it here. Otherwise, remove the span below. */}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {posts.map((post: BlogPost) => (
              <li key={post.slug}>
                <Link
                  href={post.slug}
                  className="block hover:underline text-gray-900 font-medium"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <User className="h-3 w-3 ml-2" />
                  <span>{post.authorName}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Tag Cloud */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs hover:bg-blue-200 transition"
              >
                <Tag className="h-3 w-3 mr-1 inline" />
                {tag}
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
