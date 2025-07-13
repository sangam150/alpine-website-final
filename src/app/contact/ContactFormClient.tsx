'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Users, Award, Globe, Star, Phone, Mail, MapPin, GraduationCap, Heart, Shield, Clock, FileText, BookOpen, Download, HelpCircle, Play, ArrowRight, Send, MessageCircle, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function ContactFormClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 md:px-0 flex flex-col items-center max-w-7xl mx-auto text-center">
        <Badge variant="outline" className="mb-6 bg-blue-50 text-blue-700 border-blue-200 px-4 py-2 rounded-full font-medium">
          <span className="inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-500" />
            Get Expert Guidance
          </span>
        </Badge>
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Contact Alpine Education
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl">
          Ready to start your study abroad journey? Our expert counselors are here to guide you through every step. 
          Get in touch for free consultation and personalized support.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
            <span className="inline-flex items-center gap-2">
              📞 Call Now
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 font-semibold px-8 py-4 text-lg hover:bg-blue-50">
            <span className="inline-flex items-center gap-2">
              📧 Send Email
            </span>
          </Button>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach our expert counselors. We're here to help you achieve your study abroad dreams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-700 mb-4">Speak directly with our counselors</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-green-600">+977-1-4444444</p>
                <p className="text-sm text-gray-600">Mon-Fri: 9AM-6PM</p>
                <p className="text-sm text-gray-600">Sat: 9AM-4PM</p>
              </div>
            </div>
            
            {/* Email */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-700 mb-4">Send us your questions anytime</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-blue-600">info@alpine.edu.np</p>
                <p className="text-sm text-gray-600">24/7 support</p>
                <p className="text-sm text-gray-600">Quick response</p>
              </div>
            </div>
            
            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-700 mb-4">Quick chat with our team</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-purple-600">+977-9841234567</p>
                <p className="text-sm text-gray-600">Instant messaging</p>
                <p className="text-sm text-gray-600">File sharing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visit Our Offices
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conveniently located offices across Nepal. Drop by for a free consultation or to discuss your study abroad plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kathmandu Office */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Kathmandu Office</h3>
                  <p className="text-sm text-gray-600">Main Branch</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Address:</strong><br />
                  Thamel, Kathmandu<br />
                  Near Thamel Chowk
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +977-1-4444444
                </p>
                <p className="text-gray-700">
                  <strong>Hours:</strong> Mon-Fri 9AM-6PM, Sat 9AM-4PM
                </p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
            
            {/* Pokhara Office */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Pokhara Office</h3>
                  <p className="text-sm text-gray-600">Branch Office</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Address:</strong><br />
                  Lakeside, Pokhara<br />
                  Near Fewa Lake
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> +977-61-5555555
                </p>
                <p className="text-gray-700">
                  <strong>Hours:</strong> Mon-Fri 9AM-6PM, Sat 9AM-4PM
                </p>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours with personalized guidance.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Country</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a country</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="germany">Germany</option>
                    <option value="france">France</option>
                    <option value="new-zealand">New Zealand</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us about your study abroad plans and how we can help..."
                  required
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-700">
                  Subscribe to our newsletter for updates and tips
                </label>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Why Choose Alpine */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Alpine Education?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Trusted by thousands of students for their study abroad success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Counselors</h3>
              <p className="text-blue-100">Experienced professionals with deep knowledge of study abroad processes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">High Success Rate</h3>
              <p className="text-blue-100">95% visa success rate across all major study destinations</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Support</h3>
              <p className="text-blue-100">One-on-one guidance tailored to your specific goals and needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Book a free consultation today and let our experts guide you through your study abroad process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Book Free Consultation
              </span>
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-4 text-lg">
              <span className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
              </span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 