import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  DollarSign, 
  MapPin, 
  Users, 
  Globe, 
  BookOpen,
  Calendar,
  Award,
  Building,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study in Australia - Top Universities, Courses & Visa Guide | Alpine Education',
  description: 'Study in Australia with Alpine Education. Explore top universities like Melbourne, Sydney, ANU. Expert guidance for student visa, courses, costs, and application process. 95% success rate.',
  keywords: 'study in Australia, Australian universities, student visa Australia, study abroad Australia, Melbourne University, Sydney University, ANU, Australia education consultants Nepal',
  openGraph: {
    title: 'Study in Australia - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in Australia with Alpine Education. Explore top universities like Melbourne, Sydney, ANU. Expert guidance for student visa, courses, costs, and application process.',
    url: 'https://alpinevisa.com.np/countries/australia',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in Australia - Top Universities and Courses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Australia - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in Australia with Alpine Education. Explore top universities like Melbourne, Sydney, ANU. Expert guidance for student visa, courses, costs, and application process.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/countries/australia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const universities = [
  {
    name: 'University of Melbourne',
    ranking: 'World #14',
    location: 'Melbourne, Victoria',
    acceptanceRate: '70%',
    popularCourses: ['Business', 'Engineering', 'Medicine', 'Arts'],
    tuition: 'AUD 35,000-45,000/year'
  },
  {
    name: 'Australian National University',
    ranking: 'World #34',
    location: 'Canberra, ACT',
    acceptanceRate: '75%',
    popularCourses: ['Science', 'Politics', 'Economics', 'Law'],
    tuition: 'AUD 30,000-40,000/year'
  },
  {
    name: 'University of Sydney',
    ranking: 'World #19',
    location: 'Sydney, New South Wales',
    acceptanceRate: '65%',
    popularCourses: ['Medicine', 'Law', 'Engineering', 'Arts'],
    tuition: 'AUD 35,000-50,000/year'
  },
  {
    name: 'University of Queensland',
    ranking: 'World #50',
    location: 'Brisbane, Queensland',
    acceptanceRate: '80%',
    popularCourses: ['Agriculture', 'Medicine', 'Engineering', 'Business'],
    tuition: 'AUD 30,000-42,000/year'
  },
  {
    name: 'Monash University',
    ranking: 'World #57',
    location: 'Melbourne, Victoria',
    acceptanceRate: '75%',
    popularCourses: ['Pharmacy', 'Engineering', 'Business', 'Arts'],
    tuition: 'AUD 32,000-45,000/year'
  },
  {
    name: 'University of New South Wales',
    ranking: 'World #19',
    location: 'Sydney, New South Wales',
    acceptanceRate: '70%',
    popularCourses: ['Engineering', 'Business', 'Medicine', 'Science'],
    tuition: 'AUD 35,000-48,000/year'
  }
];

const popularCourses = [
  {
    name: 'Business Administration',
    duration: '3-4 years',
    cost: 'AUD 30,000-45,000/year',
    career: 'Management, Consulting, Entrepreneurship'
  },
  {
    name: 'Engineering',
    duration: '4 years',
    cost: 'AUD 35,000-50,000/year',
    career: 'Civil, Mechanical, Electrical Engineering'
  },
  {
    name: 'Computer Science',
    duration: '3-4 years',
    cost: 'AUD 32,000-45,000/year',
    career: 'Software Development, Data Science, AI'
  },
  {
    name: 'Medicine',
    duration: '6 years',
    cost: 'AUD 60,000-80,000/year',
    career: 'Medical Practice, Research, Healthcare'
  },
  {
    name: 'Accounting',
    duration: '3 years',
    cost: 'AUD 28,000-40,000/year',
    career: 'Accounting, Finance, Auditing'
  },
  {
    name: 'Nursing',
    duration: '3 years',
    cost: 'AUD 25,000-35,000/year',
    career: 'Nursing, Healthcare, Public Health'
  }
];

const visaRequirements = [
  'Confirmation of Enrollment (CoE) from registered institution',
  'Proof of financial capacity (AUD 24,505 per year)',
  'English proficiency (IELTS 6.0 or equivalent)',
  'Health insurance (OSHC)',
  'Genuine Temporary Entrant (GTE) statement',
  'Academic qualifications and transcripts',
  'Medical examination',
  'Police certificate'
];

const livingCosts = [
  { category: 'Accommodation', cost: 'AUD 800-1,500/month', details: 'On-campus or off-campus housing' },
  { category: 'Food', cost: 'AUD 300-500/month', details: 'Groceries and dining out' },
  { category: 'Transportation', cost: 'AUD 100-200/month', details: 'Public transport and occasional rides' },
  { category: 'Utilities', cost: 'AUD 150-250/month', details: 'Electricity, water, internet' },
  { category: 'Entertainment', cost: 'AUD 200-400/month', details: 'Movies, sports, social activities' },
  { category: 'Books & Supplies', cost: 'AUD 500-1,000/year', details: 'Textbooks and study materials' }
];

export default function AustraliaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src="/flags/australia.svg"
                    alt="Australia Flag"
                    width={40}
                    height={30}
                    className="mr-3"
                  />
                  <Badge variant="secondary" className="text-sm">Top Study Destination</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Study in Australia
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Experience world-class education in one of the most beautiful and diverse countries. 
                  Australia offers excellent academic opportunities, vibrant cities, and a high quality of life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Download Guide
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Australia?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>World-class universities and research facilities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Post-study work opportunities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Multicultural society and safe environment</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Beautiful landscapes and outdoor lifestyle</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">43</h3>
              <p className="text-gray-600">Universities</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500K+</h3>
              <p className="text-gray-600">International Students</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Top 20</h3>
              <p className="text-gray-600">Global Rankings</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">190+</h3>
              <p className="text-gray-600">Countries Represented</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Universities in Australia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Australia is home to some of the world's most prestigious universities, 
              offering cutting-edge research and excellent teaching standards.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((university, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary">{university.ranking}</Badge>
                    <Badge variant="outline">{university.acceptanceRate}</Badge>
                  </div>
                  <CardTitle className="text-lg">{university.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {university.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Popular Courses:</p>
                      <p className="text-sm text-gray-600">{university.popularCourses.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Tuition Fee:</p>
                      <p className="text-sm text-gray-600">{university.tuition}</p>
                    </div>
                    <Button className="w-full mt-4">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Courses in Australia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of courses designed to prepare you for global careers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual Cost:</span>
                      <span className="text-sm font-medium">{course.cost}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Career Paths:</span>
                      <p className="text-sm text-gray-600 mt-1">{course.career}</p>
                    </div>
                    <Button className="w-full mt-4">
                      Explore Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Student Visa Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the visa requirements is crucial for your study abroad journey
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Required Documents</h3>
                <ul className="space-y-3">
                  {visaRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Visa Information</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">Application Fee</h4>
                    <p className="text-blue-700">AUD 710</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Processing Time</h4>
                    <p className="text-green-700">2-8 weeks</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Work Permission</h4>
                    <p className="text-purple-700">40 hours per fortnight</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Living Costs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cost of Living in Australia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your budget with our comprehensive cost breakdown
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {livingCosts.map((cost, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cost.category}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">{cost.cost}</p>
                  <p className="text-sm text-gray-600">{cost.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these steps to start your study abroad journey in Australia
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose Your Course & University</h3>
                    <p className="text-gray-600">Research and select the right course and university that matches your career goals and budget.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prepare Documents</h3>
                    <p className="text-gray-600">Gather all required documents including academic transcripts, English test results, and financial statements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Apply to University</h3>
                    <p className="text-gray-600">Submit your application to the chosen university and wait for the offer letter.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Pay Tuition & Get CoE</h3>
                    <p className="text-gray-600">Pay the required tuition deposit and receive your Confirmation of Enrollment (CoE).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Apply for Student Visa</h3>
                    <p className="text-gray-600">Submit your student visa application with all required documents and pay the visa fee.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Travel & Arrive</h3>
                    <p className="text-gray-600">Book your flights, arrange accommodation, and prepare for your new academic journey in Australia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Study in Australia?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let Alpine Education guide you through your study abroad journey in Australia
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 