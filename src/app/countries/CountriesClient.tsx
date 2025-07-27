"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Globe,
  Users,
  GraduationCap,
  Clock,
  DollarSign,
  BookOpen,
  Star,
  CheckCircle,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";

// Type definitions
interface Country {
  name: string;
  flag: string;
  description: string;
  students: string;
  universities: string;
  path: string;
  tuition: string;
  workRights: string;
  intakes: string;
  duration: string;
  visaSuccess: string;
  highlights: string[];
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

type Region = "English-Speaking" | "Europe" | "Emerging Destinations";

// Enhanced country data with more details
const COUNTRIES_BY_REGION: Record<Region, Country[]> = {
  "English-Speaking": [
    {
      name: "Australia",
      flag: "/flags/australia.svg",
      description: "World-class universities and post-study work opportunities",
      students: "500+",
      universities: "43",
      path: "/countries/australia",
      tuition: "$22,000-38,000",
      workRights: "2-4 years",
      intakes: "Feb, Jul",
      duration: "3-4 years",
      visaSuccess: "98%",
      highlights: [
        "Post-study work visa",
        "High quality of life",
        "Strong economy",
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      name: "United Kingdom",
      flag: "/flags/uk.svg",
      description: "Historic institutions and global recognition",
      students: "400+",
      universities: "130+",
      path: "/countries/uk",
      tuition: "$28,000-45,000",
      workRights: "2 years",
      intakes: "Sep, Jan",
      duration: "3-4 years",
      visaSuccess: "97%",
      highlights: [
        "World-class universities",
        "Cultural experience",
        "Global recognition",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      name: "Canada",
      flag: "/flags/canada.svg",
      description: "Quality education and immigration pathways",
      students: "350+",
      universities: "97",
      path: "/countries/canada",
      tuition: "$20,000-35,000",
      workRights: "3 years",
      intakes: "Sep, Jan, May",
      duration: "3-4 years",
      visaSuccess: "96%",
      highlights: ["PR pathway", "Affordable education", "Safe environment"],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
    {
      name: "United States",
      flag: "/flags/usa.svg",
      description: "Top-ranked universities and research opportunities",
      students: "300+",
      universities: "4,000+",
      path: "/countries/usa",
      tuition: "$35,000-60,000",
      workRights: "1-3 years",
      intakes: "Aug, Jan",
      duration: "4 years",
      visaSuccess: "95%",
      highlights: [
        "Top universities",
        "Research opportunities",
        "Innovation hub",
      ],
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      textColor: "text-indigo-700",
    },
    {
      name: "New Zealand",
      flag: "/flags/new-zealand.svg",
      description: "Beautiful landscapes and practical education",
      students: "200+",
      universities: "8",
      path: "/countries/new-zealand",
      tuition: "$25,000-40,000",
      workRights: "3 years",
      intakes: "Feb, Jul",
      duration: "3-4 years",
      visaSuccess: "98%",
      highlights: ["Beautiful country", "Work-life balance", "Friendly people"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      name: "Ireland",
      flag: "/flags/ireland.svg",
      description: "Tech industry and friendly environment",
      students: "80+",
      universities: "7",
      path: "/countries/ireland",
      tuition: "$18,000-28,000",
      workRights: "2 years",
      intakes: "Sep, Jan",
      duration: "3-4 years",
      visaSuccess: "97%",
      highlights: ["Tech hub", "EU benefits", "English speaking"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
  ],
  Europe: [
    {
      name: "Germany",
      flag: "/flags/germany.svg",
      description: "Free education and strong economy",
      students: "150+",
      universities: "400+",
      path: "/countries/germany",
      tuition: "€0-2,000",
      workRights: "18 months",
      intakes: "Oct, Apr",
      duration: "3-4 years",
      visaSuccess: "94%",
      highlights: ["Free education", "Strong economy", "EU benefits"],
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-700",
    },
    {
      name: "France",
      flag: "/flags/france.svg",
      description: "Cultural experience and affordable education",
      students: "120+",
      universities: "3,500+",
      path: "/countries/france",
      tuition: "€200-450",
      workRights: "1 year",
      intakes: "Sep, Feb",
      duration: "3-4 years",
      visaSuccess: "93%",
      highlights: [
        "Cultural experience",
        "Affordable education",
        "EU benefits",
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-700",
    },
    {
      name: "Netherlands",
      flag: "/flags/netherlands.svg",
      description: "Innovation hub and English-taught programs",
      students: "100+",
      universities: "13",
      path: "/countries/netherlands",
      tuition: "€10,000-18,000",
      workRights: "1 year",
      intakes: "Sep, Feb",
      duration: "3-4 years",
      visaSuccess: "95%",
      highlights: ["Innovation hub", "English programs", "EU benefits"],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-700",
    },
    {
      name: "Spain",
      flag: "/flags/spain.svg",
      description: "Sunny climate and cultural diversity",
      students: "80+",
      universities: "76",
      path: "/countries/spain",
      tuition: "€1,200-5,000",
      workRights: "1 year",
      intakes: "Sep, Feb",
      duration: "3-4 years",
      visaSuccess: "92%",
      highlights: ["Sunny climate", "Cultural diversity", "EU benefits"],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ],
  "Emerging Destinations": [
    {
      name: "UAE",
      flag: "/flags/uae.svg",
      description: "Modern cities and business opportunities",
      students: "60+",
      universities: "40+",
      path: "/countries/uae",
      tuition: "$18,000-30,000",
      workRights: "Limited",
      intakes: "Sep, Jan",
      duration: "3-4 years",
      visaSuccess: "90%",
      highlights: ["Modern cities", "Business hub", "Tax-free income"],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700",
    },
    {
      name: "Malta",
      flag: "/flags/malta.svg",
      description: "English-speaking EU country",
      students: "40+",
      universities: "3",
      path: "/countries/malta",
      tuition: "€10,000-18,000",
      workRights: "EU benefits",
      intakes: "Oct, Feb",
      duration: "3-4 years",
      visaSuccess: "95%",
      highlights: ["English speaking", "EU benefits", "Mediterranean climate"],
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-700",
    },
  ],
};

const testimonials = [
  {
    name: "Priya Sharma",
    country: "Australia",
    image: "/testimonials/priya.jpg",
    quote:
      "Alpine helped me get into University of Melbourne. The entire process was smooth and professional.",
    rating: 5,
  },
  {
    name: "Rajesh Thapa",
    country: "Canada",
    image: "/testimonials/rajesh.jpg",
    quote:
              "Thanks to Alpine, I&apos;m now studying at University of Toronto. Their guidance was invaluable.",
    rating: 5,
  },
  {
    name: "Sita Gurung",
    country: "UK",
    image: "/testimonials/anita.jpg",
    quote:
      "Alpine made my dream of studying in the UK a reality. Highly recommended!",
    rating: 5,
  },
];

export default function CountriesClient() {
  const [selectedRegion, setSelectedRegion] =
    useState<Region>("English-Speaking");
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    budget: "",
    field: "",
    duration: "",
    work: "",
    climate: "",
  });
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuizAnswer = (question: string, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [question]: answer }));
    setQuizStep((prev) => prev + 1);
  };

  const getQuizResult = () => {
    const { budget, field, work, climate } = quizAnswers;

    if (budget === "high" && field === "business") return "Australia";
    if (budget === "medium" && work === "yes") return "Canada";
    if (field === "engineering" && budget === "low") return "Germany";
    if (field === "arts" && climate === "mild") return "UK";
    if (work === "yes" && climate === "warm") return "Australia";

    return "Canada"; // Default
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
              <Globe className="w-4 h-4 mr-2" />
              12+ Study Destinations
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Explore Your Study Abroad
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Destinations
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover 12+ countries offering world-class education, post-study
              work opportunities, and pathways to permanent residency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setShowQuiz(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Find My Perfect Country
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Download Country Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Comparison CTA */}
      {showStickyCTA && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg transition-all duration-300">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Compare study destinations?
                </span>
                <span className="text-xs text-gray-500">
                  Get personalized recommendations
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => setShowQuiz(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Compare Countries
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm"
                >
                  <Link href="/test-preparation/comparison">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Test Comparison
                  </Link>
                </Button>
                <a
                  href="tel:+977-1-4444444"
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Find Your Perfect Country
              </h3>
              <p className="text-gray-600">
                Answer a few questions to get personalized recommendations
              </p>
            </div>

            {quizStep === 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  What&apos;s your budget range?
                </h4>
                {[
                  "Low (Under $15,000/year)",
                  "Medium ($15,000-30,000/year)",
                  "High (Over $30,000/year)",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleQuizAnswer(
                        "budget",
                        option.split(" ")[0].toLowerCase(),
                      )
                    }
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  What field interests you most?
                </h4>
                {[
                  "Business",
                  "Engineering",
                  "Arts & Humanities",
                  "Sciences",
                  "Healthcare",
                ].map((field) => (
                  <button
                    key={field}
                    onClick={() =>
                      handleQuizAnswer("field", field.toLowerCase())
                    }
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {field}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">
                  Do you want post-study work opportunities?
                </h4>
                {["Yes, definitely", "Maybe", "Not important"].map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleQuizAnswer(
                        "work",
                        option === "Yes, definitely" ? "yes" : "no",
                      )
                    }
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 3 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Preferred climate?</h4>
                {[
                  "Warm/Sunny",
                  "Mild/Temperate",
                  "Cold/Snowy",
                  "Any climate",
                ].map((climate) => (
                  <button
                    key={climate}
                    onClick={() =>
                      handleQuizAnswer(
                        "climate",
                        climate.split("/")[0].toLowerCase(),
                      )
                    }
                    className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    {climate}
                  </button>
                ))}
              </div>
            )}

            {quizStep === 4 && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Your Perfect Match!
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Based on your preferences, we recommend:
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h5 className="text-lg font-semibold text-blue-900">
                      {getQuizResult()}
                    </h5>
                    <p className="text-blue-700 text-sm">
                      Perfect for your budget and career goals
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowQuiz(false);
                      setQuizStep(0);
                      setQuizAnswers({
                        budget: "",
                        field: "",
                        duration: "",
                        work: "",
                        climate: "",
                      });
                    }}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button
                    asChild
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Link href={`/countries/${getQuizResult().toLowerCase()}`}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Region Tabs */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(COUNTRIES_BY_REGION).map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region as Region)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Country Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES_BY_REGION[selectedRegion].map((country) => (
              <Card
                key={country.name}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${country.color}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width={40}
                        height={30}
                        className="rounded shadow-sm"
                      />
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900">
                          {country.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {country.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">
                        {country.students} students
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">
                        {country.universities} universities
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-yellow-600" />
                      <span className="text-gray-700">{country.tuition}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="text-gray-700">
                        {country.workRights}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Highlights
                    </h4>
                    <div className="space-y-2">
                      {country.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Success Rate */}
                  <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-800">
                        Visa Success Rate
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {country.visaSuccess}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                  >
                    <Link href={country.path}>
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

      {/* IELTS vs PTE vs TOEFL Comparison Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              English Proficiency Tests Comparison
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the right English test for your study abroad journey
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">IELTS</th>
                    <th className="px-6 py-4 text-center font-semibold">PTE Academic</th>
                    <th className="px-6 py-4 text-center font-semibold">TOEFL iBT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Test Format</td>
                    <td className="px-6 py-4 text-center">Paper-based & Computer</td>
                    <td className="px-6 py-4 text-center">Computer only</td>
                    <td className="px-6 py-4 text-center">Computer only</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Duration</td>
                    <td className="px-6 py-4 text-center">2h 45m</td>
                    <td className="px-6 py-4 text-center">2h 15m</td>
                    <td className="px-6 py-4 text-center">3h</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Scoring</td>
                    <td className="px-6 py-4 text-center">0-9 bands</td>
                    <td className="px-6 py-4 text-center">10-90 points</td>
                    <td className="px-6 py-4 text-center">0-120 points</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Results</td>
                    <td className="px-6 py-4 text-center">13 days</td>
                    <td className="px-6 py-4 text-center">2-5 days</td>
                    <td className="px-6 py-4 text-center">6-10 days</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Cost (NPR)</td>
                    <td className="px-6 py-4 text-center">₹16,250</td>
                    <td className="px-6 py-4 text-center">₹15,900</td>
                    <td className="px-6 py-4 text-center">₹18,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Popular Countries</td>
                    <td className="px-6 py-4 text-center">UK, Australia, Canada</td>
                    <td className="px-6 py-4 text-center">Australia, New Zealand</td>
                    <td className="px-6 py-4 text-center">USA, Canada</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Speaking Test</td>
                    <td className="px-6 py-4 text-center">Face-to-face</td>
                    <td className="px-6 py-4 text-center">Computer-based</td>
                    <td className="px-6 py-4 text-center">Computer-based</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Test Centers</td>
                    <td className="px-6 py-4 text-center">Widely available</td>
                    <td className="px-6 py-4 text-center">Limited</td>
                    <td className="px-6 py-4 text-center">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">IELTS</h3>
                  <p className="text-blue-800 text-sm mb-4">
                    Most widely accepted English test globally. Preferred by UK, Australia, and Canada universities.
                  </p>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/test-preparation">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">PTE Academic</h3>
                  <p className="text-green-800 text-sm mb-4">
                    Computer-based test with faster results. Popular for Australia and New Zealand applications.
                  </p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                    <Link href="/test-preparation">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">TOEFL iBT</h3>
                  <p className="text-purple-800 text-sm mb-4">
                    Internet-based test preferred by US universities. Comprehensive assessment of academic English.
                  </p>
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/test-preparation">Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories from Our Students
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students who achieved their study abroad dreams with
              Alpine Education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="ml-3">
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Studying in {testimonial.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Accordion Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Study Abroad Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about studying abroad
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                title: "Visa Requirements & Process",
                content:
                  "Learn about student visa requirements, application process, documents needed, and tips for successful visa approval for different countries.",
              },
              {
                title: "Top Universities & Rankings",
                content:
                  "Explore top-ranked universities in each country, admission requirements, application deadlines, and program offerings.",
              },
              {
                title: "Cost of Living & Tuition Fees",
                content:
                  "Detailed breakdown of tuition fees, accommodation costs, living expenses, and scholarship opportunities for international students.",
              },
              {
                title: "Scholarships & Financial Aid",
                content:
                  "Information about government scholarships, university scholarships, private funding, and how to apply for financial assistance.",
              },
              {
                title: "Post-Study Work Opportunities",
                content:
                  "Details about post-study work visas, job opportunities, salary expectations, and pathways to permanent residency in each country.",
              },
            ].map((item, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardHeader
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                >
                  <CardTitle className="flex items-center justify-between text-lg">
                    {item.title}
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                {expandedFAQ === index && (
                  <CardContent className="pt-0">
                    <p className="text-gray-700">{item.content}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Study Abroad Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get personalized guidance from our expert counselors and take the
            first step towards your international education dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl"
            >
              <Link href="/contact">
                <MessageCircle className="w-5 h-5 mr-2" />
                Free Counseling
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/20 font-semibold px-8 py-4 rounded-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
