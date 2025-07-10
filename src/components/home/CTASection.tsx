'use client'

import Link from 'next/link'

const ctaOptions = [
  {
    title: 'Get Free Consultation',
    description: 'Book a free 30-minute session with our expert counselors',
    icon: '🎯',
    href: '/contact',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Take Free Quiz',
    description: 'Find your perfect study destination in 5 minutes',
    icon: '🧭',
    href: '/quiz/country',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Download Resources',
    description: 'Get free guides, checklists, and study materials',
    icon: '📚',
    href: '/resources',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Meet Our Team',
    description: 'Learn about our experienced counselors and success stories',
    icon: '👥',
    href: '/about',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50'
  }
]

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Study Abroad Journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your next step and let us help you achieve your international education dreams
            </p>
          </div>

          {/* CTA Options Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {ctaOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className={`text-4xl mb-4 ${option.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {option.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {option.description}
                  </p>
                  <div className={`inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r ${option.color} text-white text-sm font-medium rounded-lg group-hover:scale-105 transition-transform duration-200`}>
                    Get Started
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Main CTA Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Don't Wait - Start Today!
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of successful students who have achieved their study abroad dreams 
                with Alpine Education. Your journey to international education starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
                >
                  Schedule Free Consultation
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/20 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/30 transform hover:scale-105 transition-all duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">📞</div>
              <h4 className="text-lg font-semibold text-white mb-2">Call Us</h4>
              <p className="text-blue-100">+1 (555) 123-4567</p>
              <p className="text-blue-100 text-sm">Mon-Fri: 9AM-6PM</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">💬</div>
              <h4 className="text-lg font-semibold text-white mb-2">WhatsApp</h4>
              <p className="text-blue-100">+1 (555) 123-4567</p>
              <p className="text-blue-100 text-sm">24/7 Support</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-4">📧</div>
              <h4 className="text-lg font-semibold text-white mb-2">Email Us</h4>
              <p className="text-blue-100">info@alpineeducation.com</p>
              <p className="text-blue-100 text-sm">Response within 24h</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h4 className="text-xl font-semibold text-white mb-6">
                Why Students Trust Alpine Education
              </h4>
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">10,000+</div>
                  <div className="text-blue-100 text-sm">Students Placed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">98%</div>
                  <div className="text-blue-100 text-sm">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <div className="text-blue-100 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                  <div className="text-blue-100 text-sm">Student Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 