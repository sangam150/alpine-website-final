import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const netherlandsData = {
  name: "Netherlands",
  flag: "/flags/netherlands.svg",
  description:
    "Study in the Netherlands for innovative education, international environment, and excellent career prospects in Europe’s business hub.",
  heroGradient: "bg-gradient-to-br from-orange-600 via-orange-700 to-red-800",
  stats: {
    universities: "13",
    students: "85K+",
    ranking: "Top 100",
    countries: "160+",
  },
  tuition: {
    min: 2168,
    max: 15000,
    currency: "EUR",
  },
  visa: {
    successRate: "80%",
    processingTime: "1-2 months",
    requirements: [
      "Admission letter from Dutch university",
      "Proof of funds (€11,000/year)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS/TOEFL)",
      "Passport valid for study period",
      "Visa application fee (€210)",
    ],
  },
  workRights: "1 year post-study",
  intakes: ["September", "February"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Amsterdam",
      ranking: "World #55",
      location: "Amsterdam",
      acceptanceRate: "30%",
      popularCourses: ["Social Sciences", "Humanities", "Business", "Law"],
      tuition: "€2,168-15,000/year",
    },
    {
      name: "Delft University of Technology",
      ranking: "World #61",
      location: "Delft",
      acceptanceRate: "25%",
      popularCourses: ["Engineering", "Technology", "Architecture"],
      tuition: "€2,168-15,000/year",
    },
    {
      name: "Erasmus University Rotterdam",
      ranking: "World #208",
      location: "Rotterdam",
      acceptanceRate: "35%",
      popularCourses: ["Business", "Economics", "Law"],
      tuition: "€2,168-15,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "€400-900/month",
      details: "Student housing or shared flats",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "€200-350/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "€50-100/month",
      details: "Public transport",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "€100-200/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "€100-250/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "€200-400/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Over 2,000 English-taught programs",
    "International student hub",
    "Affordable tuition",
    "Excellent career prospects",
    "High quality of life",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Netherlands", current: true },
  ],
};

export default function NetherlandsPage() {
  return <CountryPageTemplate slug="netherlands" />;
}
