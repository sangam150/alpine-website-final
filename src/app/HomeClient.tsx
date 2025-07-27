"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import CountryGrid from "@/components/home/CountryGrid";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import ServicesOverview from "@/components/home/ServicesOverview";
import StatsSection from "@/components/home/StatsSection";
import CTASection from "@/components/home/CTASection";
import EventsSection from "@/components/home/EventsSection";
import MockTestSection from "@/components/home/MockTestSection";
import PromoBannerSection from "@/components/home/PromoBannerSection";
import BlogHighlightsSection from "@/components/home/BlogHighlightsSection";
import FAQSection from "@/components/marketing/FAQSection";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, X } from "lucide-react";

export default function HomeClient() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [showFAB, setShowFAB] = useState(false);
  const [showFABMenu, setShowFABMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 300);
      setShowFAB(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Promo Banner */}
      <PromoBannerSection />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Overview */}
      <ServicesOverview />

      {/* Country Grid */}
      <CountryGrid />

      {/* Testimonials Carousel */}
      <TestimonialsSlider />

      {/* FAQ Section */}
      <FAQSection />

      {/* Blog Highlights Section */}
      <BlogHighlightsSection />

      {/* Events Section */}
      <EventsSection />

      {/* Mock Test Section */}
      <MockTestSection />

      {/* Final CTA Section */}
      <CTASection />

      {/* Floating Action Button (FAB) - Only show when scrolled */}
      {showFAB && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="relative">
            {/* FAB Menu */}
            {showFABMenu && (
              <div className="absolute bottom-16 left-0 space-y-3 mb-3">
                <Button
                  asChild
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <a
                    href="https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20with%20study%20abroad."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Call"
                >
                  <a href="tel:+977-1-4444444">
                    <Phone className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            )}

            {/* Main FAB Button */}
            <Button
              onClick={() => setShowFABMenu(!showFABMenu)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              aria-label="Quick Actions"
            >
              {showFABMenu ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      )}

      {/* Alpine AI Chatbot Button - Fixed Position (Right Side) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => {
            // Trigger chatbot or scroll to chatbot
            const chatbot = document.querySelector('[data-chatbot]');
            if (chatbot) {
              chatbot.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/?openChat=true';
            }
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label="Chat with Alpine AI"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
