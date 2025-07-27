"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  MessageCircle,
  Phone,
  ArrowUp,
  X,
  Bot,
} from "lucide-react";
import { useRef } from "react";

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);
      setShowStickyCTA(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close FAB on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setFabOpen(false);
      }
    }
    if (fabOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [fabOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAiChat = () => {
    setAiChatOpen(true);
    setFabOpen(false);
    // Trigger AI chatbot
    const event = new CustomEvent("openAiChat");
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Sticky Apply Now CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 animate-slide-up">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg text-sm sm:text-base animate-pulse"
          >
            <Link href="/apply">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Apply Now</span>
              <span className="sm:hidden">Apply</span>
            </Link>
          </Button>
        </div>
      )}

      {/* Expandable FAB */}
      <div
        ref={fabRef}
        className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3"
      >
        {/* FAB Actions */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-500 ease-in-out ${
            fabOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {/* WhatsApp */}
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110 transform hover:rotate-12"
            aria-label="WhatsApp"
            style={{ animationDelay: "0ms" }}
          >
            <a
              href="https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20would%20like%20to%20book%20a%20free%20consultation%20session."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setFabOpen(false)}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </Button>

          {/* Phone Call */}
          <Button
            asChild
            size="lg"
            className="bg-[#003366] hover:bg-[#002855] text-white rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110 transform hover:rotate-12"
            aria-label="Call Now"
            style={{ animationDelay: "100ms" }}
          >
            <a href="tel:+977-1-4444444" onClick={() => setFabOpen(false)}>
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </Button>

          {/* AI Chatbot */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110 transform hover:rotate-12"
            aria-label="Alpine AI Chatbot"
            onClick={openAiChat}
            style={{ animationDelay: "200ms" }}
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>

          {/* Request a Callback */}
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 hover:scale-110 transform hover:rotate-12"
            aria-label="Request a Callback"
            style={{ animationDelay: "300ms" }}
          >
            <Link href="/contact?callback=1" onClick={() => setFabOpen(false)}>
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </Button>
        </div>

        {/* Main FAB Button */}
        <Button
          size="lg"
          className={`rounded-full shadow-lg w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            fabOpen
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          }`}
          aria-label={fabOpen ? "Close actions" : "Open actions"}
          onClick={() => setFabOpen((open) => !open)}
        >
          {fabOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <span className="text-2xl font-bold">+</span>
          )}
        </Button>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 z-40 p-2 sm:p-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* AI Chatbot Trigger */}
      {aiChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div className="bg-white rounded-lg shadow-2xl p-4 max-w-sm w-full">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-900">
                Alpine AI Assistant
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Hi! I&apos;m your AI study abroad assistant. How can I help you today?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => {
                  setAiChatOpen(false);
                  // Trigger AI chatbot with specific intent
                  const event = new CustomEvent("openAiChat", {
                    detail: { intent: "study_abroad" },
                  });
                  window.dispatchEvent(event);
                }}
              >
                Study Abroad
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAiChatOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
