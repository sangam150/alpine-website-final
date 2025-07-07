'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Play, 
  GraduationCap, 
  Globe, 
  Users,
  CheckCircle,
  Star,
  Award,
  BookOpen,
  MessageCircle,
  Phone,
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';

export default function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animated counter for stats
  const [counts, setCounts] = useState({ students: 0, countries: 0, success: 0 });

  const testimonials = [
    {
      name: "Priya Sharma",
      country: "🇦🇺 Australia",
      university: "University of Melbourne",
      quote: "Alpine helped me secure admission and visa in just 3 months!",
      image: "/og-image.jpg"
    },
    {
      name: "Rajesh Kumar",
      country: "🇨🇦 Canada",
      university: "University of Toronto",
      quote: "The counseling was exceptional. I'm now studying Computer Science!",
      image: "/og-image.jpg"
    },
    {
      name: "Anita Patel",
      country: "🇬🇧 UK",
      university: "University of Manchester",
      quote: "From Nepal to UK - Alpine made my dream come true!",
      image: "/og-image.jpg"
    }
  ];

  const features = [
    'Free Counseling Session',
    '95% Visa Success Rate',
    '3000+ Students Placed',
    '12+ Countries'
  ];

  const stats = [
    { icon: Users, value: '3000+', label: 'Students Placed', color: 'text-blue-500' },
    { icon: Globe, value: '12+', label: 'Countries', color: 'text-green-500' },
    { icon: Award, value: '95%', label: 'Success Rate', color: 'text-purple-500' }
  ];

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        students: prev.students < 3000 ? prev.students + 50 : 3000,
        countries: prev.countries < 12 ? prev.countries + 1 : 12,
        success: prev.success < 95 ? prev.success + 2 : 95
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('hero-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-pink-400 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-3000"></div>
        
        {/* Animated blobs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        {/* World map dots animation */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <div className="animate-pulse" style={{ animationDelay: `${Math.random() * 3}s` }}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className={`transition-all duration-800 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
              {/* Premium Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-lg">
                <div className={`transition-all duration-600 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  <Star className="w-5 h-5" />
                </div>
                <span className={`transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                  #1 Study Abroad Consultancy in Nepal
                </span>
              </div>

              {/* Main Heading */}
              <h1 className={`text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-800 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Your Gateway to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Global Education
                </span>
              </h1>

              {/* Subtitle */}
              <p className={`text-lg lg:text-xl text-gray-600 mb-8 max-w-2xl transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Expert guidance for studying in Australia, UK, Canada, Germany, and more. 
                Free counseling, visa assistance, and personalized support.
              </p>

              {/* Features List */}
              <div className={`grid grid-cols-2 gap-4 mb-8 transition-all duration-800 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                {features.map((feature, index) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8 transition-all duration-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`transition-all duration-600 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-5'}`}>
                  <Button asChild size="lg" className="navbar-button-success rounded-lg py-3 px-6 shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto">
                    <Link href="/test-preparation">
                      <Play className="w-4 h-4" />
                      Take Free Quiz
                    </Link>
                  </Button>
                </div>
                <div className={`transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
                  <Button asChild size="lg" variant="outline" className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-lg py-3 px-6 shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-200 w-full sm:w-auto">
                    <Link href="/test-preparation">
                      <Play className="w-4 h-4" />
                      Take Free Quiz
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Enhanced Animated Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className={`transition-all duration-600 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                      <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Visual */}
          <div className="relative">
            <div className={`transition-all duration-800 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}>
              {/* Enhanced Visual Container */}
              <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 shadow-2xl overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}></div>
                </div>

                {/* Testimonial Carousel */}
                <div className="relative z-10">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border-2 border-white/30">
                      <img 
                        src={testimonials[currentTestimonial].image || "/og-image.jpg"} 
                        alt={testimonials[currentTestimonial].name}
                        className="w-20 h-20 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/og-image.jpg";
                        }}
                      />
                    </div>
                    <div className="text-white mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-2xl">{testimonials[currentTestimonial].country}</span>
                        <span className="text-white/80">•</span>
                        <span className="font-semibold">{testimonials[currentTestimonial].name}</span>
                      </div>
                      <p className="text-white/90 text-sm mb-2">{testimonials[currentTestimonial].university}</p>
                      <p className="text-white/80 text-sm italic">"{testimonials[currentTestimonial].quote}"</p>
                    </div>
                  </div>

                  {/* Carousel indicators */}
                  <div className="flex justify-center space-x-2 mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Enhanced Play Button */}
                  <div className="absolute bottom-4 right-4">
                    <Button
                      onClick={() => setIsVideoPlaying(true)}
                      size="lg"
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 shadow-lg transition-all duration-200 hover:scale-110"
                    >
                      <Play className="w-8 h-8 text-white ml-1" />
                    </Button>
                  </div>
                </div>
                
                {/* Enhanced Video Modal */}
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
                      <div className="bg-gray-900 rounded-lg p-8 text-center">
                        <h3 className="text-white text-xl font-semibold mb-4">Student Success Stories</h3>
                        <p className="text-gray-300 mb-6">Watch real testimonials from our successful students</p>
                        <div className="bg-gray-800 rounded-lg p-6">
                          <div className="flex items-center justify-center space-x-4 mb-4">
                            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">Video player would be embedded here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Trust indicators */}
              <div className={`mt-6 text-center transition-all duration-800 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>ISO Certified</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span>10+ Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className={`fixed bottom-6 right-6 z-50 space-y-3 transition-all duration-800 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="transition-all duration-200 hover:scale-110">
          <Button size="lg" className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
        </div>
        <div className="transition-all duration-200 hover:scale-110">
          <Button size="lg" className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Phone className="w-6 h-6 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
} 