'use client'

import { GraduationCap, FileText, BookOpen, Award, Users, MessageCircle, Globe, Shield, Target } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: 'Free Counseling',
    desc: 'One-on-one expert guidance to choose the right country, university, and course for your career goals.',
    href: '/services',
    features: ['Personalized guidance', 'Career assessment', 'Free consultation']
  },
  {
    icon: <Globe className="h-8 w-8 text-green-600" />,
    title: 'University Matching',
    desc: 'Find the perfect university match based on your academic profile, budget, and career aspirations.',
    href: '/services',
    features: ['University selection', 'Course matching', 'Admission strategy']
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    title: 'Document Support',
    desc: 'Complete visa documentation assistance including SOP writing, LOR preparation, and application forms.',
    href: '/services',
    features: ['SOP writing', 'LOR preparation', 'Document review']
  },
  {
    icon: <Target className="h-8 w-8 text-orange-600" />,
    title: 'IELTS/PTE Prep',
    desc: 'Expert test preparation with mock tests, personalized coaching, and guaranteed score improvement.',
    href: '/test-preparation',
    features: ['Mock tests', 'Expert coaching', 'Score guarantee']
  },
]

export default function ServicesOverview() {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Trusted Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for your study abroad journey from initial counseling to visa approval
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-3">{service.title}</div>
              <div className="text-gray-600 mb-4 leading-relaxed text-sm">{service.desc}</div>
              
              {/* Features */}
              <div className="mb-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="text-xs text-gray-500 mb-1 flex items-center justify-center">
                    <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <Link 
                href={service.href} 
                className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
              >
                Learn More
                <MessageCircle className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            Trusted by 3000+ Students
          </div>
          <p className="text-gray-600">Get started with a free consultation today</p>
        </div>
      </div>
    </section>
  )
} 