import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const irelandData = {
  name: "Ireland",
  flag: "/flags/ireland.svg",
  description:
    "Experience world-class education, rich culture, and career opportunities in Europe’s tech hub.",
  heroGradient: "bg-gradient-to-br from-green-600 via-green-700 to-green-800",
  stats: {
    universities: "7",
    students: "35K+",
    ranking: "Top 100",
    countries: "120+",
  },
  tuition: {
    min: 10000,
    max: 25000,
    currency: "EUR",
  },
  visa: {
    successRate: "88%",
    processingTime: "4-8 weeks",
    requirements: [
      "Admission letter from Irish university",
      "Proof of funds (€7,000/year)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS/TOEFL)",
      "Passport valid for study period",
      "Visa application fee (€60)",
    ],
  },
  workRights: "2 years post-study",
  intakes: ["September"],
  duration: "3-4 years",
  universities: [
    {
      name: "Trinity College Dublin",
      ranking: "World #81",
      location: "Dublin",
      acceptanceRate: "34%",
      popularCourses: ["Humanities", "Sciences", "Business", "Law"],
      tuition: "€15,000-25,000/year",
    },
    {
      name: "University College Dublin",
      ranking: "World #171",
      location: "Dublin",
      acceptanceRate: "38%",
      popularCourses: ["Business", "Engineering", "Medicine"],
      tuition: "€12,000-22,000/year",
    },
    {
      name: "National University of Ireland Galway",
      ranking: "World #258",
      location: "Galway",
      acceptanceRate: "40%",
      popularCourses: ["Arts", "Sciences", "Medicine"],
      tuition: "€10,000-18,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "€400-1,000/month",
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
      cost: "€80-150/month",
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
    "English-speaking country",
    "Tech and business hub",
    "2-year post-study work visa",
    "Rich culture and history",
    "High quality of life",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Ireland", current: true },
  ],
};

export default function IrelandPage() {
  return <CountryPageTemplate slug="ireland" />;
}
