import BlogSidebar from "@/components/marketing/BlogSidebar";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Tag } from "lucide-react";
import { getBlogPosts } from "@/lib/content-management";
import { BlogPost } from "@/types/cms";

export async function generateStaticParams() {
  return [
    { slug: "how-to-write-a-winning-sop-2025" },
    // Add more slugs here as you add more blog posts
  ];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.slug === params.slug) || null;

  if (!post) {
    return <div className="py-16 text-center text-gray-400">Blog post not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 order-2 md:order-1">
          <BlogSidebar />
        </div>
        {/* Blog Post Content */}
        <div className="flex-1 order-1 md:order-2">
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{post.category}</Badge>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{new Date(post.publishDate).toLocaleDateString()}</span>
                  <User className="h-3 w-3 ml-2" />
                  <span>{post.authorName}</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-blue-700 mb-2">
                {post.title}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag: string) => (
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
              <article
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>
          <Link
            href="/blog"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
