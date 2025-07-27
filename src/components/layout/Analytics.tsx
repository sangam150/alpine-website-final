"use client";

import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

export default function Analytics() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Alpine Education & Visa Services",
    alternateName: "Alpine Education",
    description:
      "Nepal's premier study abroad consultancy. Expert guidance for Australia, UK, Canada, USA, and 12+ countries. 3000+ students placed, 95% visa success rate.",
    url: "https://alpinevisa.com.np",
    logo: "https://alpinevisa.com.np/logo.svg",
    image: "https://alpinevisa.com.np/og-image.jpg",
    telephone: "+977-1-4444444",
    email: "info@alpinevisa.com.np",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thamel, Kathmandu",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.7172",
      longitude: "85.3240",
    },
    openingHours: "Mo-Fr 09:00-18:00, Sa 09:00-14:00",
    priceRange: "$$",
    currenciesAccepted: "NPR, USD, EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
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
            name: "Study Abroad Counseling",
            description: "Expert guidance for international education",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Visa Application Support",
            description: "Complete visa application assistance",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Test Preparation",
            description: "IELTS, PTE, TOEFL coaching",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Sarah Johnson",
        },
        reviewBody:
          "Excellent guidance for my Australia study visa. Highly recommended!",
      },
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Michael Chen",
        },
        reviewBody:
          "Professional service and great support throughout the process.",
      },
    ],
    sameAs: [
      "https://www.facebook.com/alpineeducation",
      "https://www.instagram.com/alpineeducation",
      "https://www.linkedin.com/company/alpineeducation",
    ],
    foundingDate: "2014",
    numberOfEmployees: "25",
    award: [
      "Best Study Abroad Consultancy 2023",
      "Excellence in Student Services Award",
    ],
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alpine Education & Visa Services",
    image: "https://alpinevisa.com.np/og-image.jpg",
    description:
      "Nepal's premier study abroad consultancy providing expert guidance for international education.",
    url: "https://alpinevisa.com.np",
    telephone: "+977-1-4444444",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thamel, Kathmandu",
      addressLocality: "Kathmandu",
      addressRegion: "Bagmati",
      postalCode: "44600",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "27.7172",
      longitude: "85.3240",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "NPR, USD, EUR",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Alpine Education & Visa Services",
    url: "https://alpinevisa.com.np",
    description:
      "Nepal's premier study abroad consultancy. Expert guidance for Australia, UK, Canada, USA, and 12+ countries.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://alpinevisa.com.np/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Alpine Education & Visa Services",
      logo: {
        "@type": "ImageObject",
        url: "https://alpinevisa.com.np/logo.svg",
      },
    },
  };

  return (
    <>
      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      {/* Structured Data */}
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Script
        id="structured-data-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* Vercel Analytics */}
      <VercelAnalytics />
    </>
  );
}
