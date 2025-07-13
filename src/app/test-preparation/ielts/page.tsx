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
  Target
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'IELTS Test Preparation - Expert Training & Practice Tests | Alpine Education',
  description: 'Prepare for IELTS with Alpine Education. Expert training, practice tests, and comprehensive study materials. Achieve your target band score with our proven strategies.',
  keywords: 'IELTS preparation, IELTS training, IELTS practice tests, IELTS coaching Nepal, Alpine Education',
  openGraph: {
    title: 'IELTS Test Preparation - Expert Training & Practice Tests',
    description: 'Prepare for IELTS with Alpine Education. Expert training, practice tests, and comprehensive study materials.',
    images: ['/og-image.jpg'],
  },
};

const testModules = [
  {
    name: 'Listening',
    duration: '30 minutes',
    tasks: '4 sections, 40 questions',
    skills: 'Understanding conversations, lectures, and discussions',
    icon: Headphones
  },
  {
    name: 'Reading',
    duration: '60 minutes',
    tasks: '3 passages, 40 questions',
    skills: 'Reading comprehension, skimming, scanning',
    icon: Book
  },
  {
    name: 'Writing',
    duration: '60 minutes',
    tasks: '2 tasks (Academic/General)',
    skills: 'Essay writing, report writing, letter writing',
    icon: PenTool
  },
  {
    name: 'Speaking',
    duration: '11-14 minutes',
    tasks: '3 parts, face-to-face interview',
    skills: 'Fluency, pronunciation, vocabulary, grammar',
    icon: MessageSquare
  }
];

const courseFeatures = [
  'Expert trainers with 8+ band scores',
  'Comprehensive study materials',
  'Mock tests with detailed feedback',
  'Small batch sizes (max 15 students)',
  'Flexible timing options',
  'Progress tracking and assessment',
  'One-on-one doubt clearing sessions',
  'Free practice materials and resources'
];

const bandScores = [
  { band: '9.0', level: 'Expert User', description: 'Fully operational command of the language' },
  { band: '8.0-8.5', level: 'Very Good User', description: 'Fully operational command with occasional inaccuracies' },
  { band: '7.0-7.5', level: 'Good User', description: 'Operational command with occasional inaccuracies' },
  { band: '6.0-6.5', level: 'Competent User', description: 'Effective command despite some inaccuracies' },
  { band: '5.0-5.5', level: 'Modest User', description: 'Partial command, copes with overall meaning' },
  { band: '4.0-4.5', level: 'Limited User', description: 'Basic competence in familiar situations' }
];

const preparationTips = [
  {
    category: 'Listening',
    tips: [
      'Practice with different accents (British, American, Australian)',
      'Focus on key words and phrases',
      'Use prediction techniques before listening',
      'Practice note-taking skills'
    ]
  },
  {
    category: 'Reading',
    tips: [
      'Develop skimming and scanning techniques',
      'Practice time management (20 minutes per passage)',
      'Learn to identify question types quickly',
      'Build vocabulary through extensive reading'
    ]
  },
  {
    category: 'Writing',
    tips: [
      'Practice both Task 1 and Task 2 regularly',
      'Learn different essay structures and formats',
      'Focus on grammar accuracy and range',
      'Practice time management (20 min Task 1, 40 min Task 2)'
    ]
  },
  {
    category: 'Speaking',
    tips: [
      'Practice speaking with native speakers or partners',
      'Record yourself and analyze pronunciation',
      'Learn to use a range of vocabulary and grammar',
      'Practice answering common questions fluently'
    ]
  }
];

export default function IELTSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge variant="secondary" className="mb-4">Most Popular English Test</Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  IELTS Test Preparation
                </h1>
                <p className="text-xl mb-8 text-blue-100">
                  Prepare for the International English Language Testing System (IELTS) with expert guidance. 
                  Achieve your target band score with our comprehensive training programs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Enroll Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                    Free Mock Test
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Why Choose Alpine for IELTS?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Expert trainers with 8+ band scores</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Proven strategies and techniques</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Comprehensive study materials</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span>Regular mock tests and feedback</span>
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
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Students Trained</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">7.5+</h3>
              <p className="text-gray-600">Average Band Score</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4-8</h3>
              <p className="text-gray-600">Weeks Duration</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Modules */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              IELTS Test Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The IELTS test consists of four modules that assess your English language proficiency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testModules.map((module, index) => {
              const IconComponent = module.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow text-center">
                  <CardHeader>
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Duration:</p>
                        <p className="text-sm text-gray-600">{module.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Tasks:</p>
                        <p className="text-sm text-gray-600">{module.tasks}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Skills Tested:</p>
                        <p className="text-sm text-gray-600">{module.skills}</p>
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
              Our IELTS Course Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive training programs designed to help you achieve your target band score
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

      {/* Band Scores */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              IELTS Band Scores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the IELTS scoring system and what each band score means
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {bandScores.map((score, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-blue-600">{score.band}</CardTitle>
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
              Preparation Tips by Module
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips and strategies to help you excel in each IELTS module
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {preparationTips.map((module, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{module.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {module.tips.map((tip, tipIndex) => (
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
              IELTS Course Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that best fits your preparation needs and timeline
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basic Package</CardTitle>
                <p className="text-3xl font-bold text-blue-600">Rs. 15,000</p>
                <p className="text-gray-600">4 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Group classes (max 15 students)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Study materials included</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>2 mock tests</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Basic feedback</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-blue-500">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-2">Most Popular</Badge>
                <CardTitle className="text-2xl">Standard Package</CardTitle>
                <p className="text-3xl font-bold text-blue-600">Rs. 25,000</p>
                <p className="text-gray-600">6 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Group classes (max 12 students)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Comprehensive study materials</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>5 mock tests with detailed feedback</span>
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
                <p className="text-3xl font-bold text-blue-600">Rs. 40,000</p>
                <p className="text-gray-600">8 weeks</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span>Small group classes (max 8 students)</span>
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
                    <span>Guaranteed band score improvement</span>
                  </li>
                </ul>
                <Button className="w-full mt-6">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Ace Your IELTS?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join Alpine Education's IELTS preparation program and achieve your target band score
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Your Preparation
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