'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Users, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const services = [
  {
    icon: GraduationCap,
    title: 'Study Abroad Counseling',
    description: 'Personalized guidance for choosing the right country, university, and program based on your academic background and career goals.',
    features: ['Free Initial Consultation', 'University Selection', 'Application Guidance', 'Documentation Support'],
    href: '/study-abroad',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: BookOpen,
    title: 'Test Preparation',
    description: 'Comprehensive IELTS and PTE preparation courses with experienced instructors and proven strategies for success.',
    features: ['IELTS Preparation', 'PTE Preparation', 'Mock Tests', 'Score Improvement Guarantee'],
    href: '/test-preparation',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    gradient: 'from-green-500 to-green-600'
  },
  {
    icon: FileText,
    title: 'Visa Services',
    description: 'Expert visa application assistance with high success rates. We handle all documentation and submission processes.',
    features: ['Visa Application', 'Document Preparation', 'Interview Preparation', 'Follow-up Support'],
    href: '/visa-services',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    icon: Users,
    title: 'Free Counseling',
    description: 'No-cost initial consultation to understand your study abroad goals and provide personalized recommendations.',
    features: ['Free Assessment', 'Career Guidance', 'Budget Planning', 'Timeline Planning'],
    href: '/contact',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    gradient: 'from-orange-500 to-orange-600'
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive study abroad solutions designed to make your international education journey 
            smooth and successful. From initial counseling to visa approval, we&apos;re with you every step.
          </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      <Link href="/contact">
                        Get Free Consultation
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-blue-100 mb-6">
                Get a free consultation and personalized study abroad plan. Our experts will guide you 
                through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Link href="/contact">
                    Get Free Consultation
                  </Link>
                </Button>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Globe className="w-12 h-12 text-white" />
                <div>
                  <div className="text-2xl font-bold">12+ Countries</div>
                  <div className="text-blue-100">Study Destinations</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 