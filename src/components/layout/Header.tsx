"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, ArrowUpRight, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/countries", label: "Study Destinations" },
  { href: "/test-preparation", label: "Test Preparation" },
  { href: "/student-services", label: "Our Services" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isClient && isScrolled
          ? "bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-lg"
          : "bg-white/95 backdrop-blur border-b border-blue-100 shadow-sm"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Main nav row */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo & Brand */}
          <div className="flex items-center flex-shrink-0 mr-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/logo.svg"
                  alt="Alpine Education Logo"
                  width={44}
                  height={44}
                  className="w-11 h-11 lg:w-12 lg:h-12 object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg lg:text-xl font-bold text-[#1A2C5B] leading-tight">
                  Alpine Education
                </span>
                <span className="hidden sm:block text-xs text-[#DC2626] leading-tight">
                  Study Abroad & Visa Services
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            <ul
              className="flex items-center space-x-2 xl:space-x-4"
              role="menubar"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    tabIndex={0}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex items-center justify-center group
                      ${
                        pathname === link.href
                          ? "text-[#2563EB] font-semibold bg-[#2563EB]/10"
                          : "text-gray-700 hover:text-[#2563EB] hover:bg-[#2563EB]/5"
                      }
                    `}
                    style={{ minWidth: 96 }}
                  >
                    {link.label}
                    {/* Animated underline on hover and active */}
                    <span
                      className={`absolute left-3 right-3 bottom-1 h-0.5 rounded-full transition-all duration-300
                      ${
                        pathname === link.href
                          ? "bg-[#2563EB] w-[calc(100%-1.5rem)] opacity-100"
                          : "bg-[#2563EB] w-0 group-hover:w-[calc(100%-1.5rem)] group-hover:opacity-100 opacity-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTAs */}
            <div className="flex items-center space-x-3 ml-8">
              <Button
                asChild
                className="px-4 py-2 rounded-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex items-center gap-2"
              >
                <Link href="/apply" tabIndex={0}>
                  <GraduationCap className="w-4 h-4" />
                  Apply Now
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-4 py-2 rounded-lg font-medium text-[#2563EB] border-[#2563EB] hover:text-[#1d4ed8] hover:bg-[#2563EB]/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex items-center gap-2"
              >
                <Link href="/student-portal" tabIndex={0}>
                  <ArrowUpRight className="w-4 h-4" />
                  Student Portal
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-[#2563EB] hover:bg-[#2563EB]/5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/logo.svg"
                    alt="Alpine Logo"
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                    priority
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-[#1A2C5B]">
                      Alpine Education
                    </span>
                    <span className="text-xs text-gray-500">
                      Study Abroad & Visa Services
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-700 hover:text-[#2563EB] hover:bg-[#2563EB]/5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-2 px-6">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 whitespace-nowrap w-full text-left
                          ${
                            pathname === link.href
                              ? "text-[#2563EB] bg-[#2563EB]/10"
                              : "text-gray-700 hover:text-[#2563EB] hover:bg-[#2563EB]/5"
                          }`}
                        onClick={() => setMenuOpen(false)}
                        tabIndex={0}
                        aria-current={
                          pathname === link.href ? "page" : undefined
                        }
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile CTAs */}
              <div className="p-6 border-t border-gray-200 space-y-3">
                <Button
                  asChild
                  className="w-full px-4 py-3 rounded-lg font-semibold text-white bg-[#2563EB] hover:bg-[#1d4ed8] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex items-center justify-center gap-2"
                >
                  <Link href="/apply" onClick={() => setMenuOpen(false)}>
                    <GraduationCap className="w-4 h-4" />
                    Apply Now
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full px-4 py-3 rounded-lg font-medium text-[#2563EB] border-[#2563EB] hover:text-[#1d4ed8] hover:bg-[#2563EB]/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 flex items-center justify-center gap-2"
                >
                  <Link
                    href="/student-portal"
                    onClick={() => setMenuOpen(false)}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Student Portal
                  </Link>
                </Button>

                {/* Contact Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>+977-1-4444444</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
