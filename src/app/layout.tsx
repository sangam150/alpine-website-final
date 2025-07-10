import type { Metadata } from 'next'
import { Inter, Hind_Siliguri } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/layout/Analytics'
import { BrandThemeProvider } from '@/components/layout/BrandThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ExitIntentPopup from '@/components/marketing/ExitIntentPopup'
import StickyConsultationBar from '@/components/marketing/StickyConsultationBar'
import AIChatbot from '@/components/ai/AIChatbot'
import FloatingActions from '@/components/layout/FloatingActions'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const hindSiliguri = Hind_Siliguri({ 
  subsets: ['bengali'],
  variable: '--font-hind-siliguri',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    default: 'Alpine Education - Leading Study Abroad Consultants for Nepali Students',
    template: '%s | Alpine Education'
  },
  description: 'Expert study abroad consultants helping Nepali students achieve their dreams. 98% visa success rate, 5000+ successful students, 15 years of excellence. Free consultation available.',
  keywords: 'study abroad Nepal, visa consultants Nepal, IELTS preparation Nepal, Australia study Nepal, UK study Nepal, USA study Nepal, Canada study Nepal',
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
    title: 'Alpine Education - Leading Study Abroad Consultants for Nepali Students',
    description: 'Expert study abroad consultants helping Nepali students achieve their dreams. 98% visa success rate, 5000+ successful students.',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Education - Study Abroad Success for Nepali Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine Education - Leading Study Abroad Consultants for Nepali Students',
    description: 'Expert study abroad consultants helping Nepali students achieve their dreams. 98% visa success rate, 5000+ successful students.',
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
        <link rel="icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${hindSiliguri.variable} font-sans antialiased`}>
        <BrandThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-0 m-0">
              {children}
            </main>
            <Footer />
            <FloatingActions />
            <StickyConsultationBar />
            <ExitIntentPopup />
            <AIChatbot />
          </div>
          <Analytics />
        </BrandThemeProvider>
      </body>
    </html>
  )
}
