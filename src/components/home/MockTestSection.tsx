"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FirebaseService } from "@/lib/firebase-collections";

export default function MockTestSection() {
  const [testTypes, setTestTypes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTestTypes() {
      // Fetch test types from Firestore
      const firestoreTests = await FirebaseService.getDocuments<any>("mockTests");
      setTestTypes(firestoreTests);
    }
    fetchTestTypes();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Mock Tests & Test Preparation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice with our free mock tests and get expert guidance to
              achieve your target scores
            </p>
          </div>

          {/* Test Types Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testTypes.map((test) => (
              <div
                key={test.name}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{test.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {test.description}
                  </p>

                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{test.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target Score:</span>
                      <span className="font-medium">{test.score}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Sections:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {test.sections.map((section: string) => (
                        <span
                          key={section}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {section}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/test-preparation/${test.name.toLowerCase()}`}
                    className={`inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${test.color} text-white font-semibold rounded-lg hover:scale-105 transition-all duration-200`}
                  >
                    Take Free Mock Test
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Our Test Prep?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Expert Instructors
                    </div>
                    <div className="text-sm text-gray-600">
                      Certified trainers with 10+ years experience
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Free Mock Tests
                    </div>
                    <div className="text-sm text-gray-600">
                      Practice with real exam format questions
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Score Improvement Guarantee
                    </div>
                    <div className="text-sm text-gray-600">
                      Free retake if you don&apos;t improve
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Flexible Schedule
                    </div>
                    <div className="text-sm text-gray-600">
                      Morning, evening, and weekend classes
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
              <p className="text-blue-100 mb-6">
                Book a free consultation to discuss your test preparation needs
                and get a personalized study plan.
              </p>
              <div className="space-y-4">
                <Link
                  href="https://testprep.alpineedu.com"
                  target="_blank"
                  className="block w-full bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-200"
                >
                  Take Free Mock Test
                </Link>
                <Link
                  href="/contact"
                  className="block w-full bg-white/20 text-white font-semibold py-3 px-6 rounded-lg text-center border-2 border-white/30 hover:bg-white/30 transition-colors duration-200"
                >
                  Schedule Free Consultation
                </Link>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Don&apos;t Know Which Test to Take?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Take our free assessment quiz to determine which English
                proficiency test is best suited for your study abroad goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/test-preparation"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
                >
                  Take Test Assessment Quiz
                </Link>
                <Link
                  href="/test-preparation"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
                >
                  Learn More About Tests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
