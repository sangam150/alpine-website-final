'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Award,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';

const testClasses = [
  {
    name: 'IELTS',
    fullName: 'International English Language Testing System',
    description: 'Comprehensive preparation for academic and general training modules',
    duration: '8-12 weeks',
    schedule: 'Monday, Wednesday, Friday',
    time: '6:00 PM - 8:00 PM',
    instructor: 'Sunita',
    instructorExp: '5+ years',
    price: 'NPR 25,000',
    features: [
      'All four modules covered',
      'Practice tests included',
      'Speaking practice with native speakers',
      'Writing feedback',
      'Mock tests every week'
    ],
    image: '/og-image.jpg'
  },
  {
    name: 'PTE',
    fullName: 'Pearson Test of English',
    description: 'Computer-based test preparation with real-time scoring',
    duration: '6-10 weeks',
    schedule: 'Tuesday, Thursday, Saturday',
    time: '5:00 PM - 7:00 PM',
    instructor: 'Aakanksha Poudel',
    instructorExp: '4+ years',
    price: 'NPR 22,000',
    features: [
      'Computer-based practice',
      'Real-time scoring simulation',
      'Speaking and writing modules',
      'Reading and listening practice',
      'Weekly progress tracking'
    ],
    image: '/og-image.jpg'
  },
  {
    name: 'TOEFL',
    fullName: 'Test of English as a Foreign Language',
    description: 'Preparation for internet-based TOEFL iBT test',
    duration: '8-12 weeks',
    schedule: 'Monday, Wednesday, Friday',
    time: '7:00 PM - 9:00 PM',
    instructor: 'Ragav Upreti',
    instructorExp: '6+ years',
    price: 'NPR 28,000',
    features: [
      'iBT format practice',
      'Integrated skills training',
      'Academic vocabulary',
      'Speaking and writing tasks',
      'Full-length practice tests'
    ],
    image: '/og-image.jpg'
  }
];

const instructors = [
  {
    name: 'Sunita',
    position: 'IELTS Instructor / Operations Incharge',
    experience: '5+ years',
    expertise: 'IELTS, Academic Writing, Speaking',
    image: '/og-image.jpg',
    email: 'sunita@alpineeducation.com',
    phone: '+977-1-4444444'
  },
  {
    name: 'Aakanksha Poudel',
    position: 'PTE Instructor / Document Officer',
    experience: '4+ years',
    expertise: 'PTE, Computer-based Tests, Speaking',
    image: '/og-image.jpg',
    email: 'aakanksha@alpineeducation.com',
    phone: '+977-1-4444444'
  },
  {
    name: 'Ragav Upreti',
    position: 'TOEFL Instructor / Director',
    experience: '6+ years',
    expertise: 'TOEFL iBT, Academic English, Test Strategies',
    image: '/og-image.jpg',
    email: 'ragav@alpineeducation.com',
    phone: '+977-1-4444444'
  }
];

const stats = [
  { icon: Users, value: '500+', label: 'Students Trained' },
  { icon: Star, value: '95%', label: 'Success Rate' },
  { icon: Award, value: '7.5+', label: 'Average IELTS Score' },
  { icon: CheckCircle, value: '100%', label: 'Satisfaction Rate' }
];

export default function TestPreparationClient() {
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
                Test Preparation
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Expert training for IELTS, PTE, and TOEFL with experienced instructors and proven success rates.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center"
                  >
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

      {/* Free Mock Test Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Free Mock Tests & Evaluation</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our free mock tests to assess your current level and get personalized feedback from our expert instructors. Perfect your skills before the actual exam.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IELTS Academic Card */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Free</span>
                <span className="text-gray-400 line-through text-sm">Rs. 2,000</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">IELTS Academic</h3>
              <p className="text-gray-600 mb-2">Comprehensive mock test simulating the actual IELTS Academic exam</p>
              <div className="flex items-center text-sm text-blue-600 mb-2"><Clock className="w-4 h-4 mr-1" /> Duration: 2 hours 45 minutes</div>
              <div className="mb-2">
                <span className="font-semibold">Test Sections:</span>
                <span className="ml-2 inline-flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Listening</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Reading</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Writing</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Speaking</span>
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">What's Included:</span>
                <ul className="mt-1 space-y-1 text-sm">
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Full-length test</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Detailed feedback</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Score prediction</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Expert review</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mt-4 mb-4">
                <div className="text-sm text-gray-700">Next Test Date:</div>
                <div className="text-lg font-bold text-blue-700">March 15, 2024</div>
                <div className="text-xs text-gray-500">15 spots left out of 20</div>
              </div>
              <Button asChild className="w-full bg-blue-600 text-white font-bold mt-auto">
                <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">Book Free Mock Test</a>
              </Button>
            </div>
            {/* PTE Academic Card */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">Free</span>
                <span className="text-gray-400 line-through text-sm">Rs. 1,800</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">PTE Academic</h3>
              <p className="text-gray-600 mb-2">Practice test for PTE Academic with real exam format</p>
              <div className="flex items-center text-sm text-blue-600 mb-2"><Clock className="w-4 h-4 mr-1" /> Duration: 3 hours</div>
              <div className="mb-2">
                <span className="font-semibold">Test Sections:</span>
                <span className="ml-2 inline-flex gap-2">
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Speaking & Writing</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Reading</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Listening</span>
                </span>
              </div>
              <div className="mb-2">
                <span className="font-semibold">What's Included:</span>
                <ul className="mt-1 space-y-1 text-sm">
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Computer-based test</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Instant results</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Performance analysis</li>
                  <li className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Tips & strategies</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mt-4 mb-4">
                <div className="text-sm text-gray-700">Next Test Date:</div>
                <div className="text-lg font-bold text-blue-700">March 18, 2024</div>
                <div className="text-xs text-gray-500">12 spots left out of 20</div>
              </div>
              <Button asChild className="w-full bg-blue-600 text-white font-bold mt-auto">
                <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">Book Free Mock Test</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* IELTS vs PTE Comparison Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">IELTS vs PTE: Which is Right for You?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare the key differences between IELTS and PTE to choose the best test for your study abroad journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IELTS Card */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-2 text-blue-700">IELTS Academic</h3>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li><span className="font-semibold">Format:</span> Paper-based or computer-based</li>
                <li><span className="font-semibold">Scoring:</span> 0-9 bands (0.5 increments)</li>
                <li><span className="font-semibold">Sections:</span> Listening, Reading, Writing, Speaking</li>
                <li><span className="font-semibold">Recognition:</span> Widely accepted in UK, Australia, Canada, NZ</li>
                <li><span className="font-semibold">Difficulty:</span> Speaking is face-to-face with examiner</li>
              </ul>
              <div className="mb-2 text-blue-600 font-semibold">Best for: Students comfortable with traditional exam formats and face-to-face speaking</div>
              <Button asChild className="w-full bg-blue-600 text-white font-bold mt-4">
                <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">Book IELTS Counseling</a>
              </Button>
            </div>
            {/* PTE Card */}
            <div className="bg-white rounded-2xl shadow p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-2 text-green-700">PTE Academic</h3>
              <ul className="space-y-2 text-gray-700 text-sm mb-4">
                <li><span className="font-semibold">Format:</span> Computer-based only</li>
                <li><span className="font-semibold">Scoring:</span> 10-90 points (1 point increments)</li>
                <li><span className="font-semibold">Sections:</span> Speaking & Writing, Reading, Listening</li>
                <li><span className="font-semibold">Recognition:</span> Accepted in Australia, UK, Canada, NZ, USA</li>
                <li><span className="font-semibold">Difficulty:</span> Fully computer-based, AI-scored</li>
              </ul>
              <div className="mb-2 text-green-600 font-semibold">Best for: Students comfortable with computers and prefer AI-based scoring</div>
              <Button asChild className="w-full bg-green-600 text-white font-bold mt-4">
                <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">Book PTE Counseling</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Test Classes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Available Test Classes</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from our comprehensive test preparation programs designed to help you achieve your target scores.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testClasses.map((testClass, index) => (
              <div key={testClass.name} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{testClass.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">{testClass.fullName}</p>
                        <p className="text-gray-700">{testClass.description}</p>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{testClass.duration}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Schedule:</span>
                          <span className="font-medium">{testClass.schedule}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{testClass.time}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Instructor:</span>
                          <span className="font-medium">{testClass.instructor}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium text-green-600">{testClass.price}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                        <ul className="space-y-2">
                          {testClass.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Link href="/contact">
                          Enroll Now
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

      {/* Instructors Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Instructors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from experienced instructors with proven track records in test preparation.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={instructor.name} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <img
                          src={instructor.image}
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/og-image.jpg";
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{instructor.name}</h3>
                      <p className="text-gray-600 mb-2">{instructor.position}</p>
                      <p className="text-sm text-gray-500 mb-4">{instructor.experience} experience</p>
                      <p className="text-sm text-gray-600 mb-4">{instructor.expertise}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{instructor.email}</span>
                        </div>
                        <div className="flex items-center justify-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-gray-600">{instructor.phone}</span>
                        </div>
                      </div>
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
              Ready to Start Your Test Preparation?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our classes and take the first step towards achieving your target scores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">
                  Enroll Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/resources/mock-tests">
                  Take Free Mock Test
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 