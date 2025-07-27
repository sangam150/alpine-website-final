import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const ukData = {
  name: "United Kingdom",
  flag: "/flags/uk.svg",
  description:
    "Study in the UK for world-class universities, rich culture, and global career opportunities.",
  heroGradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-red-800",
  stats: {
    universities: "160+",
    students: "485K+",
    ranking: "Top 10",
    countries: "180+",
  },
  tuition: {
    min: 25000,
    max: 40000,
    currency: "GBP",
  },
  visa: {
    successRate: "97%",
    processingTime: "3-6 weeks",
    requirements: [
      "Confirmation of Acceptance for Studies (CAS) from licensed sponsor",
      "Proof of financial support (£1,334/month for London, £1,023 for other areas)",
      "English proficiency (B2 level - IELTS 6.0 or equivalent)",
      "Tuberculosis test (if required)",
      "Academic qualifications and transcripts",
      "Passport valid for study period",
      "Healthcare surcharge payment (£470/year)",
      "Biometrics (fingerprints and photo)",
    ],
  },
  workRights: "2 years",
  intakes: ["September", "January"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Oxford",
      ranking: "World #1",
      location: "Oxford, England",
      acceptanceRate: "17%",
      popularCourses: ["Medicine", "Law", "Philosophy", "Economics"],
      tuition: "£25,740-39,010/year",
    },
    {
      name: "University of Cambridge",
      ranking: "World #2",
      location: "Cambridge, England",
      acceptanceRate: "21%",
      popularCourses: ["Natural Sciences", "Medicine", "Engineering", "Arts"],
      tuition: "£24,507-37,293/year",
    },
    {
      name: "Imperial College London",
      ranking: "World #6",
      location: "London, England",
      acceptanceRate: "14%",
      popularCourses: ["Engineering", "Medicine", "Business", "Science"],
      tuition: "£28,000-40,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "£500-1,200/month",
      details: "On-campus or off-campus housing",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "£200-400/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "£50-150/month",
      details: "Public transport and occasional rides",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "£100-200/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "£100-300/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "£300-500/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "World-class universities",
    "2-year post-study work visa",
    "Rich cultural experience",
    "Global recognition",
    "Diverse student community",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "United Kingdom", current: true },
  ],
};

export default function UKPage() {
  return <CountryPageTemplate slug="uk" />;
}
