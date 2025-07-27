"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import React from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      // If 2FA is required, UI will show code step
      if (!twoFARequired) {
        router.push("/admin/dashboard");
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
        router.push("/admin/dashboard");
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
      start2FA({ email } as any); // Pass user object if needed
    }
  }, [twoFARequired, twoFAStep, start2FA, email]);

  const handleDemoLogin = () => {
    setEmail("info.alpineedu@gmail.com");
    setPassword("Sussage@2468");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div id="recaptcha-container" style={{ display: 'none' }} />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Sign in to access the admin dashboard</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Administrator Access</CardTitle>
          </CardHeader>
          <CardContent>
            {/* 2FA Step */}
            {twoFARequired ? (
              <form className="space-y-6" onSubmit={handle2FASubmit}>
                <div>
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="one-time-code"
                    required
                    className="h-12"
                    placeholder="Enter the code sent to your phone/email"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                {(error || twoFAError) && (
                  <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                    {error || twoFAError}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading || twoFAStep === "success"}
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
                {twoFAStep === "success" && (
                  <div className="text-green-600 text-center font-medium mt-2">Verification successful! Redirecting...</div>
                )}
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 h-12"
                      placeholder="admin@alpineedu.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="pl-10 pr-10 h-12"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                {error && (
                  <div className="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Use Demo Credentials
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              Demo Credentials
            </h3>
            <p className="text-xs text-blue-700">
              Email: info.alpineedu@gmail.com
              <br />
              Password: Sussage@2468
            </p>
          </div>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to Alpine Education
          </a>
        </div>
      </div>
    </div>
  );
}
