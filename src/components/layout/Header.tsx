'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, GraduationCap, LogIn } from 'lucide-react';

import Image from 'next/image';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Study Destinations', href: '/study-destinations' },
  { name: 'Test Preparation', href: '/test-preparation' },
  { name: 'Student Services', href: '/student-services' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white shadow-sm border-b border-gray-100'
    }`}>
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Alpine Education Home">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image 
              src="/logo.svg" 
              alt="Alpine Education Logo" 
              width={48} 
              height={48} 
              className="w-12 h-12 object-contain" 
              priority 
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg leading-tight text-gray-900">Alpine Education</span>
            <span className="text-xs text-gray-500 leading-tight">Study Abroad & Visa Services</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center ml-8">
          <div className="flex items-center gap-x-8">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  pathname === item.href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA Buttons - Refactored */}
        <div className="hidden lg:flex navbar-ctas">
          <Button 
            asChild 
            size="sm"
            className="navbar-button navbar-button-primary"
          >
            <Link href="/apply">
              <GraduationCap className="w-4 h-4" />
              Apply Now
            </Link>
          </Button>
          <Button 
            asChild 
            size="sm"
            variant="outline"
            className="navbar-button navbar-button-outline"
          >
            <Link href="/student-portal">
              <LogIn className="w-4 h-4" />
              Student Portal
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          aria-label="Open menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end transition-opacity duration-300">
          <div className="w-80 max-w-full bg-white h-full shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Image src="/logo.svg" alt="Alpine Education Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                  <span className="font-bold text-lg text-gray-900">Alpine Education</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  aria-label="Close menu"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-y-1">
                  {NAV_ITEMS.map((item) => (
                    <Link 
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
                        pathname === item.href 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Button 
                  asChild 
                  className="w-full navbar-button-primary rounded-lg py-3 shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <GraduationCap className="w-4 h-4" />
                    Apply Now
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full navbar-button-outline rounded-lg py-3 font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                  <Link href="/student-portal" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn className="w-4 h-4" />
                    Student Portal
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
    </header>
  );
} 