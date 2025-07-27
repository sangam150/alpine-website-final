import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - Alpine Education Management System",
  description:
    "Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics. Real-time analytics and reporting.",
  keywords:
    "admin dashboard, Alpine Education management, student tracking, application management, revenue analytics, performance metrics, study abroad admin",
  openGraph: {
    title: "Admin Dashboard - Alpine Education Management System",
    description:
      "Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics.",
    url: "https://alpinevisa.com.np/admin/dashboard",
    siteName: "Alpine Education & Visa Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Admin Dashboard - Alpine Education Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard - Alpine Education Management System",
    description:
      "Admin dashboard for Alpine Education management system. Track students, applications, revenue, and performance metrics.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://alpinevisa.com.np/admin/dashboard",
  },
  robots: {
    index: false, // Admin pages should not be indexed!
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
