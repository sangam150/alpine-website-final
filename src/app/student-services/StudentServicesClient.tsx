'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Plane, Home, MessageCircle, Search } from 'lucide-react'
import Link from 'next/link'

export default function StudentServicesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-500" />
            Complete Study Abroad Support
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          From Application to Arrival – Alpine supports every step of your journey
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          We provide comprehensive support throughout your study abroad journey, 
          from initial counseling to post-arrival assistance.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📞 Book Free Consultation
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📋 View Our Services
            </span>
          </Button>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Do
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive services cover every aspect of your study abroad journey, 
              ensuring a smooth and successful experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Counseling</h3>
              <p className="text-gray-700">One-on-one guidance tailored to your goals and preferences</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Course & University Selection</h3>
              <p className="text-gray-700">Expert advice on choosing the right course and institution</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Financial & SOP Guidance</h3>
              <p className="text-gray-700">Help with financial planning and Statement of Purpose writing</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submission</h3>
              <p className="text-gray-700">Complete assistance with university applications</p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa Documentation Help</h3>
              <p className="text-gray-700">Complete visa application support and document preparation</p>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pre-departure Orientation</h3>
              <p className="text-gray-700">Essential information and preparation for your journey</p>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post-arrival Support</h3>
              <p className="text-gray-700">Continued assistance after you arrive at your destination</p>
            </div>
            
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl border border-teal-200">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-700">Round-the-clock assistance whenever you need help</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-700">Connections with universities and partners worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Study Abroad Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Step-by-step process from initial consultation to successful arrival at your dream university.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-12">
              {/* Step 1: Search */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Search</h3>
                  <p className="text-gray-600">Initial consultation and goal setting</p>
                  <ul className="text-sm text-gray-500 mt-2">
                    <li>• Career counseling</li>
                    <li>• Country selection</li>
                    <li>• Course research</li>
                  </ul>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      <Search className="w-6 h-6 text-blue-600" />
                      <span className="font-medium text-gray-900">Initial Assessment</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 2: Apply */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div className="w-5/12 pr-8 text-right">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-green-600" />
                      <span className="font-medium text-gray-900">Application Process</span>
                    </div>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Apply</h3>
                  <p className="text-gray-600">University application and documentation</p>
                  <ul className="text-sm text-gray-500 mt-2">
                    <li>• SOP writing</li>
                    <li>• Document preparation</li>
                    <li>• Application submission</li>
                  </ul>
                </div>
              </div>
              
              {/* Step 3: Visa */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa</h3>
                  <p className="text-gray-600">Visa application and approval process</p>
                  <ul className="text-sm text-gray-500 mt-2">
                    <li>• Document verification</li>
                    <li>• Visa application</li>
                    <li>• Interview preparation</li>
                  </ul>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-purple-600" />
                      <span className="font-medium text-gray-900">Visa Processing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Fly */}
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center z-10">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div className="w-5/12 pr-8 text-right">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center gap-3">
                      <Plane className="w-6 h-6 text-red-600" />
                      <span className="font-medium text-gray-900">Departure & Arrival</span>
                    </div>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Fly</h3>
                  <p className="text-gray-600">Pre-departure and arrival support</p>
                  <ul className="text-sm text-gray-500 mt-2">
                    <li>• Pre-departure briefing</li>
                    <li>• Airport assistance</li>
                    <li>• Post-arrival support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how our comprehensive services helped students achieve their study abroad dreams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pratiksha G.</h3>
                  <p className="text-sm text-gray-600">Australia → Monash University</p>
                </div>
              </div>
              <p className="text-gray-700">"Alpine guided me through every step - from choosing the right course to getting my visa approved!"</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Kiran B.</h3>
                  <p className="text-sm text-gray-600">Canada → University of Toronto</p>
                </div>
              </div>
              <p className="text-gray-700">"Their SOP guidance and visa support made the entire process smooth and stress-free."</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Amit S.</h3>
                  <p className="text-sm text-gray-600">UK → University of Manchester</p>
                </div>
              </div>
              <p className="text-gray-700">"The post-arrival support was incredible. They helped me settle in perfectly!"</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our expert counselors guide you through every step of your study abroad process. 
            From initial consultation to arrival at your dream university.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Book Free Consultation
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Mail className="w-5 h-5" /> Contact Us
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 