import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

const NAV_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/countries', label: 'Study Destinations', icon: <Globe className="inline w-4 h-4 mr-1 -mt-1 text-blue-500" /> },
  { href: '/test-preparation', label: 'Test Preparation' },
  { href: '/student-services', label: 'Student Services' },
  { href: '/resources/blog', label: 'Resources' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex items-center justify-between px-4 sm:px-8 h-14 bg-white border-b border-blue-100 shadow-sm sticky top-0 z-50 font-sans" style={{fontFamily: 'Inter, Hind Siliguri, sans-serif'}}>
      {/* Logo & Brand */}
      <div className="flex items-center min-w-0 max-w-[260px] sm:max-w-[320px] flex-shrink-0">
        <img src="/logo.svg" alt="Alpine Logo" className="h-7 w-auto flex-shrink-0 mr-2" />
        <span className="text-base sm:text-lg font-extrabold text-[#1E3A8A] tracking-tight truncate block leading-tight">Alpine Education & Visa Services</span>
      </div>

      {/* Main Nav */}
      <div className="hidden md:flex flex-1 items-center justify-center min-w-0 mx-4">
        <div className="flex items-center gap-6 whitespace-nowrap overflow-x-auto">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-[#2563EB] hover:underline underline-offset-4 transition-colors px-1 text-sm font-medium text-gray-800">
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Button & Hamburger */}
      <div className="flex items-center gap-2 ml-2 flex-shrink-0">
        <Link href="/apply" className="bg-[#2563EB] text-white font-semibold py-1.5 px-4 text-sm rounded-full hover:bg-blue-700 transition whitespace-nowrap shadow-sm">
          Apply Now
        </Link>
        {/* Hamburger for mobile */}
        <button className="md:hidden ml-1 p-2 rounded-lg hover:bg-blue-50 focus:bg-blue-100 text-[#2563EB]" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)}>
          <div className="fixed top-0 right-0 w-64 max-w-full h-full bg-white border-l border-blue-100 shadow-lg p-6 flex flex-col space-y-6 animate-slide-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="Alpine Logo" className="h-8 w-auto flex-shrink-0" />
                <span className="text-base font-extrabold text-[#1E3A8A]">Alpine Education & Visa Services</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X className="w-6 h-6 text-[#2563EB]" /></button>
            </div>
            <div className="flex flex-col space-y-4 text-base font-medium text-gray-800">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href} className="flex items-center gap-1 hover:text-[#2563EB] hover:underline underline-offset-4 transition-colors" onClick={() => setOpen(false)}>
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-3 pt-4">
              <Link href="/apply" className="bg-[#2563EB] text-white font-semibold py-2 px-4 text-sm rounded-full hover:bg-blue-700 transition text-center shadow-sm">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 