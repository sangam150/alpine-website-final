'use client';

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
import fs from 'fs';
import path from 'path';

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

const countryBlogs = [
  {
    country: 'Australia',
    file: 'australia-blog.md',
    slug: 'australia-blog',
    title: 'Study in Australia – A Golden Opportunity for Nepali Students',
    excerpt: 'Why Australia is the top study destination for Nepali students in 2025. Learn about top universities, scholarships, visa guidance, and more.',
  },
  {
    country: 'UK',
    file: 'uk-blog.md',
    slug: 'uk-blog',
    title: 'Study in the UK – Globally Recognized Degrees & Fast-Track Careers',
    excerpt: 'Explore why the UK is a top choice for Nepali students: universities, scholarships, PSW visa, and more.',
  },
  {
    country: 'Canada',
    file: 'canada-blog.md',
    slug: 'canada-blog',
    title: 'Canada: Your Gateway to Quality Education & Permanent Residency',
    excerpt: 'World-class institutions, PGWP, scholarships, and PR pathways for Nepali students in Canada.',
  },
  {
    country: 'USA',
    file: 'usa-blog.md',
    slug: 'usa-blog',
    title: 'USA: Land of Innovation & Opportunity',
    excerpt: 'Top US universities, OPT, scholarships, and why Nepali students choose the USA.',
  },
  {
    country: 'Germany',
    file: 'germany-blog.md',
    slug: 'germany-blog',
    title: 'Germany: Tuition-Free Education + Strong Engineering Focus',
    excerpt: 'Tuition-free public universities, engineering, scholarships, and PR in Germany for Nepali students.',
  },
  {
    country: 'China',
    file: 'china-blog.md',
    slug: 'china-blog',
    title: 'China: Emerging Education Hub with Global Influence',
    excerpt: 'Affordable programs, scholarships, and Mandarin skills for Nepali students in China.',
  },
  {
    country: 'New Zealand',
    file: 'new-zealand-blog.md',
    slug: 'new-zealand-blog',
    title: 'New Zealand: Friendly Campus Culture & Work Rights',
    excerpt: 'Renowned universities, post-study work, and PR pathways in New Zealand for Nepali students.',
  },
  {
    country: 'Portugal',
    file: 'portugal-blog.md',
    slug: 'portugal-blog',
    title: 'Portugal: Budget-Friendly & Welcoming',
    excerpt: 'Affordable tuition, golden visa, and student life in Portugal for Nepali students.',
  },
  {
    country: 'Spain',
    file: 'spain-blog.md',
    slug: 'spain-blog',
    title: 'Spain: Study in Sunshine at Affordable Prices',
    excerpt: 'Affordable degrees, vibrant culture, and scholarships for Nepali students in Spain.',
  },
  {
    country: 'France',
    file: 'france-blog.md',
    slug: 'france-blog',
    title: 'France: Prestigious & Affordable Education in Europe',
    excerpt: 'Top public institutions, scholarships, and student life in France for Nepali students.',
  },
  {
    country: 'Malta',
    file: 'malta-blog.md',
    slug: 'malta-blog',
    title: 'Malta: Small Country, Big Opportunities',
    excerpt: 'Boutique institutions, English-speaking, and Mediterranean lifestyle for Nepali students in Malta.',
  },
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

export default function BlogClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Blog
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
                Expert insights, tips, and guides to help you navigate your study abroad journey successfully.
              </p>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                      <div className="text-blue-100 text-xs sm:text-sm">{stat.label}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-6 sm:py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 sm:py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Country Blog Posts */}
      <section className="py-8 sm:py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">Country-Specific Study Abroad Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {countryBlogs.map((blog) => (
              <Card key={blog.slug} className="shadow-md hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1 text-sm sm:text-base line-clamp-3">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`} className="mt-auto inline-flex items-center text-blue-600 hover:underline font-medium text-sm sm:text-base">
                    Read Full Guide <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 px-2">Featured Article</h2>
              {/* ...rest of the featured post and blog list rendering logic from page.tsx... */}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 