import AboutClient from './AboutClient'

export const metadata = {
  title: 'About Us - Alpine Education & Visa Services | Nepal\'s Premier Study Abroad Consultancy',
  description: 'Discover Alpine Education & Visa Services - Nepal\'s trusted study abroad partner. 10+ years experience, 3000+ students placed, 95% visa success rate. Expert counseling for Australia, UK, Canada, and 12+ countries.',
  keywords: 'Alpine Education Nepal, study abroad consultancy, international education, visa services, university counseling, Australia study, UK education, Canada student visa, Nepali students abroad',
  openGraph: {
    title: 'About Alpine Education - Nepal\'s Premier Study Abroad Consultancy',
    description: 'Trusted by 3000+ students. Expert counseling for study abroad in Australia, UK, Canada, and 12+ countries. 95% visa success rate.',
    url: 'https://alpinevisa.com.np/about',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Education Team - Study Abroad Experts',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Alpine Education - Nepal\'s Premier Study Abroad Consultancy',
    description: 'Trusted by 3000+ students. Expert counseling for study abroad in Australia, UK, Canada, and 12+ countries.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/about',
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

export default function AboutPage() {
  return <AboutClient />
} 