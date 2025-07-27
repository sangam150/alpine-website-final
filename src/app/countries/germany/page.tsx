import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const germanyData = {
  name: "Germany",
  flag: "/flags/germany.svg",
  description:
    "Study in Germany for world-class education, affordable tuition, and strong job prospects.",
  heroGradient: "bg-gradient-to-br from-yellow-400 via-gray-200 to-gray-800",
  stats: {
    universities: "400+",
    students: "350K+",
    ranking: "Top 20",
    countries: "180+",
  },
  tuition: {
    min: 0,
    max: 1500,
    currency: "EUR",
  },
  visa: {
    successRate: "96%",
    processingTime: "6-12 weeks",
    requirements: [
      "Admission letter from German university",
      "Proof of funds (€11,208/year in blocked account)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English or German proficiency (IELTS/Goethe)",
      "Passport valid for study period",
      "Visa application fee (€75)",
    ],
  },
  workRights: "18 months post-study",
  intakes: ["October", "April"],
  duration: "3-4 years",
  universities: [
    {
      name: "Technical University of Munich",
      ranking: "World #30",
      location: "Munich, Bavaria",
      acceptanceRate: "8%",
      popularCourses: ["Engineering", "Computer Science", "Natural Sciences"],
      tuition: "€0-1,500/year",
    },
    {
      name: "Heidelberg University",
      ranking: "World #43",
      location: "Heidelberg, Baden-Württemberg",
      acceptanceRate: "16%",
      popularCourses: ["Medicine", "Law", "Sciences"],
      tuition: "€0-1,500/year",
    },
    {
      name: "Ludwig Maximilian University of Munich",
      ranking: "World #63",
      location: "Munich, Bavaria",
      acceptanceRate: "10%",
      popularCourses: ["Humanities", "Sciences", "Medicine"],
      tuition: "€0-1,500/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "€300-600/month",
      details: "Student dorms or shared flats",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "€150-250/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "€30-80/month",
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
      cost: "€50-150/month",
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
    "No/low tuition fees",
    "Strong job market",
    "18-month post-study work visa",
    "High quality of life",
    "English-taught programs",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Germany", current: true },
  ],
};

export default function GermanyPage() {
  return <CountryPageTemplate slug="germany" />;
}
