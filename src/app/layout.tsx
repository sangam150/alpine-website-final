import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingActions from '@/components/layout/FloatingActions'
import CallRequestWidget from '@/components/layout/CallRequestWidget'
import Analytics from '@/components/layout/Analytics'
import { BrandThemeProvider } from '@/components/layout/BrandThemeProvider'
import { ToastProvider } from '@/components/ui/toast-provider'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Alpine Education & Visa Services - Your Gateway to Global Education',
    template: '%s | Alpine Education & Visa Services'
  },
  description: 'Leading education consultancy in Nepal. Expert guidance for study abroad, visa services, IELTS preparation, and university applications. Free counseling available.',
  keywords: [
    'study abroad',
    'education consultancy',
    'visa services',
    'IELTS preparation',
    'university applications',
    'Nepal education',
    'international students',
    'study in UK',
    'study in Australia',
    'study in Canada',
    'study in USA',
    'student visa',
    'education counseling'
  ],
  authors: [{ name: 'Alpine Education & Visa Services' }],
  creator: 'Alpine Education & Visa Services',
  publisher: 'Alpine Education & Visa Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://alpineeducation.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alpineeducation.com',
    title: 'Alpine Education & Visa Services - Your Gateway to Global Education',
    description: 'Leading education consultancy in Nepal. Expert guidance for study abroad, visa services, IELTS preparation, and university applications.',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Education & Visa Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine Education & Visa Services - Your Gateway to Global Education',
    description: 'Leading education consultancy in Nepal. Expert guidance for study abroad, visa services, IELTS preparation, and university applications.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-144x144.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Alpine Education & Visa Services",
              "description": "Leading education consultancy in Nepal providing study abroad guidance, visa services, and IELTS preparation.",
              "url": "https://alpineeducation.com",
              "logo": "https://alpineeducation.com/logo.svg",
              "image": "https://alpineeducation.com/og-image.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NP",
                "addressLocality": "Kathmandu",
                "addressRegion": "Bagmati"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+977-XXXXXXXXX",
                "contactType": "customer service",
                "availableLanguage": ["English", "Nepali"]
              },
              "sameAs": [
                "https://facebook.com/alpineeducation",
                "https://instagram.com/alpineeducation",
                "https://linkedin.com/company/alpineeducation"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <BrandThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <FloatingActions />
              <CallRequestWidget />
            </ToastProvider>
            <Analytics />
          </AuthProvider>
        </BrandThemeProvider>
      </body>
    </html>
  )
}
