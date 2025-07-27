"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Rocket,
  Home,
  Search,
  MessageCircle,
  Globe,
  Compass,
} from "lucide-react";

export default function NotFound() {
  const popularPages = [
    {
      name: "Study Destinations",
      href: "/countries",
      icon: <Globe className="h-4 w-4" />,
    },
    {
      name: "Test Preparation",
      href: "/test-preparation",
      icon: <Search className="h-4 w-4" />,
    },
    {
      name: "Scholarships",
      href: "/scholarships",
      icon: <Rocket className="h-4 w-4" />,
    },
    {
      name: "Contact Us",
      href: "/contact",
      icon: <MessageCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Rocket className="h-16 w-16 text-blue-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Lost in Visa Galaxy? 🚀
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Oops! It looks like this page has taken an unexpected detour to a
              foreign country. Don&apos;t worry, we&apos;ll help you navigate back to your
              study abroad journey!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Help
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Popular Pages */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Compass className="h-5 w-5 inline mr-2" />
              Popular Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularPages.map((page) => (
                <Button
                  key={page.name}
                  asChild
                  variant="ghost"
                  className="justify-start h-auto p-3 hover:bg-blue-50"
                >
                  <Link href={page.href}>
                    <div className="flex items-center gap-3">
                      <div className="text-blue-600">{page.icon}</div>
                      <span className="text-left">{page.name}</span>
                    </div>
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fun Facts */}
        <div className="mt-8 text-sm text-gray-500">
          <p className="mb-2">
            💡 <strong>Fun Fact:</strong> Did you know that 95% of our students
            successfully get their visas? That&apos;s better odds than finding this
            page!
          </p>
          <p>
            🎯 <strong>Pro Tip:</strong> Use our course finder to discover the
            perfect study program, or chat with our AI assistant for instant
            guidance.
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Need immediate help?</strong> WhatsApp us at{" "}
            <a
              href="https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20got%20lost%20on%20your%20website%20and%20need%20help."
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              +977-1-4444444
            </a>{" "}
            for instant support!
          </p>
        </div>

        {/* Alpine AI Chatbot */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Alpine AI Assistant</p>
              <p className="text-xs text-blue-700">Available 24/7 to help you</p>
            </div>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            <strong>Lost? No worries!</strong> Our AI assistant can help you find what you&apos;re looking for or guide you to the right page.
          </p>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              // Trigger chatbot or scroll to chatbot if exists
              const chatbot = document.querySelector('[data-chatbot]');
              if (chatbot) {
                chatbot.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/?openChat=true';
              }
            }}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat with Alpine AI
          </Button>
        </div>
      </div>
    </div>
  );
}
