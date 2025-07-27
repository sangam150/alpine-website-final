"use client";

import { useEffect, useState } from "react";
import { Testimonial } from "@/types/cms";
import { getTestimonials } from "@/lib/content-management";
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
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      setLoading(true);
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (e) {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
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

  if (loading) return <div className="py-12 text-center text-gray-400">Loading testimonials...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!testimonials.length) return <div className="py-12 text-center text-gray-400">No testimonials found.</div>;

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
    // Handle video play functionality
  };

  const testimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials-section"
      className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Quote className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Student Success Stories
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from our students who have successfully achieved their study
            abroad dreams with Alpine Education
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Main Testimonial Card */}
          <Card className="relative overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Student Image & Info */}
                <div className="lg:w-1/3 flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Country Flag */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-white shadow-md overflow-hidden">
                      <Image
                        src={testimonial.country}
                        alt={testimonial.country}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {testimonial.name}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">
                        {testimonial.university}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      <span>{testimonial.course}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span>{testimonial.year}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>

                  {/* Video Play Button */}
                  {testimonial.featured && (
                    <Button
                      onClick={handleVideoPlay}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Watch Video
                    </Button>
                  )}
                </div>

                {/* Testimonial Content */}
                <div className="lg:w-2/3 flex flex-col justify-center">
                  <div className="relative">
                    {/* Quote Icon */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="h-8 w-8 text-white" />
                    </div>

                    {/* Testimonial Text */}
                    <div className="pl-12">
                      <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>

                      {/* Achievement Highlight */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-green-600" />
                          <span className="font-semibold text-green-800">
                            {testimonial.university}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
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
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Student Rating</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() =>
              window.open(
                "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20want%20to%20join%20your%20success%20stories.",
                "_blank",
              )
            }
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Our Success Stories
          </Button>
        </div>
      </div>
    </section>
  );
}
