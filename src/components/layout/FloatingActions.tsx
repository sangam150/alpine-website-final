'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, MessageCircle, Phone, ArrowUp } from 'lucide-react'

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showStickyCTA, setShowStickyCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowScrollTop(scrollY > 400)
      setShowStickyCTA(scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Sticky Apply Now CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 animate-slide-up">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg">
            <Link href="/apply">
              <GraduationCap className="w-5 h-5 mr-2" />
              Apply Now
            </Link>
          </Button>
        </div>
      )}

      {/* Floating WhatsApp */}
      <div className="fixed bottom-4 right-4 z-40">
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg">
          <a href="https://wa.me/977144444444" target="_blank" rel="noopener" aria-label="WhatsApp">
            <MessageCircle className="w-6 h-6" />
          </a>
        </Button>
      </div>

      {/* Floating Call */}
      <div className="fixed bottom-20 right-4 z-40">
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg">
          <a href="tel:+977-1-4444444" aria-label="Call Now">
            <Phone className="w-6 h-6" />
          </a>
        </Button>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-40 p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
}
