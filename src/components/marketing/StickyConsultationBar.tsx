'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StickyConsultationBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky-mobile">
      <div className="flex items-center justify-between p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate">Free Consultation</p>
            <p className="text-xs text-gray-600">Get expert advice today</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            size="sm"
            className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
            onClick={() => window.open('https://wa.me/9771234567890', '_blank')}
          >
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Chat</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="p-1 sm:p-2"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 