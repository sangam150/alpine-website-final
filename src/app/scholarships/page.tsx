"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Filter,
  Download,
  Globe,
  GraduationCap,
  DollarSign,
  Calendar,
  BookOpen,
  Star,
  ExternalLink,
} from "lucide-react";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";

interface Scholarship {
  id: string;
  name: string;
  university: string;
  country: string;
  level: "Bachelor" | "Master" | "PhD" | "Diploma";
  field: string;
  amount: string;
  amountType: "percentage" | "fixed" | "full";
  deadline: string;
  requirements: string[];
  description: string;
  website: string;
  featured?: boolean;
}

const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "Australia Awards Scholarship",
    university: "Multiple Universities",
    country: "Australia",
    level: "Master",
    field: "All Fields",
    amount: "Full Tuition + Living",
    amountType: "full",
    deadline: "2025-04-30",
    requirements: ["IELTS 6.5", "2+ years work experience", "Bachelor degree"],
    description:
      "Fully funded scholarships for international students to study in Australia.",
    website: "https://www.australiaawards.gov.au",
    featured: true,
  },
  {
    id: "2",
    name: "Chevening Scholarship",
    university: "Multiple Universities",
    country: "UK",
    level: "Master",
    field: "All Fields",
    amount: "Full Tuition + Living",
    amountType: "full",
    deadline: "2025-11-02",
    requirements: [
      "IELTS 6.5",
      "2+ years work experience",
      "Leadership potential",
    ],
    description:
      "UK government scholarship for future leaders and influencers.",
    website: "https://www.chevening.org",
    featured: true,
  },
  {
    id: "3",
    name: "Commonwealth Scholarship",
    university: "Multiple Universities",
    country: "UK",
    level: "Master",
    field: "All Fields",
    amount: "Full Tuition + Living",
    amountType: "full",
    deadline: "2025-10-18",
    requirements: ["IELTS 6.5", "First class degree", "Development focus"],
    description:
      "Commonwealth scholarships for students from developing countries.",
    website: "https://cscuk.fcdo.gov.uk",
    featured: true,
  },
  {
    id: "4",
    name: "University of Melbourne International Scholarship",
    university: "University of Melbourne",
    country: "Australia",
    level: "Master",
    field: "All Fields",
    amount: "50% Tuition Fee",
    amountType: "percentage",
    deadline: "2025-10-31",
    requirements: [
      "IELTS 6.5",
      "Excellent academic record",
      "Research proposal",
    ],
    description: "Merit-based scholarships for international students.",
    website: "https://scholarships.unimelb.edu.au",
    featured: false,
  },
  {
    id: "5",
    name: "University of Toronto International Scholarship",
    university: "University of Toronto",
    country: "Canada",
    level: "Bachelor",
    field: "All Fields",
    amount: "CAD 100,000",
    amountType: "fixed",
    deadline: "2025-12-15",
    requirements: ["IELTS 6.5", "90%+ average", "Leadership activities"],
    description:
      "Prestigious scholarship for international undergraduate students.",
    website: "https://future.utoronto.ca",
    featured: false,
  },
  {
    id: "6",
    name: "Erasmus Mundus Scholarship",
    university: "Multiple European Universities",
    country: "Multiple European Countries",
    level: "Master",
    field: "All Fields",
    amount: "Full Tuition + Living",
    amountType: "full",
    deadline: "2025-01-15",
    requirements: [
      "IELTS 6.5",
      "Bachelor degree",
      "No previous Erasmus experience",
    ],
    description:
      "EU-funded scholarship for joint master programs across Europe.",
    website: "https://eacea.ec.europa.eu",
    featured: true,
  },
  {
    id: "7",
    name: "Fulbright Scholarship",
    university: "Multiple Universities",
    country: "USA",
    level: "Master",
    field: "All Fields",
    amount: "Full Tuition + Living",
    amountType: "full",
    deadline: "2025-05-15",
    requirements: ["TOEFL 90+", "Leadership potential", "Academic excellence"],
    description: "US government scholarship for international students.",
    website: "https://fulbright.org",
    featured: true,
  },
  {
    id: "8",
    name: "University of British Columbia International Scholarship",
    university: "University of British Columbia",
    country: "Canada",
    level: "Bachelor",
    field: "All Fields",
    amount: "CAD 25,000/year",
    amountType: "fixed",
    deadline: "2025-12-01",
    requirements: [
      "IELTS 6.5",
      "Academic excellence",
      "Extracurricular activities",
    ],
    description: "Merit-based scholarships for international students.",
    website: "https://you.ubc.ca",
    featured: false,
  },
  {
    id: "9",
    name: "Monash University International Scholarship",
    university: "Monash University",
    country: "Australia",
    level: "Master",
    field: "All Fields",
    amount: "AUD 10,000",
    amountType: "fixed",
    deadline: "2025-03-31",
    requirements: ["IELTS 6.5", "Bachelor degree", "Academic merit"],
    description: "Partial scholarships for international students.",
    website: "https://www.monash.edu",
    featured: false,
  },
  {
    id: "10",
    name: "University of Edinburgh Global Scholarship",
    university: "University of Edinburgh",
    country: "UK",
    level: "Master",
    field: "All Fields",
    amount: "£5,000",
    amountType: "fixed",
    deadline: "2025-06-01",
    requirements: ["IELTS 6.5", "Academic excellence", "Personal statement"],
    description: "Merit-based scholarships for international students.",
    website: "https://www.ed.ac.uk",
    featured: false,
  },
];

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [selectedAmount, setSelectedAmount] = useState<string>("all");

  const breadcrumbItems = [{ label: "Scholarships", current: true }];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      const matchesSearch =
        scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.university
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        scholarship.field.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || scholarship.country === selectedCountry;
      const matchesLevel =
        selectedLevel === "all" || scholarship.level === selectedLevel;
      const matchesField =
        selectedField === "all" || scholarship.field === selectedField;
      const matchesAmount =
        selectedAmount === "all" || scholarship.amountType === selectedAmount;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesLevel &&
        matchesField &&
        matchesAmount
      );
    });
  }, [
    searchTerm,
    selectedCountry,
    selectedLevel,
    selectedField,
    selectedAmount,
  ]);

  const uniqueCountries = Array.from(
    new Set(scholarships.map((s) => s.country)),
  );
  const uniqueFields = Array.from(new Set(scholarships.map((s) => s.field)));
  const uniqueLevels = Array.from(new Set(scholarships.map((s) => s.level)));

  const getAmountColor = (amountType: string) => {
    switch (amountType) {
      case "full":
        return "bg-green-100 text-green-800";
      case "percentage":
        return "bg-blue-100 text-blue-800";
      case "fixed":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "Expired";
    } else if (diffDays <= 30) {
      return `${diffDays} days left`;
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const downloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a");
    link.href = "#";
    link.download = "top-50-scholarships-2025.pdf";
    link.click();
  };

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Breadcrumb
              items={breadcrumbItems}
              className="text-green-100 mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">
              Scholarship Directory 2025
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Discover the best scholarships for international students. Filter
              by country, level, field, and amount to find your perfect
              opportunity.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Find Your Perfect Scholarship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select
                  value={selectedCountry}
                  onValueChange={setSelectedCountry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {uniqueLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedField} onValueChange={setSelectedField}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Fields" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    {uniqueFields.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedAmount}
                  onValueChange={setSelectedAmount}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Amounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Amounts</SelectItem>
                    <SelectItem value="full">Full Scholarship</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={downloadPDF}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Found {filteredScholarships.length} scholarship
              {filteredScholarships.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">
                Featured scholarships highlighted
              </span>
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map((scholarship) => (
              <Card
                key={scholarship.id}
                className={`hover:shadow-lg transition-shadow ${scholarship.featured ? "ring-2 ring-yellow-400" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">
                          {scholarship.name}
                        </CardTitle>
                        {scholarship.featured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{scholarship.university}</p>
                    </div>
                    <Badge className={getAmountColor(scholarship.amountType)}>
                      {scholarship.amount}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{scholarship.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{scholarship.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span>{scholarship.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{scholarship.field}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span
                        className={
                          formatDeadline(scholarship.deadline).includes(
                            "Expired",
                          )
                            ? "text-red-600"
                            : ""
                        }
                      >
                        {formatDeadline(scholarship.deadline)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                    <div className="flex flex-wrap gap-1">
                      {scholarship.requirements.map((req, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(scholarship.website, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Website
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() =>
                        window.open(
                          "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20want%20to%20apply%20for%20" +
                            encodeURIComponent(scholarship.name),
                          "_blank",
                        )
                      }
                    >
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <Card className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No scholarships found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("all");
                  setSelectedLevel("all");
                  setSelectedField("all");
                  setSelectedAmount("all");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Help with Scholarship Applications?
              </h2>
              <p className="text-green-100 mb-6">
                Our expert counselors can help you identify the best
                scholarships and guide you through the application process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20with%20scholarship%20applications.",
                      "_blank",
                    )
                  }
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  {/* MessageCircle icon is not imported, so it's commented out */}
                  {/* <MessageCircle className="h-4 w-4 mr-2" /> */}
                  Get Free Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Application Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
