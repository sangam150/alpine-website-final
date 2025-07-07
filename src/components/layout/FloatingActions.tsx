'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, MessageSquare } from 'lucide-react';

export default function FloatingActions() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* AI Chat Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <button
          onClick={() => {
            // Trigger AI chat widget
            const chatWidget = document.querySelector('[data-chatbase-widget]') as HTMLElement;
            if (chatWidget) {
              chatWidget.click();
            }
          }}
          className="group relative"
          aria-label="Open AI Chat"
        >
        <div className="rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg p-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        {/* Tooltip */}
        <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          AI Chat Assistant
        </div>
        </button>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+977-XXXXXXXXX'}?text=Hi!%20I%27m%20interested%20in%20studying%20abroad%20with%20Alpine%20Education.`}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="Chat on WhatsApp"
        >
        <div className="rounded-full bg-green-500 hover:bg-green-600 shadow-lg p-3 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.52 3.48A11.94 11.94 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.13 1.6 5.93L0 24l6.18-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52z" />
          </svg>
        </div>
        {/* Tooltip */}
        <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Chat on WhatsApp
        </div>
        </a>
      </motion.div>
    </div>
  );
} 