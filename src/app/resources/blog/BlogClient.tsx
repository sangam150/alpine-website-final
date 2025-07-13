'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight, Search, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-500" />
            Study Abroad Blog
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Study Abroad Tips, Guides & News
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Expert insights, practical tips, and latest updates to help you navigate your study abroad journey successfully.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              🔍 Search Articles
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📧 Subscribe
            </span>
          </Button>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">All</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Visa Guides</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">University Tips</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Test Preparation</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Country Guides</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">News</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most popular and essential articles to help you with your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Visa Guides</Badge>
                  <span className="text-xs text-gray-500">5 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Complete Guide to Student Visa Application Process
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step instructions for applying to student visas in popular destinations including Australia, Canada, UK, and USA.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 15, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">University Tips</Badge>
                  <span className="text-xs text-gray-500">8 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How to Choose the Right University for Your Study Abroad
                </h3>
                <p className="text-gray-600 mb-4">
                  Factors to consider when selecting universities, including rankings, course offerings, location, and cost.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 12, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Test Preparation</Badge>
                  <span className="text-xs text-gray-500">6 min read</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  IELTS vs TOEFL: Which English Test Should You Take?
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive comparison of IELTS and TOEFL tests, including format, scoring, and acceptance by universities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 10, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, tips, and insights for your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Article 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Country Guides</Badge>
                  <span className="text-xs text-gray-500">7 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Study in Australia: Complete Guide for International Students
                </h3>
                <p className="text-gray-600 mb-4">
                  Everything you need to know about studying in Australia, from universities to visa requirements.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 8, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">News</Badge>
                  <span className="text-xs text-gray-500">4 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  New Student Visa Changes for 2024: What You Need to Know
                </h3>
                <p className="text-gray-600 mb-4">
                  Latest updates on student visa policies and how they affect international students.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 5, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 6 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">University Tips</Badge>
                  <span className="text-xs text-gray-500">9 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Writing a Winning Statement of Purpose (SOP)
                </h3>
                <p className="text-gray-600 mb-4">
                  Expert tips and templates for writing a compelling Statement of Purpose that stands out.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 3, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 7 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Test Preparation</Badge>
                  <span className="text-xs text-gray-500">6 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  PTE Academic: A Complete Guide for Study Abroad
                </h3>
                <p className="text-gray-600 mb-4">
                  Everything about PTE Academic test, including format, preparation tips, and scoring.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">March 1, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 8 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Country Guides</Badge>
                  <span className="text-xs text-gray-500">8 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Study in Canada: Universities, Costs, and Visa Process
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide to studying in Canada, including top universities and application process.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">February 28, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Article 9 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Visa Guides</Badge>
                  <span className="text-xs text-gray-500">5 min read</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Common Visa Interview Questions and How to Answer Them
                </h3>
                <p className="text-gray-600 mb-4">
                  Prepare for your student visa interview with these common questions and expert tips.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">February 25, 2024</span>
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More <ArrowRight className="w-4 h-4 inline ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Stay Updated with Our Blog
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter and never miss the latest study abroad tips, guides, and news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Need Personalized Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our expert counselors are here to guide you through every step of your study abroad journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Us
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Apply Now
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 