'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';

const mockTests = [
  {
    name: 'IELTS Academic',
    description: 'Comprehensive mock test simulating the actual IELTS Academic exam',
    duration: '2 hours 45 minutes',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    price: 'Free',
    originalPrice: 'Rs. 2,000',
    features: ['Full-length test', 'Detailed feedback', 'Score prediction', 'Expert review'],
    nextTest: 'March 15, 2024',
    spots: 15,
    totalSpots: 20
  },
  {
    name: 'PTE Academic',
    description: 'Practice test for PTE Academic with real exam format',
    duration: '3 hours',
    sections: ['Speaking & Writing', 'Reading', 'Listening'],
    price: 'Free',
    originalPrice: 'Rs. 1,800',
    features: ['Computer-based test', 'Instant results', 'Performance analysis', 'Tips & strategies'],
    nextTest: 'March 18, 2024',
    spots: 12,
    totalSpots: 20
  }
];

const features = [
  {
    icon: Target,
    title: 'Score Improvement Guarantee',
    description: 'Improve your score by 0.5+ bands or get free retest'
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Experienced teachers with 8+ years of IELTS/PTE training'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: '95% of our students achieve their target scores'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Morning, afternoon, and evening batches available'
  }
];

export default function MockTestSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Free Mock Tests & Evaluation
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Take our free mock tests to assess your current level and get personalized 
              feedback from our expert instructors. Perfect your skills before the actual exam.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {mockTests.map((test) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {test.price}
                    </Badge>
                    <span className="text-sm text-gray-500 line-through">
                      {test.originalPrice}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {test.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {test.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Duration: {test.duration}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Test Sections:</h4>
                      <div className="flex flex-wrap gap-2">
                        {test.sections.map((section) => (
                          <Badge key={section} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">What&apos;s Included:</h4>
                      <div className="space-y-2">
                        {test.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Next Test Date:</span>
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-lg font-bold text-blue-600">{test.nextTest}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {test.spots} spots left out of {test.totalSpots}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      <Link href="/mock-tests">
                        Book Free Mock Test <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                      {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Ace Your English Test?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of successful students who achieved their target scores with our 
            proven test preparation methods. Start with a free mock test today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/mock-tests">
                Book Free Mock Test
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link href="/test-preparation">
                View All Courses
              </Link>
            </Button>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 