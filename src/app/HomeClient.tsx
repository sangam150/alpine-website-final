'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Globe, 
  ArrowRight, 
  Play, 
  Award, 
  Clock
} from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import ServicesOverview from '@/components/home/ServicesOverview';
import CountryGrid from '@/components/home/CountryGrid';
import TestimonialsSlider from '@/components/home/TestimonialsSlider';
import MockTestSection from '@/components/home/MockTestSection';
import CTASection from '@/components/home/CTASection';

export default function HomeClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Country Grid */}
      <CountryGrid />

      {/* Why Choose Alpine */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Alpine Education?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We&apos;ve helped thousands of students achieve their study abroad dreams with 
              personalized guidance and proven success rates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Expert Counselors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Certified education consultants with years of experience
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Proven Track Record</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  High success rate with thousands of successful placements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Global Network</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Partnerships with universities worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Round-the-clock assistance for students
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Mock Test Section */}
      <MockTestSection />

      {/* CTA Section */}
      <CTASection />

      {/* Latest Updates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Updates & News
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed about the latest changes in study abroad policies, 
              visa requirements, and university updates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-t-lg flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Visa Updates</Badge>
                <CardTitle className="text-lg">New Student Visa Requirements for Australia 2024</CardTitle>
                <CardDescription>
                  Updated requirements and documentation needed for Australian student visas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Contact Us for Updates <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-green-600 rounded-t-lg flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">University News</Badge>
                <CardTitle className="text-lg">Top UK Universities Accepting Applications</CardTitle>
                <CardDescription>
                  Latest information on UK university applications and deadlines.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/countries/uk" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore UK Study <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video bg-gradient-to-br from-purple-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">Test Preparation</Badge>
                <CardTitle className="text-lg">IELTS vs PTE: Which Test Should You Choose?</CardTitle>
                <CardDescription>
                  Comprehensive comparison to help you choose the right English test.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                  Get Test Prep Guidance <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Contact Us for Updates <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 