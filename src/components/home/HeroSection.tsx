'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon, PlayIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Phone, MessageCircle, Award, Users, Globe } from 'lucide-react'

export default function HeroSection() {
  const [currentText, setCurrentText] = useState(0)
  
  const animatedTexts = [
    "Study Abroad",
    "Visa Success", 
    "Global Education",
    "Your Dreams"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [animatedTexts.length])

  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium border border-blue-200">
                <Award className="w-4 h-4 mr-2" />
                Leading Study Abroad Consultancy in Nepal
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 min-h-[1.2em] flex items-center">
                  {animatedTexts[currentText]}
                  <span className="inline-block w-1 h-6 bg-blue-600 ml-2 animate-pulse"></span>
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Get expert guidance for studying in Australia, the UK, Canada, and more. 
                Free counseling, visa assistance, and personalized support.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Free Counseling</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Visa Assistance</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">Test Preparation</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">University Applications</span>
                </div>
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Link href="/contact">
                    Free Counseling
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105">
                  <Link href="/about">
                    See Success Stories
                  </Link>
                </Button>
              </div>

              {/* Contact CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="font-medium border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 hover:scale-105">
                  <a href="tel:+977-1-4444444">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="font-medium border-2 border-green-600 text-green-600 hover:bg-green-50 rounded-xl transition-all duration-300 hover:scale-105">
                  <a href="https://wa.me/977144444444" target="_blank" rel="noopener">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              {/* Enhanced Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-purple-400 shadow-sm"></div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">3000+ Success Stories</span>
                    <span className="text-xs text-gray-500">Verified Students</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">4.9/5 Rating</span>
                    <span className="text-xs text-gray-500">Student Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Right Content - Video/Animation */}
            <div className="relative order-first lg:order-last">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
                
                <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 lg:p-8 shadow-2xl">
                  {/* Video Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    🎬 Watch Student Stories
                  </div>
                  
                  <div className="aspect-video bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur relative overflow-hidden shadow-xl">
                    <div className="text-center p-8">
                      <button className="group w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-white/30 transition-all duration-300 hover:scale-110">
                        <PlayIcon className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
                      </button>
                      <h3 className="text-2xl font-bold text-white mb-3">Student Success Stories</h3>
                      <p className="text-white/90 text-lg mb-4">Watch how we help students achieve their dreams</p>
                      <div className="flex items-center justify-center gap-2 text-white/80">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Real Student Stories</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Floating Stats */}
                  <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-xs text-gray-600 font-medium">Visa Success Rate</div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                    <div className="text-2xl font-bold text-purple-600">12+</div>
                    <div className="text-xs text-gray-600 font-medium">Countries</div>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                    <div className="text-2xl font-bold text-green-600">3000+</div>
                    <div className="text-xs text-gray-600 font-medium">Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 