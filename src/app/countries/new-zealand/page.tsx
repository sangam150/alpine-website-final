import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const newZealandData = {
  name: "New Zealand",
  flag: "/flags/new-zealand.svg",
  description:
    "Study in New Zealand for world-class education, stunning landscapes, and post-study work opportunities.",
  heroGradient: "bg-gradient-to-br from-green-500 via-blue-400 to-blue-900",
  stats: {
    universities: "8",
    students: "50K+",
    ranking: "Top 100",
    countries: "120+",
  },
  tuition: {
    min: 25000,
    max: 35000,
    currency: "NZD",
  },
  visa: {
    successRate: "93%",
    processingTime: "4-8 weeks",
    requirements: [
      "Offer of Place from NZ institution",
      "Proof of funds (NZD 15,000/year)",
      "Health and travel insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS 6.0 or equivalent)",
      "Passport valid for study period",
      "Visa application fee (NZD 330)",
    ],
  },
  workRights: "3 years post-study",
  intakes: ["February", "July"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Auckland",
      ranking: "World #68",
      location: "Auckland",
      acceptanceRate: "45%",
      popularCourses: ["Engineering", "Business", "Medicine", "Science"],
      tuition: "NZD 30,000-40,000/year",
    },
    {
      name: "University of Otago",
      ranking: "World #206",
      location: "Dunedin",
      acceptanceRate: "50%",
      popularCourses: ["Health Sciences", "Business", "Law"],
      tuition: "NZD 25,000-35,000/year",
    },
    {
      name: "Victoria University of Wellington",
      ranking: "World #241",
      location: "Wellington",
      acceptanceRate: "55%",
      popularCourses: ["Humanities", "Law", "Science"],
      tuition: "NZD 26,000-36,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "NZD 800-1,500/month",
      details: "Student dorms or shared flats",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "NZD 300-500/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "NZD 100-200/month",
      details: "Public transport",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "NZD 150-250/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "NZD 100-300/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "NZD 500-800/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Post-study work visa (3 years)",
    "Safe and welcoming environment",
    "Stunning natural beauty",
    "High quality of life",
    "English-taught programs",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "New Zealand", current: true },
  ],
};

export default function NewZealandPage() {
  return <CountryPageTemplate slug="new-zealand" />;
}
