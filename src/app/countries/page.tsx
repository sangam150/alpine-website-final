import CountriesClient from './CountriesClient'

export default function CountriesPage() {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Study Destinations</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Explore top countries for studying abroad. Learn about universities, visa requirements, scholarships, and student life in each destination.
        </p>
        <CountriesClient />
      </div>
    </section>
  )
} 