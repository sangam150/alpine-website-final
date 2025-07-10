'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    let hasShown = false

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        hasShown = true
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !hasShown) {
        setIsVisible(true)
        hasShown = true
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would typically send to your API
    console.log('Email captured:', email)
    setIsSubmitted(true)
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setIsVisible(false)
      setIsSubmitted(false)
      setEmail('')
    }, 2000)
  }

  if (!isVisible) return null

  return (
    <div className="exit-overlay">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl font-display text-center">
            Wait! Don't Miss Out
          </CardTitle>
          <CardDescription className="text-center">
            Get your FREE study abroad consultation and join 5000+ successful students
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-focus"
                />
              </div>
              <Button type="submit" className="btn-primary w-full">
                Get Free Consultation
              </Button>
              <p className="text-xs text-gray-500 text-center">
                We'll send you a detailed guide and schedule your free consultation
              </p>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="success-check text-4xl">✓</div>
              <h3 className="text-lg font-semibold text-success">
                Thank You!
              </h3>
              <p className="text-sm text-gray-600">
                We've sent you a confirmation email with your free consultation details.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 