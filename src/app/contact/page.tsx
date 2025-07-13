import ContactFormClient from './ContactFormClient'

export const metadata = {
  title: 'Contact Us - Get Expert Study Abroad Guidance | Alpine Education',
  description: 'Contact Alpine Education for expert study abroad guidance. Free consultation, visa support, and personalized counseling. Call, email, or visit our offices in Kathmandu. 24/7 support available.',
  keywords: 'contact alpine education, study abroad consultation, visa guidance, free counseling, Kathmandu office, Nepal study abroad, international education contact',
  openGraph: {
    title: 'Contact Us - Get Expert Study Abroad Guidance | Alpine Education',
    description: 'Contact Alpine Education for expert study abroad guidance. Free consultation, visa support, and personalized counseling. 24/7 support available.',
    url: 'https://alpinevisa.com.np/contact',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Alpine Education - Expert Study Abroad Guidance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get Expert Study Abroad Guidance | Alpine Education',
    description: 'Contact Alpine Education for expert study abroad guidance. Free consultation, visa support, and personalized counseling. 24/7 support available.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/contact',
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
}

export default function ContactPage() {
  return <ContactFormClient />
} 