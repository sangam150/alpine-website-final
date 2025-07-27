import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const norwayData = {
  name: "Norway",
  flag: "/flags/norway.svg",
  description:
    "Study in Norway for free education, stunning natural beauty, and one of the world’s highest standards of living.",
  heroGradient: "bg-gradient-to-br from-red-600 via-red-700 to-red-800",
  stats: {
    universities: "8",
    students: "25K+",
    ranking: "Top 100",
    countries: "100+",
  },
  tuition: {
    min: 0,
    max: 0,
    currency: "NOK",
  },
  visa: {
    successRate: "75%",
    processingTime: "2-3 months",
    requirements: [
      "Admission letter from Norwegian university",
      "Proof of funds (NOK 137,907/year)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS/TOEFL)",
      "Passport valid for study period",
      "Visa application fee (NOK 5,300)",
    ],
  },
  workRights: "1 year post-study",
  intakes: ["August"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Oslo",
      ranking: "World #113",
      location: "Oslo",
      acceptanceRate: "20%",
      popularCourses: ["Humanities", "Law", "Medicine", "Sciences"],
      tuition: "Free",
    },
    {
      name: "Norwegian University of Science and Technology (NTNU)",
      ranking: "World #276",
      location: "Trondheim",
      acceptanceRate: "25%",
      popularCourses: ["Engineering", "Technology", "Natural Sciences"],
      tuition: "Free",
    },
    {
      name: "University of Bergen",
      ranking: "World #199",
      location: "Bergen",
      acceptanceRate: "22%",
      popularCourses: ["Marine Research", "Humanities", "Medicine"],
      tuition: "Free",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "NOK 4,000-7,000/month",
      details: "Student housing or shared flats",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "NOK 2,500-4,000/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "NOK 500-800/month",
      details: "Public transport",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "NOK 500-1,000/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "NOK 500-1,500/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "NOK 2,000-4,000/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "No tuition fees for all students",
    "High quality of life",
    "Stunning natural beauty",
    "English-taught programs",
    "Safe and inclusive society",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Norway", current: true },
  ],
};

export default function NorwayPage() {
  return <CountryPageTemplate slug="norway" />;
}
