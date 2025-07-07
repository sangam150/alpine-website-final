'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, DollarSign, GraduationCap } from 'lucide-react';

const countries = [
  {
    name: 'Australia',
    flag: '🇦🇺',
    description: 'World-class education with post-study work opportunities',
    features: ['Top Universities', 'Work Rights', 'Quality Education'],
    tuition: '$20,000 - $45,000',
    popularity: 5,
    href: '/countries/australia',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    description: 'Prestigious universities with rich academic heritage',
    features: ['Russell Group', 'Global Recognition', 'Cultural Experience'],
    tuition: '£15,000 - £35,000',
    popularity: 5,
    href: '/countries/uk',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Canada',
    flag: '🇨🇦',
    description: 'High quality of life with excellent education standards',
    features: ['PR Pathway', 'Affordable Education', 'Safe Environment'],
    tuition: 'CAD 20,000 - 40,000',
    popularity: 5,
    href: '/countries/canada',
    color: 'from-red-500 to-red-600'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    description: 'Free education with strong engineering programs',
    features: ['Low Tuition', 'Engineering Focus', 'EU Access'],
    tuition: '€0 - €1,500',
    popularity: 4,
    href: '/countries/germany',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    name: 'France',
    flag: '🇫🇷',
    description: 'Cultural capital with prestigious institutions',
    features: ['Arts & Culture', 'Business Schools', 'EU Benefits'],
    tuition: '€170 - €380',
    popularity: 4,
    href: '/countries/france',
    color: 'from-blue-500 to-red-500'
  },
  {
    name: 'New Zealand',
    flag: '🇳🇿',
    description: 'Beautiful landscapes with quality education',
    features: ['Natural Beauty', 'Work Rights', 'Quality Life'],
    tuition: 'NZD 25,000 - 45,000',
    popularity: 4,
    href: '/countries/new-zealand',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Ireland',
    flag: '🇮🇪',
    description: 'Tech hub with English-speaking environment',
    features: ['Tech Industry', 'English Speaking', 'EU Access'],
    tuition: '€10,000 - 25,000',
    popularity: 4,
    href: '/countries/ireland',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Netherlands',
    flag: '🇳🇱',
    description: 'Innovative education with international focus',
    features: ['Innovation Hub', 'English Programs', 'EU Benefits'],
    tuition: '€8,000 - 20,000',
    popularity: 4,
    href: '/countries/netherlands',
    color: 'from-orange-500 to-orange-600'
  }
];

export default function CountryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Study Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore top study destinations around the world. Each country offers unique opportunities 
              for education, career growth, and personal development.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {countries.map((country, index) => (
            <div key={country.name} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{country.flag}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {country.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {country.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        {country.features.map((feature) => (
                          <div key={feature} className="text-xs text-gray-500">
                            • {feature}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-gray-700">
                            {country.tuition}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {country.popularity}/5
                          </span>
                        </div>
                      </div>

                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${country.color} hover:from-blue-700 hover:to-blue-800 text-white`}
                      >
                        <Link href={country.href}>
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View All Countries CTA */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Link href="/countries">
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
              <p className="text-gray-600">Partner Universities</p>
            </div>
          </motion.div>
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-2">$50M+</div>
            <p className="text-gray-600">Scholarships Secured</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <Star className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-2">4.8/5</div>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
} 