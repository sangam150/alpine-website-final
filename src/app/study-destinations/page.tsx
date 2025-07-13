import StudyDestinationsClient from './StudyDestinationsClient'

export const metadata = {
  title: 'Study Destinations - Australia, UK, Canada, USA & More | Alpine Education',
  description: 'Explore 12+ study destinations for Nepali students. Compare Australia, UK, Canada, USA, New Zealand, Germany, France, and more. Expert guidance for university selection and visa applications.',
  keywords: 'study destinations, Australia study, UK education, Canada student visa, USA universities, New Zealand study, Germany education, France universities, study abroad countries, Nepali students abroad',
  openGraph: {
    title: 'Study Destinations - Australia, UK, Canada, USA & More | Alpine Education',
    description: 'Explore 12+ study destinations for Nepali students. Expert guidance for university selection and visa applications.',
    url: 'https://alpinevisa.com.np/study-destinations',
    siteName: 'Alpine Education & Visa Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Study Destinations - Australia, UK, Canada, USA & More',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study Destinations - Australia, UK, Canada, USA & More | Alpine Education',
    description: 'Explore 12+ study destinations for Nepali students. Expert guidance for university selection and visa applications.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://alpinevisa.com.np/study-destinations',
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

export default function StudyDestinationsPage() {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Study Destinations</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Find your perfect study destination. Compare countries, universities, and opportunities for Nepali students.
        </p>
        <StudyDestinationsClient />
      </div>
    </section>
  )
} 