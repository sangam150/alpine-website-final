import StudentServicesClient from './StudentServicesClient'

export default function StudentServicesPage() {
  return (
    <section className="relative w-full min-h-[60vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden pt-28 pb-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">Student Services</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover our full range of services for Nepali students: counseling, visa assistance, test prep, scholarships, and more. We’re with you every step of the way!
        </p>
        <StudentServicesClient />
      </div>
    </section>
  )
} 