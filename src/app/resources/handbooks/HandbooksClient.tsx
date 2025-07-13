'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight, Search, Calendar, Eye, FileDown, Flag } from 'lucide-react'
import Link from 'next/link'

export default function HandbooksClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            Country-Specific Study Guides
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Study Abroad Handbooks
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Comprehensive guides for each study destination. Download detailed handbooks covering universities, 
          costs, visa requirements, and student life in your chosen country.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📚 Download All Handbooks
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              🎯 Find Your Country
            </span>
          </Button>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search handbooks..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">All Countries</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">English Speaking</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Europe</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Asia Pacific</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Handbooks */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most popular study destinations with comprehensive guides and up-to-date information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Australia */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <Flag className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Australia</Badge>
                  <span className="text-xs text-gray-500">PDF • 3.2 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Australia Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide covering universities, costs, accommodation, visa process, and student life in Australia.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Top 50 universities covered
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Cost breakdown & scholarships
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Visa application guide
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Canada */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-500 to-white flex items-center justify-center">
                <Flag className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Canada</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.8 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Canada Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide to studying in Canada, including universities, costs, and visa requirements.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Top 30 universities covered
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Provincial guides included
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Work permit information
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* UK */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-red-600 flex items-center justify-center">
                <Flag className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">United Kingdom</Badge>
                  <span className="text-xs text-gray-500">PDF • 3.5 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  UK Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to studying in the UK, including universities, costs, and student life.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Russell Group universities
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    London & regional guides
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Tier 4 visa guide
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Handbooks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Study Handbooks
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of country-specific study guides and handbooks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* USA */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">United States</Badge>
                  <span className="text-xs text-gray-500">PDF • 4.1 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  USA Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide to studying in the USA, including Ivy League and state universities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Germany */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Germany</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.9 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Germany Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Guide to studying in Germany, including free education options and visa requirements.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* New Zealand */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">New Zealand</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.4 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  New Zealand Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to studying in New Zealand, including universities and lifestyle.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* France */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">France</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.6 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  France Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Guide to studying in France, including Grandes Écoles and public universities.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Ireland */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Ireland</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.1 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Ireland Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Guide to studying in Ireland, including universities and post-study work options.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Netherlands */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Netherlands</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.3 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Netherlands Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Guide to studying in the Netherlands, including universities and English-taught programs.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" variant="outline">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Each Handbook?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Every handbook contains comprehensive information to help you make informed decisions about your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">University Information</h3>
              <p className="text-gray-600">Top universities, rankings, courses, and admission requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa Requirements</h3>
              <p className="text-gray-600">Complete visa application process and document requirements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost Breakdown</h3>
              <p className="text-gray-600">Tuition fees, living costs, and scholarship opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Life</h3>
              <p className="text-gray-600">Accommodation, transportation, culture, and lifestyle tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Download Your Handbook?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get comprehensive information about your chosen study destination and start planning your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Download className="w-5 h-5" /> Download All Handbooks
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Contact Us
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 