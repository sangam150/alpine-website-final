'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Play, Quote, Award, Users, Clock } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    country: 'Australia',
    university: 'University of Melbourne',
    rating: 5,
    text: 'Alpine Education helped me get into my dream university. The visa process was smooth and they provided excellent guidance throughout.',
    video: '/testimonials/priya.mp4',
    image: '/testimonials/priya.jpg'
  },
  {
    name: 'Rajesh Kumar',
    country: 'Canada',
    university: 'University of Toronto',
    rating: 5,
    text: 'The team at Alpine is incredibly professional. They made the entire process stress-free and I got my visa in the first attempt.',
    video: '/testimonials/rajesh.mp4',
    image: '/testimonials/rajesh.jpg'
  },
  {
    name: 'Anita Patel',
    country: 'UK',
    university: 'University of Manchester',
    rating: 5,
    text: 'I was worried about the visa process, but Alpine\'s expert guidance made everything easy. Highly recommended!',
    video: '/testimonials/anita.mp4',
    image: '/testimonials/anita.jpg'
  },
  {
    name: 'Suresh Thapa',
    country: 'Germany',
    university: 'Technical University of Munich',
    rating: 5,
    text: 'Alpine helped me find the perfect course and university. The counseling was free and very helpful.',
    video: '/testimonials/suresh.mp4',
    image: '/testimonials/suresh.jpg'
  }
]

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Student Success Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real success stories from students who achieved their study abroad dreams with Alpine Education
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Enhanced Video Testimonial */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
              
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 lg:p-8 shadow-2xl">
                {/* Video Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🎬 Watch Student Stories
                </div>
                
                <div className="aspect-video bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur relative overflow-hidden shadow-xl">
                  {isPlaying ? (
                    <video 
                      className="w-full h-full object-cover rounded-2xl"
                      controls
                      autoPlay
                      onEnded={() => setIsPlaying(false)}
                    >
                      <source src={testimonials[currentIndex].video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="text-center p-8">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="group w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      >
                        <Play className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
                      </button>
                      <h3 className="text-2xl font-bold text-white mb-3">Video Testimonial</h3>
                      <p className="text-white/90 text-lg mb-4">Watch {testimonials[currentIndex].name}'s story</p>
                      <div className="flex items-center justify-center gap-2 text-white/80">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">2 min watch</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced Video Navigation */}
                <div className="flex justify-center mt-6 space-x-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index)
                        setIsPlaying(false)
                      }}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-white scale-125' 
                          : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Reviews Carousel */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Quote className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                            <p className="text-blue-600 font-medium">{testimonial.university}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">• {testimonial.country}</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-lg leading-relaxed italic mb-6">"{testimonial.text}"</p>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Users className="w-4 h-4" />
                            <span>Verified Student</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Success Story #{index + 1}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Live Counter */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8 bg-white rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3000+</div>
              <div className="text-sm text-gray-600 font-medium">Students Placed</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600 font-medium">Success Rate</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm text-gray-600 font-medium">Student Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 