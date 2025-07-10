"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-blue-100 shadow-md">
      <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center flex-shrink-0 min-w-0 max-w-[260px] sm:max-w-[320px]">
            <Link href="/" className="flex items-center space-x-3 group min-w-0">
              <img src="/logo.svg" alt="Alpine Education Logo" className="h-10 w-10 flex-shrink-0" />
              <span className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors leading-tight truncate block max-w-[180px] sm:max-w-none">
                Alpine Education & Visa Services
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex flex-1 items-center justify-center gap-6 whitespace-nowrap overflow-x-auto min-w-0 mx-4 px-2" role="menubar">
            {NAV_LINKS.map(link => (
              <li key={link.href} role="none">
                <Link
                  href={link.href}
                  role="menuitem"
                  tabIndex={0}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`font-medium text-gray-700 hover:text-blue-700 focus:text-blue-700 transition-colors duration-200 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${pathname === link.href ? 'text-blue-700 font-semibold' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center gap-2 ml-4" role="none">
              <a href="tel:+977-1-4444444" aria-label="Call Now" className="p-2 rounded-full hover:bg-blue-50 focus:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200" tabIndex={0}>
                <Phone className="w-5 h-5" />
              </a>
              <a href="https://wa.me/977144444444" target="_blank" rel="noopener" aria-label="WhatsApp" className="p-2 rounded-full hover:bg-green-50 focus:bg-green-100 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" tabIndex={0}>
                <MessageCircle className="w-5 h-5" />
              </a>
            </li>
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 ml-2 flex-shrink-0">
            <Button asChild className="font-semibold bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label="Apply Now">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button asChild variant="outline" className="font-medium text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50 px-5 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label="Student Portal">
              <Link href="/student-portal">Student Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
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
                  <img src="/logo.svg" alt="Alpine Education Logo" className="h-8 w-8" />
                  <span className="font-bold text-lg text-gray-900">Alpine Education</span>
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
                  <li className="flex items-center gap-2 mt-4" role="none">
                    <a href="tel:+977-1-4444444" aria-label="Call Now" className="p-3 rounded-full hover:bg-blue-50 focus:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200" tabIndex={0}>
                      <Phone className="w-5 h-5" />
                    </a>
                    <a href="https://wa.me/977144444444" target="_blank" rel="noopener" aria-label="WhatsApp" className="p-3 rounded-full hover:bg-green-50 focus:bg-green-100 text-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" tabIndex={0}>
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="p-6 flex flex-col gap-3 border-t border-blue-100">
                <Button asChild className="w-full font-semibold bg-blue-600 text-white hover:bg-blue-700 px-5 py-3 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label="Apply Now">
                  <Link href="/apply">Apply Now</Link>
                </Button>
                <Button asChild variant="outline" className="w-full font-medium text-blue-600 border-blue-600 hover:text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-200" aria-label="Student Portal">
                  <Link href="/student-portal">Student Portal</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 