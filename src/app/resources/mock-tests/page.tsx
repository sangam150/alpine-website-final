import Link from 'next/link';
export const metadata = {
  title: 'Mock Tests - Alpine Education',
  description: 'Take free mock tests for IELTS, PTE, and TOEFL with Alpine Education.'
};
export default function MockTestsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-16 text-center">
      <img src="/logo.png" alt="Alpine Education Logo" className="w-20 h-20 object-contain mb-6" />
      <h1 className="text-3xl font-bold text-blue-700 mb-2">Mock Tests</h1>
      <p className="text-gray-700 mb-6">Our free mock tests are coming soon. Stay tuned!</p>
      <Link href="/resources" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200">Back to Resources</Link>
    </div>
  );
} 