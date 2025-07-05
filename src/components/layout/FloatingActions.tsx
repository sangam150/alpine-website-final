'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  HelpCircle, 
  FileText, 
  ChevronUp,
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined') {
      const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+977-XXXXXXXXX';
      const message = encodeURIComponent('Hi! I\'m interested in studying abroad. Can you help me?');
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <a
        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+977-XXXXXXXXX'}?text=Hi!%20I%27m%20interested%20in%20studying%20abroad.`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Chat with Us on WhatsApp"
        tabIndex={0}
        title="Chat with Us on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.13 1.6 5.93L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
        </svg>
      </a>
      <button
        onClick={scrollToTop}
        className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg p-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Scroll to top"
        tabIndex={0}
        title="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
        </svg>
      </button>
    </div>
  );
} 