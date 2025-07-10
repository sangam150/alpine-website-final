'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Award, 
  Globe, 
  Users, 
  Star, 
  CheckCircle,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Sangam Karki',
    position: 'Director & Founder',
    bio: '10+ years of experience in international education with expertise in student visa applications and university partnerships.',
    image: '/og-image.jpg',
    email: 'sangam@alpineeducation.com',
    phone: '+977-1-4444444',
    linkedin: 'https://linkedin.com/in/sangam-karki'
  },
  {
    name: 'Ragav Upreti',
    position: 'Operations Director',
    bio: 'Specializes in UK and European education with strong connections to leading universities and institutions.',
    image: '/og-image.jpg',
    email: 'ragav@alpineeducation.com',
    phone: '+977-1-4444444',
    linkedin: 'https://linkedin.com/in/ragav-upreti'
  },
  {
    name: 'Sunita',
    position: 'IELTS Instructor & Operations',
    bio: 'Certified IELTS instructor with 5+ years of experience helping students achieve their target scores.',
    image: '/og-image.jpg',
    email: 'sunita@alpineeducation.com',
    phone: '+977-1-4444444',
    linkedin: 'https://linkedin.com/in/sunita-alpine'
  },
  {
    name: 'Aakanksha Poudel',
    position: 'Document Officer & PTE Instructor',
    bio: 'Expert in document preparation and PTE training with high success rates in student applications.',
    image: '/og-image.jpg',
    email: 'aakanksha@alpineeducation.com',
    phone: '+977-1-4444444',
    linkedin: 'https://linkedin.com/in/aakanksha-poudel'
  }
];

export default function AboutClient() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                About Alpine Education
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Your trusted partner in international education, helping Nepali students achieve their study abroad dreams since 2018.
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold">3000+</div>
                  <div className="text-blue-100 text-sm">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-blue-100 text-sm">Visa Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-blue-100 text-sm">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-blue-100 text-sm">Student Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="animate-fade-in-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To empower Nepali students with the knowledge, resources, and guidance needed to successfully pursue international education opportunities and build successful global careers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Provide expert counseling and personalized guidance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Ensure high visa success rates through proper preparation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Build lasting partnerships with global universities</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="animate-fade-in-right">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
                <p className="text-lg text-gray-600 mb-6">
                  To be the most trusted and respected study abroad consultancy in Nepal, known for our commitment to student success and excellence in international education services.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Expand to serve students across South Asia</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Develop innovative digital platforms for student support</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600">Maintain 100% student satisfaction rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our experienced professionals are dedicated to helping you achieve your study abroad dreams with personalized guidance and proven expertise.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={member.name} className="group">
                <div className="animate-fade-in hover:-translate-y-1 transition-transform duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/og-image.jpg";
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      
                      <div className="flex justify-center space-x-3">
                        <a 
                          href={`mailto:${member.email}`}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <a 
                          href={`tel:${member.phone}`}
                          className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                          aria-label={`Call ${member.name}`}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.linkedin}
                          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          aria-label={`LinkedIn profile of ${member.name}`}
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Alpine Education?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide comprehensive support throughout your study abroad journey with proven expertise and personalized care.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Expert Counseling',
                description: 'Personalized guidance from experienced education counselors who understand your goals and aspirations.'
              },
              {
                icon: Award,
                title: 'Proven Success',
                description: '95% visa success rate with thousands of students successfully placed in top universities worldwide.'
              },
              {
                icon: Globe,
                title: 'Global Network',
                description: 'Strong partnerships with universities across 12+ countries including Australia, UK, Canada, and more.'
              },
              {
                icon: Users,
                title: 'Comprehensive Support',
                description: 'End-to-end assistance from application to visa approval, including test preparation and document guidance.'
              },
              {
                icon: Star,
                title: 'Student-First Approach',
                description: 'Dedicated support team available throughout your journey with 24/7 assistance when needed.'
              },
              {
                icon: CheckCircle,
                title: 'Quality Assurance',
                description: 'ISO certified processes ensuring the highest standards of service and student satisfaction.'
              }
            ].map((feature, index) => (
              <div key={feature.title} className="text-center">
                <div className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of successful students who have achieved their international education dreams with Alpine Education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/contact">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Book Free Counselling
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/study-destinations">
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 