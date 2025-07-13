import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Mail,
  BookOpen,
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Forgot Password - Alpine Education Student Portal',
  description: 'Reset your Alpine Education student portal password. Secure password recovery for application tracking and document management.',
  keywords: 'forgot password, password reset, Alpine Education login, student portal password recovery',
  openGraph: {
    title: 'Forgot Password - Alpine Education Student Portal',
    description: 'Reset your Alpine Education student portal password. Secure password recovery for application tracking and document management.',
    url: 'https://alpinevisa.com.np/student-portal/forgot-password',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Forgot Password',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forgot Password - Alpine Education Student Portal',
    description: 'Reset your Alpine Education student portal password. Secure password recovery for application tracking and document management.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/student-portal/forgot-password',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        {/* Forgot Password Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Forgot Your Password?
            </CardTitle>
            <p className="text-sm text-gray-600">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Reset Form */}
            <form className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Success Message (Hidden by default) */}
            <div className="hidden bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-green-900 mb-1">
                    Reset Link Sent
                  </h4>
                  <p className="text-xs text-green-700">
                    We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Secure Password Reset
                  </h4>
                  <p className="text-xs text-blue-700">
                    The reset link will expire in 1 hour for security. If you don't receive the email, check your spam folder.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Don't have access to your email?
              </p>
              <p className="text-sm text-gray-600">
                Contact our support team at{' '}
                <a 
                  href="mailto:support@alpinevisa.com.np"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  support@alpinevisa.com.np
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link 
              href="/student-portal/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <Link 
              href="/contact"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact support
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 font-medium inline-flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Alpine Education
          </Link>
        </div>
      </div>
    </div>
  );
} 