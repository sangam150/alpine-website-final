import HomeClient from './HomeClient'

export const metadata = {
  title: 'Alpine Education & Visa Services - Nepal\'s Premier Study Abroad Consultancy',
  description: 'Nepal\'s #1 study abroad consultancy. 3000+ students placed, 95% visa success rate. Expert counseling for Australia, UK, Canada, USA, and 12+ countries. Free consultation available.',
  keywords: 'Alpine Education Nepal, study abroad consultancy, international education, visa services, Australia study, UK education, Canada student visa, USA universities, Nepali students abroad, study abroad Nepal',
  openGraph: {
    title: 'Alpine Education & Visa Services - Nepal\'s Premier Study Abroad Consultancy',
    description: 'Nepal\'s #1 study abroad consultancy. 3000+ students placed, 95% visa success rate. Expert counseling for Australia, UK, Canada, USA, and 12+ countries.',
    url: 'https://alpinevisa.com.np',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alpine Education - Nepal\'s Premier Study Abroad Consultancy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alpine Education & Visa Services - Nepal\'s Premier Study Abroad Consultancy',
    description: 'Nepal\'s #1 study abroad consultancy. 3000+ students placed, 95% visa success rate. Expert counseling for Australia, UK, Canada, USA, and 12+ countries.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np',
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

export default function HomePage() {
  return <HomeClient />
}
