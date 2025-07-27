"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Calendar, BookOpen, MessageCircle, Target } from "lucide-react";
import Link from "next/link";
import { getActivePopup, PopupContent } from "@/lib/content-management";

interface PopupVariant {
  title: string;
  description: string;
  icon: React.ReactNode;
  primaryCTA: {
    text: string;
    href: string;
    isExternal?: boolean;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  color: string;
}

const popupVariants: PopupVariant[] = [
  {
    title: "Free SOP Review",
    description:
      "Get your Statement of Purpose reviewed by our expert writers. Improve your chances of admission!",
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    primaryCTA: {
      text: "Get Free SOP Review",
      href: "/contact",
    },
    secondaryCTA: {
      text: "Learn More",
      href: "/student-services#sop-writing",
    },
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Free Counselling Session",
    description:
      "Book a 30-minute free consultation with our expert counselors. Get personalized guidance for your study abroad journey.",
    icon: <MessageCircle className="w-8 h-8 text-green-600" />,
    primaryCTA: {
      text: "Book Free Consultation",
      href: "https://calendly.com/alpine-edu/online-counselling",
      isExternal: true,
    },
    secondaryCTA: {
      text: "Learn About Our Services",
      href: "/student-services",
    },
    color: "from-green-500 to-green-600",
  },
  {
    title: "Free Mock Test",
    description:
      "Take a free IELTS/PTE mock test and get your score analysis. Know where you stand before starting preparation.",
    icon: <Target className="w-8 h-8 text-purple-600" />,
    primaryCTA: {
      text: "Take Free Mock Test",
      href: "/test-preparation",
    },
    secondaryCTA: {
      text: "View All Tests",
      href: "/test-preparation",
    },
    color: "from-purple-500 to-purple-600",
  },
];

export default function ExitIntentPopup() {
  const [popup, setPopup] = useState<PopupContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    async function fetchPopup() {
      setLoading(true);
      try {
        const data = await getActivePopup();
        setPopup(data);
      } catch (e) {
        setError("Failed to load popup");
      } finally {
        setLoading(false);
      }
    }
    fetchPopup();
  }, []);

  useEffect(() => {
    // Check if popup has been dismissed forever
    const dismissed = localStorage.getItem("exitIntentPopupDismissed");
    if (dismissed) {
      setHasShown(true);
      return;
    }
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem("exitIntentPopupShown");
    if (popupShown) {
      setHasShown(true);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        timeoutId = setTimeout(() => {
          setOpen(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentPopupShown", "true");
        }, 1000);
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      // Show popup when user scrolls 70% of the page
      if (scrollY > (documentHeight - windowHeight) * 0.7 && !hasShown) {
        setOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentPopupShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [hasShown]);

  useEffect(() => {
    // Cycle through variants every 20 seconds
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % popupVariants.length);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="py-12 text-center text-gray-400">Loading popup...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!popup) return null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleDontShowAgain = () => {
    setOpen(false);
    localStorage.setItem("exitIntentPopupDismissed", "true");
  };

  const handlePrimaryCTA = () => {
    const variant = popupVariants[currentVariant];
    if (variant.primaryCTA.isExternal) {
      window.open(variant.primaryCTA.href, "_blank");
    }
    setOpen(false);
  };

  const variant = popupVariants[currentVariant];

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-full bg-gradient-to-r ${variant.color} text-white`}
            >
              {variant.icon}
            </div>
            <span className="text-xl font-bold">{variant.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{variant.description}</p>
          <div className="space-y-3">
            <Button
              onClick={handlePrimaryCTA}
              className={`w-full bg-gradient-to-r ${variant.color} text-white hover:opacity-90 transition-all duration-200`}
            >
              {variant.primaryCTA.text}
            </Button>
            {variant.secondaryCTA && (
              <Button asChild variant="outline" className="w-full">
                <Link href={variant.secondaryCTA.href}>
                  {variant.secondaryCTA.text}
                </Link>
              </Button>
            )}
          </div>
          <div className="text-center flex flex-col gap-2">
            <button
              onClick={handleClose}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Maybe later
            </button>
            <button
              onClick={handleDontShowAgain}
              className="text-xs text-gray-400 hover:text-gray-700 underline"
            >
              Don&apos;t show this again
            </button>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
