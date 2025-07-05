import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingActions from '@/components/layout/FloatingActions';
import Analytics from '@/components/layout/Analytics';
import ClientRoot from "./client-root";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Alpine Education & Visa Services - Study Abroad Consultancy Nepal",
    template: "%s | Alpine Education & Visa Services"
  },
  description: "Leading study abroad consultancy in Nepal. Free counseling for Australia, UK, Canada, Germany, France. IELTS/PTE preparation, visa assistance, and student profile evaluation.",
  keywords: ["study abroad", "education consultancy", "visa services", "IELTS preparation", "Australia study", "UK study", "Canada study", "Nepal education"],
  authors: [{ name: "Alpine Education & Visa Services" }],
  creator: "Alpine Education & Visa Services",
  publisher: "Alpine Education & Visa Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://alpineeducation.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alpineeducation.com",
    title: "Alpine Education & Visa Services - Study Abroad Consultancy Nepal",
    description: "Leading study abroad consultancy in Nepal. Free counseling for Australia, UK, Canada, Germany, France. IELTS/PTE preparation, visa assistance.",
    siteName: "Alpine Education & Visa Services",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alpine Education & Visa Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpine Education & Visa Services - Study Abroad Consultancy Nepal",
    description: "Leading study abroad consultancy in Nepal. Free counseling for Australia, UK, Canada, Germany, France.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Alpine Education" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        <ClientRoot>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
                  <FloatingActions />
          <Analytics />
        </ClientRoot>
      </body>
    </html>
  );
}
