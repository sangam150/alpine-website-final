'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, GraduationCap, DollarSign, Briefcase } from 'lucide-react'

const countries = [
  {
    name: 'Australia',
    flag: '/flags/australia.svg',
    visaRate: '95%',
    tuitionCost: '$20K-35K',
    postStudyWork: '2-4 years',
    description: 'High-quality education with excellent post-study opportunities',
    href: '/countries/australia'
  },
  {
    name: 'United Kingdom',
    flag: '/flags/uk.svg',
    visaRate: '92%',
    tuitionCost: '£15K-25K',
    postStudyWork: '2 years',
    description: 'World-class universities with rich cultural experience',
    href: '/countries/uk'
  },
  {
    name: 'Canada',
    flag: '/flags/canada.svg',
    visaRate: '94%',
    tuitionCost: 'C$20K-30K',
    postStudyWork: '3 years',
    description: 'Welcoming environment with excellent quality of life',
    href: '/countries/canada'
  },
  {
    name: 'United States',
    flag: '/flags/usa.svg',
    visaRate: '88%',
    tuitionCost: '$25K-45K',
    postStudyWork: '1-3 years',
    description: 'Top-ranked universities with diverse opportunities',
    href: '/countries/usa'
  },
  {
    name: 'Germany',
    flag: '/flags/germany.svg',
    visaRate: '96%',
    tuitionCost: '€0-1.5K',
    postStudyWork: '18 months',
    description: 'Affordable education with strong job market',
    href: '/countries/germany'
  },
  {
    name: 'New Zealand',
    flag: '/flags/new-zealand.svg',
    visaRate: '93%',
    tuitionCost: 'NZ$25K-35K',
    postStudyWork: '3 years',
    description: 'Beautiful country with excellent lifestyle',
    href: '/countries/new-zealand'
  }
]

export default function CountryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Study Destinations
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our top destinations with high visa success rates and excellent opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map((country) => (
            <Card key={country.name} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg">
              <CardContent className="p-6">
                {/* Flag and Country Name */}
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src={country.flag} 
                    alt={`${country.name} flag`} 
                    className="w-8 h-8 rounded-sm"
                  />
                  <h3 className="text-xl font-bold text-gray-900">{country.name}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{country.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{country.visaRate}</div>
                    <div className="text-xs text-gray-500">Visa Rate</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{country.tuitionCost}</div>
                    <div className="text-xs text-gray-500">Tuition</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{country.postStudyWork}</div>
                    <div className="text-xs text-gray-500">Work Visa</div>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href={country.href}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors group-hover:shadow-md"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Countries CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/countries"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Countries
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
} 