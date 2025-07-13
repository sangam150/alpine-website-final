import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, FileText, Users, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use - Alpine Education & Visa Services',
  description: 'Terms and conditions for using Alpine Education & Visa Services website and services.',
  keywords: 'terms of use, conditions, alpine education, visa services, study abroad',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Use</h1>
          </div>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Welcome to Alpine Education & Visa Services. These Terms of Use govern your use of our website 
                and services. By accessing or using our services, you agree to be bound by these terms.
              </p>
              <p className="text-gray-700">
                Alpine Education & Visa Services ("we," "our," or "us") provides study abroad consultation, 
                visa services, and educational guidance to students in Nepal and abroad.
              </p>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">2. Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">Our services include but are not limited to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Study abroad consultation and guidance</li>
                <li>University application assistance</li>
                <li>Visa application support</li>
                <li>Test preparation coaching (IELTS, PTE, TOEFL)</li>
                <li>Document preparation and review</li>
                <li>Pre-departure orientation</li>
                <li>Post-arrival support</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of your account</li>
                <li>Use our services for lawful purposes only</li>
                <li>Not engage in any fraudulent or deceptive practices</li>
                <li>Respect intellectual property rights</li>
                <li>Not interfere with the proper functioning of our website</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy & Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">4. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We are committed to protecting your privacy. Our collection and use of personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms of Use.
              </p>
              <p className="text-gray-700">
                By using our services, you consent to the collection and use of your information as described 
                in our Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">5. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Service fees are payable in advance unless otherwise agreed. Payment methods include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Bank transfer</li>
                <li>Cash payment at our office</li>
                <li>Online payment (where available)</li>
              </ul>
              <p className="text-gray-700">
                All fees are non-refundable unless otherwise specified in our service agreement.
              </p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Alpine Education & Visa Services provides guidance and assistance but cannot guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>University admission outcomes</li>
                <li>Visa approval decisions</li>
                <li>Test score results</li>
                <li>Employment opportunities</li>
              </ul>
              <p className="text-gray-700">
                We are not liable for any indirect, incidental, or consequential damages arising from 
                the use of our services.
              </p>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">7. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                All content on this website, including text, graphics, logos, and software, is the 
                property of Alpine Education & Visa Services and is protected by copyright laws.
              </p>
              <p className="text-gray-700">
                You may not reproduce, distribute, or create derivative works without our written permission.
              </p>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">8. Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We may terminate or suspend your access to our services at any time, with or without notice, 
                for conduct that we believe violates these Terms of Use or is harmful to other users or us.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We reserve the right to modify these Terms of Use at any time. Changes will be effective 
                immediately upon posting on our website. Your continued use of our services constitutes 
                acceptance of the modified terms.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                If you have any questions about these Terms of Use, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+977-1-4XXXXXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@alpineeducation.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/privacy">
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Privacy Policy
              </Button>
            </Link>
            <Link href="/contact">
              <Button>
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 