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
  Globe,
  GraduationCap,
  DollarSign,
  BookOpen,
  Star,
  ExternalLink,
  Calendar,
  Users,
  Award,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";

interface Course {
  id: string;
  name: string;
  university: string;
  country: string;
  field: string;
  level: "Bachelor" | "Master" | "PhD" | "Diploma";
  duration: string;
  tuitionFee: string;
  budget: "Low" | "Medium" | "High";
  ieltsRequired: boolean;
  ieltsScore: string;
  intake: string[];
  description: string;
  highlights: string[];
  requirements: string[];
  website: string;
  featured?: boolean;
  courseOfTheWeek?: boolean;
}

const courses: Course[] = [
  {
    id: "1",
    name: "Master of Computer Science",
    university: "University of Melbourne",
    country: "Australia",
    field: "Computer Science",
    level: "Master",
    duration: "2 years",
    tuitionFee: "AUD 45,000/year",
    budget: "High",
    ieltsRequired: true,
    ieltsScore: "6.5 overall, 6.0 in each band",
    intake: ["February", "July"],
    description:
      "Advanced computer science program with focus on AI, machine learning, and software engineering.",
    highlights: [
      "QS World Ranking: #14",
      "Industry partnerships with Google, Microsoft",
      "Research opportunities in AI/ML",
      "Post-study work visa eligibility",
    ],
    requirements: [
      "Bachelor degree in Computer Science or related field",
      "IELTS 6.5 overall with 6.0 in each band",
      "GPA 3.0/4.0 or equivalent",
      "Statement of Purpose",
      "Letters of Recommendation",
    ],
    website: "https://study.unimelb.edu.au",
    featured: true,
    courseOfTheWeek: true,
  },
  {
    id: "2",
    name: "Master of Business Administration (MBA)",
    university: "University of Sydney",
    country: "Australia",
    field: "Business",
    level: "Master",
    duration: "1.5 years",
    tuitionFee: "AUD 52,000/year",
    budget: "High",
    ieltsRequired: true,
    ieltsScore: "7.0 overall, 6.0 in each band",
    intake: ["March", "August"],
    description:
      "Comprehensive MBA program designed for future business leaders and entrepreneurs.",
    highlights: [
      "QS World Ranking: #19",
      "AACSB accredited",
      "Global business network",
      "Internship opportunities",
    ],
    requirements: [
      "Bachelor degree in any field",
      "2+ years work experience",
      "IELTS 7.0 overall with 6.0 in each band",
      "GMAT score 600+",
      "Personal statement and interview",
    ],
    website: "https://sydney.edu.au",
    featured: true,
  },
  {
    id: "3",
    name: "Bachelor of Engineering (Civil)",
    university: "University of British Columbia",
    country: "Canada",
    field: "Engineering",
    level: "Bachelor",
    duration: "4 years",
    tuitionFee: "CAD 42,000/year",
    budget: "High",
    ieltsRequired: true,
    ieltsScore: "6.5 overall, 6.0 in each band",
    intake: ["September"],
    description:
      "Comprehensive civil engineering program with focus on sustainable infrastructure development.",
    highlights: [
      "QS World Ranking: #34",
      "Co-op program available",
      "Professional accreditation",
      "Research opportunities",
    ],
    requirements: [
      "High school diploma with strong math/science",
      "IELTS 6.5 overall with 6.0 in each band",
      "Personal profile",
      "Extracurricular activities",
    ],
    website: "https://you.ubc.ca",
    featured: false,
  },
  {
    id: "4",
    name: "Master of Data Science",
    university: "University of Toronto",
    country: "Canada",
    field: "Data Science",
    level: "Master",
    duration: "2 years",
    tuitionFee: "CAD 48,000/year",
    budget: "High",
    ieltsRequired: true,
    ieltsScore: "7.0 overall, 6.5 in each band",
    intake: ["September"],
    description:
      "Interdisciplinary program combining statistics, computer science, and domain expertise.",
    highlights: [
      "QS World Ranking: #21",
      "Industry partnerships",
      "Capstone project",
      "Career services support",
    ],
    requirements: [
      "Bachelor degree in quantitative field",
      "IELTS 7.0 overall with 6.5 in each band",
      "Strong mathematical background",
      "Programming experience",
      "Statement of Intent",
    ],
    website: "https://future.utoronto.ca",
    featured: true,
  },
  {
    id: "5",
    name: "Master of International Business",
    university: "University of Edinburgh",
    country: "UK",
    field: "Business",
    level: "Master",
    duration: "1 year",
    tuitionFee: "£25,000",
    budget: "Medium",
    ieltsRequired: true,
    ieltsScore: "7.0 overall, 6.0 in each band",
    intake: ["September"],
    description:
      "Specialized program in international business with global perspective and practical experience.",
    highlights: [
      "QS World Ranking: #22",
      "Triple Crown accreditation",
      "Global study trips",
      "Industry guest lectures",
    ],
    requirements: [
      "Bachelor degree in business or related field",
      "IELTS 7.0 overall with 6.0 in each band",
      "Personal statement",
      "Academic references",
    ],
    website: "https://www.ed.ac.uk",
    featured: false,
  },
  {
    id: "6",
    name: "Bachelor of Computer Science",
    university: "University of Manchester",
    country: "UK",
    field: "Computer Science",
    level: "Bachelor",
    duration: "3 years",
    tuitionFee: "£25,000/year",
    budget: "Medium",
    ieltsRequired: true,
    ieltsScore: "6.5 overall, 6.0 in each band",
    intake: ["September"],
    description:
      "Comprehensive computer science program with strong industry connections and research focus.",
    highlights: [
      "QS World Ranking: #28",
      "Industry placement year",
      "Research-led teaching",
      "Professional accreditation",
    ],
    requirements: [
      "A-levels or equivalent",
      "IELTS 6.5 overall with 6.0 in each band",
      "Strong mathematics background",
      "Personal statement",
    ],
    website: "https://www.manchester.ac.uk",
    featured: false,
  },
  {
    id: "7",
    name: "Master of Public Health",
    university: "University of Auckland",
    country: "New Zealand",
    field: "Public Health",
    level: "Master",
    duration: "1.5 years",
    tuitionFee: "NZD 45,000/year",
    budget: "Medium",
    ieltsRequired: true,
    ieltsScore: "6.5 overall, 6.0 in each band",
    intake: ["February", "July"],
    description:
      "Comprehensive public health program addressing global health challenges and policy development.",
    highlights: [
      "QS World Ranking: #68",
      "Research opportunities",
      "Field placements",
      "International focus",
    ],
    requirements: [
      "Bachelor degree in health or related field",
      "IELTS 6.5 overall with 6.0 in each band",
      "Relevant work experience",
      "Statement of purpose",
    ],
    website: "https://www.auckland.ac.nz",
    featured: false,
  },
  {
    id: "8",
    name: "Bachelor of Commerce",
    university: "University of Otago",
    country: "New Zealand",
    field: "Commerce",
    level: "Bachelor",
    duration: "3 years",
    tuitionFee: "NZD 32,000/year",
    budget: "Low",
    ieltsRequired: true,
    ieltsScore: "6.0 overall, 5.5 in each band",
    intake: ["February", "July"],
    description:
      "Flexible commerce program with multiple majors and strong industry connections.",
    highlights: [
      "QS World Ranking: #206",
      "Multiple major options",
      "Industry connections",
      "Beautiful campus location",
    ],
    requirements: [
      "High school diploma",
      "IELTS 6.0 overall with 5.5 in each band",
      "Mathematics background",
      "Personal statement",
    ],
    website: "https://www.otago.ac.nz",
    featured: false,
  },
];

export default function CourseFinderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedField, setSelectedField] = useState<string>("all");
  const [selectedBudget, setSelectedBudget] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [ieltsStatus, setIeltsStatus] = useState<string>("all");

  const breadcrumbItems = [{ label: "Course Finder", current: true }];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCountry =
        selectedCountry === "all" || course.country === selectedCountry;
      const matchesField =
        selectedField === "all" || course.field === selectedField;
      const matchesBudget =
        selectedBudget === "all" || course.budget === selectedBudget;
      const matchesLevel =
        selectedLevel === "all" || course.level === selectedLevel;
      const matchesIelts =
        ieltsStatus === "all" ||
        (ieltsStatus === "with" && course.ieltsRequired) ||
        (ieltsStatus === "without" && !course.ieltsRequired);

      return (
        matchesSearch &&
        matchesCountry &&
        matchesField &&
        matchesBudget &&
        matchesLevel &&
        matchesIelts
      );
    });
  }, [
    searchTerm,
    selectedCountry,
    selectedField,
    selectedBudget,
    selectedLevel,
    ieltsStatus,
  ]);

  const uniqueCountries = Array.from(new Set(courses.map((c) => c.country)));
  const uniqueFields = Array.from(new Set(courses.map((c) => c.field)));
  const uniqueLevels = Array.from(new Set(courses.map((c) => c.level)));

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Bachelor":
        return "bg-blue-100 text-blue-800";
      case "Master":
        return "bg-purple-100 text-purple-800";
      case "PhD":
        return "bg-orange-100 text-orange-800";
      case "Diploma":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <Breadcrumb
              items={breadcrumbItems}
              className="text-indigo-100 mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Course Finder</h1>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Find the perfect course for your study abroad journey. Filter by
              country, field, budget, and requirements to discover your ideal
              program.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-indigo-600" />
                Find Your Perfect Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
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
                  value={selectedBudget}
                  onValueChange={setSelectedBudget}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Budgets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="Low">Low Budget</SelectItem>
                    <SelectItem value="Medium">Medium Budget</SelectItem>
                    <SelectItem value="High">High Budget</SelectItem>
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

                <Select value={ieltsStatus} onValueChange={setIeltsStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="IELTS Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="with">With IELTS</SelectItem>
                    <SelectItem value="without">Without IELTS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Found {filteredCourses.length} course
              {filteredCourses.length !== 1 ? "s" : ""}
            </p>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">
                Featured courses highlighted
              </span>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className={`hover:shadow-lg transition-shadow ${course.featured ? "ring-2 ring-indigo-400" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        {course.courseOfTheWeek && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Award className="h-3 w-3 mr-1" />
                            Course of the Week
                          </Badge>
                        )}
                        {course.featured && (
                          <Badge className="bg-indigo-100 text-indigo-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">{course.university}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{course.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span>{course.country}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span>{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{course.field}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={getBudgetColor(course.budget)}>
                      <DollarSign className="h-3 w-3 mr-1" />
                      {course.budget} Budget
                    </Badge>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    {course.ieltsRequired && (
                      <Badge className="bg-red-100 text-red-800">
                        IELTS {course.ieltsScore}
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Tuition Fee:</h4>
                    <p className="text-lg font-bold text-indigo-600">
                      {course.tuitionFee}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Intakes:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.intake.map((intake, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {intake}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {course.highlights.slice(0, 2).map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(course.website, "_blank")}
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
                            encodeURIComponent(course.name),
                          "_blank",
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <Card className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No courses found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCountry("all");
                  setSelectedField("all");
                  setSelectedBudget("all");
                  setSelectedLevel("all");
                  setIeltsStatus("all");
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Help Choosing the Right Course?
              </h2>
              <p className="text-indigo-100 mb-6">
                Our expert counselors can help you find the perfect course based
                on your interests, budget, and career goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20need%20help%20choosing%20the%20right%20course.",
                      "_blank",
                    )
                  }
                  className="bg-white text-indigo-600 hover:bg-gray-100"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Free Consultation
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-indigo-600"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Book Course Counseling
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
