import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const canadaData = {
  name: "Canada",
  flag: "/flags/canada.svg",
  description:
    "Study in Canada for high-quality education, safe environment, and PR opportunities.",
  heroGradient: "bg-gradient-to-br from-red-600 via-red-700 to-blue-800",
  stats: {
    universities: "97",
    students: "642K+",
    ranking: "Top 50",
    countries: "184+",
  },
  tuition: {
    min: 18000,
    max: 30000,
    currency: "CAD",
  },
  visa: {
    successRate: "96%",
    processingTime: "4-8 weeks",
    requirements: [
      "Letter of Acceptance from DLI",
      "Proof of funds (CAD 10,000/year)",
      "English proficiency (IELTS 6.0 or equivalent)",
      "Academic transcripts and certificates",
      "Passport valid for study period",
      "Visa application fee (CAD 150)",
      "Biometrics (fingerprints and photo)",
    ],
  },
  workRights: "3 years",
  intakes: ["September", "January", "May"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Toronto",
      ranking: "World #21",
      location: "Toronto, Ontario",
      acceptanceRate: "43%",
      popularCourses: ["Medicine", "Engineering", "Business", "Arts"],
      tuition: "CAD 45,000-60,000/year",
    },
    {
      name: "University of British Columbia",
      ranking: "World #34",
      location: "Vancouver, British Columbia",
      acceptanceRate: "52%",
      popularCourses: ["Forestry", "Engineering", "Medicine", "Arts"],
      tuition: "CAD 40,000-55,000/year",
    },
    {
      name: "McGill University",
      ranking: "World #30",
      location: "Montreal, Quebec",
      acceptanceRate: "46%",
      popularCourses: ["Medicine", "Law", "Engineering", "Arts"],
      tuition: "CAD 38,000-50,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "CAD 800-1,500/month",
      details: "On-campus or off-campus housing",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "CAD 300-500/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "CAD 100-200/month",
      details: "Public transport and occasional rides",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "CAD 150-250/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "CAD 200-400/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "CAD 500-800/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Post-study work visa (3 years)",
    "Pathway to PR",
    "Safe and welcoming environment",
    "Affordable education",
    "Multicultural society",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Canada", current: true },
  ],
};

export default function CanadaPage() {
  return <CountryPageTemplate slug="canada" />;
}
