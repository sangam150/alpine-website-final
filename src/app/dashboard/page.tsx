'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import React from "react";

export default function DashboardPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  const {
    signInWithEmailPassword,
    twoFARequired,
    twoFAStep,
    start2FA,
    verify2FACode,
    twoFAError,
  } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailPassword(email, password);
      if (!twoFARequired) {
        router.push("/student-portal");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!code) {
      setError("Please enter the verification code.");
      return;
    }
    setIsLoading(true);
    try {
      const ok = await verify2FACode(code);
      if (ok) {
        router.push("/student-portal");
      }
    } catch (err: any) {
      setError(err?.message || "Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Start 2FA when required and step is pending
  React.useEffect(() => {
    if (twoFARequired && twoFAStep === "pending") {
      start2FA({ email } as any);
    }
  }, [twoFARequired, twoFAStep, start2FA, email]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div id="recaptcha-container" style={{ display: 'none' }} />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Student Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Track your application progress and manage your study abroad
              journey
            </p>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Student Login
              </h2>

              {/* 2FA Step */}
              {twoFARequired ? (
                <form className="space-y-6" onSubmit={handle2FASubmit}>
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      autoComplete="one-time-code"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter the code sent to your email"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  {(error || twoFAError) && (
                    <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                      {error || twoFAError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
                    disabled={isLoading || twoFAStep === "success"}
                  >
                    {isLoading ? "Verifying..." : "Verify Code"}
                  </button>
                  {twoFAStep === "success" && (
                    <div className="text-green-600 text-center font-medium mt-2">Verification successful! Redirecting...</div>
                  )}
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {error && (
                    <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              )}

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/contact"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                This portal is for existing students only. For new inquiries,
                please visit our{" "}
                <a
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700"
                >
                  contact page
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Portal Features
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              What you can do in your student portal
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Track Progress
                </h3>
                <p className="text-gray-600">
                  Monitor your application status and timeline
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  View Documents
                </h3>
                <p className="text-gray-600">
                  Access and download your application documents
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Updates
                </h3>
                <p className="text-gray-600">
                  Receive real-time updates on your application
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
