import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  ArrowRight,
  Search,
  Filter,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Alpine Education | Study Abroad Tips, Guides & News',
  description: 'Latest articles on study abroad tips, visa guidance, university applications, and international education news. Expert insights from Alpine Education.',
  keywords: 'study abroad blog, visa tips, university application, international education, student guides',
  openGraph: {
    title: 'Blog - Alpine Education',
    description: 'Latest articles on study abroad tips and international education.',
    type: 'website',
  },
};

// Mock blog posts data (in real implementation, this would come from CMS)
const blogPosts = [
  {
    id: '1',
    title: 'Complete Guide to Student Visa Application Process',
    excerpt: 'Everything you need to know about applying for a student visa, from document preparation to interview tips.',
    content: 'A comprehensive guide covering all aspects of student visa applications...',
    author: 'Sangam Karki',
    publishDate: '2024-01-15',
    readTime: '8 min read',
    category: 'Visa Guidance',
    tags: ['Student Visa', 'Application Process', 'Documentation'],
    image: '/og-image.jpg',
    slug: 'complete-guide-student-visa-application'
  },
  {
    id: '2',
    title: 'Top 10 Universities in Australia for International Students',
    excerpt: 'Discover the best universities in Australia offering excellent education and post-study opportunities.',
    content: 'Australia is home to some of the world\'s most prestigious universities...',
    author: 'Ragav Upreti',
    publishDate: '2024-01-10',
    readTime: '6 min read',
    category: 'Study Destinations',
    tags: ['Australia', 'Universities', 'International Students'],
    image: '/og-image.jpg',
    slug: 'top-10-universities-australia-international-students'
  },
  {
    id: '3',
    title: 'IELTS vs PTE: Which Test Should You Choose?',
    excerpt: 'Compare IELTS and PTE tests to make an informed decision for your study abroad journey.',
    content: 'Both IELTS and PTE are widely accepted English proficiency tests...',
    author: 'Sunita',
    publishDate: '2024-01-08',
    readTime: '5 min read',
    category: 'Test Preparation',
    tags: ['IELTS', 'PTE', 'English Tests', 'Test Comparison'],
    image: '/og-image.jpg',
    slug: 'ielts-vs-pte-which-test-choose'
  },
  {
    id: '4',
    title: 'How to Write a Winning Statement of Purpose',
    excerpt: 'Expert tips and templates to help you craft a compelling SOP that stands out to university admissions.',
    content: 'Your Statement of Purpose (SOP) is one of the most important documents...',
    author: 'Aakanksha Poudel',
    publishDate: '2024-01-05',
    readTime: '10 min read',
    category: 'Application Tips',
    tags: ['SOP', 'Application', 'Writing Tips', 'Admissions'],
    image: '/og-image.jpg',
    slug: 'how-write-winning-statement-purpose'
  },
  {
    id: '5',
    title: 'Scholarship Opportunities for Nepali Students',
    excerpt: 'Comprehensive guide to scholarships available for Nepali students studying abroad.',
    content: 'There are numerous scholarship opportunities available for Nepali students...',
    author: 'Sangam Karki',
    publishDate: '2024-01-03',
    readTime: '7 min read',
    category: 'Financial Aid',
    tags: ['Scholarships', 'Financial Aid', 'Nepali Students'],
    image: '/og-image.jpg',
    slug: 'scholarship-opportunities-nepali-students'
  },
  {
    id: '6',
    title: 'Living Costs in Popular Study Destinations',
    excerpt: 'Compare living expenses across different countries to plan your study abroad budget effectively.',
    content: 'Understanding living costs is crucial for planning your study abroad budget...',
    author: 'Ragav Upreti',
    publishDate: '2024-01-01',
    readTime: '9 min read',
    category: 'Financial Planning',
    tags: ['Living Costs', 'Budget Planning', 'Study Abroad'],
    image: '/og-image.jpg',
    slug: 'living-costs-popular-study-destinations'
  }
];

const categories = [
  'All Posts',
  'Visa Guidance',
  'Study Destinations',
  'Test Preparation',
  'Application Tips',
  'Financial Aid',
  'Financial Planning'
];

const stats = [
  { icon: BookOpen, value: '50+', label: 'Articles' },
  { icon: Calendar, value: 'Weekly', label: 'Updates' },
  { icon: User, value: 'Expert', label: 'Authors' },
  { icon: Tag, value: '10+', label: 'Categories' }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Blog
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Expert insights, tips, and guides to help you navigate your study abroad journey successfully.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-blue-100 text-sm">{stat.label}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Article</h2>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/og-image.jpg";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {blogPosts[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(blogPosts[0].publishDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blogPosts[0].readTime}
                    </span>
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {blogPosts[0].author}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{blogPosts[0].title}</h3>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blogPosts[0].tags.map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link href={`/blog/${blogPosts[0].slug}`}>
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Latest Articles</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest insights, tips, and guides for your study abroad journey.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <div key={post.id} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "/og-image.jpg";
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">By {post.author}</span>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Subscribe to our newsletter for the latest study abroad tips, guides, and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 