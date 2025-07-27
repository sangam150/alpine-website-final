"use client";

import {
  ShoppingCart,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const vouchers = [
  {
    id: "ielts-2025-01",
    title: "IELTS Academic Test Voucher",
    originalPrice: "Rs. 25,000",
    discountedPrice: "Rs. 22,500",
    discount: "10% OFF",
    expiry: "2025-03-31",
    description: "Official IELTS Academic test voucher with 30-day validity",
    features: [
      "Official British Council voucher",
      "Valid for 30 days",
      "Includes practice materials",
      "Free mock test access",
      "Expert guidance support",
    ],
    testType: "IELTS",
    color: "blue",
    popular: true,
  },
  {
    id: "pte-2025-01",
    title: "PTE Academic Test Voucher",
    originalPrice: "Rs. 22,000",
    discountedPrice: "Rs. 19,800",
    discount: "10% OFF",
    expiry: "2025-03-31",
    description:
      "Official PTE Academic test voucher with comprehensive support",
    features: [
      "Official Pearson voucher",
      "Valid for 30 days",
      "Includes PTE practice tests",
      "Score improvement guarantee",
      "24/7 support access",
    ],
    testType: "PTE",
    color: "purple",
    popular: false,
  },
  {
    id: "toefl-2025-01",
    title: "TOEFL iBT Test Voucher",
    originalPrice: "Rs. 28,000",
    discountedPrice: "Rs. 25,200",
    discount: "10% OFF",
    expiry: "2025-03-31",
    description: "Official TOEFL iBT test voucher with preparation support",
    features: [
      "Official ETS voucher",
      "Valid for 30 days",
      "Includes TOEFL practice tests",
      "Score analysis report",
      "Study plan consultation",
    ],
    testType: "TOEFL",
    color: "green",
    popular: false,
  },
  {
    id: "ielts-2025-02",
    title: "IELTS General Training Voucher",
    originalPrice: "Rs. 25,000",
    discountedPrice: "Rs. 22,500",
    discount: "10% OFF",
    expiry: "2025-03-31",
    description: "Official IELTS General Training test voucher",
    features: [
      "Official British Council voucher",
      "Valid for 30 days",
      "Includes practice materials",
      "Free mock test access",
      "Expert guidance support",
    ],
    testType: "IELTS",
    color: "blue",
    popular: false,
  },
  {
    id: "bundle-2025-01",
    title: "Test Prep Bundle (IELTS + PTE)",
    originalPrice: "Rs. 47,000",
    discountedPrice: "Rs. 39,900",
    discount: "15% OFF",
    expiry: "2025-03-31",
    description:
      "Bundle deal: IELTS and PTE vouchers with comprehensive preparation",
    features: [
      "Both IELTS and PTE vouchers",
      "Valid for 30 days each",
      "Comprehensive study materials",
      "Priority support access",
      "Score improvement guarantee",
    ],
    testType: "Bundle",
    color: "orange",
    popular: true,
  },
  {
    id: "premium-2025-01",
    title: "Premium Test Prep Package",
    originalPrice: "Rs. 75,000",
    discountedPrice: "Rs. 59,900",
    discount: "20% OFF",
    expiry: "2025-03-31",
    description: "Complete test preparation package with all three tests",
    features: [
      "IELTS, PTE, and TOEFL vouchers",
      "Valid for 30 days each",
      "Premium study materials",
      "1-on-1 coaching sessions",
      "Unlimited mock tests",
      "Score improvement guarantee",
    ],
    testType: "Premium",
    color: "red",
    popular: true,
  },
];

const getColorClasses = (color: string) => {
  switch (color) {
    case "blue":
      return "border-blue-500 bg-blue-50";
    case "purple":
      return "border-purple-500 bg-purple-50";
    case "green":
      return "border-green-500 bg-green-50";
    case "orange":
      return "border-orange-500 bg-orange-50";
    case "red":
      return "border-red-500 bg-red-50";
    default:
      return "border-gray-500 bg-gray-50";
  }
};

const getBadgeColor = (color: string) => {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-800";
    case "purple":
      return "bg-purple-100 text-purple-800";
    case "green":
      return "bg-green-100 text-green-800";
    case "orange":
      return "bg-orange-100 text-orange-800";
    case "red":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function VoucherShopPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Test Voucher Shop
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get exclusive discounts on official test vouchers for IELTS, TOEFL,
          and PTE. Save money while preparing for your study abroad journey.
        </p>
        <div className="flex justify-center items-center gap-4 mt-6">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Official Vouchers
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Clock className="w-4 h-4 mr-1" />
            Limited Time Offers
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            <Star className="w-4 h-4 mr-1" />
            Best Prices
          </Badge>
        </div>
      </div>

      {/* Vouchers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {vouchers.map((voucher) => (
          <Card
            key={voucher.id}
            className={`relative overflow-hidden border-2 ${getColorClasses(voucher.color)} hover:shadow-xl transition-all duration-300`}
          >
            {voucher.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-sm font-semibold rounded-bl-lg">
                MOST POPULAR
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className={getBadgeColor(voucher.color)}>
                  {voucher.testType}
                </Badge>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">
                    {voucher.originalPrice}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {voucher.discountedPrice}
                  </div>
                </div>
              </div>

              <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                {voucher.title}
              </CardTitle>

              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                {voucher.discount}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-4">
                {voucher.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-2">
                  What&apos;s Included:
                </h4>
                <ul className="space-y-1">
                  {voucher.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center text-sm text-yellow-800">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Expires:</span>{" "}
                  {new Date(voucher.expiry).toLocaleDateString()}
                </div>
              </div>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                onClick={() =>
                  window.open(
                    `https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20want%20to%20purchase%20the%20${encodeURIComponent(voucher.title)}%20for%20${voucher.discountedPrice}.`,
                    "_blank",
                  )
                }
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          Why Choose Alpine Education Vouchers?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Official Vouchers</h3>
            <p className="text-blue-100">
              Direct from test providers - British Council, Pearson, and ETS
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-blue-100">
              Exclusive discounts and bundle deals to save you money
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-blue-100">
              24/7 support and guidance throughout your test preparation
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Need Help Choosing the Right Test?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our expert counselors can help you choose the right test based on your
          target country, university requirements, and personal preferences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4"
            onClick={() =>
              window.open(
                "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20choosing%20the%20right%20test%20(IELTS,%20PTE,%20or%20TOEFL).",
                "_blank",
              )
            }
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Get Free Consultation
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4"
            asChild
          >
            <Link href="/test-preparation/comparison">
              Compare Tests
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              How long are the vouchers valid?
            </h4>
            <p className="text-gray-600 text-sm">
              All vouchers are valid for 30 days from the date of purchase.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
                              Can I get a refund if I don&apos;t use the voucher?
            </h4>
            <p className="text-gray-600 text-sm">
              Vouchers are non-refundable once purchased, but we offer
              rescheduling options.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              Do you provide study materials with the vouchers?
            </h4>
            <p className="text-gray-600 text-sm">
              Yes, all vouchers include access to practice materials and mock
              tests.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="font-semibold text-gray-900 mb-2">
              How do I schedule my test after purchasing?
            </h4>
            <p className="text-gray-600 text-sm">
              We&apos;ll guide you through the scheduling process and help you book
              your preferred test date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
