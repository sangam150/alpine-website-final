'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b w-full">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="Alpine Education Home">
          <div className="w-12 h-12 flex items-center justify-center">
            <Image src="/logo.png" onError={(e) => { e.currentTarget.src = '/logo.svg'; }} alt="Alpine Education Logo" width={48} height={48} className="w-12 h-12 object-contain" priority />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-bold text-lg leading-tight text-gray-900">Alpine Education</span>
            <span className="text-xs text-gray-500 leading-tight">Study Abroad & Visa Services</span>
          </div>
        </Link>
        {/* Nav Items */}
        <div className="hidden lg:flex flex-1 items-center justify-between ml-8">
          <div className="flex items-center gap-x-6 whitespace-nowrap">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/about" className="nav-link">About Us</Link>
            <Link href="/countries" className="nav-link">Study Destinations</Link>
            <Link href="/test-preparation" className="nav-link">Test Preparation</Link>
            <Link href="/services" className="nav-link">Student Services</Link>
            <Link href="/resources/blog" className="nav-link">Resources</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>
        </div>
        {/* Place this after the nav links, right-aligned: */}
        <div className="hidden lg:flex items-center gap-x-4 ml-auto">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 shadow-md font-semibold flex items-center gap-2 transition-all duration-200">
            <Link href="/apply">
              Apply Now <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-blue-50 border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-100 shadow-sm transition-all duration-200">
            <Link href="/portal">
              Student Portal <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
        </div>
        {/* Hamburger for Mobile */}
        <button className="lg:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.2 }} className="fixed inset-0 z-50 bg-black/40 flex justify-end">
            <div className="w-80 max-w-full bg-white h-full shadow-lg flex flex-col p-6 gap-y-4">
              <button className="self-end mb-2" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
              <nav className="flex flex-col gap-y-4 text-lg">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Home</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">About Us</Link>
                <Link href="/countries" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Study Destinations</Link>
                <Link href="/test-preparation" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Test Preparation</Link>
                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Student Services</Link>
                <Link href="/resources/blog" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Resources</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Contact</Link>
              </nav>
              <div className="flex flex-col gap-y-3 mt-6">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 shadow-md font-semibold flex items-center gap-2 transition-all duration-200">
                  <Link href="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                    Apply Now <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border border-blue-500 text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-50 shadow-sm transition-all duration-200">
                  <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                    Student Portal <ArrowRight className="w-5 h-5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 