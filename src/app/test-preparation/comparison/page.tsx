"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  BookOpen,
  Clock,
  DollarSign,
  Globe,
  Star,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Download,
  Users,
  Target,
  Calendar,
} from "lucide-react";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";
import TestPrepCTA from "@/components/marketing/StickyComparisonCTA";

interface TestComparison {
  name: string;
  fullName: string;
  format: string;
  duration: string;
  sections: string[];
  scoring: string;
  scoreRange: string;
  validity: string;
  fee: string;
  difficulty: number;
  acceptance: string[];
  pros: string[];
  cons: string[];
  nepaliFeedback: string;
  color: string;
  icon: React.ReactNode;
}

const testData: TestComparison[] = [
  {
    name: "IELTS",
    fullName: "International English Language Testing System",
    format: "Paper-based & Computer-based",
    duration: "2 hours 45 minutes",
    sections: ["Listening", "Reading", "Writing", "Speaking"],
    scoring: "Band Score (0-9)",
    scoreRange: "0.0 - 9.0",
    validity: "2 years",
    fee: "Rs. 25,000 - 30,000",
    difficulty: 7,
    acceptance: [
      "UK",
      "Australia",
      "Canada",
      "New Zealand",
      "Ireland",
      "USA (some universities)",
    ],
    pros: [
      "Widely accepted globally",
      "Face-to-face speaking test",
      "Clear band scoring system",
      "Extensive preparation resources",
    ],
    cons: [
      "Speaking test can be intimidating",
      "Longer test duration",
      "Higher fees",
      "Limited test dates",
    ],
    nepaliFeedback:
      "Most Nepali students find IELTS familiar and well-structured, though the speaking section can be challenging due to accent requirements.",
    color: "bg-blue-500",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: "PTE",
    fullName: "Pearson Test of English Academic",
    format: "Computer-based only",
    duration: "2 hours 15 minutes",
    sections: ["Speaking & Writing", "Reading", "Listening"],
    scoring: "Points (10-90)",
    scoreRange: "10 - 90",
    validity: "2 years",
    fee: "Rs. 20,000 - 25,000",
    difficulty: 6,
    acceptance: [
      "Australia",
      "UK",
      "Canada",
      "New Zealand",
      "USA (some universities)",
    ],
    pros: [
      "Faster results (2-5 days)",
      "Computer-based speaking",
      "More test dates available",
      "Generally cheaper",
    ],
    cons: [
      "Less widely accepted",
      "Computer-based speaking can be tricky",
      "Limited face-to-face interaction",
      "Fewer preparation resources",
    ],
    nepaliFeedback:
      "Nepali students often prefer PTE for its computer-based format and faster results, though the speaking section requires good microphone skills.",
    color: "bg-green-500",
    icon: <Target className="h-5 w-5" />,
  },
  {
    name: "TOEFL",
    fullName: "Test of English as a Foreign Language",
    format: "Internet-based (iBT)",
    duration: "3 hours",
    sections: ["Reading", "Listening", "Speaking", "Writing"],
    scoring: "Points (0-120)",
    scoreRange: "0 - 120",
    validity: "2 years",
    fee: "Rs. 22,000 - 28,000",
    difficulty: 8,
    acceptance: ["USA", "Canada", "UK", "Australia", "New Zealand"],
    pros: [
      "Highly accepted in USA",
      "Academic-focused content",
      "Integrated tasks",
      "Computer-adaptive reading/listening",
    ],
    cons: [
      "Longest test duration",
      "Most expensive",
      "Very academic-focused",
      "Complex scoring system",
    ],
    nepaliFeedback:
      "TOEFL is preferred by Nepali students targeting US universities, but the academic focus and longer duration can be challenging.",
    color: "bg-purple-500",
    icon: <Globe className="h-5 w-5" />,
  },
];

export default function TestComparisonPage() {
  const [selectedTest, setSelectedTest] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("overview");

  const breadcrumbItems = [
    { label: "Test Preparation", href: "/test-preparation" },
    { label: "Test Comparison", current: true },
  ];

  const filteredTests =
    selectedTest === "all"
      ? testData
      : testData.filter(
          (test) => test.name.toLowerCase() === selectedTest.toLowerCase(),
        );

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < difficulty ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <>
      <OrganizationStructuredData />
      <TestPrepCTA />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Breadcrumb
              items={breadcrumbItems}
              className="text-blue-100 mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">
              IELTS vs. PTE vs. TOEFL Comparison
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Confused about which English test to take? Compare IELTS, PTE, and
              TOEFL to find the best option for your study abroad journey.
            </p>
          </div>
        </div>

        {/* Sticky CTA */}
        <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Still confused about which test to take?
                </span>
              </div>
              <Button
                onClick={() =>
                  window.open(
                    "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20choosing%20between%20IELTS,%20PTE,%20and%20TOEFL.",
                    "_blank",
                  )
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Book FREE Consultation
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Quick Comparison Table */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Quick Comparison Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Test</th>
                      <th className="text-left p-3 font-medium">Format</th>
                      <th className="text-left p-3 font-medium">Duration</th>
                      <th className="text-left p-3 font-medium">Fee (NPR)</th>
                      <th className="text-left p-3 font-medium">Difficulty</th>
                      <th className="text-left p-3 font-medium">Results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testData.map((test) => (
                      <tr key={test.name} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-2 rounded-full ${test.color} text-white`}
                            >
                              {test.icon}
                            </div>
                            <div>
                              <div className="font-medium">{test.name}</div>
                              <div className="text-sm text-gray-600">
                                {test.fullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{test.format}</td>
                        <td className="p-3">{test.duration}</td>
                        <td className="p-3">{test.fee}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            {getDifficultyStars(test.difficulty)}
                          </div>
                        </td>
                        <td className="p-3">
                          {test.name === "PTE" ? "2-5 days" : "13 days"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Comparison Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="format">Test Format</TabsTrigger>
              <TabsTrigger value="scoring">Scoring</TabsTrigger>
              <TabsTrigger value="acceptance">Acceptance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTests.map((test) => (
                  <Card key={test.name} className="relative">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`p-2 rounded-full ${test.color} text-white`}
                        >
                          {test.icon}
                        </div>
                        <CardTitle>{test.name}</CardTitle>
                      </div>
                      <p className="text-sm text-gray-600">{test.fullName}</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Features</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{test.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span>{test.fee}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span>Valid for {test.validity}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Pros</h4>
                        <ul className="space-y-1">
                          {test.pros.map((pro, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Cons</h4>
                        <ul className="space-y-1">
                          {test.cons.map((con, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">
                          Nepali Student Feedback
                        </h4>
                        <p className="text-sm text-gray-600">
                          {test.nepaliFeedback}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="format" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Format Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Test</th>
                          <th className="text-left p-3 font-medium">
                            Sections
                          </th>
                          <th className="text-left p-3 font-medium">Format</th>
                          <th className="text-left p-3 font-medium">
                            Duration
                          </th>
                          <th className="text-left p-3 font-medium">
                            Special Features
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {testData.map((test) => (
                          <tr key={test.name} className="border-b">
                            <td className="p-3 font-medium">{test.name}</td>
                            <td className="p-3">
                              <div className="space-y-1">
                                {test.sections.map((section, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="mr-1"
                                  >
                                    {section}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-3">{test.format}</td>
                            <td className="p-3">{test.duration}</td>
                            <td className="p-3">
                              {test.name === "IELTS" && "Face-to-face speaking"}
                              {test.name === "PTE" && "Computer-based speaking"}
                              {test.name === "TOEFL" && "Integrated tasks"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scoring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scoring System Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testData.map((test) => (
                      <Card key={test.name} className="border-2">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <div
                              className={`p-2 rounded-full ${test.color} text-white`}
                            >
                              {test.icon}
                            </div>
                            {test.name} Scoring
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium">Score Range</h4>
                            <p className="text-2xl font-bold text-blue-600">
                              {test.scoreRange}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">Scoring System</h4>
                            <p className="text-sm text-gray-600">
                              {test.scoring}
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Typical Requirements
                            </h4>
                            <div className="space-y-1 text-sm">
                              <div>
                                Undergraduate:{" "}
                                {test.name === "IELTS"
                                  ? "6.0-6.5"
                                  : test.name === "PTE"
                                    ? "50-58"
                                    : "80-90"}
                              </div>
                              <div>
                                Graduate:{" "}
                                {test.name === "IELTS"
                                  ? "6.5-7.0"
                                  : test.name === "PTE"
                                    ? "58-65"
                                    : "90-100"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="acceptance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>University & Country Acceptance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testData.map((test) => (
                      <Card key={test.name}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <div
                              className={`p-2 rounded-full ${test.color} text-white`}
                            >
                              {test.icon}
                            </div>
                            {test.name} Acceptance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {test.acceptance.map((country, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{country}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Ready to Start Your Test Preparation?
              </h2>
              <p className="text-blue-100 mb-6">
                Get personalized guidance on which test is best for you and
                start your preparation journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20choosing%20between%20IELTS,%20PTE,%20and%20TOEFL.",
                      "_blank",
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Book Free Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Comparison Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
