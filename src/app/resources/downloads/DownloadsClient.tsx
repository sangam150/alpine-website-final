'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight, Search, Calendar, Eye, FileDown } from 'lucide-react'
import Link from 'next/link'

export default function DownloadsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-500" />
            Free Study Abroad Resources
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Download Free Study Abroad Resources
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Access comprehensive guides, templates, and checklists to help you navigate your study abroad journey successfully.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📥 Download All
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📧 Request Custom
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
                placeholder="Search downloads..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-blue-100">All</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Application Forms</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Visa Guides</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Templates</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Checklists</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-blue-50">Country Guides</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Downloads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Most popular and essential resources to get you started on your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Download 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FileText className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Application Forms</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.3 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Complete Application Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive checklist covering all documents and requirements for university applications.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Download 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Visa Guides</Badge>
                  <span className="text-xs text-gray-500">PDF • 1.8 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Student Visa Application Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step guide for student visa applications in major study destinations.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Download 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Templates</Badge>
                  <span className="text-xs text-gray-500">DOCX • 0.5 MB</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  SOP Template & Examples
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional Statement of Purpose template with examples for different courses.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Updated: March 2024</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Downloads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Downloads
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our complete collection of study abroad resources and templates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Download 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Checklists</Badge>
                  <span className="text-xs text-gray-500">PDF • 1.2 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Pre-Departure Checklist
                </h3>
                <p className="text-gray-600 mb-4">
                  Essential items and tasks to complete before leaving for your study abroad destination.
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
            
            {/* Download 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Country Guides</Badge>
                  <span className="text-xs text-gray-500">PDF • 3.1 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Australia Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guide covering universities, costs, accommodation, and student life in Australia.
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
            
            {/* Download 6 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Templates</Badge>
                  <span className="text-xs text-gray-500">DOCX • 0.3 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  CV/Resume Template
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional CV template optimized for international university applications.
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
            
            {/* Download 7 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Visa Guides</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.7 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Canada Student Visa Guide
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed guide for Canadian student visa application process and requirements.
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
            
            {/* Download 8 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Application Forms</Badge>
                  <span className="text-xs text-gray-500">PDF • 0.8 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Financial Declaration Form
                </h3>
                <p className="text-gray-600 mb-4">
                  Template for financial declaration and sponsorship letters for visa applications.
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
            
            {/* Download 9 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs">Country Guides</Badge>
                  <span className="text-xs text-gray-500">PDF • 2.9 MB</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  UK Study Guide 2024
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete guide to studying in the UK, including universities, costs, and student life.
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

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">Download Files</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Downloads</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">6</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Free Resources</div>
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
                <CheckCircle className="w-5 h-5" /> Apply Now
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 