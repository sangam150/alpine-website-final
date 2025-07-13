import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award,
  CheckCircle,
  Headphones,
  PenTool,
  MessageSquare,
  Book,
  Target,
  Monitor
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'TOEFL iBT Test Preparation - Expert Training & Practice Tests | Alpine Education',
  description: 'Prepare for TOEFL iBT with Alpine Education. Expert training, practice tests, and comprehensive study materials. Achieve your target score with our proven strategies.',
  keywords: 'TOEFL iBT preparation, TOEFL training, TOEFL practice tests, TOEFL coaching Nepal, Alpine Education',
  openGraph: {
    title: 'TOEFL iBT Test Preparation - Expert Training & Practice Tests',
    description: 'Prepare for TOEFL iBT with Alpine Education. Expert training, practice tests, and comprehensive study materials.',
    images: ['/og-image.jpg'],
  },
};

const testSections = [
  {
    name: 'Reading',
    duration: '54-72 minutes',
    tasks: '3-4 passages, 30-40 questions',
    skills: 'Reading comprehension, academic vocabulary',
    icon: Book
  },
  {
    name: 'Listening',
    duration: '41-57 minutes',
    tasks: '3-4 lectures, 2-3 conversations',
    skills: 'Listening comprehension, note-taking',
    icon: Headphones
  },
  {
    name: 'Speaking',
    duration: '17 minutes',
    tasks: '4 tasks (independent and integrated)',
    skills: 'Oral fluency, pronunciation, coherence',
    icon: MessageSquare
  },
  {
    name: 'Writing',
    duration: '50 minutes',
    tasks: '2 tasks (integrated and independent)',
    skills: 'Essay writing, academic writing',
    icon: PenTool
  }
];

const courseFeatures = [
  'Expert trainers with 100+ scores',
  'Computer-based test simulation',
  'Real TOEFL practice questions',
  'Small batch sizes (max 10 students)',
  'Flexible timing options',
  'Progress tracking and assessment',
  'One-on-one doubt clearing sessions',
  'Free practice materials and resources'
];

const scoreRanges = [
  { range: '110-120', level: 'Advanced', description: 'Excellent command of English for academic purposes' },
  { range: '100-109', level: 'High Intermediate', description: 'Good command with minor limitations' },
  { range: '90-99', level: 'Intermediate', description: 'Adequate command for most academic situations' },
  { range: '80-89', level: 'Low Intermediate', description: 'Limited but effective command' },
  { range: '70-79', level: 'Basic', description: 'Basic competence in familiar contexts' },
  { range: '0-69', level: 'Below Basic', description: 'Limited competence requiring additional preparation' }
];

const preparationTips = [
  {
    category: 'Reading',
    tips: [
      'Practice with academic texts from various disciplines',
      'Develop skimming and scanning techniques',
      'Learn to identify main ideas and supporting details',
      'Build academic vocabulary through extensive reading'
    ]
  },
  {
    category: 'Listening',
    tips: [
      'Practice with academic lectures and conversations',
      'Focus on note-taking skills and organization',
      'Learn to identify main ideas, details, and inferences',
      'Practice with different accents and speaking speeds'
    ]
  },
  {
    category: 'Speaking',
    tips: [
      'Practice speaking clearly and at a natural pace',
      'Learn to organize thoughts quickly (15-30 seconds)',
      'Focus on pronunciation, intonation, and fluency',
      'Practice both independent and integrated tasks'
    ]
  },
  {
    category: 'Writing',
    tips: [
      'Practice essay writing with time limits',
      'Learn to integrate reading and listening materials',
      'Focus on grammar accuracy and vocabulary range',
      'Practice both integrated and independent writing tasks'
    ]
  }
];

export default function TOEFLPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Internet-Based Test</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  TOEFL iBT Preparation
                </h1>
                <p className="text-xl mb-8 text-orange-100">
                  Prepare for the Test of English as a Foreign Language (TOEFL iBT) with expert guidance. 
                  Achieve your target score with our comprehensive training programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                    Enroll Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                    Free Mock Test
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Alpine for TOEFL?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Expert trainers with 100+ scores</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Computer-based test simulation</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Real TOEFL practice questions</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Accepted by 11,000+ institutions</span>
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
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">400+</h3>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">95+</h3>
              <p className="text-gray-600">Average Score</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">92%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4-8</h3>
              <p className="text-gray-600">Weeks Duration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              TOEFL iBT Test Sections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The TOEFL iBT test consists of four sections that assess your English language proficiency for academic purposes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">{section.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Duration:</p>
                        <p className="text-sm text-gray-600">{section.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tasks:</p>
                        <p className="text-sm text-gray-600">{section.tasks}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Skills Tested:</p>
                        <p className="text-sm text-gray-600">{section.skills}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our TOEFL Course Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training programs designed to help you achieve your target score
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {courseFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-700">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Score Ranges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              TOEFL iBT Score Ranges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the TOEFL scoring system and what each score range means
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {scoreRanges.map((score, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-orange-600">{score.range}</CardTitle>
                    <Badge variant="secondary">{score.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{score.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preparation Tips by Section
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips and strategies to help you excel in each TOEFL section
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {preparationTips.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Packages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              TOEFL Course Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that best fits your preparation needs and timeline
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic Package</CardTitle>
                <p className="text-3xl font-bold text-orange-600">Rs. 18,000</p>
                <p className="text-gray-600">4 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Group classes (max 10 students)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Study materials included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>3 mock tests</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Basic feedback</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-orange-500">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-2">Most Popular</Badge>
                <CardTitle className="text-2xl">Standard Package</CardTitle>
                <p className="text-3xl font-bold text-orange-600">Rs. 28,000</p>
                <p className="text-gray-600">6 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Group classes (max 8 students)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Comprehensive study materials</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>6 mock tests with detailed feedback</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>One-on-one doubt clearing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Progress tracking</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium Package</CardTitle>
                <p className="text-3xl font-bold text-orange-600">Rs. 45,000</p>
                <p className="text-gray-600">8 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Small group classes (max 6 students)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Premium study materials</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>10 mock tests with detailed analysis</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Personalized coaching</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Guaranteed score improvement</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Ace Your TOEFL?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join Alpine Education's TOEFL preparation program and achieve your target score
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Start Your Preparation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 