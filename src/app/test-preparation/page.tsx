"use client";

import { useState } from "react";
import {
  BookOpen,
  Award,
  FileText,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  DollarSign,
  ShoppingCart,
  Play,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TestPreparationPage() {

  const testComparison = [
    {
      test: "IELTS",
      color: "blue",
      duration: "2 hours 45 minutes",
      sections: "4 (Listening, Reading, Writing, Speaking)",
      scoring: "0-9 band scale",
      acceptance: "Most universities worldwide",
      cost: "$220-280",
      difficulty: "Moderate",
      pros: ["Widely accepted", "Face-to-face speaking", "Clear scoring"],
      cons: ["Longer duration", "Human examiner bias", "Limited test dates"],
    },
    {
      test: "PTE",
      color: "purple",
      duration: "2 hours 15 minutes",
      sections: "3 (Speaking & Writing, Reading, Listening)",
      scoring: "10-90 scale",
      acceptance: "Growing acceptance",
      cost: "$170-220",
      difficulty: "Easier",
      pros: ["Computer-based", "Faster results", "More test dates"],
      cons: [
        "Less widely accepted",
        "Technical issues possible",
        "Less personal",
      ],
    },
    {
      test: "TOEFL",
      color: "green",
      duration: "3 hours",
      sections: "4 (Reading, Listening, Speaking, Writing)",
      scoring: "0-120 scale",
      acceptance: "US universities",
      cost: "$200-280",
      difficulty: "Moderate-Hard",
      pros: ["US-focused", "Academic English", "Computer-based"],
      cons: ["Limited to US", "Longer duration", "Higher cost"],
    },
  ];

  const vouchers = [
    {
      id: "ielts-basic",
      test: "IELTS",
      name: "IELTS Academic Test",
      price: 280,
      originalPrice: 320,
      features: [
        "Official test voucher",
        "Free practice materials",
        "Score validity: 2 years",
      ],
      popular: false,
    },
    {
      id: "ielts-premium",
      test: "IELTS",
      name: "IELTS Premium Package",
      price: 380,
      originalPrice: 450,
      features: [
        "Official test voucher",
        "5 mock tests",
        "Expert feedback",
        "Study materials",
      ],
      popular: true,
    },
    {
      id: "pte-basic",
      test: "PTE",
      name: "PTE Academic Test",
      price: 200,
      originalPrice: 230,
      features: [
        "Official test voucher",
        "Practice platform access",
        "Score validity: 2 years",
      ],
      popular: false,
    },
    {
      id: "pte-premium",
      test: "PTE",
      name: "PTE Premium Package",
      price: 300,
      originalPrice: 350,
      features: [
        "Official test voucher",
        "10 mock tests",
        "AI feedback",
        "Study materials",
      ],
      popular: false,
    },
    {
      id: "toefl-basic",
      test: "TOEFL",
      name: "TOEFL iBT Test",
      price: 240,
      originalPrice: 280,
      features: [
        "Official test voucher",
        "Practice tests",
        "Score validity: 2 years",
      ],
      popular: false,
    },
    {
      id: "toefl-premium",
      test: "TOEFL",
      name: "TOEFL Premium Package",
      price: 350,
      originalPrice: 420,
      features: [
        "Official test voucher",
        "8 mock tests",
        "Expert guidance",
        "Study materials",
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
              <Award className="w-4 h-4 mr-2" />
              Expert Test Preparation
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master Your English
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Test Preparation
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Expert coaching for IELTS, TOEFL, and PTE. Take free mock tests,
              buy test vouchers, and boost your scores with Alpine Education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl"
              >
                <Link href="https://testprep.alpineedu.com" target="_blank">
                  <Play className="w-5 h-5 mr-2" />
                  Free Mock Test
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl"
                onClick={() =>
                  document
                    .getElementById("voucher-shop")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Buy Test Vouchers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Test Overview Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Test
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation for all major English proficiency tests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testComparison.map((test) => (
              <Card
                key={test.test}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div
                  className={`h-2 bg-gradient-to-r from-${test.color}-500 to-${test.color}-600`}
                ></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {test.test}
                    </CardTitle>
                    <Badge
                      className={`bg-${test.color}-100 text-${test.color}-800`}
                    >
                      {test.difficulty}
                    </Badge>
                  </div>

                  {/* Key Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{test.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{test.sections}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{test.scoring}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{test.cost}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Pros & Cons */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Pros</h4>
                    <div className="space-y-2">
                      {test.pros.map((pro, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Cons</h4>
                    <div className="space-y-2">
                      {test.cons.map((con, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-4 h-4 text-red-600 flex-shrink-0">
                            ×
                          </div>
                          <span className="text-sm text-gray-700">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r from-${test.color}-600 to-${test.color}-700 hover:from-${test.color}-700 hover:to-${test.color}-800 text-white font-semibold`}
                  >
                    <Link href={`/test-preparation/${test.test.toLowerCase()}`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Voucher Shop Section */}
      <section id="voucher-shop" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Test Voucher Shop
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Buy official test vouchers at discounted prices with additional
              study materials
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vouchers.map((voucher) => (
              <Card
                key={voucher.id}
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden ${voucher.popular ? "ring-2 ring-blue-500" : ""}`}
              >
                {voucher.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className="text-center">
                    <Badge
                      className={`mb-3 bg-${voucher.test === "IELTS" ? "blue" : voucher.test === "PTE" ? "purple" : "green"}-100 text-${voucher.test === "IELTS" ? "blue" : voucher.test === "PTE" ? "purple" : "green"}-800`}
                    >
                      {voucher.test}
                    </Badge>
                    <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                      {voucher.name}
                    </CardTitle>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        ${voucher.price}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${voucher.originalPrice}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      What&apos;s Included
                    </h4>
                    <div className="space-y-2">
                      {voucher.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-3">
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                      onClick={() => {
                        // Mock eSewa integration
                        alert(`Redirecting to eSewa for ${voucher.name} - $${voucher.price}`);
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Pay with eSewa
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50 font-semibold"
                      onClick={() => {
                        // Mock Khalti integration
                        alert(`Redirecting to Khalti for ${voucher.name} - $${voucher.price}`);
                      }}
                    >
                      <div className="flex items-center">
                        <span className="text-green-600 font-bold mr-2">K</span>
                        Pay with Khalti
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Counseling CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Test?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation with our test preparation experts. 
              Get personalized advice on which test suits your goals and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl"
              >
                <Link href="/contact">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Free Test Counseling
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-xl"
              >
                <Link href="/quiz/career">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Take Test Selection Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Test Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare IELTS, PTE, and TOEFL to choose the right test for you
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-blue-900">
                    IELTS
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-purple-900">
                    PTE
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-green-900">
                    TOEFL
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Duration
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    2h 45m
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    2h 15m
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    3h
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Sections
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    4
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    3
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    4
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Scoring
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    0-9 bands
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    10-90
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    0-120
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Cost
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    $220-280
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    $170-220
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    $200-280
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Results
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    13 days
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    2-5 days
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    6-10 days
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Acceptance
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    Global
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    Growing
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    US-focused
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Batch Schedules Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Batch Schedules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our expert-led classes at convenient times
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                test: "IELTS",
                color: "blue",
                schedules: [
                  { time: "7:00 AM – 9:00 AM", type: "Morning Batch" },
                  { time: "5:00 PM – 7:00 PM", type: "Evening Batch" },
                  {
                    time: "Sat & Sun, 10:00 AM – 1:00 PM",
                    type: "Weekend Batch",
                  },
                ],
              },
              {
                test: "TOEFL",
                color: "green",
                schedules: [
                  { time: "6:30 AM – 8:30 AM", type: "Morning Batch" },
                  { time: "6:00 PM – 8:00 PM", type: "Evening Batch" },
                  {
                    time: "Sat & Sun, 2:00 PM – 5:00 PM",
                    type: "Weekend Batch",
                  },
                ],
              },
              {
                test: "PTE",
                color: "purple",
                schedules: [
                  { time: "8:00 AM – 10:00 AM", type: "Morning Batch" },
                  { time: "4:00 PM – 6:00 PM", type: "Evening Batch" },
                  {
                    time: "Sat & Sun, 11:00 AM – 2:00 PM",
                    type: "Weekend Batch",
                  },
                ],
              },
            ].map((batch) => (
              <Card key={batch.test} className="bg-white shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle
                    className={`text-xl font-bold text-${batch.color}-700 flex items-center`}
                  >
                    <BookOpen
                      className={`w-6 h-6 mr-2 text-${batch.color}-600`}
                    />
                    {batch.test}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {batch.schedules.map((schedule, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-gray-900">
                          {schedule.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          {schedule.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Counseling CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Need Expert Test Counseling?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get personalized advice on which test to take, study strategies, and score improvement tips from our certified trainers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Test Selection</h3>
                <p className="text-sm text-gray-600">Choose the right test based on your target country and university</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Study Plan</h3>
                <p className="text-sm text-gray-600">Get a personalized study schedule and strategy</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Score Improvement</h3>
                <p className="text-sm text-gray-600">Learn proven techniques to boost your scores</p>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl"
              >
                <Link href="/contact?service=test-counseling">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Book Free Test Counseling Session
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Ace Your English Test?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert trainers and take the
            first step towards your study abroad dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl"
            >
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Book Free Consultation
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl"
            >
              <Link href="https://testprep.alpineedu.com" target="_blank">
                <Play className="w-5 h-5 mr-2" />
                Start Mock Test
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
