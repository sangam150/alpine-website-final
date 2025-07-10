'use client'

import { GraduationCap, Users, Award, Globe } from 'lucide-react'
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

export default function StatsSection() {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8 gap-4">
          <img src="/logo.svg" alt="Alpine Logo" className="h-8" />
          <img src="/icons/icon-192x192.png" alt="Trust Badge" className="h-8 rounded-full border border-gray-200" />
        </div>
      </div>
    </section>
  )
} 