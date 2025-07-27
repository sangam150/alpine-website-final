"use client";

import { useState, useEffect } from "react";
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  Camera,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  X,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FirebaseService } from "@/lib/firebase-collections";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
  like_count?: number;
  comments_count?: number;
  category:
    | "Student Life"
    | "Visa Granted"
    | "Events"
    | "Counseling"
    | "Test Prep"
    | "Success Stories";
  title: string;
}

const CATEGORIES = [
  "All",
  "Student Life",
  "Visa Granted",
  "Events",
  "Counseling",
  "Test Prep",
  "Success Stories",
] as const;

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        setIsLoading(true);
        // Fetch posts from Firestore
        const firestorePosts = await FirebaseService.getDocuments<InstagramPost>("instagramPosts");
        setPosts(firestorePosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching Instagram posts:", err);
        setError("Unable to load Instagram posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInstagramPosts();
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length,
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredPosts.length);
  };

  const prevLightbox = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length,
    );
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Success Stories":
        return <Award className="h-4 w-4" />;
      case "Test Prep":
        return <BookOpen className="h-4 w-4" />;
      case "Counseling":
        return <GraduationCap className="h-4 w-4" />;
      case "Events":
        return <Calendar className="h-4 w-4" />;
      case "Student Life":
        return <Users className="h-4 w-4" />;
      case "Visa Granted":
        return <Award className="h-4 w-4" />;
      default:
        return <Camera className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Instagram feed...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Instagram className="h-8 w-8 text-pink-600" />
              <h2 className="text-3xl font-bold text-gray-900">
                Follow Our Journey
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with student success stories, visa approvals, events,
              and behind-the-scenes moments from Alpine Education.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category !== "All" && getCategoryIcon(category)}
                <span className="ml-1">{category}</span>
              </Button>
            ))}
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {filteredPosts.map((post, index) => (
                  <div key={post.id} className="w-full flex-shrink-0 px-4">
                    <Card className="max-w-md mx-auto hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-0">
                        {/* Image Container */}
                        <div
                          className="relative group cursor-pointer"
                          onClick={() => openLightbox(index)}
                        >
                          <div className="aspect-square overflow-hidden rounded-t-lg">
                            <Image
                              src={post.media_url}
                              alt={post.title}
                              width={400}
                              height={400}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Maximize2 className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          {/* Category Badge */}
                          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                            {getCategoryIcon(post.category)}
                            <span className="ml-1">{post.category}</span>
                          </Badge>

                          {/* Media Type Indicator */}
                          {post.media_type === "VIDEO" && (
                            <div className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full">
                              <Play className="h-4 w-4" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {post.caption}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.like_count}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{post.comments_count}</span>
                              </div>
                            </div>
                            <span>{formatTimestamp(post.timestamp)}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() =>
                                window.open(post.permalink, "_blank")
                              }
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View on Instagram
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => openLightbox(index)}
                            >
                              <Maximize2 className="h-4 w-4 mr-1" />
                              Enlarge
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {filteredPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button
              onClick={() =>
                window.open("https://instagram.com/alpineeducation", "_blank")
              }
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Follow Us on Instagram
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <X className="h-4 w-4" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevLightbox}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={nextLightbox}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image */}
            <div className="aspect-square overflow-hidden rounded-lg">
              <Image
                src={filteredPosts[lightboxIndex].media_url}
                alt={filteredPosts[lightboxIndex].title}
                width={800}
                height={800}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-4 text-white text-center">
              <h3 className="font-semibold mb-2">
                {filteredPosts[lightboxIndex].title}
              </h3>
              <p className="text-sm opacity-90">
                {filteredPosts[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
