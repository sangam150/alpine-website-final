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
  title: 'Study in Canada - Top Universities, Courses & Visa Guide | Alpine Education',
  description: 'Study in Canada with Alpine Education. Explore top universities like Toronto, UBC, McGill. Expert guidance for student visa, courses, costs, and application process. 95% success rate.',
  keywords: 'study in Canada, Canadian universities, student visa Canada, study abroad Canada, University of Toronto, UBC, McGill University, Canada education consultants Nepal',
  openGraph: {
    title: 'Study in Canada - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in Canada with Alpine Education. Explore top universities like Toronto, UBC, McGill. Expert guidance for student visa, courses, costs, and application process.',
    url: 'https://alpinevisa.com.np/countries/canada',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in Canada - Top Universities and Courses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Canada - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in Canada with Alpine Education. Explore top universities like Toronto, UBC, McGill. Expert guidance for student visa, courses, costs, and application process.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/countries/canada',
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
    name: 'University of Toronto',
    ranking: 'World #21',
    location: 'Toronto, Ontario',
    acceptanceRate: '43%',
    popularCourses: ['Medicine', 'Engineering', 'Business', 'Arts'],
    tuition: 'CAD 45,000-60,000/year'
  },
  {
    name: 'University of British Columbia',
    ranking: 'World #34',
    location: 'Vancouver, British Columbia',
    acceptanceRate: '52%',
    popularCourses: ['Forestry', 'Engineering', 'Medicine', 'Arts'],
    tuition: 'CAD 40,000-55,000/year'
  },
  {
    name: 'McGill University',
    ranking: 'World #30',
    location: 'Montreal, Quebec',
    acceptanceRate: '46%',
    popularCourses: ['Medicine', 'Law', 'Engineering', 'Arts'],
    tuition: 'CAD 35,000-50,000/year'
  },
  {
    name: 'University of Waterloo',
    ranking: 'World #149',
    location: 'Waterloo, Ontario',
    acceptanceRate: '53%',
    popularCourses: ['Computer Science', 'Engineering', 'Mathematics', 'Business'],
    tuition: 'CAD 40,000-55,000/year'
  },
  {
    name: 'University of Alberta',
    ranking: 'World #111',
    location: 'Edmonton, Alberta',
    acceptanceRate: '58%',
    popularCourses: ['Engineering', 'Medicine', 'Business', 'Science'],
    tuition: 'CAD 35,000-50,000/year'
  },
  {
    name: 'Queen\'s University',
    ranking: 'World #246',
    location: 'Kingston, Ontario',
    acceptanceRate: '42%',
    popularCourses: ['Business', 'Engineering', 'Medicine', 'Arts'],
    tuition: 'CAD 45,000-60,000/year'
  }
];

const popularCourses = [
  {
    name: 'Computer Science',
    duration: '4 years',
    cost: 'CAD 40,000-55,000/year',
    career: 'Software Development, Data Science, AI'
  },
  {
    name: 'Business Administration',
    duration: '4 years',
    cost: 'CAD 45,000-60,000/year',
    career: 'Management, Consulting, Entrepreneurship'
  },
  {
    name: 'Engineering',
    duration: '4 years',
    cost: 'CAD 45,000-60,000/year',
    career: 'Civil, Mechanical, Electrical Engineering'
  },
  {
    name: 'Medicine',
    duration: '4 years (after undergrad)',
    cost: 'CAD 60,000-80,000/year',
    career: 'Medical Practice, Research, Healthcare'
  },
  {
    name: 'Nursing',
    duration: '4 years',
    cost: 'CAD 35,000-50,000/year',
    career: 'Nursing, Healthcare, Public Health'
  },
  {
    name: 'Data Science',
    duration: '4 years',
    cost: 'CAD 40,000-55,000/year',
    career: 'Data Analysis, Machine Learning, Analytics'
  }
];

const visaRequirements = [
  'Letter of Acceptance from a Designated Learning Institution (DLI)',
  'Proof of financial support (CAD 20,635 + first year tuition)',
  'English/French proficiency (IELTS 6.0 or equivalent)',
  'Medical examination',
  'Police certificate',
  'Statement of purpose',
  'Passport valid for study period',
  'Biometrics (fingerprints and photo)'
];

const livingCosts = [
  { category: 'Accommodation', cost: 'CAD 800-1,500/month', details: 'On-campus or off-campus housing' },
  { category: 'Food', cost: 'CAD 300-500/month', details: 'Groceries and dining out' },
  { category: 'Transportation', cost: 'CAD 100-150/month', details: 'Public transport and occasional rides' },
  { category: 'Utilities', cost: 'CAD 150-250/month', details: 'Electricity, water, internet' },
  { category: 'Entertainment', cost: 'CAD 200-400/month', details: 'Movies, sports, social activities' },
  { category: 'Books & Supplies', cost: 'CAD 800-1,200/year', details: 'Textbooks and study materials' }
];

export default function CanadaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src="/flags/canada.svg"
                    alt="Canada Flag"
                    width={40}
                    height={30}
                    className="mr-3"
                  />
                  <Badge variant="secondary" className="text-sm">Top Study Destination</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Study in Canada
                </h1>
                <p className="text-xl mb-8 text-red-100">
                  Experience world-class education in one of the most welcoming and diverse countries. 
                  Canada offers excellent academic opportunities, high quality of life, and pathways to permanent residence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Apply Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                    Download Guide
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Canada?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>World-class universities and research facilities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Post-graduation work permit (PGWP) up to 3 years</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Pathways to permanent residence</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Safe, multicultural, and welcoming environment</span>
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
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">97</h3>
              <p className="text-gray-600">Universities</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">642K+</h3>
              <p className="text-gray-600">International Students</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Top 50</h3>
              <p className="text-gray-600">Global Rankings</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">184+</h3>
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
              Top Universities in Canada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Canada is home to some of the world's most prestigious universities, 
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
              Popular Courses in Canada
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
                Study Permit Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the study permit requirements is crucial for your study abroad journey
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
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Study Permit Information</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900">Application Fee</h4>
                    <p className="text-red-700">CAD 150</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Processing Time</h4>
                    <p className="text-green-700">2-8 weeks</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Work Permission</h4>
                    <p className="text-purple-700">20 hours per week</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900">PGWP Duration</h4>
                    <p className="text-blue-700">Up to 3 years</p>
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
              Cost of Living in Canada
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Plan your budget with our comprehensive cost breakdown
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {livingCosts.map((cost, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{cost.category}</h3>
                  <p className="text-2xl font-bold text-red-600 mb-2">{cost.cost}</p>
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
              Follow these steps to start your study abroad journey in Canada
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose Your Course & University</h3>
                    <p className="text-gray-600">Research and select the right course and university that matches your career goals and budget.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prepare Documents</h3>
                    <p className="text-gray-600">Gather all required documents including academic transcripts, English test results, and financial statements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Apply to University</h3>
                    <p className="text-gray-600">Submit your application to the chosen university and wait for the Letter of Acceptance.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Apply for Study Permit</h3>
                    <p className="text-gray-600">Submit your study permit application with all required documents and pay the application fee.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Biometrics & Medical</h3>
                    <p className="text-gray-600">Complete biometrics appointment and medical examination if required.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Travel & Arrive</h3>
                    <p className="text-gray-600">Book your flights, arrange accommodation, and prepare for your new academic journey in Canada.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Study in Canada?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Let Alpine Education guide you through your study abroad journey in Canada
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Start Your Application
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 