"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { ContactInfo } from "@/types/cms";
import { getContactInfo } from "@/lib/content-management";

export default function StickyConsultationBar() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      setLoading(true);
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch (e) {
        setError("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    }
    fetchContact();
  }, []);

  // Only show once per session
  useEffect(() => {
    if (sessionStorage.getItem("alpine_sticky_bar_dismissed")) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("alpine_sticky_bar_dismissed", "1");
  };

  // Calendly popup handler
  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: "https://calendly.com/alpine-education/free-consultation",
      });
    } else {
      window.open(
        "https://calendly.com/alpine-education/free-consultation",
        "_blank",
      );
    }
  };

  if (!isVisible) return null;

  if (loading) return <div className="py-4 text-center text-gray-400">Loading contact info...</div>;
  if (error) return <div className="py-4 text-center text-red-500">{error}</div>;
  if (!contact) return <div className="py-4 text-center text-gray-400">No contact info found.</div>;

  return (
    <>
      {/* Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div className="sticky-mobile">
        <div className="flex items-center justify-between p-3 sm:p-4">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate">
                Free Consultation
              </p>
              <p className="text-xs text-gray-600">Get expert advice today</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              size="sm"
              className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              onClick={openCalendly}
            >
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">Book Now</span>
              <span className="sm:hidden">Book</span>
            </Button>
            <Button
              size="sm"
              className="btn-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              onClick={() =>
                window.open(
                  `https://wa.me/${contact.whatsapp}?text=Hi%20Alpine%20Education!%20I%20would%20like%20to%20book%20a%20free%20consultation%20session.`,
                  "_blank",
                )
              }
            >
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">Chat</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="p-1 sm:p-2"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
