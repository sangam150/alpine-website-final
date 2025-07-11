"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, GraduationCap, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-blue-100 shadow-md overflow-x-hidden">
      <nav aria-label="Main navigation" className="max-w-screen-xl mx-auto px-4">
        {/* Main nav row */}
        <div className="flex items-center h-16 w-full min-w-0">
          {/* Logo & Brand (vertical flex, fixed width) */}
          <div className="flex flex-col items-start w-56 min-w-[12rem] flex-shrink-0 pr-6">
            <Link href="/" className="block select-none min-w-0">
              <div className="flex items-center min-w-0 space-x-2">
                <Image src="/logo.svg" alt="Alpine Logo" width={32} height={32} className="w-8 h-8 object-contain flex-shrink-0" priority />
                <span className="text-lg font-bold text-[#1A2C5B] min-w-0 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                  Alpine Education
                </span>
              </div>
            </Link>
            {/* Subtitle/tagline under brand, only on desktop */}
            <span className="hidden lg:block text-xs text-gray-500 leading-tight pl-10 pt-0.5">Study Abroad & Visa Services</span>
          </div>
          {/* Desktop Nav */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-8 whitespace-nowrap min-w-0 mx-2 px-2 text-base font-medium" role="menubar">
            {NAV_LINKS.map(link => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  tabIndex={0}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`transition-colors duration-200 px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 ${pathname === link.href ? 'text-blue-700 font-semibold' : 'text-gray-700 hover:text-blue-700'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0 pl-6">
            <Button asChild className="font-semibold bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-2" aria-label="Apply Now">
              <Link href="/apply"><GraduationCap className="w-4 h-4 mr-1" />Apply Now</Link>
            </Button>
            <Button asChild variant="outline" className="font-medium text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center gap-2" aria-label="Student Portal">
              <Link href="/student-portal"><ArrowUpRight className="w-4 h-4 mr-1" />Student Portal</Link>
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div id="mobile-menu" className="lg:hidden fixed inset-0 z-50 bg-black/50" role="dialog" aria-modal="true" tabIndex={-1} onClick={() => setMenuOpen(false)}>
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl flex flex-col" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-blue-100">
                <div className="flex items-center space-x-3">
                  <Image src="/logo.svg" alt="Alpine Logo" width={28} height={28} className="w-7 h-7 object-contain" priority />
                  <span className="font-bold text-lg text-[#1A2C5B] whitespace-nowrap">Alpine Education</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6" aria-label="Mobile navigation">
                <ul className="space-y-2" role="menubar">
                  {NAV_LINKS.map(link => (
                    <li key={link.href} role="none">
                      <Link
                        href={link.href}
                        role="menuitem"
                        tabIndex={0}
                        aria-current={pathname === link.href ? 'page' : undefined}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200 ${pathname === link.href ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'}`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 flex flex-col gap-3 border-t border-blue-100">
                <Button asChild className="w-full font-semibold bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center justify-center gap-2" aria-label="Apply Now">
                  <Link href="/apply"><GraduationCap className="w-5 h-5 mr-2" />Apply Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full font-medium text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-200 flex items-center justify-center gap-2" aria-label="Student Portal">
                  <Link href="/student-portal"><ArrowUpRight className="w-5 h-5 mr-2" />Student Portal</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 