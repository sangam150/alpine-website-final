'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Youtube, Twitter, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Image src="/logo.svg" alt="Alpine Logo" className="h-12 mb-4" width={48} height={48} />
            <div className="text-xl font-bold mb-2">Alpine Education & Visa Services</div>
            <p className="text-gray-400 mb-4">Your trusted partner for study abroad success. 15+ years of excellence helping Nepali students achieve their international education dreams.</p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/countries" className="text-gray-400 hover:text-white transition-colors">Study Destinations</Link></li>
              <li><Link href="/test-preparation" className="text-gray-400 hover:text-white transition-colors">Test Preparation</Link></li>
              <li><Link href="/student-services" className="text-gray-400 hover:text-white transition-colors">Our Services</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">University Application</Link></li>
              <li><Link href="/services/sop" className="text-gray-400 hover:text-white transition-colors">SOP Writing</Link></li>
              <li><Link href="/services/visa" className="text-gray-400 hover:text-white transition-colors">Visa Application</Link></li>
              <li><Link href="/services/scholarships" className="text-gray-400 hover:text-white transition-colors">Scholarship Guidance</Link></li>
              <li><Link href="/test-preparation" className="text-gray-400 hover:text-white transition-colors">IELTS/PTE Classes</Link></li>
              <li><Link href="/student-portal" className="text-gray-400 hover:text-white transition-colors">Student Portal</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">+977 1234567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">info@alpineeducation.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest updates on study abroad opportunities and visa news.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 Alpine Education & Visa Services. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 