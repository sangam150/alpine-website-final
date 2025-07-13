'use client'

import { GraduationCap, Users, Award, Globe, Star, Shield, CheckCircle } from 'lucide-react'
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedCounter({ value }: { value: string }) {
  const [display, setDisplay] = useState('0')
  const isPercent = value.includes('%')
  const isPlus = value.includes('+')
  const num = parseInt(value.replace(/[^0-9]/g, ''))
  const motionValue = useMotionValue(0)
  useEffect(() => {
    const controls = animate(motionValue, num, {
      duration: 1.5,
      ease: [0.42, 0, 0.58, 1],
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest).toLocaleString() + (isPercent ? '%' : '') + (isPlus ? '+' : ''))
      }
    })
    return () => controls.stop()
  }, [num])
  return <span>{display}</span>
}

const stats = [
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    label: 'Students Counselled',
    value: '10,000+',
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-600" />,
    label: 'Countries',
    value: '12+',
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-500" />,
    label: 'Visa Success Rate',
    value: '98%',
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    label: 'Partner Universities',
    value: '200+',
  },
]

const trustBadges = [
  { name: 'ICEF Certified', icon: <Shield className="h-6 w-6 text-blue-600" />, description: 'International Education Consultant Federation' },
  { name: 'PIER Member', icon: <Award className="h-6 w-6 text-green-600" />, description: 'Professional International Education Representatives' },
  { name: '15+ Years', icon: <Star className="h-6 w-6 text-yellow-500" />, description: 'Experience in Study Abroad' },
  { name: 'ISO Certified', icon: <CheckCircle className="h-6 w-6 text-purple-600" />, description: 'Quality Management System' },
]

const partnerLogos = [
  { name: 'University of Melbourne', logo: '/partners/melbourne.png' },
  { name: 'University of Toronto', logo: '/partners/toronto.png' },
  { name: 'University of Manchester', logo: '/partners/manchester.png' },
  { name: 'Technical University Munich', logo: '/partners/tum.png' },
  { name: 'University of Sydney', logo: '/partners/sydney.png' },
  { name: 'McGill University', logo: '/partners/mcgill.png' },
]

export default function StatsSection() {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Trusted & Certified</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
                          <div 
              key={i}
              className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
            >
                <div className="flex justify-center mb-2">{badge.icon}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</div>
                <div className="text-xs text-gray-500">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Universities */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Partner Universities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partnerLogos.map((partner, i) => (
                          <div 
              key={i}
              className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center hover:shadow-lg transition-shadow"
            >
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600 text-center">{partner.name.split(' ')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Awards & Recognition</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Award className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Best Study Abroad Consultancy 2023</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">Excellence in Student Services</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">ISO 9001:2015 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 