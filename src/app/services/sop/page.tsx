import Link from 'next/link';
import Image from 'next/image';
export const metadata = {
  title: 'SOP Guidance - Alpine Education',
  description: 'Get expert SOP (Statement of Purpose) guidance for your study abroad application with Alpine Education.'
};
export default function SOPPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-16 text-center">
      <Image src="/logo.png" alt="Alpine Education Logo" className="w-20 h-20 object-contain mb-6" width={80} height={80} loading="lazy" />
      <h1 className="text-3xl font-bold text-blue-700 mb-2">SOP Guidance</h1>
      <p className="text-gray-700 mb-6">Our expert counselors will help you craft a winning Statement of Purpose. Full resources and templates coming soon!</p>
      <Link href="/services" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-all duration-200">Back to Student Services</Link>
    </div>
  );
} 