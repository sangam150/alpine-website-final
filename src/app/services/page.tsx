import { GraduationCap, FileText, BookOpen, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services - Alpine Education & Visa Services',
  description: 'Explore our expert study abroad services for Nepali students: university application, visa assistance, SOP writing, test preparation, and personalized counseling.',
}

const services = [
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />, title: 'University Application', desc: 'Expert guidance for top universities worldwide.'
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />, title: 'Visa Assistance', desc: 'Smooth, high-success visa processing for students.'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-green-600" />, title: 'SOP Writing', desc: 'Personalized Statement of Purpose for your application.'
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />, title: 'Test Preparation', desc: 'IELTS, TOEFL, PTE, and more with expert trainers.'
  },
  {
    icon: <Users className="h-8 w-8 text-pink-600" />, title: 'Student Counseling', desc: 'One-on-one counseling for your study abroad journey.'
  },
]

export default function ServicesPage() {
  return (
    <section className="w-full py-16 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900">Our Services</h1>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We provide end-to-end support for Nepali students aspiring to study abroad. From university selection to visa approval, our experienced team is with you every step of the way.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <div className="text-xl font-semibold text-gray-900 mb-3">{service.title}</div>
              <div className="text-gray-600 mb-6 leading-relaxed">{service.desc}</div>
              <Button asChild className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition-all">
                <Link href="/apply">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 