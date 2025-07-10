'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.svg" alt="Alpine Logo" className="h-10 mb-3" />
          <div className="text-lg font-bold mb-1">Alpine Education & Visa Services</div>
          <div className="text-sm text-gray-400 mb-2">Leading Study Abroad Consultants for Nepali Students</div>
          <div className="flex gap-2 mt-2">
            <img src="/public/icons/icon-192x192.png" alt="Trust Badge" className="h-7 rounded-full border border-gray-700" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8 text-center md:text-left">
          <div>
            <div className="font-semibold mb-2">Quick Links</div>
            <ul className="space-y-1">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/countries" className="hover:underline">Countries</Link></li>
              <li><Link href="/services" className="hover:underline">Services</Link></li>
              <li><Link href="/test-preparation" className="hover:underline">Test Prep</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Contact</div>
            <ul className="space-y-1">
              <li>Putalisadak, Kathmandu, Nepal</li>
              <li>+977-1-1234567</li>
              <li>info@alpine.edu.np</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Follow Us</div>
            <div className="flex gap-3 justify-center md:justify-start">
              <a href="#" className="hover:text-blue-400">FB</a>
              <a href="#" className="hover:text-blue-400">IG</a>
              <a href="#" className="hover:text-blue-400">YT</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">© {new Date().getFullYear()} Alpine Education & Visa Services. All rights reserved.</div>
    </footer>
  )
} 