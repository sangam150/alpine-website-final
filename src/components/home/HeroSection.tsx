'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  ArrowRight, 
  GraduationCap, 
  Globe, 
  Users,
  CheckCircle,
  Star,
  Award,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    'Free Counseling Session',
    '95% Visa Success Rate',
    '3000+ Students Placed',
    '12+ Countries'
  ];

  const stats = [
    { icon: Users, value: '3000+', label: 'Students Placed' },
    { icon: Globe, value: '12+', label: 'Countries' },
    { icon: Award, value: '95%', label: 'Success Rate' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Additional decorative elements */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star className="w-4 h-4" />
              <span>Leading Study Abroad Consultancy in Nepal</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Start Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                  Study Abroad
                </span>{' '}
                Journey
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              Get expert guidance for studying in Australia, UK, Canada, Germany, France, and more. 
              Free counseling, visa assistance, and personalized support for your international education dreams.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature} 
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-sm lg:text-base">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <Link href="/contact">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Book Free Counselling
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-blue-900">
                <Link href="/apply">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Apply Now
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                >
                  <stat.icon className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{stat.value} {stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            {/* Main Visual Container */}
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl">
              {/* Student Image Placeholder */}
              <div className="aspect-video bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-semibold mb-2">Student Success Stories</h3>
                  <p className="text-white/80 text-sm">Watch how we help students achieve their dreams</p>
                </div>
                
                {/* Play Button */}
                <Button
                  onClick={() => setIsVideoPlaying(true)}
                  size="lg"
                  className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </Button>
              </div>
              
              {/* Video Modal */}
              {isVideoPlaying && (
                <div className="absolute inset-0 bg-black/90 rounded-3xl flex items-center justify-center z-20">
                  <div className="relative w-full max-w-2xl mx-4">
                    <Button
                      onClick={() => setIsVideoPlaying(false)}
                      variant="ghost"
                      size="sm"
                      className="absolute -top-4 -right-4 text-white hover:text-gray-300 bg-black/50 rounded-full w-8 h-8"
                    >
                      ✕
                    </Button>
                    <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                      <p className="text-white">Video Player Placeholder</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">95%</div>
                <div className="text-sm text-gray-600 font-medium">Visa Success Rate</div>
                <div className="flex items-center justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">3000+</div>
                <div className="text-sm text-gray-600 font-medium">Students Placed</div>
                <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mt-2"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
} 