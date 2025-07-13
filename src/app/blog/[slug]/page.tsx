import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

const BLOGS = [
  'australia-blog',
  'uk-blog',
  'canada-blog',
  'usa-blog',
  'germany-blog',
  'china-blog',
  'new-zealand-blog',
  'portugal-blog',
  'spain-blog',
  'france-blog',
  'malta-blog',
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  if (!BLOGS.includes(slug)) return {};
  const filePath = path.join(process.cwd(), 'src/app/blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return {};
  const file = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(file);
  return {
    title: data.title || 'Study Abroad Blog',
    description: data.description || data.excerpt || '',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!BLOGS.includes(slug)) return notFound();
  const filePath = path.join(process.cwd(), 'src/app/blog', `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();
  const file = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(file);
  const pdfPath = `/blog-pdfs/${slug}.pdf`;
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 leading-tight">
            {data.title || slug.replace(/-/g, ' ')}
          </h1>
          {data.description && (
            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              {data.description}
            </p>
          )}
          {data.published && (
            <p className="text-sm text-gray-500 mb-4">
              Published: {data.published}
            </p>
          )}
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
          <div className="prose prose-blue max-w-none prose-sm sm:prose-base lg:prose-lg">
            <MDXRemote source={content} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:underline font-medium text-sm sm:text-base"
            >
              ← Back to Blog
            </Link>
            <a 
              href={pdfPath} 
              download 
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium"
            >
              📄 Download PDF Guide
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 