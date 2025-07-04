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
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40 items-end pointer-events-auto">
      {/* WhatsApp Button */}
      <div className="relative group">
        <button
          className="bg-green-500 p-4 rounded-full shadow hover:scale-105 transition-all duration-300"
          onClick={handleWhatsAppClick}
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">WhatsApp</span>
      </div>
      
      {/* Scroll to Top Button */}
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="relative group"
        >
          <button
            className="bg-blue-600 p-4 rounded-full shadow hover:scale-105 transition-all duration-300"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6 text-white" />
          </button>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Back to top</span>
        </motion.div>
      )}
    </div>
  );
} 