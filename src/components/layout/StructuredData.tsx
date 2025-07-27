"use client";

import Script from "next/script";

interface StructuredDataProps {
  type: "organization" | "article" | "faq" | "breadcrumb" | "course";
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": getSchemaType(type),
    };

    switch (type) {
      case "organization":
        return {
          ...baseData,
          name: "Alpine Education & Visa Services",
          alternateName: "Alpine Education",
          description:
            "Nepal's premier study abroad consultancy. Expert guidance for Australia, UK, Canada, USA, and 12+ countries. 3000+ students placed, 95% visa success rate.",
          url: "https://alpineeducation.com.np",
          logo: "https://alpineeducation.com.np/logo.svg",
          image: "https://alpineeducation.com.np/og-image.jpg",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Thamel, Kathmandu",
            addressLocality: "Kathmandu",
            addressRegion: "Bagmati",
            postalCode: "44600",
            addressCountry: "NP",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+977-1-4444444",
            contactType: "customer service",
            areaServed: "NP",
            availableLanguage: ["English", "Nepali"],
          },
          sameAs: [
            "https://facebook.com/alpineeducation",
            "https://instagram.com/alpineeducation",
            "https://linkedin.com/company/alpineeducation",
          ],
          foundingDate: "2020",
          numberOfEmployees: "25",
          serviceArea: {
            "@type": "Country",
            name: "Nepal",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Study Abroad Services",
            itemListElement: [
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "University Application Assistance",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Visa Application Support",
                },
              },
              {
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Test Preparation (IELTS/PTE)",
                },
              },
            ],
          },
        };

      case "article":
        return {
          ...baseData,
          headline: data.title,
          description: data.description,
          image: data.image || "https://alpineeducation.com.np/og-image.jpg",
          author: {
            "@type": "Organization",
            name: "Alpine Education & Visa Services",
          },
          publisher: {
            "@type": "Organization",
            name: "Alpine Education & Visa Services",
            logo: {
              "@type": "ImageObject",
              url: "https://alpineeducation.com.np/logo.svg",
            },
          },
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url,
          },
          keywords:
            data.keywords?.join(", ") ||
            "study abroad, visa services, education consultancy",
          articleSection: data.category || "Study Abroad",
          wordCount: data.wordCount || 800,
        };

      case "faq":
        return {
          ...baseData,
          mainEntity: data.questions.map((q: any) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        };

      case "breadcrumb":
        return {
          ...baseData,
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        };

      case "course":
        return {
          ...baseData,
          name: data.title,
          description: data.description,
          provider: {
            "@type": "Organization",
            name: "Alpine Education & Visa Services",
          },
          courseMode: data.mode || "online",
          educationalLevel: data.level || "undergraduate",
          inLanguage: "en",
          timeRequired: data.duration || "P3M",
          teaches: data.skills || [],
          about: data.about || [],
        };

      default:
        return baseData;
    }
  };

  const getSchemaType = (type: string) => {
    switch (type) {
      case "organization":
        return "EducationalOrganization";
      case "article":
        return "Article";
      case "faq":
        return "FAQPage";
      case "breadcrumb":
        return "BreadcrumbList";
      case "course":
        return "Course";
      default:
        return "WebPage";
    }
  };

  const structuredData = generateStructuredData();

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}

// Helper components for common use cases
export function OrganizationStructuredData() {
  return <StructuredData type="organization" data={{}} />;
}

export function ArticleStructuredData({
  title,
  description,
  image,
  publishedAt,
  updatedAt,
  url,
  keywords,
  category,
  wordCount,
}: {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
  keywords?: string[];
  category?: string;
  wordCount?: number;
}) {
  return (
    <StructuredData
      type="article"
      data={{
        title,
        description,
        image,
        publishedAt,
        updatedAt,
        url,
        keywords,
        category,
        wordCount,
      }}
    />
  );
}

export function FAQStructuredData({
  questions,
}: {
  questions: Array<{ question: string; answer: string }>;
}) {
  return <StructuredData type="faq" data={{ questions }} />;
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  return <StructuredData type="breadcrumb" data={{ items }} />;
}

export function CourseStructuredData({
  title,
  description,
  mode,
  level,
  duration,
  skills,
  about,
}: {
  title: string;
  description: string;
  mode?: string;
  level?: string;
  duration?: string;
  skills?: string[];
  about?: string[];
}) {
  return (
    <StructuredData
      type="course"
      data={{
        title,
        description,
        mode,
        level,
        duration,
        skills,
        about,
      }}
    />
  );
}
