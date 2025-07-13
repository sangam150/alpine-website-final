import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff,
  Mail,
  Phone,
  BookOpen,
  Shield,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Student Portal Login - Alpine Education',
  description: 'Secure login for Alpine Education student portal. Access your application progress, documents, and communication with counselors.',
  keywords: 'student portal login, Alpine Education login, application tracking login, secure student access',
  openGraph: {
    title: 'Student Portal Login - Alpine Education',
    description: 'Secure login for Alpine Education student portal. Access your application progress, documents, and communication with counselors.',
    url: 'https://alpinevisa.com.np/student-portal/login',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Student Portal Login',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Portal Login - Alpine Education',
    description: 'Secure login for Alpine Education student portal. Access your application progress, documents, and communication with counselors.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/student-portal/login',
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

export default function StudentPortalLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h1>
          <p className="text-gray-600">Sign in to access your application progress</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Welcome Back
            </CardTitle>
            <p className="text-sm text-gray-600">
              Enter your credentials to access your student portal
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login Form */}
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

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </Label>
                </div>
                <Link 
                  href="/student-portal/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Alternative Login Options */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">Or continue with</p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12">
                  <User className="h-4 w-4 mr-2" />
                  Student ID
                </Button>
                <Button variant="outline" className="h-12">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Number
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900 mb-1">
                    Secure Login
                  </h4>
                  <p className="text-xs text-blue-700">
                    Your login information is encrypted and secure. We use industry-standard security protocols to protect your data.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link 
              href="/student-portal/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Register here
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
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Alpine Education
          </Link>
        </div>
      </div>
    </div>
  );
} 