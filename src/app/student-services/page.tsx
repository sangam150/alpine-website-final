import StudentServicesClient from './StudentServicesClient'

export const metadata = {
  title: 'Student Services - Complete Study Abroad Support | Alpine Education',
  description: 'Complete study abroad support from application to arrival. Personalized counseling, visa guidance, documentation help, university applications, and post-arrival support for Nepali students.',
  keywords: 'study abroad services Nepal, visa guidance, application support, student counseling, international education, university applications, post-arrival support, study abroad consultancy',
  openGraph: {
    title: 'Student Services - Complete Study Abroad Support | Alpine Education',
    description: 'Complete study abroad support from application to arrival. Personalized counseling, visa guidance, and post-arrival support for Nepali students.',
    url: 'https://alpinevisa.com.np/student-services',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Student Services - Complete Study Abroad Support',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Services - Complete Study Abroad Support | Alpine Education',
    description: 'Complete study abroad support from application to arrival. Personalized counseling, visa guidance, and post-arrival support for Nepali students.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/student-services',
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

export default function StudentServicesPage() {
  return <StudentServicesClient />
} 