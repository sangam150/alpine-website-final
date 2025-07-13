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
      <section className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center z-10 w-full lg:w-auto">
          <Badge variant="outline" className="mb-4 sm:mb-6 bg-blue-50 text-blue-700 border-blue-200 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base">
            <span className="inline-flex items-center gap-1 sm:gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
              #1 Study Abroad Consultancy in Nepal
            </span>
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Empowering Nepali Students to Study Abroad
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6 text-sm sm:text-lg md:text-xl text-gray-700">
            <span>🌍 Australia</span>
            <span>🇬🇧 UK</span>
            <span>🇨🇦 Canada</span>
            <span>🇫🇷 France</span>
            <span>🇳🇿 New Zealand</span>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-xl">
            🎓 Start your global education journey with expert counseling and visa guidance.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8 w-full">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg w-full sm:w-auto">
              <span className="inline-flex items-center gap-2">
                🎯 Book Free Counseling
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-blue-50 w-full sm:w-auto">
              <span className="inline-flex items-center gap-2">
                🚀 Apply Now
              </span>
            </Button>
          </div>
          
          {/* Trust Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-lg">
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> 
              <span className="line-clamp-2">3,000+ Students Placed</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> 
              <span className="line-clamp-2">12+ Study Destinations</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> 
              <span className="line-clamp-2">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium text-sm sm:text-base">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" /> 
              <span className="line-clamp-2">100% Visa Assistance</span>
            </div>
          </div>
        </div>
        
        {/* Right: Video Testimonial Card */}
        <div className="flex-1 flex items-center justify-center relative mt-8 lg:mt-0 w-full lg:w-auto">
          <div className="relative w-full max-w-[380px] h-[260px] sm:w-[380px] sm:h-[260px] md:w-[480px] md:h-[320px] rounded-2xl shadow-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center overflow-hidden">
            {/* Stats Cards */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white rounded-xl px-3 sm:px-6 py-2 sm:py-3 shadow-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-green-600">3000+</div>
              <div className="text-xs text-gray-500">Students Placed</div>
            </div>
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white rounded-xl px-3 sm:px-6 py-2 sm:py-3 shadow-lg text-center">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">95%</div>
              <div className="text-xs text-gray-500">Visa Success Rate</div>
            </div>
            {/* Video Player */}
            <div className="flex flex-col items-center justify-center w-full h-full p-4 sm:p-8">
              <video
                className="rounded-lg shadow-lg w-full h-full object-cover bg-black"
                controls
                poster="/success-video-placeholder.png"
                aria-label="Student Success Story Video"
              >
                Sorry, your browser does not support embedded videos.
              </video>
              <div className="text-white font-semibold text-base sm:text-lg text-center mt-2 sm:mt-4">Student Success Stories</div>
              <div className="text-white text-xs text-center opacity-90">Watch how we help students achieve their dreams</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Alpine Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Alpine?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              Alpine Education & Visa Services is your trusted partner for international education. 
              We provide expert counseling, visa guidance, and complete support throughout your study abroad journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Years of Experience</div>
              <p className="text-sm sm:text-base text-gray-600">Decades of expertise in study abroad guidance</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-green-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-600 mb-2">3000+</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Students Placed Globally</div>
              <p className="text-sm sm:text-base text-gray-600">Successfully guided students worldwide</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-purple-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600 mb-2">12+</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Destinations Supported</div>
              <p className="text-sm sm:text-base text-gray-600">Countries across the globe</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-yellow-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-600 mb-2">5★</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Google Ratings</div>
              <p className="text-sm sm:text-base text-gray-600">Trusted by thousands of students</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-red-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2">100%</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Visa Assistance</div>
              <p className="text-sm sm:text-base text-gray-600">Complete visa support</p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-indigo-50 rounded-xl">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Support Available</div>
              <p className="text-sm sm:text-base text-gray-600">Round-the-clock guidance</p>
            </div>
          </div>
          
          {/* Alpine Benefits */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Personalized career counseling</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Tailored guidance for your career path</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Direct university tie-ups</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Partnerships with top institutions</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Experienced advisors</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Expert counselors with years of experience</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">IELTS/PTE preparation in-house</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Test preparation under one roof</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Post-arrival support</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Continued assistance after arrival</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Visa application assistance</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Complete visa support and guidance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Country Grid */}
      <CountryGrid />

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Mock Test Section */}
      <MockTestSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
} 