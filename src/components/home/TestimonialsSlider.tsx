'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    university: 'University of Melbourne',
    country: 'Australia',
    program: 'Master of Business Administration',
    rating: 5,
    image: '/testimonials/priya.jpg',
    quote: 'Alpine Education made my dream of studying in Australia a reality. Their guidance throughout the entire process was exceptional. From university selection to visa approval, they were there every step of the way.',
    year: '2023'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    university: 'University of Toronto',
    country: 'Canada',
    program: 'Master of Computer Science',
    rating: 5,
    image: '/testimonials/rajesh.jpg',
    quote: 'The team at Alpine Education is incredibly professional and knowledgeable. They helped me secure admission to one of Canada&apos;s top universities and guided me through the visa process seamlessly.',
    year: '2023'
  },
  {
    id: 3,
    name: 'Anita Patel',
    university: 'University of Manchester',
    country: 'United Kingdom',
    program: 'Master of International Business',
    rating: 5,
    image: '/testimonials/anita.jpg',
    quote: 'I was confused about which country and university to choose. Alpine Education provided excellent counseling and helped me make the right decision. Now I&apos;m successfully studying in the UK!',
    year: '2023'
  },
  {
    id: 4,
    name: 'Suresh Thapa',
    university: 'Technical University of Munich',
    country: 'Germany',
    program: 'Master of Engineering',
    rating: 5,
    image: '/testimonials/suresh.jpg',
    quote: 'Studying in Germany was always my dream. Alpine Education helped me understand the application process and requirements. Their expertise in German universities is outstanding.',
    year: '2023'
  },
  {
    id: 5,
    name: 'Meera Singh',
    university: 'University of Auckland',
    country: 'New Zealand',
    program: 'Master of Public Health',
    rating: 5,
    image: '/testimonials/meera.jpg',
    quote: 'The free counseling session at Alpine Education was incredibly helpful. They provided detailed information about New Zealand universities and helped me choose the perfect program.',
    year: '2023'
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our successful students who have achieved their study abroad dreams 
            with Alpine Education&apos;s guidance and support.
          </p>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <div className="w-full">
              <Card className="border-0 shadow-xl bg-white">
                <CardContent className="p-8 lg:p-12">
                  <div className="text-center">
                    <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                    
                    <div className="flex justify-center mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed italic">
                      &quot;{testimonials[currentIndex].quote}&quot;
                    </blockquote>

                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {testimonials[currentIndex].name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonials[currentIndex].program}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          {testimonials[currentIndex].university}, {testimonials[currentIndex].country}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">3000+</div>
            <p className="text-gray-600">Students Placed</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <p className="text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5</div>
            <p className="text-gray-600">Student Rating</p>
          </div>
                      <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">12+</div>
              <p className="text-gray-600">Countries</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 