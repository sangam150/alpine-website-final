"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  Globe,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "@/types/cms";
import { getContactInfo } from "@/lib/content-management";

export default function Footer() {
  const [newsletter, setNewsletter] = useState({ email: "", firstName: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [errorContact, setErrorContact] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContact() {
      setLoadingContact(true);
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch (e) {
        setErrorContact("Failed to load footer info");
      } finally {
        setLoadingContact(false);
      }
    }
    fetchContact();
  }, []);

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    if (!newsletter.email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newsletter),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Thank you for subscribing!");
        setNewsletter({ email: "", firstName: "" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingContact) return <footer className="py-8 text-center text-gray-400">Loading footer...</footer>;
  if (errorContact) return <footer className="py-8 text-center text-red-500">{errorContact}</footer>;
  if (!contact) return <footer className="py-8 text-center text-gray-400">No footer info found.</footer>;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Trust Badges Section */}
      <div className="bg-white/5 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-[#2563EB]/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2563EB]">98%</div>
                <div className="text-xs text-gray-400">Visa Success Rate</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">5000+</div>
                <div className="text-xs text-gray-400">Students Placed</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-[#2563EB]/20 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#2563EB]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2563EB]">15+</div>
                <div className="text-xs text-gray-400">Countries</div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">10+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Signup */}
        <div className="mb-12 max-w-xl mx-auto">
          <h4 className="text-2xl font-bold mb-2 text-white text-center">
            Subscribe to Our Newsletter
          </h4>
          <p className="text-gray-400 mb-4 text-center">
            Get the latest study abroad updates, visa news, and exclusive
            resources straight to your inbox.
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name (optional)"
              value={newsletter.firstName}
              onChange={handleNewsletterChange}
              className="w-full sm:w-48 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={newsletter.email}
              onChange={handleNewsletterChange}
              required
              className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          {error && (
            <div className="text-red-400 text-sm font-medium mt-2 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-400 text-sm font-medium mt-2 text-center">
              {success}
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Image
                src="/logo.svg"
                alt="Alpine Education"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-xl font-bold text-white">
                  Alpine Education
                </h3>
                <p className="text-sm text-gray-400">
                  Study Abroad & Visa Services
                </p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner for international education. Expert guidance
              for study abroad, visa applications, and university admissions
              worldwide.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 p-2 rounded-lg hover:bg-white/10"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/countries"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Study Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/test-preparation"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Test Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/student-services"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#2563EB] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#2563EB] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Our Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Visa Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  SOP Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Profile Evaluation
                </Link>
              </li>
              <li>
                <Link
                  href="/test-preparation"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  IELTS Preparation
                </Link>
              </li>
              <li>
                <Link
                  href="/test-preparation"
                  className="text-gray-400 hover:text-[#F59E0B] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-1 h-1 bg-[#F59E0B] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  PTE Preparation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Contact Info
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 leading-relaxed">
                  {contact.address}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  {contact.phone}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#2563EB] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">
                  {contact.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-12">
          <h4 className="text-lg font-semibold mb-6 text-white">
            Visit Our Office
          </h4>
          <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg border border-gray-700">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.1234567890123!2d85.31234567890123!3d27.71234567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a7b5b5b5b5%3A0x1234567890123456!2sThamel%2C%20Kathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Alpine Education Office Location"
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Alpine Education & Visa Services. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-[#2563EB] text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-[#2563EB] text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap.xml"
                className="text-gray-400 hover:text-[#2563EB] text-sm transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
