import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const swedenData = {
  name: "Sweden",
  flag: "/flags/sweden.svg",
  description:
    "Study in Sweden for innovative education, free tuition for EU/EEA, and a high quality of life in a progressive society.",
  heroGradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800",
  stats: {
    universities: "39",
    students: "40K+",
    ranking: "Top 100",
    countries: "120+",
  },
  tuition: {
    min: 0,
    max: 15000,
    currency: "SEK",
  },
  visa: {
    successRate: "78%",
    processingTime: "1-3 months",
    requirements: [
      "Admission letter from Swedish university",
      "Proof of funds (SEK 9,450/month)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS/TOEFL)",
      "Passport valid for study period",
      "Visa application fee (SEK 1,500)",
    ],
  },
  workRights: "2 years post-study",
  intakes: ["August", "January"],
  duration: "3-4 years",
  universities: [
    {
      name: "Lund University",
      ranking: "World #87",
      location: "Lund",
      acceptanceRate: "34%",
      popularCourses: ["Engineering", "Medicine", "Law", "Sciences"],
      tuition: "Free (EU/EEA), SEK 100,000-150,000/year (non-EU)",
    },
    {
      name: "KTH Royal Institute of Technology",
      ranking: "World #89",
      location: "Stockholm",
      acceptanceRate: "45%",
      popularCourses: ["Engineering", "Technology", "Architecture"],
      tuition: "Free (EU/EEA), SEK 155,000/year (non-EU)",
    },
    {
      name: "Uppsala University",
      ranking: "World #112",
      location: "Uppsala",
      acceptanceRate: "30%",
      popularCourses: ["Humanities", "Medicine", "Sciences"],
      tuition: "Free (EU/EEA), SEK 100,000-135,000/year (non-EU)",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "SEK 3,000-6,500/month",
      details: "Student housing or shared flats",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "SEK 2,000-3,000/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "SEK 600-900/month",
      details: "Public transport",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "SEK 400-800/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "SEK 500-1,500/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "SEK 800-1,500/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Free tuition for EU/EEA students",
    "Innovation and research hub",
    "Excellent quality of life",
    "English-taught programs",
    "Safe and inclusive society",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Sweden", current: true },
  ],
};

export default function SwedenPage() {
  return <CountryPageTemplate slug="sweden" />;
}
