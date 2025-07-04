import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Users, Award, CheckCircle, BookOpen, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IELTS Test Preparation - Alpine Education',
  description: 'Prepare for IELTS with Alpine Education. Expert guidance, practice tests, and guaranteed score improvement.',
};

const courseFeatures = [
  'Comprehensive 4-skill training (Listening, Reading, Writing, Speaking)',
  'Expert instructors with 8+ years of IELTS experience',
  'Real exam practice with detailed feedback',
  'Score improvement guarantee (0.5+ bands)',
  'Flexible schedule (Morning, Afternoon, Evening batches)',
  'Free study materials and resources',
  'Mock tests with score prediction',
  'One-on-one speaking practice sessions'
];

const courseOptions = [
  {
    name: 'IELTS Academic',
    duration: '8 weeks',
    sessions: '48 sessions',
    price: 'Rs. 25,000',
    features: ['Full course material', 'Mock tests', 'Speaking practice', 'Score guarantee'],
    nextBatch: 'March 15, 2024'
  },
  {
    name: 'IELTS General',
    duration: '6 weeks',
    sessions: '36 sessions',
    price: 'Rs. 20,000',
    features: ['Full course material', 'Mock tests', 'Speaking practice', 'Score guarantee'],
    nextBatch: 'March 20, 2024'
  },
  {
    name: 'IELTS Intensive',
    duration: '4 weeks',
    sessions: '32 sessions',
    price: 'Rs. 18,000',
    features: ['Full course material', 'Mock tests', 'Speaking practice', 'Score guarantee'],
    nextBatch: 'March 25, 2024'
  }
];

const mockTests = [
  {
    name: 'IELTS Academic Mock Test',
    date: 'March 15, 2024',
    time: '9:00 AM - 12:00 PM',
    price: 'Free',
    spots: 15,
    totalSpots: 20
  },
  {
    name: 'IELTS General Mock Test',
    date: 'March 18, 2024',
    time: '2:00 PM - 5:00 PM',
    price: 'Free',
    spots: 12,
    totalSpots: 20
  }
];

export default function IELTSPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/test-preparation" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Test Preparation
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            IELTS Test Preparation
          </h1>
          <p className="text-lg text-gray-600">
            Achieve your target IELTS score with expert guidance and proven strategies.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Master IELTS with Confidence</h2>
              <p className="text-blue-100 mb-6">
                Join thousands of successful students who achieved their target scores with Alpine Education's proven IELTS preparation program.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>95% Success Rate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>500+ Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Score Guarantee</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Next Batch Starting</h3>
                <p className="text-2xl font-bold">March 15, 2024</p>
                <Button className="mt-4 bg-white text-blue-600 hover:bg-gray-100">
                  Book Your Spot
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Alpine Education for IELTS?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courseFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
                  <p className="text-gray-700">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courseOptions.map((course, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{course.name}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration} • {course.sessions}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{course.price}</div>
                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-600 mb-4">
                    Next batch: {course.nextBatch}
                  </div>
                  <Button className="w-full">Enroll Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mock Tests */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Free Mock Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTests.map((test, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{test.name}</span>
                    <Badge variant="secondary">{test.price}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{test.date} • {test.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{test.spots} spots left out of {test.totalSpots}</span>
                    </div>
                    <Button className="w-full">Book Mock Test</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your IELTS Journey?</h2>
          <p className="text-green-100 mb-6">
            Join our next batch and achieve your target score with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Book Free Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              Download Study Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 