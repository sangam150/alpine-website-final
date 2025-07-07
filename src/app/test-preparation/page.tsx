import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Test Preparation - Alpine Education | IELTS, PTE, TOEFL Training',
  description: 'Expert test preparation for IELTS, PTE, and TOEFL with experienced instructors. Join our classes and take free mock tests to improve your scores.',
  keywords: 'IELTS preparation, PTE training, TOEFL classes, test preparation Nepal, English test coaching',
  openGraph: {
    title: 'Test Preparation - Alpine Education',
    description: 'Expert test preparation for IELTS, PTE, and TOEFL with experienced instructors.',
    type: 'website',
  },
};

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

export default function TestPreparationPage() {
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
                    <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
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
                          {testClass.features.map((feature) => (
                            <li key={feature} className="flex items-start text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
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

      {/* Instructors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Expert Instructors</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from experienced instructors with proven track records in test preparation and student success.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={instructor.name} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={instructor.image} 
                          alt={instructor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/og-image.jpg";
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{instructor.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{instructor.position}</p>
                      <p className="text-gray-600 text-sm mb-3">{instructor.experience} experience</p>
                      <p className="text-gray-700 mb-4">{instructor.expertise}</p>
                      
                      <div className="flex justify-center space-x-3">
                        <a 
                          href={`mailto:${instructor.email}`}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          aria-label={`Email ${instructor.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a 
                          href={`tel:${instructor.phone}`}
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          aria-label={`Call ${instructor.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Test CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Take a Free Mock Test
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Assess your current level and get personalized feedback from our expert instructors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-green-600 hover:bg-gray-100">
                <Link href="/resources/mock-tests">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Free Mock Test
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-green-600">
                <Link href="/contact">
                  Book Consultation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our Classes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our Test Preparation?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive support to help you achieve your target scores with confidence.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Small Class Sizes',
                description: 'Personalized attention with maximum 8 students per class'
              },
              {
                icon: Award,
                title: 'Proven Results',
                description: '95% success rate with students achieving their target scores'
              },
              {
                icon: Clock,
                title: 'Flexible Schedule',
                description: 'Morning, afternoon, and evening classes to suit your schedule'
              },
              {
                icon: BookOpen,
                title: 'Comprehensive Materials',
                description: 'Latest study materials and practice tests included'
              },
              {
                icon: Star,
                title: 'Expert Instructors',
                description: 'Certified instructors with years of teaching experience'
              },
              {
                icon: CheckCircle,
                title: 'Progress Tracking',
                description: 'Regular assessments and detailed feedback on your progress'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 