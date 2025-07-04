'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageCircle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  services: [
    { name: 'Study Abroad Counseling', href: '/study-abroad' },
    { name: 'IELTS Preparation', href: '/test-preparation' },
    { name: 'PTE Preparation', href: '/test-preparation' },
    { name: 'Visa Services', href: '/visa-services' },
    { name: 'Mock Tests', href: '/mock-tests' },
    { name: 'Free Counseling', href: '/contact' },
  ],
  countries: [
    { name: 'Australia', href: '/countries/australia' },
    { name: 'United Kingdom', href: '/countries/uk' },
    { name: 'Canada', href: '/countries/canada' },
    { name: 'Germany', href: '/countries/germany' },
    { name: 'France', href: '/countries/france' },
    { name: 'New Zealand', href: '/countries/new-zealand' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about#team' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Student Resources', href: '/resources' },
    { name: 'Visa Guide', href: '/visa-guide' },
    { name: 'Application Process', href: '/application-process' },
    { name: 'Document Checklist', href: '/document-checklist' },
    { name: 'Emergency Contact', href: '/contact' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+977-XXXXXXXXX';
    const message = encodeURIComponent('Hi! I\'m interested in studying abroad. Can you help me?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Alpine Education</h3>
                <p className="text-gray-400 text-sm">Study Abroad & Visa Services</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Leading study abroad consultancy in Nepal. We help students achieve their dreams 
              of studying in Australia, UK, Canada, Germany, France, and more.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {process.env.NEXT_PUBLIC_CONTACT_PHONE || '+977-1-4XXXXXXX'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@alpineeducation.com'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Countries</h4>
            <ul className="space-y-2">
              {footerLinks.countries.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Get the latest updates on study abroad opportunities, visa changes, and exclusive offers.
              </p>
            </div>
            
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                {!isSubscribed ? (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                    <div className="flex space-x-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 text-green-400"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Successfully subscribed!</span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">
                © 2024 Alpine Education & Visa Services. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Link
                  href={process.env.NEXT_PUBLIC_FACEBOOK_URL || '#'}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'}
                  className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href={process.env.NEXT_PUBLIC_LINKEDIN_URL || '#'}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleWhatsAppClick}
                className="border-gray-600 text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 