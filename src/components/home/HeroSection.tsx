'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRightIcon, PlayIcon, StarIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Phone, MessageCircle } from 'lucide-react'

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
    <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
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
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                <StarIcon className="w-4 h-4 mr-2" />
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
              <p className="text-xl text-gray-600 max-w-2xl">
                Get expert guidance for studying in Australia, the UK, Canada, and more. 
                Free counseling, visa assistance, and personalized support.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Free Counseling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Visa Assistance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Test Preparation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">University Applications</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-semibold bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg">
                  <Link href="/contact">
                    Free Counseling
                    <ChevronRightIcon className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="font-semibold border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg">
                  <Link href="/about">
                    See Success Stories
                  </Link>
                </Button>
              </div>

              {/* Contact CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="font-medium border-green-600 text-green-600 hover:bg-green-50">
                  <a href="tel:+977-1-4444444">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="font-medium border-green-600 text-green-600 hover:bg-green-50">
                  <a href="https://wa.me/977144444444" target="_blank" rel="noopener">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">3000+ Success Stories</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Video/Animation */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-video bg-white/10 rounded-xl flex items-center justify-center backdrop-blur">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Student Success Stories</h3>
                    <p className="text-white/80">Watch how we help students achieve their dreams</p>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-xs text-gray-600">Visa Success Rate</div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg">
                  <div className="text-2xl font-bold text-purple-600">12+</div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 