"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  GraduationCap,
  Globe,
  FileText,
  Send,
  CheckCircle,
} from "lucide-react";

const countries = [
  "Australia",
  "United Kingdom",
  "Canada",
  "United States",
  "New Zealand",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "Spain",
  "Malta",
  "UAE",
];

const courses = [
  "Business & Management",
  "Engineering",
  "Computer Science",
  "Medicine & Health",
  "Arts & Humanities",
  "Social Sciences",
  "Natural Sciences",
  "Law",
  "Education",
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      nationality: "",
    },
    academicInfo: {
      currentEducation: "",
      institution: "",
      graduationYear: "",
      gpa: "",
      englishTest: "",
      englishScore: "",
    },
    preferences: {
      preferredCountries: [] as string[],
      preferredCourses: [] as string[],
      intake: "",
      budget: "",
    },
    documents: {
      passport: null,
      transcripts: null,
      englishTest: null,
      sop: null,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your application. Our team will review your details
              and contact you within 24 hours to discuss the next steps.
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full">
                <a href="/contact">Schedule Free Consultation</a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href="/">Return to Homepage</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" />
            Study Abroad Application
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Start Your Study Abroad Journey
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete this application form and our expert counselors will guide
            you through the entire process.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > stepNumber ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.personalInfo.firstName}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "firstName",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.personalInfo.lastName}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "lastName",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "email",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.personalInfo.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "phone",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "dateOfBirth",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Input
                      id="nationality"
                      value={formData.personalInfo.nationality}
                      onChange={(e) =>
                        handleInputChange(
                          "personalInfo",
                          "nationality",
                          e.target.value,
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setStep(2)}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Academic Background
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currentEducation">
                      Current Education Level *
                    </Label>
                    <Select
                      value={formData.academicInfo.currentEducation}
                      onValueChange={(value) =>
                        handleInputChange(
                          "academicInfo",
                          "currentEducation",
                          value,
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelor">
                          Bachelor&apos;s Degree
                        </SelectItem>
                                                  <SelectItem value="master">Master&apos;s Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="institution">Current Institution</Label>
                    <Input
                      id="institution"
                      value={formData.academicInfo.institution}
                      onChange={(e) =>
                        handleInputChange(
                          "academicInfo",
                          "institution",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="2020"
                      max="2030"
                      value={formData.academicInfo.graduationYear}
                      onChange={(e) =>
                        handleInputChange(
                          "academicInfo",
                          "graduationYear",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA (if applicable)</Label>
                    <Input
                      id="gpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4"
                      value={formData.academicInfo.gpa}
                      onChange={(e) =>
                        handleInputChange("academicInfo", "gpa", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="englishTest">English Test Taken</Label>
                    <Select
                      value={formData.academicInfo.englishTest}
                      onValueChange={(value) =>
                        handleInputChange("academicInfo", "englishTest", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select test" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ielts">IELTS</SelectItem>
                        <SelectItem value="toefl">TOEFL</SelectItem>
                        <SelectItem value="pte">PTE</SelectItem>
                        <SelectItem value="none">Not taken yet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="englishScore">English Test Score</Label>
                    <Input
                      id="englishScore"
                      value={formData.academicInfo.englishScore}
                      onChange={(e) =>
                        handleInputChange(
                          "academicInfo",
                          "englishScore",
                          e.target.value,
                        )
                      }
                      placeholder="e.g., 7.0 IELTS or 100 TOEFL"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={() => setStep(3)}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Preferences */}
          {step === 3 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Study Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Preferred Countries (select up to 3) *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {countries.map((country) => (
                      <label
                        key={country}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={country}
                          checked={formData.preferences.preferredCountries.includes(
                            country,
                          )}
                          onChange={(e) => {
                            const current =
                              formData.preferences.preferredCountries;
                            if (e.target.checked && current.length < 3) {
                              handleInputChange(
                                "preferences",
                                "preferredCountries",
                                [...current, country],
                              );
                            } else if (!e.target.checked) {
                              handleInputChange(
                                "preferences",
                                "preferredCountries",
                                current.filter((c) => c !== country),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Preferred Courses (select up to 3) *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {courses.map((course) => (
                      <label
                        key={course}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={course}
                          checked={formData.preferences.preferredCourses.includes(
                            course,
                          )}
                          onChange={(e) => {
                            const current =
                              formData.preferences.preferredCourses;
                            if (e.target.checked && current.length < 3) {
                              handleInputChange(
                                "preferences",
                                "preferredCourses",
                                [...current, course],
                              );
                            } else if (!e.target.checked) {
                              handleInputChange(
                                "preferences",
                                "preferredCourses",
                                current.filter((c) => c !== course),
                              );
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="intake">Preferred Intake *</Label>
                    <Select
                      value={formData.preferences.intake}
                      onValueChange={(value) =>
                        handleInputChange("preferences", "intake", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select intake" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sep-2025">September 2025</SelectItem>
                        <SelectItem value="jan-2026">January 2026</SelectItem>
                        <SelectItem value="feb-2026">February 2026</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Annual Budget (USD) *</Label>
                    <Select
                      value={formData.preferences.budget}
                      onValueChange={(value) =>
                        handleInputChange("preferences", "budget", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-20000">
                          Under $20,000
                        </SelectItem>
                        <SelectItem value="20000-35000">
                          $20,000 - $35,000
                        </SelectItem>
                        <SelectItem value="35000-50000">
                          $35,000 - $50,000
                        </SelectItem>
                        <SelectItem value="over-50000">Over $50,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                  >
                    Previous
                  </Button>
                  <Button type="button" onClick={() => setStep(4)}>
                    Next Step
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Documents & Submit */}
          {step === 4 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Tell us about your study abroad goals, any specific requirements, or questions you have..."
                    rows={4}
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>
                      • Our expert counselors will review your application
                      within 24 hours
                    </li>
                    <li>
                      • We&apos;ll schedule a free consultation call to discuss your
                      options
                    </li>
                    <li>
                      • You&apos;ll receive a personalized study plan and university
                      recommendations
                    </li>
                    <li>
                      • We&apos;ll guide you through the entire application and visa
                      process
                    </li>
                  </ul>
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(3)}
                  >
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}
