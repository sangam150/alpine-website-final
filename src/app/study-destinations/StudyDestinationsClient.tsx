'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Globe, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  MapPin,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

const destinations = [
  {
    name: 'Australia',
    flag: '🇦🇺',
    slug: 'australia',
    description: 'World-class education with post-study work opportunities',
    universities: 43,
    avgTuition: 'AUD 30,000-45,000',
    visaSuccess: '95%',
    duration: '2-4 years',
    popularCourses: ['Computer Science', 'Engineering', 'Business', 'Healthcare'],
    pros: ['Post-study work visa', 'High quality of life', 'Multicultural society'],
    image: '/og-image.jpg'
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    slug: 'uk',
    description: 'Historic universities with global recognition',
    universities: 130,
    avgTuition: 'GBP 15,000-35,000',
    visaSuccess: '92%',
    duration: '3-4 years',
    popularCourses: ['Business Administration', 'Law', 'Arts', 'Engineering'],
    pros: ['World-renowned universities', 'Rich cultural heritage', 'Global networking'],
    image: '/og-image.jpg'
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    slug: 'canada',
    description: 'Excellent education with immigration opportunities',
    universities: 97,
    avgTuition: 'CAD 20,000-40,000',
    visaSuccess: '94%',
    duration: '2-4 years',
    popularCourses: ['Computer Science', 'Engineering', 'Healthcare', 'Business'],
    pros: ['Post-graduation work permit', 'Immigration pathways', 'Safe environment'],
    image: '/og-image.jpg'
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    slug: 'usa',
    description: 'Top-ranked universities with diverse opportunities',
    universities: '4000+',
    avgTuition: 'USD 25,000-60,000',
    visaSuccess: '88%',
    duration: '4 years',
    popularCourses: ['Computer Science', 'Business', 'Engineering', 'Arts'],
    pros: ['World-class universities', 'Innovation hubs', 'Career opportunities'],
    image: '/og-image.jpg'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    slug: 'germany',
    description: 'Affordable education with strong industry connections',
    universities: '400+',
    avgTuition: 'EUR 0-1,500',
    visaSuccess: '90%',
    duration: '3-4 years',
    popularCourses: ['Engineering', 'Computer Science', 'Business', 'Medicine'],
    pros: ['Low tuition fees', 'Strong economy', 'Industry partnerships'],
    image: '/og-image.jpg'
  },
  {
    name: 'Netherlands',
    flag: '🇳🇱',
    slug: 'netherlands',
    description: 'Innovative education in a progressive society',
    universities: 13,
    avgTuition: 'EUR 8,000-15,000',
    visaSuccess: '89%',
    duration: '3-4 years',
    popularCourses: ['Business', 'Engineering', 'Arts', 'Social Sciences'],
    pros: ['English-taught programs', 'Innovation focus', 'International environment'],
    image: '/og-image.jpg'
  }
];

const stats = [
  { icon: Globe, value: '12+', label: 'Countries' },
  { icon: GraduationCap, value: '500+', label: 'Universities' },
  { icon: Users, value: '3000+', label: 'Students Placed' },
  { icon: Star, value: '95%', label: 'Success Rate' }
];

export default function StudyDestinationsClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Study Destinations
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Explore top study destinations worldwide with expert guidance on universities, courses, and visa requirements.
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

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Popular Study Destinations</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our carefully selected destinations offering world-class education and excellent opportunities.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={destination.slug} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl">{destination.flag}</span>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{destination.name}</h3>
                            <p className="text-sm text-gray-600">{destination.description}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Universities:</span>
                          <span className="font-medium">{destination.universities}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Avg. Tuition:</span>
                          <span className="font-medium">{destination.avgTuition}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Visa Success:</span>
                          <span className="font-medium text-green-600">{destination.visaSuccess}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{destination.duration}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Popular Courses:</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.popularCourses.map((course, courseIndex) => (
                            <span key={courseIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {destination.pros.map((pro, proIndex) => (
                            <li key={proIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Link href={`/countries/${destination.slug}`}>
                          Learn More
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
              Ready to Choose Your Destination?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get expert guidance to help you select the perfect study destination for your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/quiz/country">
                  Take Destination Quiz
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 