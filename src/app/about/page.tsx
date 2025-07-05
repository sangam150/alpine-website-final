import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Award, Globe, Heart, Target, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Alpine Education & Visa Services',
  description: 'Learn about Alpine Education & Visa Services - Nepal&apos;s leading study abroad consultancy. Our mission, team, and commitment to student success.',
};

const teamMembers = [
  {
    name: 'Rajesh Sharma',
    position: 'Founder & CEO',
    experience: '15+ years',
    expertise: 'Study Abroad Counseling, Visa Services',
    image: '/team/rajesh.jpg'
  },
  {
    name: 'Priya Patel',
    position: 'Head of Operations',
    experience: '12+ years',
    expertise: 'University Applications, Student Support',
    image: '/team/priya.jpg'
  },
  {
    name: 'Amit Kumar',
    position: 'Test Preparation Director',
    experience: '10+ years',
    expertise: 'IELTS, PTE, TOEFL Training',
    image: '/team/amit.jpg'
  },
  {
    name: 'Sita Thapa',
    position: 'Visa Specialist',
    experience: '8+ years',
    expertise: 'Student Visa Applications',
    image: '/team/sita.jpg'
  }
];

const achievements = [
  { number: '5000+', label: 'Students Placed' },
  { number: '95%', label: 'Visa Success Rate' },
  { number: '50+', label: 'Partner Universities' },
  { number: '15+', label: 'Years of Experience' }
];

const values = [
  {
    icon: Heart,
    title: 'Student-Centric Approach',
    description: 'Every decision we make is focused on student success and well-being.'
  },
  {
    icon: Target,
    title: 'Excellence in Service',
    description: 'We maintain the highest standards in all our services and interactions.'
  },
  {
    icon: Globe,
    title: 'Global Perspective',
    description: 'We understand international education systems and cultural nuances.'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Our track record speaks for itself with thousands of successful placements.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Alpine Education & Visa Services
          </h1>
          <p className="text-lg text-gray-600">
            Nepal&apos;s leading study abroad consultancy, helping students achieve their international education dreams since 2009.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Your Gateway to Global Education</h2>
              <p className="text-blue-100 mb-6">
                For over 15 years, Alpine Education has been the trusted partner for thousands of Nepalese students 
                seeking to study abroad. We provide comprehensive guidance from initial counseling to visa approval, 
                ensuring your journey to international education is smooth and successful.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Free Counseling</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Visa Assistance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Test Preparation</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Why Choose Alpine?</h3>
                <p className="text-blue-100">Experience, expertise, and proven results</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.number}</div>
                  <div className="text-gray-600">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To empower Nepalese students with the knowledge, skills, and opportunities to pursue quality 
                  international education, enabling them to build successful careers and contribute to global society.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To be the most trusted and comprehensive study abroad consultancy in Nepal, recognized for 
                  excellence in student counseling, visa services, and educational partnerships worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Expert Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-1">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.experience} experience</p>
                  <p className="text-gray-500 text-xs">{member.expertise}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Services Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Study Abroad Counseling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Free counseling sessions to help you choose the right country, university, and course.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Test Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Expert training for IELTS, PTE, and TOEFL with guaranteed score improvement.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Visa Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Complete visa application support with 95% success rate across all countries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-green-100 mb-6">
            Join thousands of successful students who achieved their study abroad dreams with Alpine Education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/quiz">Take Assessment Quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 