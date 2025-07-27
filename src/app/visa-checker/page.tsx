"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Search,
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  Globe,
  GraduationCap,
  MessageCircle,
  Printer,
} from "lucide-react";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";

interface VisaRequirement {
  id: string;
  category: string;
  item: string;
  description: string;
  required: boolean;
  priority: "high" | "medium" | "low";
  estimatedCost?: string;
  timeline?: string;
  tips?: string;
}

interface VisaInfo {
  country: string;
  level: string;
  languageTest: string;
  budget: string;
  requirements: VisaRequirement[];
  processingTime: string;
  successRate: string;
  totalCost: string;
  tips: string[];
}

const visaData: Record<string, VisaInfo> = {
  "australia-master-ielts-high": {
    country: "Australia",
    level: "Master",
    languageTest: "IELTS",
    budget: "High",
    requirements: [
      {
        id: "1",
        category: "Academic",
        item: "Bachelor Degree Certificate",
        description: "Original degree certificate with transcripts",
        required: true,
        priority: "high",
        timeline: "2-3 weeks",
      },
      {
        id: "2",
        category: "Language",
        item: "IELTS Score Report",
        description: "Overall 6.5 with no band less than 6.0",
        required: true,
        priority: "high",
        timeline: "2-5 days",
      },
      {
        id: "3",
        category: "Financial",
        item: "Financial Documents",
        description: "Bank statements showing sufficient funds for 1 year",
        required: true,
        priority: "high",
        estimatedCost: "AUD 45,000-55,000",
        timeline: "1 week",
      },
      {
        id: "4",
        category: "Health",
        item: "Medical Examination",
        description: "Complete medical checkup from approved panel doctor",
        required: true,
        priority: "high",
        estimatedCost: "Rs. 15,000-20,000",
        timeline: "1-2 weeks",
      },
      {
        id: "5",
        category: "Character",
        item: "Police Clearance Certificate",
        description:
          "Police clearance from Nepal and any country lived for 12+ months",
        required: true,
        priority: "medium",
        timeline: "2-3 weeks",
      },
      {
        id: "6",
        category: "Application",
        item: "Student Visa Application",
        description: "Online application with all supporting documents",
        required: true,
        priority: "high",
        timeline: "1-2 days",
      },
      {
        id: "7",
        category: "Insurance",
        item: "Overseas Student Health Cover (OSHC)",
        description: "Health insurance for the duration of stay",
        required: true,
        priority: "high",
        estimatedCost: "AUD 500-800/year",
        timeline: "1 day",
      },
    ],
    processingTime: "4-8 weeks",
    successRate: "95%",
    totalCost: "Rs. 25,000-35,000 (visa fee)",
    tips: [
      "Apply at least 3 months before course start date",
      "Ensure all documents are properly attested",
      "Keep copies of all submitted documents",
      "Monitor application status regularly",
    ],
  },
  "uk-master-ielts-high": {
    country: "UK",
    level: "Master",
    languageTest: "IELTS",
    budget: "High",
    requirements: [
      {
        id: "1",
        category: "Academic",
        item: "Bachelor Degree Certificate",
        description: "Original degree certificate with transcripts",
        required: true,
        priority: "high",
        timeline: "2-3 weeks",
      },
      {
        id: "2",
        category: "Language",
        item: "IELTS Score Report",
        description: "Overall 6.5 with no band less than 6.0",
        required: true,
        priority: "high",
        timeline: "2-5 days",
      },
      {
        id: "3",
        category: "Financial",
        item: "Financial Documents",
        description: "Bank statements showing sufficient funds for 9 months",
        required: true,
        priority: "high",
        estimatedCost: "GBP 30,000-40,000",
        timeline: "1 week",
      },
      {
        id: "4",
        category: "Application",
        item: "Student Visa Application",
        description: "Online application with biometric appointment",
        required: true,
        priority: "high",
        timeline: "1-2 days",
      },
      {
        id: "5",
        category: "Health",
        item: "Tuberculosis Test",
        description:
          "TB test from approved clinic if staying more than 6 months",
        required: true,
        priority: "medium",
        estimatedCost: "Rs. 8,000-12,000",
        timeline: "1 week",
      },
      {
        id: "6",
        category: "Insurance",
        item: "Health Surcharge Payment",
        description: "Immigration Health Surcharge (IHS) payment",
        required: true,
        priority: "high",
        estimatedCost: "GBP 470/year",
        timeline: "1 day",
      },
    ],
    processingTime: "3-6 weeks",
    successRate: "92%",
    totalCost: "GBP 363 (visa fee) + IHS",
    tips: [
      "Apply 3 months before course start date",
      "Ensure financial documents are recent (within 28 days)",
      "Prepare for biometric appointment",
      "Keep all original documents ready",
    ],
  },
  "canada-master-ielts-high": {
    country: "Canada",
    level: "Master",
    languageTest: "IELTS",
    budget: "High",
    requirements: [
      {
        id: "1",
        category: "Academic",
        item: "Bachelor Degree Certificate",
        description: "Original degree certificate with transcripts",
        required: true,
        priority: "high",
        timeline: "2-3 weeks",
      },
      {
        id: "2",
        category: "Language",
        item: "IELTS Score Report",
        description: "Overall 6.5 with no band less than 6.0",
        required: true,
        priority: "high",
        timeline: "2-5 days",
      },
      {
        id: "3",
        category: "Financial",
        item: "Financial Documents",
        description: "Bank statements showing sufficient funds for 1 year",
        required: true,
        priority: "high",
        estimatedCost: "CAD 35,000-45,000",
        timeline: "1 week",
      },
      {
        id: "4",
        category: "Application",
        item: "Study Permit Application",
        description: "Online application with all supporting documents",
        required: true,
        priority: "high",
        timeline: "1-2 days",
      },
      {
        id: "5",
        category: "Health",
        item: "Medical Examination",
        description: "Complete medical checkup from approved panel physician",
        required: true,
        priority: "high",
        estimatedCost: "Rs. 15,000-20,000",
        timeline: "1-2 weeks",
      },
      {
        id: "6",
        category: "Character",
        item: "Police Clearance Certificate",
        description:
          "Police clearance from Nepal and any country lived for 6+ months",
        required: true,
        priority: "medium",
        timeline: "2-3 weeks",
      },
    ],
    processingTime: "6-12 weeks",
    successRate: "88%",
    totalCost: "CAD 150 (application fee)",
    tips: [
      "Apply 4-6 months before course start date",
      "Ensure all documents are properly translated and notarized",
      "Prepare for potential interview",
      "Monitor application status through GCKey",
    ],
  },
};

export default function VisaCheckerPage() {
  const [formData, setFormData] = useState({
    country: "",
    level: "",
    languageTest: "",
    budget: "",
  });
  const [visaInfo, setVisaInfo] = useState<VisaInfo | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const breadcrumbItems = [{ label: "Visa Checker", current: true }];

  const countries = [
    "Australia",
    "UK",
    "Canada",
    "USA",
    "New Zealand",
    "Germany",
    "Ireland",
  ];
  const levels = ["Bachelor", "Master", "PhD", "Diploma"];
  const languageTests = ["IELTS", "PTE", "TOEFL", "Duolingo"];
  const budgets = ["Low", "Medium", "High"];

  const generateVisaInfo = () => {
    setIsGenerating(true);

    // Simulate processing time
    setTimeout(() => {
      const key = `${formData.country.toLowerCase()}-${formData.level.toLowerCase()}-${formData.languageTest.toLowerCase()}-${formData.budget.toLowerCase()}`;
      const info = visaData[key] || visaData["australia-master-ielts-high"]; // fallback
      setVisaInfo(info);
      setIsGenerating(false);
    }, 2000);
  };

  const downloadPDF = () => {
    if (!visaInfo) return;

    // Simulate PDF generation and download
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${visaInfo.country}-${visaInfo.level}-visa-checklist.pdf`;
    link.click();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isFormComplete =
    formData.country &&
    formData.level &&
    formData.languageTest &&
    formData.budget;

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Breadcrumb
              items={breadcrumbItems}
              className="text-purple-100 mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">
              Visa Requirement Checker
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl">
              Get your personalized visa checklist based on your study
              destination, level, and requirements. Download your checklist
              instantly!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-600" />
                Tell Us About Your Study Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Country *
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level of Study *
                  </label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language Test *
                  </label>
                  <Select
                    value={formData.languageTest}
                    onValueChange={(value) =>
                      setFormData({ ...formData, languageTest: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select test" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageTests.map((test) => (
                        <SelectItem key={test} value={test}>
                          {test}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <Select
                    value={formData.budget}
                    onValueChange={(value) =>
                      setFormData({ ...formData, budget: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgets.map((budget) => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateVisaInfo}
                disabled={!isFormComplete || isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating Checklist...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Generate Visa Checklist
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {visaInfo && (
            <div className="space-y-6">
              {/* Summary Card */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Visa Summary for {visaInfo.country} - {visaInfo.level}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Processing Time</p>
                      <p className="font-bold text-lg">
                        {visaInfo.processingTime}
                      </p>
                    </div>
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="font-bold text-lg">
                        {visaInfo.successRate}
                      </p>
                    </div>
                    <div className="text-center">
                      <DollarSign className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Visa Fee</p>
                      <p className="font-bold text-lg">{visaInfo.totalCost}</p>
                    </div>
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Requirements</p>
                      <p className="font-bold text-lg">
                        {visaInfo.requirements.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements Checklist */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Required Documents Checklist
                    </CardTitle>
                    <Button
                      onClick={downloadPDF}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visaInfo.requirements.map((req) => (
                      <div
                        key={req.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{req.item}</h4>
                              <Badge className={getPriorityColor(req.priority)}>
                                {req.priority.toUpperCase()}
                              </Badge>
                              {req.required && (
                                <Badge className="bg-red-100 text-red-800">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">
                              {req.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {req.timeline && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{req.timeline}</span>
                                </div>
                              )}
                              {req.estimatedCost && (
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{req.estimatedCost}</span>
                                </div>
                              )}
                            </div>
                            {req.tips && (
                              <div className="mt-2 p-2 bg-blue-50 rounded text-sm text-blue-800">
                                <strong>Tip:</strong> {req.tips}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    Important Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {visaInfo.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">
                    Need Help with Your Visa Application?
                  </h2>
                  <p className="text-purple-100 mb-6">
                    Our expert visa consultants can guide you through the entire
                    process and ensure a successful application.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() =>
                        window.open(
                          "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20with%20my%20visa%20application%20for%20" +
                            encodeURIComponent(visaInfo.country),
                          "_blank",
                        )
                      }
                      className="bg-white text-purple-600 hover:bg-gray-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Get Free Consultation
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-purple-600"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
