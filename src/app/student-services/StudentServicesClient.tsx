'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  FileText, 
  Globe, 
  DollarSign, 
  Users, 
  Star,
  CheckCircle,
  Award,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Shield
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: BookOpen,
    title: 'Free Counseling',
    description: 'Personalized guidance to help you choose the right country, university, and course based on your goals and budget.',
    features: [
      'One-on-one consultation sessions',
      'University and course selection',
      'Country-specific guidance',
      'Budget planning assistance',
      'Timeline planning'
    ],
    price: 'Free',
    duration: '1-2 hours'
  },
  {
    icon: FileText,
    title: 'Application Support',
    description: 'Complete assistance with university applications, document preparation, and submission processes.',
    features: [
      'Document preparation and verification',
      'Application form assistance',
      'SOP and LOR guidance',
      'Application tracking',
      'Interview preparation'
    ],
    price: 'Included in package',
    duration: 'Ongoing support'
  },
  {
    icon: Globe,
    title: 'Visa Guidance',
    description: 'Expert visa application support with high success rates across all major study destinations.',
    features: [
      'Visa application preparation',
      'Document checklist',
      'Interview coaching',
      'Application tracking',
      'Pre-departure briefing'
    ],
    price: 'Varies by country',
    duration: '2-4 weeks'
  },
  {
    icon: DollarSign,
    title: 'Financial Guidance',
    description: 'Comprehensive financial planning including tuition, living costs, and scholarship opportunities.',
    features: [
      'Cost breakdown analysis',
      'Scholarship guidance',
      'Bank loan assistance',
      'Financial documentation',
      'Budget planning'
    ],
    price: 'Free consultation',
    duration: 'Ongoing support'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Initial Consultation',
    description: 'Free counseling session to understand your goals and requirements',
    icon: Users
  },
  {
    step: '02',
    title: 'University Selection',
    description: 'Research and shortlist universities based on your preferences',
    icon: Globe
  },
  {
    step: '03',
    title: 'Application Process',
    description: 'Complete application support with document preparation',
    icon: FileText
  },
  {
    step: '04',
    title: 'Visa Application',
    description: 'Expert guidance through the visa application process',
    icon: Shield
  },
  {
    step: '05',
    title: 'Pre-Departure',
    description: 'Final preparations and orientation for your study abroad journey',
    icon: CheckCircle
  }
];

const stats = [
  { icon: Users, value: '3000+', label: 'Students Placed' },
  { icon: Star, value: '95%', label: 'Visa Success Rate' },
  { icon: Globe, value: '12+', label: 'Countries' },
  { icon: Award, value: '4.9/5', label: 'Student Rating' }
];

export default function StudentServicesClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Student Services
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Comprehensive support throughout your study abroad journey with expert guidance and proven success rates.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-blue-100 text-sm">{stat.label}</div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide end-to-end support to ensure your study abroad journey is smooth and successful.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={service.title} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg mr-4">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{service.price}</span>
                            <span>•</span>
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Link href="/contact">
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A structured approach to ensure your study abroad journey is successful and stress-free.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.step} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 transform translate-x-4"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Book a free consultation and let our experts guide you through your study abroad journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">
                  Book Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/about">
                  Learn More About Us
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 