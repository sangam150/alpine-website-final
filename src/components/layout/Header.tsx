'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Study Destinations', dropdown: [
    { name: 'Australia', href: '/countries/australia' },
    { name: 'UK', href: '/countries/uk' },
    { name: 'Canada', href: '/countries/canada' },
    { name: 'New Zealand', href: '/countries/new-zealand' },
    { name: 'France', href: '/countries/france' },
    { name: 'Germany', href: '/countries/germany' },
    { name: 'USA', href: '/countries/usa' },
    // Add more as needed
  ] },
  { name: 'Test Preparation', dropdown: [
    { name: 'IELTS', href: '/test-preparation/ielts' },
    { name: 'PTE', href: '/test-preparation/pte' },
    { name: 'Free Mock Test', href: '/resources/mock-tests' },
  ] },
  { name: 'Student Services', dropdown: [
    { name: 'SOP Guidance', href: '/services/sop' },
    { name: 'Visa Guidance', href: '/services/visa' },
    { name: 'Profile Evaluation', href: '/services/profile-evaluation' },
    { name: 'Scholarships', href: '/services/scholarships' },
  ] },
  { name: 'Student Portal', href: '/login' },
  { name: 'Resources', dropdown: [
    { name: 'Blog', href: '/resources/blog' },
    { name: 'Student Handbooks', href: '/resources/handbooks' },
  ] },
  { name: 'Contact / WhatsApp', href: '/contact' },
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
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-200 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo + Slogan */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Alpine Education Home">
            <div className="w-12 h-12 flex items-center justify-center">
              <img src="/logo.png" onError={(e) => { e.currentTarget.src = '/logo.svg'; }} alt="Alpine Education Logo" className="w-12 h-12 object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold text-gray-900 font-sans group-hover:text-blue-700 transition-colors leading-tight">Alpine Education</span>
              <span className="text-xs text-gray-600 font-medium font-sans leading-tight whitespace-nowrap tracking-wide">Study Abroad &amp; Visa Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 ml-8" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <div key={item.name} className="relative flex items-center h-full">
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={activeDropdown === item.name}
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      onFocus={() => setActiveDropdown(item.name)}
                      onBlur={() => setActiveDropdown(null)}
                      onKeyDown={(e) => handleDropdownKey(e, item.name)}
                      className={`flex items-center gap-1 px-4 py-2 font-medium transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative whitespace-nowrap ${activeDropdown === item.name ? 'text-blue-700' : 'text-gray-700 hover:text-blue-700'}`}
                      aria-label={item.name}
                    >
                      <span>{item.name}</span>
                      <motion.span
                        initial={{ x: -8, opacity: 0 }}
                        animate={activeDropdown === item.name ? { x: 0, opacity: 1 } : { x: -8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-blue-100 py-2 z-50"
                          onMouseEnter={() => setActiveDropdown(item.name)}
                          onMouseLeave={() => setActiveDropdown(null)}
                          role="menu"
                          aria-label={item.name + ' dropdown'}
                        >
                          {item.dropdown.map((sub: any) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={`block px-5 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200 font-medium text-sm rounded ${pathname === sub.href ? 'bg-blue-50 text-blue-700 underline underline-offset-4' : ''}`}
                              tabIndex={0}
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 font-semibold text-base transition-colors duration-200 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative whitespace-nowrap flex items-center ${pathname === item.href ? 'text-blue-700 font-bold underline underline-offset-4' : 'text-gray-700 hover:text-blue-700'}`}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    aria-label={item.name}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 ml-6">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-7 py-2 text-base shadow-lg transition-all duration-200 rounded-lg h-12 flex items-center justify-center"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-7 py-2 text-base transition-all duration-200 rounded-lg h-12 flex items-center justify-center shadow"
            >
              <Link href="/login">Student Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="p-2">
                  <Menu className="w-7 h-7" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/logo.png" onError={(e) => { e.currentTarget.src = '/logo.svg'; }} alt="Alpine Education Logo" className="w-10 h-10 object-contain" />
                      </div>
                      <span className="font-bold text-lg">Alpine Education</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2"
                    >
                      <X className="w-6 h-6" />
                    </Button>
                  </div>
                  <nav className="flex-1" aria-label="Mobile navigation">
                    <div className="space-y-2">
                      {NAV_ITEMS.map((item) => (
                        <div key={item.name}>
                          {item.dropdown ? (
                            <details className="group" open={activeDropdown === item.name}>
                              <summary
                                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium cursor-pointer select-none"
                                onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                                tabIndex={0}
                                onKeyDown={(e) => handleDropdownKey(e, item.name)}
                              >
                                <span>{item.name}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                              </summary>
                              <div className="pl-4 border-l border-blue-100">
                                {item.dropdown.map((sub: any) => (
                                  <Link
                                    key={sub.name}
                                    href={sub.href}
                                    className={`block px-4 py-2 text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors duration-200 font-medium text-sm ${pathname === sub.href ? 'bg-blue-50 text-blue-700' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </details>
                          ) : (
                            <Link
                              href={item.href}
                              className={`block px-4 py-3 text-base font-semibold rounded-lg transition-colors duration-200 ${pathname === item.href ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-6 space-y-3 mt-6">
                      <Button
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold px-7 py-2 text-base shadow-lg transition-all duration-200 rounded-lg h-12 flex items-center justify-center"
                      >
                        <Link href="/apply">Apply Now</Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-7 py-2 text-base transition-all duration-200 rounded-lg h-12 flex items-center justify-center shadow"
                      >
                        <Link href="/login">Student Portal</Link>
                      </Button>
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
} 