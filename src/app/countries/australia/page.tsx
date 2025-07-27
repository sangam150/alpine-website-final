import { Metadata } from "next";
import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Study in Australia 2025: New Visa Pathways & Opportunities | Alpine Education",
  description:
    "Study in Australia 2025 with updated visa requirements, new GTE pathways, and scholarship opportunities. Get expert guidance for your Australian education journey.",
  keywords:
    "study australia 2025, australia student visa 2025, GTE requirements 2025, australia scholarships 2025, university of melbourne, university of sydney",
  openGraph: {
    title: "Study in Australia 2025: New Visa Pathways & Opportunities",
    description:
      "Updated 2025 requirements for studying in Australia. Expert guidance on visas, scholarships, and university applications.",
    images: ["/og-australia-2025.jpg"],
  },
};

const australiaData = {
  name: "Australia",
  flag: "/flags/australia.svg",
  description:
    "Experience world-class education in one of the most beautiful and multicultural countries in the world",
  heroGradient: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
  stats: {
    universities: "43",
    students: "642K+",
    ranking: "Top 50",
    countries: "184+",
  },
  tuition: {
    min: 20000,
    max: 35000,
    currency: "AUD",
  },
  visa: {
    successRate: "98%",
    processingTime: "4-8 weeks",
    requirements: [
      "Confirmation of Enrolment (CoE) from registered institution",
      "Genuine Temporary Entrant (GTE) statement",
      "Proof of financial capacity (AUD 21,041/year)",
      "English proficiency (IELTS 6.0 or equivalent)",
      "Health insurance (OSHC)",
      "Academic qualifications and transcripts",
      "Passport valid for study period",
      "Visa application fee (AUD 650)",
    ],
  },
  workRights: "2-4 years",
  intakes: ["February", "July"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Melbourne",
      ranking: "World #14",
      location: "Melbourne, Victoria",
      acceptanceRate: "70%",
      popularCourses: ["Medicine", "Law", "Engineering", "Business"],
      tuition: "AUD 35,000-45,000/year",
    },
    {
      name: "University of Sydney",
      ranking: "World #19",
      location: "Sydney, New South Wales",
      acceptanceRate: "75%",
      popularCourses: ["Medicine", "Law", "Arts", "Engineering"],
      tuition: "AUD 32,000-42,000/year",
    },
    {
      name: "Australian National University",
      ranking: "World #34",
      location: "Canberra, ACT",
      acceptanceRate: "80%",
      popularCourses: [
        "International Relations",
        "Science",
        "Arts",
        "Engineering",
      ],
      tuition: "AUD 30,000-40,000/year",
    },
    {
      name: "University of Queensland",
      ranking: "World #50",
      location: "Brisbane, Queensland",
      acceptanceRate: "75%",
      popularCourses: ["Medicine", "Engineering", "Business", "Science"],
      tuition: "AUD 28,000-38,000/year",
    },
    {
      name: "Monash University",
      ranking: "World #57",
      location: "Melbourne, Victoria",
      acceptanceRate: "80%",
      popularCourses: ["Pharmacy", "Engineering", "Business", "Arts"],
      tuition: "AUD 25,000-35,000/year",
    },
    {
      name: "University of New South Wales",
      ranking: "World #19",
      location: "Sydney, New South Wales",
      acceptanceRate: "70%",
      popularCourses: ["Engineering", "Business", "Medicine", "Arts"],
      tuition: "AUD 30,000-40,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "AUD 800-1,500/month",
      details: "On-campus or off-campus housing",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "AUD 300-500/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "AUD 100-200/month",
      details: "Public transport and occasional rides",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "AUD 150-250/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "AUD 200-400/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "AUD 500-800/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Post-study work visa (2-4 years)",
    "High quality of life",
    "Strong economy and job market",
    "Multicultural environment",
    "Beautiful landscapes and cities",
    "Excellent healthcare system",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Australia", current: true },
  ],
};

export default function AustraliaPage() {
  return <CountryPageTemplate slug="australia" />;
}
