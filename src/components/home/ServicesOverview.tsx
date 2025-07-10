'use client'

import { GraduationCap, FileText, BookOpen, Award, Users } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    title: 'University Application',
    desc: 'Expert guidance for top universities worldwide.',
    href: '/services',
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: 'Visa Application',
    desc: 'Smooth, high-success visa processing for students.',
    href: '/services',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-green-600" />,
    title: 'SOP Writing',
    desc: 'Personalized Statement of Purpose for your application.',
    href: '/services',
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    title: 'Test Preparation',
    desc: 'IELTS, TOEFL, PTE, and more with expert trainers.',
    href: '/test-preparation',
  },
  {
    icon: <Users className="h-8 w-8 text-pink-600" />,
    title: 'Student Counseling',
    desc: 'One-on-one counseling for your study abroad journey.',
    href: '/services',
  },
]

export default function ServicesOverview() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6">{service.icon}</div>
              <div className="text-xl font-semibold text-gray-900 mb-3">{service.title}</div>
              <div className="text-gray-600 mb-6 leading-relaxed">{service.desc}</div>
              <Link href={service.href} className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors">Learn More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 