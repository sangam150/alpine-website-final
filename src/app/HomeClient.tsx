"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Users, Star, MessageCircle, PlayCircle, BookOpen, CalendarDays, FileText, Phone, Award, GraduationCap, MapPin, Clock } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import ServicesOverview from '@/components/home/ServicesOverview';
import CountryGrid from '@/components/home/CountryGrid';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import MockTestSection from '@/components/home/MockTestSection';
import CTASection from '@/components/home/CTASection';
import StatsSection from '@/components/home/StatsSection';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col md:flex-row items-center max-w-7xl mx-auto">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center z-10">
          <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
            <span className="inline-flex items-center gap-2">
              <Star className="w-4 h-4 text-blue-500" />
              #1 Study Abroad Consultancy in Nepal
            </span>
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Empowering Nepali Students to Study Abroad
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-lg md:text-xl text-gray-700">
            <span>🌍 Australia</span>
            <span>🇬🇧 UK</span>
            <span>🇨🇦 Canada</span>
            <span>🇫🇷 France</span>
            <span>🇳🇿 New Zealand</span>
          </div>
          
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            🎓 Start your global education journey with expert counseling and visa guidance.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg shadow-lg">
              <span className="inline-flex items-center gap-2">
                🎯 Book Free Counseling
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
              <span className="inline-flex items-center gap-2">
                🚀 Apply Now
              </span>
            </Button>
          </div>
          
          {/* Trust Tags */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-lg">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 3,000+ Students Placed
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 12+ Study Destinations
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> Expert Guidance
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 100% Visa Assistance
            </div>
          </div>
        </div>
        
        {/* Right: Video Testimonial Card */}
        <div className="flex-1 flex items-center justify-center relative mt-12 md:mt-0">
          <div className="relative w-[380px] h-[260px] md:w-[480px] md:h-[320px] rounded-2xl shadow-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
            {/* Stats Cards */}
            <div className="absolute top-4 right-4 bg-white rounded-xl px-6 py-3 shadow-lg text-center">
              <div className="text-2xl font-bold text-green-600">3000+</div>
              <div className="text-xs text-gray-500">Students Placed</div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-6 py-3 shadow-lg text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-gray-500">Visa Success Rate</div>
            </div>
            {/* Video Player */}
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
              <video
                className="rounded-lg shadow-lg w-full h-full object-cover bg-black"
                controls
                poster="/success-video-placeholder.png"
                aria-label="Student Success Story Video"
              >
                Sorry, your browser does not support embedded videos.
              </video>
              <div className="text-white font-semibold text-lg text-center mt-4">Student Success Stories</div>
              <div className="text-white text-xs text-center opacity-90">Watch how we help students achieve their dreams</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Alpine Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Alpine?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Alpine Education & Visa Services is your trusted partner for international education. 
              We provide expert counseling, visa guidance, and complete support throughout your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Years of Experience</div>
              <p className="text-gray-600">Decades of expertise in study abroad guidance</p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-4xl font-bold text-green-600 mb-2">3000+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Students Placed Globally</div>
              <p className="text-gray-600">Successfully guided students worldwide</p>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">12+</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Destinations Supported</div>
              <p className="text-gray-600">Countries across the globe</p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-4xl font-bold text-yellow-600 mb-2">5★</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Google Ratings</div>
              <p className="text-gray-600">Trusted by thousands of students</p>
            </div>
            
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Visa Assistance</div>
              <p className="text-gray-600">Complete visa support</p>
            </div>
            
            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">Support Available</div>
              <p className="text-gray-600">Round-the-clock guidance</p>
            </div>
          </div>
          
          {/* Alpine Benefits */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Personalized career counseling</h3>
                <p className="text-gray-600 text-sm">Tailored guidance for your career path</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Direct university tie-ups</h3>
                <p className="text-gray-600 text-sm">Partnerships with top institutions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Experienced advisors</h3>
                <p className="text-gray-600 text-sm">Expert counselors with years of experience</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">IELTS/PTE preparation in-house</h3>
                <p className="text-gray-600 text-sm">Test preparation under one roof</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Post-arrival support</h3>
                <p className="text-gray-600 text-sm">Continued assistance after arrival</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Scholarship guidance</h3>
                <p className="text-gray-600 text-sm">Help with scholarship applications</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive study abroad services to make your international education dream a reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Study Abroad Counseling</h3>
              <p className="text-gray-600">Personalized guidance for your study abroad journey</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Test Prep (IELTS, PTE, TOEFL)</h3>
              <p className="text-gray-600">Expert preparation for English proficiency tests</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visa Guidance & Documentation</h3>
              <p className="text-gray-600">Complete visa application support</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scholarships & Internships Support</h3>
              <p className="text-gray-600">Help with funding and work opportunities</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Post-Study Work Consultation</h3>
              <p className="text-gray-600">Guidance for post-graduation opportunities</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">University Application Support</h3>
              <p className="text-gray-600">Complete application process assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Country Grid */}
      <CountryGrid />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Mock Test Section */}
      <MockTestSection />

      {/* CTA Section */}
      <CTASection />

      {/* Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Unsure where to start? Let Alpine guide your journey.
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our expert counselors are here to help you choose the perfect destination and university for your study abroad dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Book Free Consultation
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 