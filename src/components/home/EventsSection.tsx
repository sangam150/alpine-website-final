"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  BookOpen,
  Globe,
  GraduationCap,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Australia Study Visa Workshop",
    description:
      "Learn about the latest visa requirements, GTE changes, and application process for Australia 2025 intake.",
    date: "2025-01-15",
    time: "14:00",
    duration: "2 hours",
    type: "webinar",
    country: "Australia",
    attendees: 45,
    maxAttendees: 50,
    speaker: "Sarah Johnson",
    speakerTitle: "Senior Visa Consultant",
    image: "/flags/australia.svg",
    calendlyLink: "https://calendly.com/alpine-edu/australia-workshop",
    zoomLink: "https://zoom.us/j/123456789",
  },
  {
    id: 2,
    title: "UK University Application Masterclass",
    description:
      "Complete guide to UCAS application, personal statement writing, and university selection for UK universities.",
    date: "2025-01-18",
    time: "15:30",
    duration: "1.5 hours",
    type: "workshop",
    country: "UK",
    attendees: 32,
    maxAttendees: 40,
    speaker: "David Thompson",
    speakerTitle: "UK Education Specialist",
    image: "/flags/uk.svg",
    calendlyLink: "https://calendly.com/alpine-edu/uk-masterclass",
    zoomLink: "https://zoom.us/j/987654321",
  },
  {
    id: 3,
    title: "Canada Study Permit & PR Pathways",
    description:
      "Understanding study permit requirements, post-graduation work permit, and permanent residency pathways.",
    date: "2025-01-22",
    time: "16:00",
    duration: "2.5 hours",
    type: "seminar",
    country: "Canada",
    attendees: 28,
    maxAttendees: 35,
    speaker: "Maria Rodriguez",
    speakerTitle: "Canada Immigration Expert",
    image: "/flags/canada.svg",
    calendlyLink: "https://calendly.com/alpine-edu/canada-seminar",
    zoomLink: "https://zoom.us/j/456789123",
  },
  {
    id: 4,
    title: "IELTS/PTE Test Preparation Session",
    description:
      "Free mock test, score analysis, and expert tips to improve your English proficiency test scores.",
    date: "2025-01-25",
    time: "10:00",
    duration: "3 hours",
    type: "test-prep",
    country: "Global",
    attendees: 55,
    maxAttendees: 60,
    speaker: "Emma Wilson",
    speakerTitle: "IELTS/PTE Trainer",
    image: "/globe.svg",
    calendlyLink: "https://calendly.com/alpine-edu/test-prep",
    zoomLink: "https://zoom.us/j/789123456",
  },
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "webinar":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "workshop":
      return "bg-green-100 text-green-800 border-green-200";
    case "seminar":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "test-prep":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getEventTypeIcon = (type: string) => {
  switch (type) {
    case "webinar":
      return <Video className="w-4 h-4" />;
    case "workshop":
      return <BookOpen className="w-4 h-4" />;
    case "seminar":
      return <GraduationCap className="w-4 h-4" />;
    case "test-prep":
      return <Globe className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

export default function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Past event";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return `${diffDays} days away`;
    return `${Math.ceil(diffDays / 7)} weeks away`;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upcoming Events & Webinars
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our expert-led sessions to learn about study abroad
            opportunities, visa processes, and test preparation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Event Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src={event.image}
                    alt={`${event.country} flag`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-sm"
                  />
                  <div>
                    <Badge
                      variant="outline"
                      className={`${getEventTypeColor(event.type)} border`}
                    >
                      <span className="inline-flex items-center gap-1">
                        {getEventTypeIcon(event.type)}
                        {event.type.charAt(0).toUpperCase() +
                          event.type.slice(1)}
                      </span>
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">
                    {getTimeAgo(event.date)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {event.attendees}/{event.maxAttendees} spots
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Event Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {event.time} ({event.duration})
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {event.speaker} - {event.speakerTitle}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Registration</span>
                  <span>
                    {Math.round((event.attendees / event.maxAttendees) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(event.attendees / event.maxAttendees) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  asChild
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open(event.calendlyLink, "_blank")}
                >
                  <Link href={event.calendlyLink} target="_blank">
                    Book Slot
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => window.open(event.zoomLink, "_blank")}
                >
                  Join Meeting
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can&apos;t Attend These Sessions?
            </h3>
            <p className="text-gray-600 mb-6">
              Book a personalized one-on-one consultation with our experts. Get
              tailored advice for your specific study abroad goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Link
                  href="https://calendly.com/alpine-edu/consultation"
                  target="_blank"
                >
                  Book Free Consultation
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/events">View All Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
