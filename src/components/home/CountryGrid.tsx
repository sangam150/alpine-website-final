'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, GraduationCap, DollarSign, Briefcase, Star } from 'lucide-react'
import Image from 'next/image'

const countries = [
  {
    name: 'Australia',
    flag: '/flags/australia.svg',
    visaRate: '95%',
    tuitionCost: '$20K-35K',
    postStudyWork: '2-4 years',
    description: 'High-quality education with excellent post-study opportunities',
    href: '/countries/australia',
    popularity: 5
  },
  {
    name: 'United Kingdom',
    flag: '/flags/uk.svg',
    visaRate: '92%',
    tuitionCost: '£15K-25K',
    postStudyWork: '2 years',
    description: 'World-class universities with rich cultural experience',
    href: '/countries/uk',
    popularity: 5
  },
  {
    name: 'Canada',
    flag: '/flags/canada.svg',
    visaRate: '94%',
    tuitionCost: 'C$20K-30K',
    postStudyWork: '3 years',
    description: 'Welcoming environment with excellent quality of life',
    href: '/countries/canada',
    popularity: 5
  },
  {
    name: 'New Zealand',
    flag: '/flags/new-zealand.svg',
    visaRate: '93%',
    tuitionCost: 'NZ$25K-35K',
    postStudyWork: '3 years',
    description: 'Beautiful country with excellent lifestyle',
    href: '/countries/new-zealand',
    popularity: 4
  },
  {
    name: 'Germany',
    flag: '/flags/germany.svg',
    visaRate: '96%',
    tuitionCost: '€0-1.5K',
    postStudyWork: '18 months',
    description: 'Affordable education with strong job market',
    href: '/countries/germany',
    popularity: 4
  },
  {
    name: 'France',
    flag: '/flags/france.svg',
    visaRate: '91%',
    tuitionCost: '€170-380',
    postStudyWork: '1 year',
    description: 'Cultural richness with affordable education',
    href: '/countries/france',
    popularity: 4
  },
  {
    name: 'United States',
    flag: '/flags/usa.svg',
    visaRate: '88%',
    tuitionCost: '$25K-45K',
    postStudyWork: '1-3 years',
    description: 'Top-ranked universities with diverse opportunities',
    href: '/countries/usa',
    popularity: 5
  },
  {
    name: 'UAE',
    flag: '/flags/uae.svg',
    visaRate: '89%',
    tuitionCost: '$15K-25K',
    postStudyWork: '2 years',
    description: 'Modern cities with growing opportunities',
    href: '/countries/uae',
    popularity: 3
  },
  {
    name: 'Spain',
    flag: '/flags/spain.svg',
    visaRate: '90%',
    tuitionCost: '€1K-3K',
    postStudyWork: '1 year',
    description: 'Vibrant culture with affordable living',
    href: '/countries/spain',
    popularity: 3
  },
  {
    name: 'Malta',
    flag: '/flags/malta.svg',
    visaRate: '94%',
    tuitionCost: '€8K-15K',
    postStudyWork: '1 year',
    description: 'English-speaking EU country with Mediterranean charm',
    href: '/countries/malta',
    popularity: 3
  },
  {
    name: 'Netherlands',
    flag: '/flags/netherlands.svg',
    visaRate: '93%',
    tuitionCost: '€2K-15K',
    postStudyWork: '1 year',
    description: 'Innovation hub with English-taught programs',
    href: '/countries/netherlands',
    popularity: 4
  },
  {
    name: 'Ireland',
    flag: '/flags/ireland.svg',
    visaRate: '92%',
    tuitionCost: '€10K-25K',
    postStudyWork: '2 years',
    description: 'English-speaking EU with tech opportunities',
    href: '/countries/ireland',
    popularity: 4
  }
]

export default function CountryGrid() {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular Study Destinations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Choose from our top destinations with high visa success rates and excellent opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {countries.map((country) => (
            <Card key={country.name} className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg bg-white">
              <CardContent className="p-4 sm:p-6">
                {/* Flag and Country Name */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Image 
                      src={country.flag} 
                      alt={`${country.name} flag`} 
                      width={32}
                      height={32}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm shadow-sm flex-shrink-0"
                    />
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">{country.name}</h3>
                  </div>
                  <div className="flex items-center">
                    {[...Array(country.popularity)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed line-clamp-2">{country.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="text-center p-2 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <GraduationCap className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                    </div>
                    <div className="text-xs font-semibold text-gray-900">{country.visaRate}</div>
                    <div className="text-xs text-gray-500">Visa Rate</div>
                  </div>
                  
                  <div className="text-center p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                    </div>
                    <div className="text-xs font-semibold text-gray-900">{country.tuitionCost}</div>
                    <div className="text-xs text-gray-500">Tuition</div>
                  </div>
                  
                  <div className="text-center p-2 bg-purple-50 rounded-lg">
                    <div className="flex items-center justify-center mb-1">
                      <Briefcase className="w-2 h-2 sm:w-3 sm:h-3 text-purple-600" />
                    </div>
                    <div className="text-xs font-semibold text-gray-900">{country.postStudyWork}</div>
                    <div className="text-xs text-gray-500">Work Visa</div>
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href={country.href}
                  className="inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-md text-sm sm:text-base"
                >
                  <span className="line-clamp-1">Explore {country.name}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Countries CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Link 
            href="/countries"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Explore All Countries
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
} 