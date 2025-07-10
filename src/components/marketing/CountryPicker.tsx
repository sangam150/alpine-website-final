'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, DollarSign, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Country {
  id: string
  name: string
  flag: string
  description: string
  avgTuition: string
  duration: string
  students: string
  visaSuccess: string
  popularCourses: string[]
  pros: string[]
}

export default function CountryPicker() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  const countries: Country[] = [
    {
      id: 'australia',
      name: 'Australia',
      flag: '/flags/australia.svg',
      description: 'World-class education with work opportunities and beautiful landscapes',
      avgTuition: 'AUD 20,000-35,000',
      duration: '2-4 years',
      students: '2,500+',
      visaSuccess: '98%',
      popularCourses: ['Business', 'Engineering', 'IT', 'Healthcare'],
      pros: ['High quality education', 'Work opportunities', 'Beautiful country', 'Post-study work visa']
    },
    {
      id: 'canada',
      name: 'Canada',
      flag: '/flags/canada.svg',
      description: 'Affordable education in a multicultural and safe environment',
      avgTuition: 'CAD 15,000-30,000',
      duration: '2-4 years',
      students: '1,800+',
      visaSuccess: '95%',
      popularCourses: ['Computer Science', 'Business', 'Engineering', 'Arts'],
      pros: ['Affordable education', 'Immigration friendly', 'Safe country', 'Quality of life']
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '/flags/uk.svg',
      description: 'Prestigious universities with rich academic traditions',
      avgTuition: '£10,000-25,000',
      duration: '3-4 years',
      students: '1,200+',
      visaSuccess: '92%',
      popularCourses: ['Business', 'Law', 'Medicine', 'Arts'],
      pros: ['World-class universities', 'Rich history', 'Cultural diversity', 'Global recognition']
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '/flags/usa.svg',
      description: 'Access to top-ranked universities and diverse study options',
      avgTuition: 'USD 25,000-50,000',
      duration: '4 years',
      students: '800+',
      visaSuccess: '88%',
      popularCourses: ['Computer Science', 'Business', 'Engineering', 'Arts'],
      pros: ['Top universities', 'Innovation hub', 'Career opportunities', 'Diverse culture']
    },
    {
      id: 'germany',
      name: 'Germany',
      flag: '/flags/germany.svg',
      description: 'Low tuition fees with excellent education quality',
      avgTuition: '€0-1,500',
      duration: '3-4 years',
      students: '600+',
      visaSuccess: '94%',
      popularCourses: ['Engineering', 'Science', 'Business', 'Arts'],
      pros: ['Low tuition fees', 'Strong economy', 'Central location', 'Quality education']
    },
    {
      id: 'france',
      name: 'France',
      flag: '/flags/france.svg',
      description: 'Experience French culture and excellent higher education',
      avgTuition: '€170-380',
      duration: '3-4 years',
      students: '400+',
      visaSuccess: '90%',
      popularCourses: ['Business', 'Arts', 'Engineering', 'Science'],
      pros: ['Affordable education', 'Rich culture', 'Central Europe', 'Quality of life']
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
            Choose Your Study Destination
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore top study destinations and find the perfect country for your academic journey. 
            Each destination offers unique opportunities for Nepali students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <div
              key={country.id}
              className={`country-card bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                selectedCountry === country.id ? 'ring-2 ring-blue-600 scale-105' : ''
              }`}
              onClick={() => setSelectedCountry(country.id)}
            >
              {/* Flag and Header */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{country.name}</h3>
                  <p className="text-white text-sm opacity-90">{country.description}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Tuition</span>
                    </div>
                    <p className="text-xs text-gray-500">{country.avgTuition}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Duration</span>
                    </div>
                    <p className="text-xs text-gray-500">{country.duration}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Students</span>
                    </div>
                    <p className="text-xs text-gray-500">{country.students}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Visa Success</span>
                    </div>
                    <p className="text-xs text-green-600 font-semibold">{country.visaSuccess}</p>
                  </div>
                </div>

                {/* Popular Courses */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Popular Courses</h4>
                  <div className="flex flex-wrap gap-1">
                    {country.popularCourses.map((course, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-600 bg-opacity-10 text-blue-600 text-xs rounded"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pros */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Why Choose {country.name}</h4>
                  <ul className="space-y-1">
                    {country.pros.slice(0, 3).map((pro, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <span className="w-1 h-1 bg-green-600 rounded-full mr-2"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link href={`/countries/${country.id}`}>
                  <Button className="w-full btn-primary">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Countries CTA */}
        <div className="text-center mt-12">
          <Link href="/study-destinations">
            <Button variant="outline" size="lg" className="btn-primary">
              View All Countries
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
} 