'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Search, 
  Phone, 
  Mail, 
  MapPin,
  ArrowLeft,
  GraduationCap,
  Globe
} from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-blue-600">
            <GraduationCap className="h-8 w-8" />
            <span>Alpine Education</span>
          </Link>
        </div>

        {/* 404 Content */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Oops! The page you're looking for doesn't exist.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Link href="/">
                <Button className="w-full" variant="default">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              
              <Link href="/countries">
                <Button className="w-full" variant="outline">
                  <Globe className="mr-2 h-4 w-4" />
                  Study Destinations
                </Button>
              </Link>
            </div>

            {/* Popular Pages */}
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 mb-3">Popular Pages:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <Link href="/about" className="text-blue-600 hover:text-blue-800 hover:underline">
                  About Us
                </Link>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Contact Us
                </Link>
                <Link href="/test-preparation" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Test Preparation
                </Link>
                <Link href="/student-services" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Student Services
                </Link>
                <Link href="/resources" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Resources
                </Link>
                <Link href="/apply" className="text-blue-600 hover:text-blue-800 hover:underline">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+977-1-4XXXXXXX</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@alpineeducation.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back Button */}
        <div className="mt-6">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
} 