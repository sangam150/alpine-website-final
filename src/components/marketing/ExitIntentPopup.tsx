'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Mail, Phone, BookOpen, MessageSquare, Globe, Award, GraduationCap, FileText, Play, CheckCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface PopupOffer {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  inputPlaceholder: string
  inputType: 'email' | 'phone'
  ctaText: string
  highlight?: string
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo'
  pageContext?: string[]
  priority: number
}

const POPUP_OFFERS: PopupOffer[] = [
  {
    id: 'sop-review',
    title: '🎓 Free SOP Review',
    subtitle: 'Worth ₹5000, boost admission chances',
    description: 'Get your Statement of Purpose reviewed by our expert counselors. Identify areas for improvement and increase your chances of admission.',
    icon: FileText,
    inputPlaceholder: 'Enter your email',
    inputType: 'email',
    ctaText: 'Get Free SOP Review',
    highlight: 'Worth ₹5000',
    color: 'blue',
    pageContext: ['/', '/about', '/countries'],
    priority: 5
  },
  {
    id: 'free-counseling',
    title: '💬 Book Free Counseling',
    subtitle: 'Talk to a verified counselor',
    description: 'Schedule a free consultation with our experienced counselors. Get personalized guidance for your study abroad journey.',
    icon: MessageSquare,
    inputPlaceholder: 'Enter your phone number',
    inputType: 'phone',
    ctaText: 'Book Now',
    color: 'green',
    pageContext: ['/', '/about', '/student-services'],
    priority: 4
  },
  {
    id: 'ielts-mock-test',
    title: '📝 Take Free IELTS Mock Test',
    subtitle: 'Know your score instantly',
    description: 'Practice with our free IELTS mock test and get instant results. Understand your current level and areas for improvement.',
    icon: BookOpen,
    inputPlaceholder: 'Enter your email',
    inputType: 'email',
    ctaText: 'Start Free Mock Test',
    color: 'purple',
    pageContext: ['/test-preparation', '/test-preparation/ielts', '/test-preparation/pte', '/test-preparation/toefl'],
    priority: 6
  },
  {
    id: 'visa-eligibility',
    title: '✈️ Check Visa Eligibility',
    subtitle: 'Based on your profile and country',
    description: 'Get an instant assessment of your visa eligibility for your target country. Understand requirements and success probability.',
    icon: Globe,
    inputPlaceholder: 'Enter your email',
    inputType: 'email',
    ctaText: 'Check Now',
    color: 'orange',
    pageContext: ['/countries', '/student-services', '/services'],
    priority: 3
  },
  {
    id: 'scholarship-assessment',
    title: '🎁 Win a Scholarship Assessment',
    subtitle: 'Limited monthly reviews',
    description: 'Get a free scholarship assessment to identify funding opportunities. Limited to first 50 students this month.',
    icon: Award,
    inputPlaceholder: 'Enter your email',
    inputType: 'email',
    ctaText: 'Claim Free Assessment',
    highlight: 'Only 7 left this month!',
    color: 'red',
    pageContext: ['/', '/about', '/student-services'],
    priority: 7
  },
  {
    id: '2025-intakes',
    title: '🔍 Explore Top 2025 Intakes',
    subtitle: 'Country-specific offers (UK, Australia, etc)',
    description: 'Discover the best study programs for 2025 intake. Get early bird discounts and priority application processing.',
    icon: Star,
    inputPlaceholder: 'Enter your email',
    inputType: 'email',
    ctaText: 'View 2025 Programs',
    color: 'indigo',
    pageContext: ['/countries', '/about'],
    priority: 2
  }
]

interface PopupState {
  isVisible: boolean
  currentOfferIndex: number
  isSubmitted: boolean
  inputValue: string
  error: string
}

export default function ExitIntentPopup() {
  const [state, setState] = useState<PopupState>({
    isVisible: false,
    currentOfferIndex: 0,
    isSubmitted: false,
    inputValue: '',
    error: ''
  })
  
  const [isIdle, setIsIdle] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [exitIntent, setExitIntent] = useState(false)
  const [timeOnPage, setTimeOnPage] = useState(0)
  
  const popupRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Get current page context
  const getCurrentPageContext = () => {
    if (typeof window === 'undefined') return '/'
    return window.location.pathname
  }

  // Filter offers based on page context and priority
  const getRelevantOffers = () => {
    const currentPage = getCurrentPageContext()
    return POPUP_OFFERS
      .filter(offer => !offer.pageContext || offer.pageContext.includes(currentPage))
      .sort((a, b) => b.priority - a.priority)
  }

  // Check if user should see popup (storage logic)
  const shouldShowPopup = useCallback(() => {
    if (typeof window === 'undefined') return false
    
    const lastSeen = localStorage.getItem('lastPopupSeenAt')
    const lastOffer = localStorage.getItem('lastPopupOffer')
    const currentOffer = getRelevantOffers()[0]?.id
    
    // Don't show same offer within 12 hours
    if (lastSeen && lastOffer === currentOffer) {
      const timeSinceLastSeen = Date.now() - Number(lastSeen)
      if (timeSinceLastSeen < 12 * 60 * 60 * 1000) return false
    }
    
    // Don't show if user has seen any popup in last 2 hours
    if (lastSeen) {
      const timeSinceLastSeen = Date.now() - Number(lastSeen)
      if (timeSinceLastSeen < 2 * 60 * 60 * 1000) return false
    }
    
    return true
  }, [])

  // Track user behavior
  useEffect(() => {
    let timeInterval: NodeJS.Timeout
    let scrollTimeout: NodeJS.Timeout | undefined

    // Track time on page
    timeInterval = setInterval(() => {
      setTimeOnPage(prev => prev + 1)
    }, 1000)

    // Track scroll
    const handleScroll = () => {
      if (!hasScrolled) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent > 50) {
          setHasScrolled(true)
        }
      }
    }

    // Track exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setExitIntent(true)
      }
    }

    // Track idle time
    let idleTimer: NodeJS.Timeout
    const resetIdleTimer = () => {
      clearTimeout(idleTimer)
      setIsIdle(false)
      idleTimer = setTimeout(() => setIsIdle(true), 30000) // 30 seconds idle
    }

    // Track mouse movement and clicks
    const handleUserActivity = () => {
      resetIdleTimer()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousemove', handleUserActivity)
    window.addEventListener('click', handleUserActivity)
    window.addEventListener('keypress', handleUserActivity)

    return () => {
      clearInterval(timeInterval)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      clearTimeout(idleTimer)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleUserActivity)
      window.removeEventListener('click', handleUserActivity)
      window.removeEventListener('keypress', handleUserActivity)
    }
  }, [hasScrolled])

  // Show popup based on triggers
  useEffect(() => {
    if (state.isVisible) return

    const relevantOffers = getRelevantOffers()
    if (relevantOffers.length === 0) return

    const shouldShow = shouldShowPopup()
    if (!shouldShow) return

    // Trigger conditions
    const triggers = [
      timeOnPage >= 15, // After 15 seconds
      hasScrolled, // After scrolling 50%
      exitIntent, // Exit intent
      isIdle, // User idle for 30 seconds
    ]

    if (triggers.some(Boolean)) {
      setState(prev => ({
        ...prev,
        isVisible: true,
        currentOfferIndex: 0
      }))
      
      // Start rotation
      rotationIntervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          currentOfferIndex: (prev.currentOfferIndex + 1) % relevantOffers.length
        }))
      }, 30000) // Rotate every 30 seconds
    }
  }, [timeOnPage, hasScrolled, exitIntent, isIdle, shouldShowPopup, state.isVisible])

  // Handle popup close
  const handleClose = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: false }))
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const relevantOffers = getRelevantOffers()
      const currentOffer = relevantOffers[state.currentOfferIndex]
      localStorage.setItem('lastPopupSeenAt', Date.now().toString())
      localStorage.setItem('lastPopupOffer', currentOffer?.id || '')
    }
    
    // Clear rotation interval
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current)
    }
  }, [state.currentOfferIndex])

  // Handle "Not now" click
  const handleNotNow = useCallback(() => {
    handleClose()
    
    // Show next offer after 5 seconds
    setTimeout(() => {
      const relevantOffers = getRelevantOffers()
      if (relevantOffers.length > 1) {
        setState(prev => ({
          ...prev,
          isVisible: true,
          currentOfferIndex: (prev.currentOfferIndex + 1) % relevantOffers.length
        }))
      }
    }, 5000)
  }, [handleClose])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const relevantOffers = getRelevantOffers()
    const currentOffer = relevantOffers[state.currentOfferIndex]
    
    // Validate input
    if (!state.inputValue.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter your information' }))
      return
    }

    if (currentOffer.inputType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(state.inputValue.trim())) {
        setState(prev => ({ ...prev, error: 'Please enter a valid email address' }))
        return
      }
    }

    if (currentOffer.inputType === 'phone') {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(state.inputValue.trim().replace(/\s/g, ''))) {
        setState(prev => ({ ...prev, error: 'Please enter a valid phone number' }))
        return
      }
    }

    // Submit to API
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offer: currentOffer.id,
          input: state.inputValue.trim(),
          inputType: currentOffer.inputType,
          source: 'popup',
          page: getCurrentPageContext()
        })
      })

      if (response.ok) {
        setState(prev => ({ 
          ...prev, 
          isSubmitted: true,
          error: ''
        }))
        
        // Close after 3 seconds
        setTimeout(handleClose, 3000)
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Something went wrong. Please try again.' 
        }))
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Network error. Please try again.' 
      }))
    }
  }, [state.inputValue, state.currentOfferIndex, handleClose])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!state.isVisible) return
      
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.isVisible, handleClose])

  // Focus trap
  useEffect(() => {
    if (state.isVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [state.isVisible])

  if (!state.isVisible) return null

  const relevantOffers = getRelevantOffers()
  const currentOffer = relevantOffers[state.currentOfferIndex]
  
  if (!currentOffer) return null

  const IconComponent = currentOffer.icon

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      red: 'from-red-500 to-red-600',
      indigo: 'from-indigo-500 to-indigo-600'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={handleClose}
        aria-hidden="true"
      />
      
      {/* Popup */}
      <div
        ref={popupRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        aria-describedby="popup-description"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl border-0 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header with gradient */}
          <div className={`bg-gradient-to-r ${getColorClasses(currentOffer.color)} p-6 text-white relative`}>
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* Icon and title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <IconComponent className="w-6 h-6" />
              </div>
              <div>
                <h2 id="popup-title" className="text-xl font-bold">{currentOffer.title}</h2>
                <p className="text-sm opacity-90">{currentOffer.subtitle}</p>
              </div>
            </div>
            
            {/* Highlight badge */}
            {currentOffer.highlight && (
              <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                <Star className="w-3 h-3" />
                {currentOffer.highlight}
              </div>
            )}
          </div>
          
          {/* Content */}
          <CardContent className="p-6">
            {state.isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank you!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <p id="popup-description" className="text-gray-700 mb-6 leading-relaxed">
                  {currentOffer.description}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      ref={inputRef}
                      type={currentOffer.inputType === 'email' ? 'email' : 'tel'}
                      placeholder={currentOffer.inputPlaceholder}
                      value={state.inputValue}
                      onChange={(e) => setState(prev => ({ 
                        ...prev, 
                        inputValue: e.target.value,
                        error: ''
                      }))}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        state.error ? 'border-red-500' : ''
                      }`}
                      aria-describedby={state.error ? 'input-error' : undefined}
                    />
                    {state.error && (
                      <p id="input-error" className="text-red-500 text-sm mt-1">
                        {state.error}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className={`w-full bg-gradient-to-r ${getColorClasses(currentOffer.color)} text-white font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg`}
                  >
                    {currentOffer.ctaText}
                  </Button>
                </form>
                
                {/* Navigation dots */}
                {relevantOffers.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {relevantOffers.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setState(prev => ({ ...prev, currentOfferIndex: index }))}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === state.currentOfferIndex 
                            ? `bg-${currentOffer.color}-500` 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to offer ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
                
                {/* Not now button */}
                <button
                  onClick={handleNotNow}
                  className="w-full text-gray-500 text-sm mt-4 hover:text-gray-700 transition-colors"
                >
                  Not now
                </button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
} 