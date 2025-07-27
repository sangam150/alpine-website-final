import CountryPageTemplate from "@/components/marketing/CountryPageTemplate";
import { Home, Utensils, Bus, Wifi, Star, BookOpen } from "lucide-react";

const usaData = {
  name: "United States",
  flag: "/flags/usa.svg",
  description:
    "Study in the USA for top-ranked universities, research opportunities, and global career prospects.",
  heroGradient: "bg-gradient-to-br from-blue-700 via-red-700 to-blue-900",
  stats: {
    universities: "4,000+",
    students: "1.1M+",
    ranking: "Top 5",
    countries: "200+",
  },
  tuition: {
    min: 25000,
    max: 75000,
    currency: "USD",
  },
  visa: {
    successRate: "95%",
    processingTime: "3-8 weeks",
    requirements: [
      "I-20 form from SEVP-certified school",
      "Proof of funds (USD 10,000+/year)",
      "English proficiency (TOEFL/IELTS/PTE)",
      "Academic transcripts and certificates",
      "Passport valid for study period",
      "Visa application fee (USD 185)",
      "SEVIS fee (USD 350)",
      "Visa interview at US Embassy",
    ],
  },
  workRights: "1-3 years (OPT)",
  intakes: ["August", "January"],
  duration: "4 years (UG)",
  universities: [
    {
      name: "Massachusetts Institute of Technology",
      ranking: "World #1",
      location: "Cambridge, Massachusetts",
      acceptanceRate: "7%",
      popularCourses: [
        "Engineering",
        "Computer Science",
        "Business",
        "Science",
      ],
      tuition: "$55,000-75,000/year",
    },
    {
      name: "Stanford University",
      ranking: "World #3",
      location: "Stanford, California",
      acceptanceRate: "4%",
      popularCourses: [
        "Computer Science",
        "Engineering",
        "Business",
        "Medicine",
      ],
      tuition: "$56,000-78,000/year",
    },
    {
      name: "Harvard University",
      ranking: "World #4",
      location: "Cambridge, Massachusetts",
      acceptanceRate: "5%",
      popularCourses: ["Law", "Business", "Medicine", "Science"],
      tuition: "$54,000-76,000/year",
    },
  ],
  livingCosts: [
    {
      category: "Accommodation",
      cost: "$800-2,000/month",
      details: "On-campus or off-campus housing",
      icon: <Home className="h-4 w-4" />,
    },
    {
      category: "Food",
      cost: "$300-600/month",
      details: "Groceries and dining out",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      category: "Transportation",
      cost: "$100-250/month",
      details: "Public transport and occasional rides",
      icon: <Bus className="h-4 w-4" />,
    },
    {
      category: "Utilities",
      cost: "$150-300/month",
      details: "Electricity, water, internet",
      icon: <Wifi className="h-4 w-4" />,
    },
    {
      category: "Entertainment",
      cost: "$200-500/month",
      details: "Movies, sports, social activities",
      icon: <Star className="h-4 w-4" />,
    },
    {
      category: "Books & Supplies",
      cost: "$600-1,000/year",
      details: "Textbooks and study materials",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ],
  highlights: [
    "Top-ranked universities",
    "Research and innovation",
    "Diverse campus life",
    "Global career prospects",
    "STEM OPT extension",
  ],
  breadcrumbItems: [
    { label: "Study Destinations", href: "/countries" },
    { label: "United States", current: true },
  ],
};

export default function USAPage() {
  return <CountryPageTemplate slug="usa" />;
}
