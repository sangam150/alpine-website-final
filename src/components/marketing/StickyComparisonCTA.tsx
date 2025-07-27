"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MessageCircle,
  Phone,
  Star,
  CheckCircle,
  ArrowRight,
  X,
  Users,
  Award,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface StickyComparisonCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  showWhatsApp?: boolean;
  showPhone?: boolean;
  showConsultation?: boolean;
  stats?: {
    students?: string;
    successRate?: string;
    countries?: string;
    experience?: string;
  };
}

export default function StickyComparisonCTA({
  title = "Need Help Choosing?",
  subtitle = "Get expert guidance to make the right decision",
  ctaText = "Book Free Consultation",
  ctaLink = "/contact",
  showWhatsApp = true,
  showPhone = true,
  showConsultation = true,
  stats = {
    students: "5000+",
    successRate: "98%",
    countries: "15+",
    experience: "10+ Years",
  },
}: StickyComparisonCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after 3 seconds of page load
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("comparison_cta_dismissed")) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("comparison_cta_dismissed", "1");
  };

  const handleWhatsApp = () => {
    window.open(
      "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20choosing%20the%20right%20study%20abroad%20option.",
      "_blank",
    );
  };

  const handlePhone = () => {
    window.open("tel:+977-1-4444444", "_self");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
      <Card className="mx-4 mb-4 shadow-2xl border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5" />
                <h3 className="font-bold text-lg">{title}</h3>
              </div>
              <p className="text-blue-100 text-sm mb-3">{subtitle}</p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-blue-100">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{stats.students} Students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  <span>{stats.successRate} Success</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  <span>{stats.countries} Countries</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {showWhatsApp && (
                <Button
                  size="sm"
                  onClick={handleWhatsApp}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white border-0"
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              )}

              {showPhone && (
                <Button
                  size="sm"
                  onClick={handlePhone}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              )}

              {showConsultation && (
                <Button
                  asChild
                  size="sm"
                  className="bg-white text-blue-600 hover:bg-gray-100 border-0 font-semibold"
                >
                  <Link href={ctaLink}>
                    {ctaText}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}

              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 border-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Variant for comparison pages
export function ComparisonPageCTA() {
  return (
    <StickyComparisonCTA
      title="Still Comparing Options?"
      subtitle="Our experts can help you choose the best path"
      ctaText="Get Expert Advice"
      ctaLink="/contact"
      showWhatsApp={true}
      showPhone={true}
      showConsultation={true}
    />
  );
}

// Variant for test preparation pages
export function TestPrepCTA() {
  return (
    <StickyComparisonCTA
      title="IELTS vs PTE vs TOEFL?"
      subtitle="Get personalized test preparation guidance"
      ctaText="Free Mock Test"
      ctaLink="/test-preparation"
      showWhatsApp={true}
      showPhone={true}
      showConsultation={true}
    />
  );
}

// Variant for country pages
export function CountryPageCTA() {
  return (
    <StickyComparisonCTA
      title="Ready to Study Abroad?"
      subtitle="Start your application process today"
      ctaText="Apply Now"
      ctaLink="/apply"
      showWhatsApp={true}
      showPhone={true}
      showConsultation={true}
    />
  );
}

// Variant for scholarship pages
export function ScholarshipCTA() {
  return (
    <StickyComparisonCTA
      title="Need Scholarship Help?"
      subtitle="Our experts can guide you through the process"
      ctaText="Scholarship Consultation"
      ctaLink="/contact"
      showWhatsApp={true}
      showPhone={true}
      showConsultation={true}
    />
  );
}
