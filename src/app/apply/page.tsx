import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Apply for Study Abroad - Alpine Education',
  description: 'Start your study abroad application with Alpine Education. Get expert guidance for your international education journey.',
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Apply for Study Abroad
          </h1>
          <p className="text-lg text-gray-600">
            Start your application process with Alpine Education. Our experts will guide you through every step.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Application Form Coming Soon</CardTitle>
            <CardDescription>
              We&apos;re building a comprehensive application form to collect your information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                The application will include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Personal information and contact details</li>
                <li>Academic background and qualifications</li>
                <li>Preferred study destination and program</li>
                <li>English proficiency test scores</li>
                <li>Budget and timeline preferences</li>
                <li>Document upload capabilities</li>
              </ul>
              
              <div className="mt-8 space-y-4">
                <Button asChild className="w-full">
                  <Link href="/contact">
                    Contact Us for Application
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 