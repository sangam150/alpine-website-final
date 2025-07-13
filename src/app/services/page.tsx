import { GraduationCap, FileText, BookOpen, Award, Users, CheckCircle, Star, MessageCircle, Phone, Globe, Shield, Clock, Target, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services - Alpine Education & Visa Services',
  description: 'Explore our expert study abroad services for Nepali students: university application, visa assistance, SOP writing, test preparation, and personalized counseling.',
}

const services = [
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    title: 'University Application',
    desc: 'Expert guidance for top universities worldwide with personalized application strategies.',
    features: ['University Selection', 'Application Strategy', 'Document Preparation', 'Interview Coaching'],
    color: 'blue'
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: 'Visa Assistance',
    desc: 'Smooth, high-success visa processing with expert guidance and document support.',
    features: ['Visa Consultation', 'Document Preparation', 'Interview Training', 'Application Tracking'],
    color: 'purple'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-green-600" />,
    title: 'SOP Writing',
    desc: 'Personalized Statement of Purpose that showcases your unique story and aspirations.',
    features: ['Personalized Writing', 'Expert Review', 'Multiple Revisions', 'Success Stories'],
    color: 'green'
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    title: 'Test Preparation',
    desc: 'IELTS, TOEFL, PTE, and more with certified trainers and proven strategies.',
    features: ['Expert Trainers', 'Mock Tests', 'Study Materials', 'Score Guarantee'],
    color: 'yellow'
  },
  {
    icon: <Users className="h-8 w-8 text-pink-600" />,
    title: 'Student Counseling',
    desc: 'One-on-one counseling for your complete study abroad journey.',
    features: ['Free Consultation', 'Career Guidance', 'Country Selection', 'Timeline Planning'],
    color: 'pink'
  },
  {
    icon: <Shield className="h-8 w-8 text-indigo-600" />,
    title: 'Document Support',
    desc: 'Comprehensive document preparation and verification services.',
    features: ['Document Review', 'Translation Services', 'Notarization', 'Express Processing'],
    color: 'indigo'
  },
]

const testimonials = [
  {
    name: 'Sangam Karki',
    university: 'University of Melbourne',
    country: 'Australia',
    text: 'Alpine helped me get into my dream university with their expert guidance and support.',
    rating: 5
  },
  {
    name: 'Ragav Upreti',
    university: 'University of Toronto',
    country: 'Canada',
    text: 'The visa process was smooth and stress-free thanks to Alpine\'s professional team.',
    rating: 5
  },
  {
    name: 'Priya Sharma',
    university: 'University of Manchester',
    country: 'UK',
    text: 'Their SOP writing service made all the difference in my application success.',
    rating: 5
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <Heart className="w-4 h-4 text-blue-500" />
            Expert Services
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Complete Study Abroad Services
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          From university selection to visa approval, our comprehensive services ensure your success at every step of your study abroad journey.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📞 Book Free Consultation
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📋 View Our Process
            </span>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide end-to-end support for Nepali students aspiring to study abroad. From university selection to visa approval, our experienced team is with you every step of the way.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="mb-6 flex justify-center">
                  <div className={`w-16 h-16 bg-${service.color}-100 rounded-xl flex items-center justify-center`}>
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <Link href="/apply">Get Started</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Alpine */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Alpine?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven track record and comprehensive approach make us the preferred choice for Nepali students.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">15+ Years Experience</h3>
              <p className="text-gray-600">Trusted by thousands of students since 2008</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">95% Success Rate</h3>
              <p className="text-gray-600">High visa approval and university acceptance rates</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">20+ Countries</h3>
              <p className="text-gray-600">Partnerships with universities worldwide</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance for students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our successful students who achieved their study abroad dreams with Alpine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.university}, {testimonial.country}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Book a free consultation with our expert counselors and take the first step toward your dream university.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 