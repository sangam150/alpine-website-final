'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ResourcesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            Free Study Abroad Resources
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Everything You Need for Your Study Abroad Journey
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Free handbooks, guides, mock tests, and resources to help you succeed in your international education journey.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📚 Download Free Handbooks
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              🎯 Take Mock Tests
            </span>
          </Button>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resource Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive resources organized by category to help you find exactly what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Handbooks */}
            <Link href="/resources/handbooks" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Handbooks</h3>
                <p className="text-gray-700 mb-4">Comprehensive guides for each study destination</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">12 Countries</span>
                  <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            {/* Blogs */}
            <Link href="/resources/blog" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Blog & Articles</h3>
                <p className="text-gray-700 mb-4">Latest news, tips, and guides for studying abroad</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600 font-medium">50+ Articles</span>
                  <ArrowRight className="w-5 h-5 text-green-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            {/* Downloads */}
            <Link href="/resources/downloads" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Downloads</h3>
                <p className="text-gray-700 mb-4">Application forms, checklists, and templates</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-600 font-medium">25+ Files</span>
                  <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            {/* Visa FAQs */}
            <Link href="/resources/visa-faqs" className="group">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa FAQs</h3>
                <p className="text-gray-700 mb-4">Common questions and answers about student visas</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600 font-medium">100+ FAQs</span>
                  <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            {/* Mock Tests */}
            <Link href="/resources/mock-tests" className="group">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mock Tests</h3>
                <p className="text-gray-700 mb-4">Practice tests for IELTS, TOEFL, and PTE</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-600 font-medium">50+ Tests</span>
                  <ArrowRight className="w-5 h-5 text-red-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            
            {/* Quick Links */}
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Links</h3>
              <p className="text-gray-700 mb-4">Essential resources for your journey</p>
              <div className="space-y-2">
                <Link href="/contact" className="block text-sm text-indigo-600 hover:text-indigo-700">Contact Counselors</Link>
                <Link href="/apply" className="block text-sm text-indigo-600 hover:text-indigo-700">Apply Now</Link>
                <Link href="/test-preparation" className="block text-sm text-indigo-600 hover:text-indigo-700">Test Prep</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most popular and essential resources to get you started on your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Blog Post */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-sm text-blue-600 font-medium">Latest Article</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Complete Guide to Student Visa Application
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step instructions for applying to student visas in popular destinations.
                </p>
                <Link 
                  href="/resources/blog"
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Featured Download */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Download className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-600 font-medium">Free Download</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Application Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive checklist for university applications and visa requirements.
                </p>
                <Link 
                  href="/resources/downloads"
                  className="text-green-600 hover:text-green-700 font-medium inline-flex items-center"
                >
                  Download <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Featured Test */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Play className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm text-red-600 font-medium">Practice Test</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  IELTS Mock Test
                </h3>
                <p className="text-gray-600 mb-4">
                  Full-length IELTS practice test with detailed explanations and scoring.
                </p>
                <Link 
                  href="/resources/mock-tests"
                  className="text-red-600 hover:text-red-700 font-medium inline-flex items-center"
                >
                  Start Test <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600">Country Handbooks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Blog Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">25+</div>
              <div className="text-gray-600">Download Files</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-gray-600">Visa FAQs</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Personalized Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our expert counselors are here to guide you through every step of your study abroad journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Us
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Mail className="w-5 h-5" /> Apply Now
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 