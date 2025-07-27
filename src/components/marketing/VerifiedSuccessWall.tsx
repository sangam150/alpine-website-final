"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Star, Flag, Calendar, GraduationCap, Quote } from "lucide-react";
import Image from "next/image";
import { FirebaseService, COLLECTIONS, Testimonial as FirestoreTestimonial } from "@/lib/firebase-collections";

interface SuccessStory {
  id: string;
  studentName: string;
  studentInitials: string;
  country: string;
  countryFlag: string;
  courseLevel: string;
  university: string;
  visaIssuedDate: string;
  intake: string;
  quote: string;
  verified: boolean;
  photo?: string;
}

const countries = ["All Countries", "Australia", "Canada", "UK", "USA", "Germany", "Ireland", "Netherlands"];
const intakes = ["All Intakes", "February 2024", "September 2024", "October 2024", "Fall 2024", "Spring 2025"];
const courseLevels = ["All Levels", "Bachelor's Degree", "Master's Degree", "PhD", "Diploma"];

export default function VerifiedSuccessWall() {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [allStories, setAllStories] = useState<SuccessStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedIntake, setSelectedIntake] = useState("All Intakes");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");

  useEffect(() => {
    async function fetchStories() {
      // Fetch testimonials from Firestore
      const firestoreStories = await FirebaseService.getFeaturedTestimonials();
      // Map Firestore testimonials to SuccessStory
      const mappedStories: SuccessStory[] = firestoreStories.map((t) => ({
        id: t.id || "",
        studentName: t.studentName,
        studentInitials: t.studentName.split(" ").map((n) => n[0]).join("").toUpperCase(),
        country: t.country,
        countryFlag: `/flags/${t.country.toLowerCase()}.svg`,
        courseLevel: t.university || "",
        university: t.university,
        visaIssuedDate: t.createdAt ? t.createdAt.toDate().toISOString().split("T")[0] : "",
        intake: "", // Add if available in Firestore
        quote: t.quote,
        verified: t.isApproved,
        photo: t.image,
      }));
      setAllStories(mappedStories);
      setStories(mappedStories);
    }
    fetchStories();
  }, []);

  useEffect(() => {
    let filtered = allStories;
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(story => story.country === selectedCountry);
    }
    if (selectedIntake !== "All Intakes") {
      filtered = filtered.filter(story => story.intake === selectedIntake);
    }
    if (selectedLevel !== "All Levels") {
      filtered = filtered.filter(story => story.courseLevel === selectedLevel);
    }
    setStories(filtered);
    setCurrentIndex(0);
  }, [selectedCountry, selectedIntake, selectedLevel, allStories]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verified Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real students, real results. See how Alpine Education has helped thousands of students achieve their study abroad dreams.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedIntake} onValueChange={setSelectedIntake}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Intake" />
            </SelectTrigger>
            <SelectContent>
              {intakes.map((intake) => (
                <SelectItem key={intake} value={intake}>
                  {intake}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {courseLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Success Stories Carousel */}
        {stories.length > 0 ? (
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="flex transition-transform duration-500 ease-in-out">
                {stories.map((story, index) => (
                  <div
                    key={story.id}
                    className="w-full flex-shrink-0"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <Card className="border-0 bg-white/90 backdrop-blur-sm">
                      <CardHeader className="text-center pb-4">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                            {story.studentInitials}
                          </div>
                          <div className="flex items-center gap-2">
                            <Image
                              src={story.countryFlag}
                              alt={`${story.country} flag`}
                              width={32}
                              height={24}
                              className="rounded shadow-sm"
                            />
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              <Star className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          {story.studentName}
                        </CardTitle>
                        <p className="text-gray-600">
                          {story.courseLevel} • {story.university}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Quote className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-800">Student Quote</span>
                          </div>
                          <p className="text-gray-700 italic">&quot;{story.quote}&quot;</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Visa Issued</p>
                              <p className="text-sm font-medium">{formatDate(story.visaIssuedDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Intake</p>
                              <p className="text-sm font-medium">{story.intake}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {stories.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Dots Indicator */}
            {stories.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No success stories found for the selected filters.</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
            <p className="text-gray-600">Students Guided</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
            <p className="text-gray-600">Visa Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">12+</div>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
} 