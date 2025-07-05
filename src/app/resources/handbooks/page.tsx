import Link from 'next/link';
import Image from 'next/image';
export const metadata = {
  title: 'Student Handbooks - Alpine Education',
  description: 'Download student handbooks and guides for your study abroad journey with Alpine Education.'
};
export default function HandbooksPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-16 text-center">
      <Image src="/logo.png" alt="Alpine Education Logo" className="w-20 h-20 object-contain mb-6" width={80} height={80} loading="lazy" />
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Student Handbooks</h1>
      <p className="text-gray-700 mb-6">Downloadable handbooks and guides coming soon. Personalized PDFs based on your quiz results will be available here!</p>
      <Link href="/resources" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200">Back to Resources</Link>
    </div>
  );
} 