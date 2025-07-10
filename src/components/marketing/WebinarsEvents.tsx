'use client'

import { Calendar, Clock, MapPin, Users, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const events = [
  {
    id: 1,
    title: 'Study in Australia - Complete Guide',
    date: '2024-02-15',
    time: '14:00',
    type: 'Webinar',
    attendees: 45,
    speaker: 'Sarah Johnson',
    description: 'Everything you need to know about studying in Australia - from application to visa process.',
    image: '/icons/icon-192x192.png',
    isLive: true
  },
  {
    id: 2,
    title: 'UK Student Visa Workshop',
    date: '2024-02-20',
    time: '15:30',
    type: 'Workshop',
    attendees: 32,
    speaker: 'David Chen',
    description: 'Step-by-step guide to UK student visa application process and requirements.',
    image: '/icons/icon-192x192.png',
    isLive: false
  },
  {
    id: 3,
    title: 'IELTS vs PTE - Which to Choose?',
    date: '2024-02-25',
    time: '16:00',
    type: 'Webinar',
    attendees: 67,
    speaker: 'Emma Wilson',
    description: 'Compare IELTS and PTE tests to choose the best option for your study abroad journey.',
    image: '/icons/icon-192x192.png',
    isLive: false
  }
]

export default function WebinarsEvents() {
  const handleRegister = (eventId: number) => {
    // Open Calendly for registration
    window.open('https://calendly.com/alpine-education/consultation', '_blank')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Webinars & Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our expert-led sessions to learn about study abroad opportunities, visa processes, and test preparation strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.isLive 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {event.isLive ? '🔴 LIVE NOW' : event.type}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    {event.attendees}
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    {event.time} (NPT)
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    Online via Zoom
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {event.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={event.image} 
                      alt={event.speaker} 
                      className="w-8 h-8 rounded-full border-2 border-blue-100"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {event.speaker}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={() => handleRegister(event.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    {event.isLive ? (
                      <>
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Join Now
                      </>
                    ) : (
                      'Register Free'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3"
          >
            <a href="https://calendly.com/alpine-education/consultation" target="_blank" rel="noopener">
              View All Events
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
} 