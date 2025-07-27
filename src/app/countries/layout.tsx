import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Destinations - Alpine Education & Visa Services",
  description:
    "Explore top study abroad destinations. Filter by tuition, visa success, IELTS, and more. Find your perfect country with Alpine Education.",
};

export default function CountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
