"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRightIcon,
  PlayIcon,
  StarIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  Phone,
  MessageCircle,
  Award,
  Users,
  Globe,
  Shield,
  CheckCircle,
  Target,
  GraduationCap,
  Building2,
  MapPin,
  Trophy,
} from "lucide-react";
import { getPageContent, getContentBlockClasses, getContentBlockTag, ContentBlock } from "@/lib/content-management";
import React from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

interface CTAButton {
  label: string;
  href: string;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  external?: boolean;
}

interface HeroSectionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  background?: ReactNode;
  animatedTexts?: string[];
  showTestimonialCarousel?: boolean;
  ctaButtons?: CTAButton[];
}

export default function HeroSection() {
  const [hero, setHero] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentText, setCurrentText] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !hero?.animatedTexts) return;
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % hero.animatedTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [hero?.animatedTexts, mounted]);

  useEffect(() => {
    async function fetchHero() {
      setLoading(true);
      const db = getFirestore();
      const heroDoc = await getDoc(doc(db, "homepage", "hero"));
      setHero(heroDoc.exists() ? heroDoc.data() : null);
      setLoading(false);
    }
    fetchHero();
  }, []);

  if (loading || !hero) {
    return <div className="text-center py-16 text-gray-400">Loading homepage...</div>;
  }

  const scrollToNextSection = () => {
    const nextSection = document.querySelector('#stats-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sky-100 to-blue-50">
      {/* World Map Background with Overlay */}
      {hero.background || (
        <div className="absolute inset-0 overflow-hidden">
          {/* World map background */}
          <div className="absolute inset-0 bg-[url('/globe.svg')] bg-center bg-no-repeat bg-contain opacity-5"></div>
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/80"></div>
          
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>

          {/* Country flags floating in background */}
          <div className="absolute top-20 right-20 w-16 h-12 opacity-15 animate-float">
            <Image src="/flags/australia.svg" alt="Australia" width={64} height={48} className="rounded shadow-sm" />
          </div>
          <div className="absolute top-40 right-40 w-16 h-12 opacity-15 animate-float animation-delay-1000">
            <Image src="/flags/uk.svg" alt="UK" width={64} height={48} className="rounded shadow-sm" />
          </div>
          <div className="absolute bottom-20 right-20 w-16 h-12 opacity-15 animate-float animation-delay-2000">
            <Image src="/flags/canada.svg" alt="Canada" width={64} height={48} className="rounded shadow-sm" />
          </div>
          <div className="absolute bottom-40 right-40 w-16 h-12 opacity-15 animate-float animation-delay-3000">
            <Image src="/flags/new-zealand.svg" alt="New Zealand" width={64} height={48} className="rounded shadow-sm" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-blue-50 text-green-800 text-sm font-semibold border border-green-200 shadow-sm backdrop-blur-sm mb-8"
          >
            <Shield className="w-4 h-4 mr-2 text-green-600" />
            <span className="font-bold">Trusted by 10,000+ Students</span>
            <span className="mx-2 text-green-600">|</span>
            <span className="font-bold">98% Visa Success Rate</span>
          </motion.div>

          {/* Dynamic Content Blocks */}
          {loading ? (
            <div className="text-gray-400 py-8">Loading...</div>
          ) : hero.blocks && hero.blocks.length > 0 ? (
            hero.blocks.map((block: any) => {
              const Tag = getContentBlockTag(block);
              if (block.type === "cta") {
                const meta = block.metadata as any;
                return (
                  <Button
                    key={block.id}
                    asChild
                    size="lg"
                    className={getContentBlockClasses(block) + " mb-4"}
                    aria-label={block.value}
                  >
                    <Link
                      href={meta?.href || "/contact"}
                      target={meta?.external ? "_blank" : undefined}
                      rel={meta?.external ? "noopener noreferrer" : undefined}
                    >
                      {block.value}
                    </Link>
                  </Button>
                );
              }
              // For all other tags, do not pass href/target/rel
              return React.createElement(
                Tag,
                {
                  key: block.id,
                  className: getContentBlockClasses(block) + " mb-4",
                },
                block.value
              );
            })
          ) : (
            // Fallback to default headline/subtitle/CTAs if no blocks
            <>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
              >
                {hero.title || (
                  <>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
                      Your Journey to Study
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800">
                      Abroad Starts Here
                    </span>
                  </>
                )}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                {hero.subtitle || "10,000+ Students Guided | 98% Visa Success Rate | Govt. Registered"}
              </motion.p>
            </>
          )}

          {/* Animated Text Loop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl text-blue-600 font-semibold mb-8"
          >
            {mounted ? (
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {hero.animatedTexts && hero.animatedTexts[currentText]}
                </motion.span>
              </AnimatePresence>
            ) : (
              <span className="inline-block">{hero.animatedTexts && hero.animatedTexts[0]}</span>
            )}
            <span className="text-gray-600"> • Study Abroad Experts</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              aria-label="Start Counseling"
            >
              <Link href="/contact">
                <GraduationCap className="w-5 h-5 mr-2" />
                🎓 Start Counseling
                <ChevronRightIcon className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 transform"
              aria-label="Take Quiz"
            >
              <Link href="/quiz/country">
                <Target className="w-5 h-5 mr-2" />
                🎯 Take Quiz
              </Link>
            </Button>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-gray-50 rounded-2xl p-6 mb-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">🏛️ Govt Registered</div>
                  <div className="text-sm text-gray-600">Licensed & Certified</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">🌎 20+ Global Universities</div>
                  <div className="text-sm text-gray-600">Partner Institutions</div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Trophy className="w-6 h-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">💼 98% Visa Success</div>
                  <div className="text-sm text-gray-600">Proven Track Record</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Intake Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-200 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-orange-600 font-bold text-xl">🎓</span>
                <span className="text-orange-800 font-semibold text-lg">Intakes Open:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {hero.intakeDates && hero.intakeDates.map((date: string, index: number) => (
                  <span key={index} className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                    {date}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToNextSection}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-gray-600 hover:text-blue-600 transition-colors"
          aria-label="Scroll to next section"
        >
          <span className="text-sm font-medium">Discover More</span>
          <ChevronDownIcon className="w-6 h-6 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  );
}
