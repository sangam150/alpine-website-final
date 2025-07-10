'use client'

import { useState, useEffect } from 'react'
import { Users, Award, Globe, TrendingUp, Star, CheckCircle } from 'lucide-react'

interface StatItem {
  icon: React.ComponentType<any>
  number: string
  label: string
  description: string
  color: string
  delay: number
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    students: 0,
    countries: 0,
    success: 0,
    years: 0
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateCounts()
        }
      },
      { threshold: 0.3 }
    )

    const element = document.getElementById('stats-section')
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const animateCounts = () => {
    const targets = {
      students: 5000,
      countries: 15,
      success: 98,
      years: 15
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCounts({
        students: Math.floor(targets.students * easeOut),
        countries: Math.floor(targets.countries * easeOut),
        success: Math.floor(targets.success * easeOut),
        years: Math.floor(targets.years * easeOut)
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(targets)
      }
    }, stepDuration)
  }

  const stats: StatItem[] = [
    {
      icon: Users,
      number: counts.students.toLocaleString(),
      label: 'Students Placed',
      description: 'Successfully studying abroad',
      color: 'from-blue-500 to-blue-600',
      delay: 0
    },
    {
      icon: Globe,
      number: counts.countries.toString(),
      label: 'Countries',
      description: 'Study destinations available',
      color: 'from-green-500 to-green-600',
      delay: 200
    },
    {
      icon: Award,
      number: `${counts.success}%`,
      label: 'Visa Success Rate',
      description: 'Proven track record',
      color: 'from-yellow-500 to-yellow-600',
      delay: 400
    },
    {
      icon: TrendingUp,
      number: `${counts.years}+`,
      label: 'Years Experience',
      description: 'Industry expertise',
      color: 'from-purple-500 to-purple-600',
      delay: 600
    }
  ]

  return (
    <section id="stats-section" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 bg-opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4 mr-2" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Our Success in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Nepali students who have transformed their lives through international education. 
            Our proven track record speaks for itself.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              {/* Enhanced Card */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                {/* Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative p-8 text-center">
                  {/* Enhanced Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Enhanced Numbers */}
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 font-display">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-700 mb-2">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div 
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${stat.delay + 500}ms`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
              </div>

              {/* Enhanced Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">5-Star Rated</h3>
            <p className="text-gray-600">Consistently rated excellent by our students</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Award Winning</h3>
            <p className="text-gray-600">Recognized for excellence in education consulting</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <CheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Certified</h3>
            <p className="text-gray-600">Government approved and certified consultants</p>
          </div>
        </div>
      </div>
    </section>
  )
} 