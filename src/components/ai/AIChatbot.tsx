'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CHATBASE_ID = 'YGookBr-ObI_UzUTZE-JU'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load Chatbase script
    const script = document.createElement('script')
    script.src = 'https://www.chatbase.co/embed.min.js'
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (isLoaded && isOpen) {
      // Initialize Chatbase when opened
      if (window.ChatbaseWidget) {
        window.ChatbaseWidget.init({
          chatbotId: CHATBASE_ID,
          domain: 'www.chatbase.co'
        })
      }
    }
  }, [isLoaded, isOpen])

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        className="ai-widget fixed bottom-4 right-4 z-50 rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 hover:scale-110"
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        aria-label="Open AI Chat Assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Widget Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md h-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Alpine AI Assistant</h3>
                  <p className="text-xs text-blue-100">Study Abroad Expert</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Widget Container */}
            <div className="flex-1 relative">
              {isLoaded ? (
                <div 
                  id="chatbase-widget"
                  className="w-full h-full"
                  data-chatbot-id={CHATBASE_ID}
                  data-domain="www.chatbase.co"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-500 text-sm">Loading AI Assistant...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

// Add Chatbase types to window object
declare global {
  interface Window {
    ChatbaseWidget?: {
      init: (config: { chatbotId: string; domain: string }) => void;
    };
  }
} 