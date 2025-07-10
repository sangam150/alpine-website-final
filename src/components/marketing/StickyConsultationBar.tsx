'use client'

import { useState } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StickyConsultationBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky-mobile">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate">Free Consultation</p>
            <p className="text-xs text-gray-600">Get expert advice today</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="btn-primary"
            onClick={() => window.open('https://wa.me/9771234567890', '_blank')}
          >
            <Phone className="h-4 w-4 mr-1" />
            WhatsApp
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 