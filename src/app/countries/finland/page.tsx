import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const finlandData = {
  name: "Finland",
  flag: "/flags/finland.svg",
  description:
    "Experience the world&apos;s best education system, innovation, and high quality of life in Finland.",
  heroGradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800",
  stats: {
    universities: "13",
    students: "20K+",
    ranking: "Top 100",
    countries: "100+",
  },
  tuition: {
    min: 0,
    max: 13000,
    currency: "EUR",
  },
  visa: {
    successRate: "80%",
    processingTime: "1-2 months",
    requirements: [
      "Admission letter from Finnish university",
      "Proof of funds (€6,720/year)",
      "Health insurance",
      "Academic transcripts and certificates",
      "English proficiency (IELTS/TOEFL)",
      "Passport valid for study period",
      "Visa application fee (€350)",
    ],
  },
  workRights: "1 year post-study",
  intakes: ["August", "January"],
  duration: "3-4 years",
  universities: [
    {
      name: "University of Helsinki",
      ranking: "World #102",
      location: "Helsinki",
      acceptanceRate: "17%",
      popularCourses: ["Education", "Law", "Sciences", "Humanities"],
      tuition: "Free (EU/EEA), €13,000/year (non-EU)",
    },
    {
      name: "Aalto University",
      ranking: "World #112",
      location: "Espoo",
      acceptanceRate: "20%",
      popularCourses: ["Engineering", "Business", "Design"],
      tuition: "Free (EU/EEA), €12,000/year (non-EU)",
    },
    {
      name: "University of Turku",
      ranking: "World #287",
      location: "Turku",
      acceptanceRate: "25%",
      popularCourses: ["Medicine", "Law", "Sciences"],
      tuition: "Free (EU/EEA), €8,000-12,000/year (non-EU)",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "€300-600/month",
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
    "Free tuition for EU/EEA students",
    "World’s best education system",
    "Innovation and research hub",
    "Excellent quality of life",
    "English-taught programs",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "Finland", current: true },
  ],
};

export default function FinlandPage() {
  return <CountryPageTemplate slug="finland" />;
}
