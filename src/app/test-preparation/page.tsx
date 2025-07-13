import TestPreparationClient from './TestPreparationClient'

export const metadata = {
  title: 'Test Preparation - IELTS, PTE, TOEFL Coaching in Kathmandu | Alpine Education',
  description: 'Expert IELTS, PTE, and TOEFL coaching in Kathmandu. Free practice tests, experienced instructors, 95% success rate. Book your free mock test today!',
  keywords: 'IELTS preparation Kathmandu, PTE coaching Nepal, TOEFL training, English test prep, IELTS classes, PTE classes, TOEFL classes, study abroad test preparation',
  openGraph: {
    title: 'Test Preparation - IELTS, PTE, TOEFL Coaching in Kathmandu | Alpine Education',
    description: 'Expert IELTS, PTE, and TOEFL coaching in Kathmandu. Free practice tests, experienced instructors, 95% success rate.',
    url: 'https://alpinevisa.com.np/test-preparation',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'IELTS, PTE, TOEFL Test Preparation - Alpine Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test Preparation - IELTS, PTE, TOEFL Coaching in Kathmandu | Alpine Education',
    description: 'Expert IELTS, PTE, and TOEFL coaching in Kathmandu. Free practice tests, experienced instructors, 95% success rate.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/test-preparation',
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

export default function TestPreparationPage() {
  return <TestPreparationClient />
} 