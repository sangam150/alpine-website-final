import ResourcesClient from './ResourcesClient'

export const metadata = {
  title: 'Resources - Study Abroad Guides, Downloads & FAQs | Alpine Education',
  description: 'Free study abroad resources: country handbooks, visa guides, mock tests, FAQs, and downloads. Everything you need for your international education journey. 50+ articles, 25+ downloads, 100+ FAQs.',
  keywords: 'study abroad resources, country handbooks, visa guides, mock tests, downloads, FAQs, study abroad guides, university guides, visa documentation, international education resources',
  openGraph: {
    title: 'Resources - Study Abroad Guides, Downloads & FAQs | Alpine Education',
    description: 'Free study abroad resources: country handbooks, visa guides, mock tests, FAQs, and downloads. Everything you need for your international education journey.',
    url: 'https://alpinevisa.com.np/resources',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Study Abroad Resources - Guides, Downloads & FAQs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - Study Abroad Guides, Downloads & FAQs | Alpine Education',
    description: 'Free study abroad resources: country handbooks, visa guides, mock tests, FAQs, and downloads. Everything you need for your international education journey.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/resources',
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

export default function ResourcesPage() {
  return <ResourcesClient />
} 