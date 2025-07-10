'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star, Quote, User, Award, MessageCircle } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  country: string
  university: string
  course: string
  image: string
  rating: number
  content: string
  achievement: string
  year: string
}

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ram Kumar Shrestha',
      country: 'Australia',
      university: 'University of Melbourne',
      course: 'Master of Information Technology',
      image: '/testimonials/ram.jpg',
      rating: 5,
      content: 'Alpine Education made my dream of studying in Australia a reality. Their expert guidance throughout the entire process was invaluable. From university selection to visa approval, they were there every step of the way.',
      achievement: 'Received 50% scholarship',
      year: '2023'
    },
    {
      id: 2,
      name: 'Sita Thapa',
      country: 'Canada',
      university: 'University of Toronto',
      course: 'Bachelor of Computer Science',
      image: '/testimonials/sita.jpg',
      rating: 5,
      content: 'The team at Alpine Education is incredibly professional and caring. They helped me choose the perfect university and course for my career goals. The visa process was smooth and stress-free.',
      achievement: 'Visa approved in 2 weeks',
      year: '2023'
    },
    {
      id: 3,
      name: 'Bikash Tamang',
      country: 'UK',
      university: 'University of Manchester',
      course: 'Master of Business Administration',
      image: '/testimonials/bikash.jpg',
      rating: 5,
      content: 'I was skeptical at first, but Alpine Education exceeded all my expectations. Their SOP writing service was exceptional, and I got accepted to my dream university with a partial scholarship.',
      achievement: 'Accepted to top 10 UK university',
      year: '2023'
    },
    {
      id: 4,
      name: 'Anita Gurung',
      country: 'Germany',
      university: 'Technical University of Munich',
      course: 'Master of Engineering',
      image: '/testimonials/anita.jpg',
      rating: 5,
      content: 'Studying in Germany was always my dream. Alpine Education helped me navigate the complex application process and visa requirements. Their German language preparation guidance was excellent.',
      achievement: 'Full scholarship recipient',
      year: '2023'
    },
    {
      id: 5,
      name: 'Prakash Rai',
      country: 'USA',
      university: 'University of California',
      course: 'Master of Data Science',
      image: '/testimonials/prakash.jpg',
      rating: 5,
      content: 'The team at Alpine Education is truly dedicated to student success. They provided personalized guidance and helped me secure admission to a prestigious US university with financial aid.',
      achievement: 'Received $30,000 scholarship',
      year: '2023'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('testimonials-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="testimonials-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 bg-opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Award className="h-4 w-4 mr-2" />
            Student Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from Nepali students who have successfully achieved their study abroad dreams 
            with Alpine Education's expert guidance and support.
          </p>
        </div>

        {/* Enhanced Testimonials Carousel */}
        <div className="relative">
          {/* Enhanced Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-blue-500 transition-all duration-300"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl border-gray-200 hover:border-blue-500 transition-all duration-300"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Enhanced Testimonial Cards */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}>
                    {/* Enhanced Testimonial Card */}
                    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
                      {/* Enhanced Background Pattern */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-100 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

                      <div className="relative">
                        {/* Enhanced Quote Icon */}
                        <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <Quote className="h-8 w-8 text-white" />
                        </div>

                        {/* Enhanced Content */}
                        <div className="pl-12">
                          {/* Enhanced Rating */}
                          <div className="flex items-center space-x-1 mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                            ))}
                          </div>

                          {/* Enhanced Testimonial Text */}
                          <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                            "{testimonial.content}"
                          </blockquote>

                          {/* Enhanced Student Info */}
                          <div className="flex items-center space-x-6">
                            {/* Enhanced Avatar */}
                            <div className="relative">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <User className="h-8 w-8 text-white" />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>

                            {/* Enhanced Student Details */}
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 mb-1">
                                {testimonial.name}
                              </h4>
                              <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="font-semibold">{testimonial.course}</span>
                                  <span>•</span>
                                  <span>{testimonial.university}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                    {testimonial.country}
                                  </span>
                                  <span>•</span>
                                  <span className="text-green-600 font-semibold">{testimonial.achievement}</span>
                                </div>
                              </div>
                            </div>

                            {/* Enhanced Year Badge */}
                            <div className="text-right">
                              <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-lg">
                                {testimonial.year}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Student Rating</div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="btn-gold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://wa.me/9771234567890', '_blank')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Our Success Stories
          </Button>
        </div>
      </div>
    </section>
  )
} 