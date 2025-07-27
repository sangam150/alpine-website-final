import { Metadata } from "next";
import CountriesClient from "./CountriesClient";

export const metadata: Metadata = {
  title: "Study Destinations - Alpine Education & Visa Services",
  description:
    "Explore study destinations worldwide. Get expert guidance for Australia, UK, Canada, USA, New Zealand, and more. Start your international education journey.",
  keywords:
    "study abroad, international education, Australia, UK, Canada, USA, New Zealand, visa services, Alpine Education",
};

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <CountriesClient />
    </div>
  );
}
