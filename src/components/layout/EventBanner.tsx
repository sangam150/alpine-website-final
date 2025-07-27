"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Gift, Megaphone } from "lucide-react";
import Link from "next/link";

interface EventBannerProps {
  type: "webinar" | "offer" | "announcement";
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  expiresAt?: string;
}

export default function EventBanner({
  type,
  title,
  description,
  ctaText,
  ctaLink,
  expiresAt,
}: EventBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem("eventBannerDismissed");
    if (!dismissed) {
      setIsVisible(true);
    }

    // Check if banner has expired
    if (expiresAt && new Date(expiresAt) < new Date()) {
      setIsVisible(false);
    }
  }, [expiresAt]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    sessionStorage.setItem("eventBannerDismissed", "true");
  };

  const getIcon = () => {
    switch (type) {
      case "webinar":
        return <Calendar className="w-5 h-5" />;
      case "offer":
        return <Gift className="w-5 h-5" />;
      case "announcement":
        return <Megaphone className="w-5 h-5" />;
      default:
        return <Megaphone className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "webinar":
        return "bg-gradient-to-r from-blue-600 to-purple-600";
      case "offer":
        return "bg-gradient-to-r from-orange-500 to-red-500";
      case "announcement":
        return "bg-gradient-to-r from-green-600 to-blue-600";
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600";
    }
  };

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className={`${getBgColor()} text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">{getIcon()}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold truncate">
                {title}
              </h3>
              <p className="text-xs sm:text-sm opacity-90 truncate">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href={ctaLink}
              className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105"
            >
              {ctaText}
            </Link>
            <button
              onClick={handleDismiss}
              className="flex-shrink-0 p-1 sm:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
