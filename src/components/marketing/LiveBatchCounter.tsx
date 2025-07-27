"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Clock, Video, TrendingUp, Globe } from "lucide-react";
import Link from "next/link";
import { FirebaseService, COLLECTIONS } from "@/lib/firebase-collections";

interface LiveEvent {
  id: string;
  title: string;
  type: "webinar" | "batch" | "event";
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  status: "upcoming" | "live" | "completed";
  country?: string;
  topic?: string;
}

interface CounterStats {
  totalStudents: number;
  activeBatches: number;
  upcomingEvents: number;
  liveWebinars: number;
  countries: number;
  successRate: number;
}

export default function LiveBatchCounter() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [stats, setStats] = useState<CounterStats>({
    totalStudents: 0,
    activeBatches: 0,
    upcomingEvents: 0,
    liveWebinars: 0,
    countries: 0,
    successRate: 0
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      // Fetch live events from Firestore
      const firestoreEvents = await FirebaseService.getDocuments<any>("liveEvents");
      setEvents(firestoreEvents);
      // Fetch stats from Firestore (or compute from events)
      // Example: Fetch stats from a 'stats' collection or compute from events
      // const firestoreStats = await FirebaseService.getDocuments<any>("stats");
      // setStats(firestoreStats[0] || stats);
    }
    fetchData();
  }, []);

  const getTimeUntil = (startTime: string) => {
    const start = new Date(startTime);
    const diff = start.getTime() - currentTime.getTime();
    
    if (diff <= 0) return "Live Now";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-red-100 text-red-800 animate-pulse">🔴 LIVE</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">⏰ Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">✅ Completed</Badge>;
      default:
        return null;
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return <Video className="w-5 h-5" />;
      case "batch":
        return <Users className="w-5 h-5" />;
      case "event":
        return <Calendar className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const liveEvents = events.filter(e => e.status === "live");
  const upcomingEvents = events.filter(e => e.status === "upcoming");

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Live Activity Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time updates on our current batches, live webinars, and upcoming events. Join thousands of students in their study abroad journey.
          </p>
        </div>

        {/* Live Stats Counter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.totalStudents.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Active Students</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-green-600 mb-1">
                {stats.activeBatches}
              </div>
              <p className="text-sm text-gray-600">Active Batches</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {stats.upcomingEvents}
              </div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-red-600 mb-1">
                {stats.liveWebinars}
              </div>
              <p className="text-sm text-gray-600">Live Webinars</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {stats.countries}
              </div>
              <p className="text-sm text-gray-600">Countries</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {stats.successRate}%
              </div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Live Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Live Webinars */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Video className="w-5 h-5" />
                Live Webinars
                <Badge className="bg-red-100 text-red-800 animate-pulse">🔴 LIVE</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {liveEvents.length > 0 ? (
                liveEvents.map((event) => (
                  <div key={event.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      {getStatusBadge(event.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{event.topic}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.participants}/{event.maxParticipants}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getTimeUntil(event.startTime)}
                        </span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Join Now
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No live webinars at the moment</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    {getStatusBadge(event.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{event.topic}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {event.participants}/{event.maxParticipants}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getTimeUntil(event.startTime)}
                      </span>
                    </div>
                    <Button size="sm" variant="outline">
                      Register
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingEvents.length > 3 && (
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/events">View All Events</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Your Study Abroad Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join our next batch or register for an upcoming webinar to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Users className="w-5 h-5 mr-2" />
                Join Next Batch
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Video className="w-5 h-5 mr-2" />
                Register for Webinar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 