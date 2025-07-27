"use client";

import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { Testimonial } from "@/types/cms";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Play,
  Quote,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [section, setSection] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "homepage", "testimonials");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTestimonials(docSnap.data().testimonials || []);
        setSection(docSnap.data());
      }
      setLoading(false);
    }
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animation trigger if needed
        }
      },
      { threshold: 0.3 },
    );

    const element = document.getElementById("testimonials-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <section id="testimonials-section" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 py-16">Loading testimonials...</div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section id="testimonials-section" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 py-16">No testimonials found.</div>
      </section>
    );
  }

  return (
    <section
      id="testimonials-section"
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {section?.title || "Student Success Stories"}
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {section?.subtitle || "Real success stories from students who achieved their study abroad dreams with Alpine Education"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Enhanced Video Testimonial */}
          <div className="relative order-2 lg:order-1 flex flex-col h-full min-h-[480px]">
            <div className="relative flex-1 flex flex-col justify-center">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>

              <div className="relative bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-6 lg:p-8 shadow-2xl border border-gray-200 flex flex-col h-full min-h-[400px] justify-center">
                {/* Video Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  🎬 Watch Student Stories
                </div>

                <div className="aspect-video bg-black/20 rounded-2xl flex items-center justify-center backdrop-blur relative overflow-hidden shadow-xl">
                  {isPlaying ? (
                    // No video property, fallback to image
                    <div className="w-full h-full flex items-center justify-center">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={256}
                        height={256}
                        className="object-cover rounded-2xl max-h-64 mx-auto"
                      />
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {testimonials[currentIndex].university}
                      </p>
                      <Button
                        onClick={handleVideoPlay}
                        className="mt-4 bg-white text-blue-600 hover:bg-gray-100"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        View Student Photo
                      </Button>
                    </div>
                  )}
                </div>

                {/* Student Info */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center space-x-1 mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ),
                    )}
                  </div>
                  <p className="text-white/90 text-sm">
                    {testimonials[currentIndex].text}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Testimonials Content */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Current Testimonial */}
            <div className="relative">
              {/* Enhanced Quote Icon */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-8 w-8 text-white" />
              </div>

              {/* Enhanced Content */}
              <div className="pl-12">
                {/* Enhanced Rating */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-6 w-6 text-yellow-500 fill-current"
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {testimonials[currentIndex].rating}.0 rating
                  </span>
                </div>

                {/* Enhanced Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </blockquote>

                {/* Enhanced Student Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonials[currentIndex].name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">
                        {testimonials[currentIndex].course}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].university},{" "}
                        {testimonials[currentIndex].country}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">5000+</div>
                <div className="text-sm text-gray-600">Students Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Visa Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">12+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of successful students who achieved their study
                abroad dreams with Alpine Education
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  View Success Stories
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
