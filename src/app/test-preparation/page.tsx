import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Clock, Award, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Test Preparation - Alpine Education',
  description: 'Comprehensive IELTS, PTE, and TOEFL preparation courses with expert guidance and proven strategies.',
};

const testTypes = [
  {
    name: 'IELTS',
    description: 'International English Language Testing System - Most widely accepted English proficiency test.',
    features: ['Academic & General Training', '4 Skills Assessment', 'Computer & Paper-based', 'Results in 3-5 days'],
    href: '/test-preparation/ielts',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    name: 'PTE',
    description: 'Pearson Test of English - Computer-based test with fast results and high acceptance.',
    features: ['Computer-based only', 'Results in 2-5 days', 'AI scoring system', 'Wide acceptance'],
    href: '/test-preparation/pte',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language - Preferred by US universities and institutions.',
    features: ['Internet-based test', 'Academic focus', 'US university preference', 'Results in 6-10 days'],
    href: '/test-preparation/toefl',
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export default function TestPreparationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Test Preparation
          </h1>
          <p className="text-lg text-gray-600">
            Expert guidance for IELTS, PTE, and TOEFL preparation. Choose the right test for your study abroad goals.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ace Your English Test</h2>
              <p className="text-blue-100 mb-6">
                Our comprehensive test preparation programs are designed to help you achieve your target scores. 
                With experienced instructors, proven strategies, and personalized guidance, success is within reach.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Proven Strategies</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Flexible Schedule</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Score Guarantee</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Why Choose Alpine?</h3>
                <p className="text-blue-100">Expert instructors, proven methods, and guaranteed results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testTypes.map((test) => (
              <Card key={test.name} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${test.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                    <test.icon className={`w-8 h-8 ${test.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {test.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {test.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild className="w-full">
                    <Link href={test.href}>
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Test Preparation?</h2>
          <p className="text-green-100 mb-6">
            Get expert guidance and personalized study plans to achieve your target scores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/resources/mock-tests">Take Free Mock Test</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 