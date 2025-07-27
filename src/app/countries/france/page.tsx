import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const franceData = {
  name: "France",
  flag: "/flags/france.svg",
  description:
    "Study in France for world-class universities, affordable tuition, and vibrant culture.",
  heroGradient: "bg-gradient-to-br from-blue-400 via-white to-red-500",
  stats: {
    universities: "70+",
    students: "370K+",
    ranking: "Top 50",
    countries: "180+",
  },
  tuition: {
    min: 3000,
    max: 4000,
    currency: "EUR",
  },
  visa: {
    successRate: "94%",
    processingTime: "4-8 weeks",
    requirements: [
      "Admission letter from French institution",
      "Proof of funds (€7,380/year)",
      "Health insurance",
      "Academic transcripts and certificates",
      "French or English proficiency (DELF/IELTS)",
      "Passport valid for study period",
      "Visa application fee (€99)",
    ],
  },
  workRights: "964 hours/year",
  intakes: ["September", "January"],
  duration: "3-4 years",
  universities: [
    {
      name: "Sorbonne University",
      ranking: "World #35",
      location: "Paris",
      acceptanceRate: "20%",
      popularCourses: ["Humanities", "Sciences", "Law"],
      tuition: "€2,770-3,770/year",
    },
    {
      name: "École Polytechnique",
      ranking: "World #61",
      location: "Palaiseau",
      acceptanceRate: "10%",
      popularCourses: ["Engineering", "Science", "Mathematics"],
      tuition: "€3,000-4,000/year",
    },
    {
      name: "Sciences Po",
      ranking: "World #242",
      location: "Paris",
      acceptanceRate: "22%",
      popularCourses: ["Political Science", "International Relations", "Law"],
      tuition: "€10,700/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "€400-800/month",
      details: "Student dorms or shared flats",
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
      cost: "€30-70/month",
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
      cost: "€50-120/month",
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
    "Affordable tuition",
    "Vibrant student life",
    "Post-study work visa",
    "Rich culture and history",
    "English-taught programs",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "France", current: true },
  ],
};

export default function FrancePage() {
  return <CountryPageTemplate slug="france" />;
}
