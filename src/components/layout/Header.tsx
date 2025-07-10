"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap, ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/countries', label: 'Study Destinations' },
  { href: '/test-preparation', label: 'Test Prep' },
  { href: '/student-services', label: 'Student Services' },
  { href: '/resources/blog', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Brand */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo.svg" alt="Alpine Education Logo" className="h-10 w-10 flex-shrink-0" />
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors leading-tight">
                  Alpine Education & Visa Services
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-blue-50 ${
                  pathname === link.href ? 'text-blue-700 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTAs */}
          <div className="flex items-center space-x-4">
            {/* Contact CTAs - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-blue-700 hover:bg-blue-50">
                <a href="tel:+977-1-4444444">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Now
                </a>
              </Button>
              
              <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-green-700 hover:bg-green-50">
                <a href="https://wa.me/977144444444" target="_blank" rel="noopener">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Main CTAs */}
            <Button asChild variant="outline" className="hidden sm:flex font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Link href="/student-portal">
                <ArrowRight className="w-4 h-4 mr-2" />
                Student Portal
              </Link>
            </Button>
            
            <Button asChild className="font-semibold bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg shadow-sm transition-all">
              <Link href="/apply">
                <GraduationCap className="w-4 h-4 mr-2" />
                Apply Now
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {menuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img src="/logo.svg" alt="Alpine Education Logo" className="h-8 w-8" />
                <span className="font-bold text-lg text-gray-900">
                  Alpine Education
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      pathname === link.href 
                        ? 'text-blue-700 bg-blue-50 font-semibold' 
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Mobile Contact CTAs */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Button asChild className="w-full justify-center bg-green-600 hover:bg-green-700">
                  <a href="tel:+977-1-4444444">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                
                <Button asChild variant="outline" className="w-full justify-center border-green-600 text-green-600 hover:bg-green-50">
                  <a href="https://wa.me/977144444444" target="_blank" rel="noopener">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>

              {/* Mobile Main CTAs */}
              <div className="pt-4 space-y-3 border-t border-gray-200">
                <Button asChild variant="outline" className="w-full justify-center">
                  <Link href="/student-portal">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Student Portal
                  </Link>
                </Button>
                
                <Button asChild className="w-full justify-center">
                  <Link href="/apply">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Apply Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 