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
  title: 'Study in USA - Top Universities, Courses & Visa Guide | Alpine Education',
  description: 'Study in USA with Alpine Education. Explore top universities like MIT, Stanford, Harvard. Expert guidance for student visa, courses, costs, and application process. 95% success rate.',
  keywords: 'study in USA, US universities, student visa USA, study abroad USA, MIT, Stanford, Harvard, USA education consultants Nepal',
  openGraph: {
    title: 'Study in USA - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in USA with Alpine Education. Explore top universities like MIT, Stanford, Harvard. Expert guidance for student visa, courses, costs, and application process.',
    url: 'https://alpinevisa.com.np/countries/usa',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Study in USA - Top Universities and Courses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in USA - Top Universities, Courses & Visa Guide | Alpine Education',
    description: 'Study in USA with Alpine Education. Explore top universities like MIT, Stanford, Harvard. Expert guidance for student visa, courses, costs, and application process.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/countries/usa',
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
    name: 'Massachusetts Institute of Technology',
    ranking: 'World #1',
    location: 'Cambridge, Massachusetts',
    acceptanceRate: '7%',
    popularCourses: ['Engineering', 'Computer Science', 'Business', 'Science'],
    tuition: '$55,000-75,000/year'
  },
  {
    name: 'Stanford University',
    ranking: 'World #3',
    location: 'Stanford, California',
    acceptanceRate: '4%',
    popularCourses: ['Computer Science', 'Engineering', 'Business', 'Medicine'],
    tuition: '$56,000-78,000/year'
  },
  {
    name: 'Harvard University',
    ranking: 'World #4',
    location: 'Cambridge, Massachusetts',
    acceptanceRate: '5%',
    popularCourses: ['Business', 'Law', 'Medicine', 'Arts'],
    tuition: '$54,000-76,000/year'
  },
  {
    name: 'University of California, Berkeley',
    ranking: 'World #10',
    location: 'Berkeley, California',
    acceptanceRate: '15%',
    popularCourses: ['Engineering', 'Computer Science', 'Business', 'Arts'],
    tuition: '$44,000-65,000/year'
  },
  {
    name: 'University of Michigan',
    ranking: 'World #23',
    location: 'Ann Arbor, Michigan',
    acceptanceRate: '23%',
    popularCourses: ['Engineering', 'Business', 'Medicine', 'Arts'],
    tuition: '$52,000-70,000/year'
  },
  {
    name: 'University of California, Los Angeles',
    ranking: 'World #15',
    location: 'Los Angeles, California',
    acceptanceRate: '12%',
    popularCourses: ['Engineering', 'Business', 'Medicine', 'Arts'],
    tuition: '$43,000-64,000/year'
  }
];

const popularCourses = [
  {
    name: 'Computer Science',
    duration: '4 years',
    cost: '$45,000-75,000/year',
    career: 'Software Development, Data Science, AI'
  },
  {
    name: 'Business Administration',
    duration: '4 years',
    cost: '$50,000-70,000/year',
    career: 'Management, Consulting, Finance'
  },
  {
    name: 'Engineering',
    duration: '4 years',
    cost: '$50,000-75,000/year',
    career: 'Civil, Mechanical, Electrical Engineering'
  },
  {
    name: 'Medicine',
    duration: '4 years (after undergrad)',
    cost: '$60,000-90,000/year',
    career: 'Medical Practice, Research, Healthcare'
  },
  {
    name: 'Data Science',
    duration: '4 years',
    cost: '$45,000-70,000/year',
    career: 'Data Analysis, Machine Learning, Analytics'
  },
  {
    name: 'Finance',
    duration: '4 years',
    cost: '$45,000-70,000/year',
    career: 'Investment Banking, Corporate Finance, Consulting'
  }
];

const visaRequirements = [
  'Form I-20 (Certificate of Eligibility) from SEVP-approved school',
  'Proof of financial support (sufficient funds for tuition and living expenses)',
  'English proficiency (TOEFL/IELTS scores)',
  'Academic qualifications and transcripts',
  'Valid passport with 6 months validity beyond stay',
  'SEVIS fee payment ($350)',
  'Visa application fee ($160)',
  'Interview at US Embassy/Consulate'
];

const livingCosts = [
  { category: 'Accommodation', cost: '$800-2,500/month', details: 'On-campus or off-campus housing' },
  { category: 'Food', cost: '$300-600/month', details: 'Groceries and dining out' },
  { category: 'Transportation', cost: '$100-300/month', details: 'Public transport and occasional rides' },
  { category: 'Utilities', cost: '$150-300/month', details: 'Electricity, water, internet' },
  { category: 'Entertainment', cost: '$200-500/month', details: 'Movies, sports, social activities' },
  { category: 'Books & Supplies', cost: '$1,000-2,000/year', details: 'Textbooks and study materials' }
];

export default function USAPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src="/flags/usa.svg"
                    alt="USA Flag"
                    width={40}
                    height={30}
                    className="mr-3"
                  />
                  <Badge variant="secondary" className="text-sm">Top Study Destination</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Study in USA
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Experience world-class education in the land of opportunity. 
                  The USA offers excellent academic opportunities, innovation hubs, and diverse career prospects.
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
                  <h3 className="text-xl font-semibold mb-4">Why Choose USA?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>World-leading universities and research institutions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Optional Practical Training (OPT) opportunities</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Innovation hubs and tech industry connections</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Diverse culture and global networking</span>
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
              <h3 className="text-2xl font-bold text-gray-900">4,000+</h3>
              <p className="text-gray-600">Universities</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">1M+</h3>
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
              <h3 className="text-2xl font-bold text-gray-900">200+</h3>
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
              Top Universities in USA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The USA is home to some of the world's most prestigious universities, 
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
              Popular Courses in USA
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
                F-1 Student Visa Requirements
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
                    <p className="text-blue-700">$160</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900">Processing Time</h4>
                    <p className="text-green-700">2-8 weeks</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900">Work Permission</h4>
                    <p className="text-purple-700">20 hours per week on-campus</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900">OPT Duration</h4>
                    <p className="text-orange-700">12 months (36 months for STEM)</p>
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
              Cost of Living in USA
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
              Follow these steps to start your study abroad journey in the USA
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
                    <p className="text-gray-600">Submit your application to the chosen university and wait for the acceptance letter.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Receive I-20</h3>
                    <p className="text-gray-600">Once accepted, the university will issue a Form I-20 (Certificate of Eligibility).</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Apply for F-1 Visa</h3>
                    <p className="text-gray-600">Submit your F-1 visa application, pay fees, and schedule an interview at the US Embassy.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    6
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Travel & Arrive</h3>
                    <p className="text-gray-600">Book your flights, arrange accommodation, and prepare for your new academic journey in the USA.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Study in USA?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Let Alpine Education guide you through your study abroad journey in the USA
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