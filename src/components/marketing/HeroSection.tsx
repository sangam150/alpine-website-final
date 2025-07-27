"use client";

import { CheckCircle, Star, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] bg-[#f7faff] flex flex-col justify-center pb-0 pt-8 md:pt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4">
        {/* Left: Headline and Trust Badges */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <span className="inline-block mb-4 px-4 py-1 bg-blue-50 text-blue-700 rounded-full font-medium text-sm">
            ★ Leading Study Abroad Consultancy in Nepal
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Start Your{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Study Abroad
            </span>{" "}
            Journey
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-xl">
            Get expert guidance for studying in Australia, UK, Canada, Germany,
            France, and more. Free counseling, visa assistance, and personalized
            support for your international education dreams.
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-4 w-full max-w-md">
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-5 h-5" /> Free Counseling Session
            </div>
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-5 h-5" /> 95% Visa Success Rate
            </div>
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-5 h-5" /> 3000+ Students Placed
            </div>
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-5 h-5" /> 12+ Countries
            </div>
          </div>
          <div className="flex flex-row gap-4 mb-4 w-full max-w-md">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow transition-all flex-1"
            >
              <a
                href="https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20would%20like%20to%20book%20a%20free%20consultation%20session."
                target="_blank"
                rel="noopener"
              >
                Book Free Counselling
              </a>
            </Button>
            <Button
              asChild
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow transition-all flex-1"
            >
              <a href="/apply">Apply Now</a>
            </Button>
          </div>
          <div className="flex gap-8 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <span className="font-bold text-blue-900">3000+</span> Students
              Placed
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-blue-900">12+</span> Countries
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-blue-900">95%</span> Success Rate
            </div>
          </div>
        </div>
        {/* Right: Student Success Stories Card */}
        <div className="flex-1 flex items-center justify-center relative min-w-[340px]">
          <div className="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 rounded-3xl shadow-2xl p-0 w-full max-w-md min-h-[320px] flex flex-col justify-center items-center overflow-hidden">
            {/* Overlay: 3000+ Students Placed */}
            <div className="absolute top-4 right-4 bg-white rounded-xl shadow px-6 py-3 text-center z-10">
              <div className="text-2xl font-bold text-green-600">3000+</div>
              <div className="text-gray-700 text-xs">Students Placed</div>
            </div>
            {/* Overlay: 95% Visa Success Rate */}
            <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow px-6 py-3 text-center z-10">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-gray-700 text-xs">Visa Success Rate</div>
              <div className="flex justify-center mt-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            {/* Main Card Content */}
            <div className="flex flex-col items-center justify-center h-full w-full p-10">
              <div className="text-white text-xl font-semibold mb-2">
                Student Success Stories
              </div>
              <div className="text-white/80 text-base mb-4 text-center">
                Watch how we help students achieve their dreams
              </div>
              <button
                className="bg-white/20 rounded-full p-4 flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Watch Student Stories"
              >
                <PlayCircle className="w-12 h-12 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Chat/WhatsApp Buttons (already implemented elsewhere, but ensure they are present) */}
    </section>
  );
}
