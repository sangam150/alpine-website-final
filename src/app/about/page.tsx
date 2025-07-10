import AboutClient from './AboutClient'

export default function AboutPage() {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          About <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Alpine Education</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          We are Nepal’s leading study abroad consultants, dedicated to helping students achieve their international education dreams. With 15+ years of experience, 98% visa success rate, and 5000+ successful students, we provide expert guidance, free counseling, and personalized support for every step of your journey.
        </p>
        <AboutClient />
      </div>
    </section>
  )
} 