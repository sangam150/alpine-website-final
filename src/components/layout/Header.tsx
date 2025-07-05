'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { Menu, X, ChevronDown, BookOpen, GraduationCap, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Study Destinations', href: '/countries' },
  { name: 'Test Preparation', dropdown: [
    { name: 'IELTS', href: '/test-preparation/ielts' },
    { name: 'PTE', href: '/test-preparation/pte' },
    { name: 'TOEFL', href: '/test-preparation/toefl' },
    { name: 'Free Mock Test', href: '/resources/mock-tests' },
  ] },
  { name: 'Student Services', dropdown: [
    { name: 'SOP Guidance', href: '/services/sop' },
    { name: 'Visa Guidance', href: '/services/visa' },
    { name: 'Profile Evaluation', href: '/services/profile-evaluation' },
    { name: 'Scholarships', href: '/services/scholarships' },
  ] },
  { name: 'Resources', dropdown: [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'Student Handbooks', href: '/resources/handbooks' },
    { name: 'Downloads', href: '/resources/downloads' },
    { name: 'Visa FAQs', href: '/resources/visa-faqs' },
  ] },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-close dropdown after 4s of inactivity
  useEffect(() => {
    if (activeDropdown) {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = setTimeout(() => {
        setActiveDropdown(null);
      }, 4000);
    }
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, [activeDropdown]);

  // Keyboard accessibility for dropdowns
  const handleDropdownKey = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

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
              <div key={item.name} className="relative group">
                {item.href ? (
                  <Link 
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                      pathname === item.href ? 'text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 flex items-center gap-1 ${
                      activeDropdown === item.name ? 'text-blue-600' : 'text-gray-700'
                    }`}
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    onKeyDown={(e) => handleDropdownKey(e, item.name)}
                    aria-expanded={activeDropdown === item.name}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                )}
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-x-3 ml-auto">
          <Button 
            asChild 
            size="sm"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl px-4 py-2 shadow-md font-semibold flex items-center gap-2 transition-all duration-200"
          >
            <Link href="/contact">
              <BookOpen className="w-4 h-4" />
              Book Free Counselling
            </Link>
          </Button>
          <Button 
            asChild 
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-4 py-2 shadow-md font-semibold flex items-center gap-2 transition-all duration-200"
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
            className="bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl px-4 py-2 font-semibold flex items-center gap-2 transition-all duration-200 shadow-sm"
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 flex justify-end"
          >
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-80 max-w-full bg-white h-full shadow-xl flex flex-col"
            >
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
                    <div key={item.name}>
                      {item.href ? (
                        <Link 
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
                      ) : (
                        <div>
                          <button
                            className={`w-full text-left px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 flex items-center justify-between ${
                              activeDropdown === item.name 
                                ? 'text-blue-600 bg-blue-50' 
                                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          >
                            {item.name}
                            <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
                              activeDropdown === item.name ? 'rotate-180' : ''
                            }`} />
                          </button>
                          {item.dropdown && activeDropdown === item.name && (
                            <div className="ml-4 mt-2 space-y-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-base text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl py-3 shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <BookOpen className="w-4 h-4" />
                    Book Free Counselling
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 shadow-md font-semibold flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    <GraduationCap className="w-4 h-4" />
                    Apply Now
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline"
                  className="w-full bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50 rounded-xl py-3 font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                  <Link href="/student-portal" onClick={() => setIsMobileMenuOpen(false)}>
                    <LogIn className="w-4 h-4" />
                    Student Portal
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 