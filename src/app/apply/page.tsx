import ApplyClient from './ApplyClient'

export const metadata = {
  title: 'Apply Now - Start Your Study Abroad Journey | Alpine Education',
  description: 'Apply for study abroad programs with Alpine Education. Easy application process, expert guidance, and comprehensive support for your international education journey. Free consultation available.',
  keywords: 'apply study abroad, university application, visa application, study abroad process, Alpine Education application, study abroad Nepal, international education application',
  openGraph: {
    title: 'Apply Now - Start Your Study Abroad Journey | Alpine Education',
    description: 'Apply for study abroad programs with Alpine Education. Easy application process, expert guidance, and comprehensive support for your international education journey.',
    url: 'https://alpinevisa.com.np/apply',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Apply Now - Start Your Study Abroad Journey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apply Now - Start Your Study Abroad Journey | Alpine Education',
    description: 'Apply for study abroad programs with Alpine Education. Easy application process, expert guidance, and comprehensive support for your international education journey.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/apply',
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

export default function ApplyPage() {
  return <ApplyClient />
} 