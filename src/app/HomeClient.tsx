"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Globe, Users, Star, MessageCircle, PlayCircle, BookOpen, CalendarDays, FileText, Phone } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import ServicesOverview from '@/components/home/ServicesOverview';
import CountryGrid from '@/components/home/CountryGrid';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import MockTestSection from '@/components/home/MockTestSection';
import CTASection from '@/components/home/CTASection';

export default function HomeClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section with TypeAnimation */}
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
            Your Gateway to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 ml-2">
              <TypeAnimation
                sequence={[
                  'Australia',
                  2000,
                  'United Kingdom',
                  2000,
                  'Canada',
                  2000,
                  'Germany',
                  2000,
                  'United States',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl">
            Join 3000+ successful students who achieved their study abroad dreams. 
            Get expert guidance, visa assistance, and personalized support for your international education journey.
          </p>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-lg">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 95% Success Rate
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> Free Counseling
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 3000+ Students
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle className="w-5 h-5" /> 12+ Countries
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg shadow-lg">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Book Free Counselling
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
              <span className="inline-flex items-center gap-2">
                <Users className="w-5 h-5" /> Apply Now
              </span>
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="flex gap-6 mt-2 text-gray-500 text-sm items-center">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-400" /> 3000+ Students Placed
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-blue-400" /> 12+ Countries
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-400" /> 95% Success Rate
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
            
            {/* Video Placeholder */}
            <div className="flex flex-col items-center justify-center w-full h-full p-8">
              <div className="relative mb-4">
                <div className="w-32 h-20 bg-black/20 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
              <div className="text-white font-semibold text-lg text-center">Student Success Stories</div>
              <div className="text-white text-xs text-center opacity-90">Watch how we help students achieve their dreams</div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-purple-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 bg-blue-200 rounded-full opacity-40"></div>
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-pink-200 rounded-full opacity-60"></div>
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Country Grid */}
      <CountryGrid />

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Mock Test Section */}
      <MockTestSection />

      {/* CTA Section */}
      <CTASection />

      {/* Latest Updates & News */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Updates & News
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest changes in study abroad policies, visa requirements, and university updates.
            </p>
          </div>
          
          {/* News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Visa</span>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="w-fit mb-2">Visa Updates</Badge>
                <div className="font-semibold text-lg mb-1">New Student Visa Requirements for Australia 2024</div>
                <div className="text-gray-600 mb-4 text-sm">Updated requirements and documentation needed for Australian student visas.</div>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Us for Updates
                </Link>
              </div>
            </div>
            
            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-green-600 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">UK</span>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="w-fit mb-2">University News</Badge>
                <div className="font-semibold text-lg mb-1">Top UK Universities Accepting Applications</div>
                <div className="text-gray-600 mb-4 text-sm">Latest information on UK university applications and deadlines.</div>
                <Link href="/countries/uk" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore UK Study
                </Link>
              </div>
            </div>
            
            <div className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg bg-white">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <span className="text-white text-2xl font-bold">IELTS</span>
              </div>
              <div className="p-6">
                <Badge variant="secondary" className="w-fit mb-2">Test Preparation</Badge>
                <div className="font-semibold text-lg mb-1">IELTS vs PTE: Which Test Should You Choose?</div>
                <div className="text-gray-600 mb-4 text-sm">Comprehensive comparison to help you choose the right English test.</div>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Get Test Prep Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 