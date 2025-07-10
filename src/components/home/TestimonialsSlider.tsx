'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Play, Quote } from 'lucide-react'

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real success stories from students who achieved their study abroad dreams with Alpine Education
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Video Testimonial */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-white/10 rounded-xl flex items-center justify-center backdrop-blur relative overflow-hidden">
                {isPlaying ? (
                  <video 
                    className="w-full h-full object-cover rounded-xl"
                    controls
                    autoPlay
                    onEnded={() => setIsPlaying(false)}
                  >
                    <source src={testimonials[currentIndex].video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="text-center">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-white/30 transition-colors"
                    >
                      <Play className="w-8 h-8 text-white" />
                    </button>
                    <h3 className="text-xl font-semibold text-white mb-2">Video Testimonial</h3>
                    <p className="text-white/80">Watch {testimonials[currentIndex].name}'s story</p>
                  </div>
                )}
              </div>
              
              {/* Video Navigation */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index)
                      setIsPlaying(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Carousel */}
          <div className="relative">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="border-0 shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                            <Quote className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.university}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{testimonial.country}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Live Counter */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">3000+</div>
              <div className="text-sm text-gray-600">Students Placed</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.9/5</div>
              <div className="text-sm text-gray-600">Student Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 