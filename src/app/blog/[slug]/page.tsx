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
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{data.title || slug.replace(/-/g, ' ')}</h1>
      {data.description && <p className="text-lg text-gray-600 mb-6">{data.description}</p>}
      <div className="prose prose-blue max-w-none mb-8">
        <MDXRemote source={content} />
      </div>
      <div className="flex gap-4 mt-8">
        <Link href="/blog" className="text-blue-600 hover:underline">← Back to Blog</Link>
        <a href={pdfPath} download className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Download PDF</a>
      </div>
    </main>
  );
} 