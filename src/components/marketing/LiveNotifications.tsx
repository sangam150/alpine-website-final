'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, MapPin, GraduationCap } from 'lucide-react'

interface Notification {
  id: number
  message: string
  location: string
  time: string
  type: 'visa' | 'admission' | 'consultation'
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const sampleNotifications: Notification[] = [
    {
      id: 1,
      message: "Ram from Kathmandu got visa approval for Australia",
      location: "Kathmandu, Nepal",
      time: "2 minutes ago",
      type: "visa"
    },
    {
      id: 2,
      message: "Sita received admission offer from University of Melbourne",
      location: "Pokhara, Nepal",
      time: "5 minutes ago",
      type: "admission"
    },
    {
      id: 3,
      message: "Bikash completed free consultation session",
      location: "Lalitpur, Nepal",
      time: "8 minutes ago",
      type: "consultation"
    },
    {
      id: 4,
      message: "Priya got scholarship for UK university",
      location: "Biratnagar, Nepal",
      time: "12 minutes ago",
      type: "admission"
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)]
      const newNotification = {
        ...randomNotification,
        id: Date.now(),
        time: "Just now"
      }
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 2)])
    }, 8000)

    return () => clearInterval(interval)
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-40 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-in-right"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'visa' && (
                <CheckCircle className="h-5 w-5 text-green-600" />
              )}
              {notification.type === 'admission' && (
                <GraduationCap className="h-5 w-5 text-blue-600" />
              )}
              {notification.type === 'consultation' && (
                <MapPin className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500">{notification.location}</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{notification.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 