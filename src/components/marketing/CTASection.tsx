'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function CTASection() {
  return (
    <section className="w-full py-16 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Study Abroad Journey?</h2>
        <p className="text-lg text-gray-600 mb-8">Book a free consultation with our expert counselors and take the first step toward your dream university.</p>
        <Button size="lg" className="btn-gold text-lg px-8 py-4 shadow-xl hover:scale-105 transition-transform" onClick={() => window.open('https://wa.me/9771234567890', '_blank')}>
          <MessageCircle className="h-5 w-5 mr-2" /> Book Free Consultation
        </Button>
        <div className="flex justify-center mt-8 gap-4">
          <Image src="/logo.svg" alt="Alpine Logo" className="h-8" width={32} height={32} />
          <Image src="/icons/icon-192x192.png" alt="Trust Badge" className="h-8 rounded-full border border-gray-200" width={32} height={32} />
        </div>
      </div>
    </section>
  )
} 