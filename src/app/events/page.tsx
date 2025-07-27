"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ExternalLink,
  Video,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "webinar" | "workshop" | "q&a" | "intake";
  location: string;
  capacity: number;
  registered: number;
  image: string;
  registrationLink?: string;
  zoomLink?: string;
  tags: string[];
  featured?: boolean;
}

const events: Event[] = [
  {
    id: "1",
    title: "Australia Intake 2025 - Complete Guide",
    description:
      "Everything you need to know about studying in Australia for 2025 intakes. Learn about universities, courses, costs, and visa requirements.",
    date: "2025-01-15",
    time: "2:00 PM - 4:00 PM",
    type: "webinar",
    location: "Online (Zoom)",
    capacity: 100,
    registered: 67,
    image: "/public/student-success-thumbnail.jpg",
    zoomLink: "https://zoom.us/j/123456789",
    tags: ["Australia", "2025 Intake", "Visa Guide"],
    featured: true,
  },
  {
    id: "2",
    title: "UK Student Visa Q&A Session",
    description:
      "Get your questions answered about UK student visas, requirements, and application process.",
    date: "2025-01-20",
    time: "3:00 PM - 4:30 PM",
    type: "q&a",
    location: "Alpine Office, Kathmandu",
    capacity: 50,
    registered: 23,
    image: "/public/student-success-thumbnail.jpg",
    tags: ["UK", "Visa Q&A", "In-Person"],
  },
  {
    id: "3",
    title: "IELTS Preparation Workshop",
    description:
      "Free IELTS preparation workshop with expert tips and strategies for achieving your target score.",
    date: "2025-01-25",
    time: "10:00 AM - 12:00 PM",
    type: "workshop",
    location: "Online (Google Meet)",
    capacity: 75,
    registered: 45,
    image: "/public/student-success-thumbnail.jpg",
    tags: ["IELTS", "Test Preparation", "Free Workshop"],
  },
  {
    id: "4",
    title: "Canada Study Permit Application Workshop",
    description:
      "Step-by-step guide to applying for Canadian study permits. Learn about documents, timeline, and common mistakes.",
    date: "2025-02-01",
    time: "1:00 PM - 3:00 PM",
    type: "workshop",
    location: "Online (Zoom)",
    capacity: 60,
    registered: 38,
    image: "/public/student-success-thumbnail.jpg",
    tags: ["Canada", "Study Permit", "Application Guide"],
  },
  {
    id: "5",
    title: "Scholarship Opportunities for 2025",
    description:
      "Discover scholarship opportunities for international students in top universities worldwide.",
    date: "2025-02-05",
    time: "4:00 PM - 5:30 PM",
    type: "webinar",
    location: "Online (Zoom)",
    capacity: 80,
    registered: 52,
    image: "/public/student-success-thumbnail.jpg",
    tags: ["Scholarships", "Funding", "Global Opportunities"],
  },
];

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesType = selectedType === "all" || event.type === selectedType;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesType && matchesSearch;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return <Video className="h-5 w-5" />;
      case "workshop":
        return <BookOpen className="h-5 w-5" />;
      case "q&a":
        return <Users className="h-5 w-5" />;
      case "intake":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "webinar":
        return "bg-blue-100 text-blue-800";
      case "workshop":
        return "bg-green-100 text-green-800";
      case "q&a":
        return "bg-purple-100 text-purple-800";
      case "intake":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <Breadcrumb
            items={[{ label: "Events", current: true }]}
            className="text-blue-100 mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">
            Upcoming Events & Webinars
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Join our free events to learn about study abroad opportunities, visa
            processes, and get expert guidance from our counselors.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {["all", "webinar", "workshop", "q&a", "intake"].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="capitalize"
              >
                {type === "all" ? "All Events" : type}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow ${event.featured ? "ring-2 ring-blue-500" : ""}`}
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {getEventIcon(event.type)}
                </div>
                {event.featured && (
                  <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                    Featured
                  </Badge>
                )}
                <Badge
                  className={`absolute top-2 right-2 ${getTypeColor(event.type)}`}
                >
                  {event.type.toUpperCase()}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {event.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {event.registered}/{event.capacity} registered
                  </span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  {event.zoomLink && (
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={event.zoomLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Join Zoom
                      </a>
                    </Button>
                  )}
                  <Button size="sm" className="flex-1">
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
