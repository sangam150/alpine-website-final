import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-16 text-center">
      <Image src="/logo.png" alt="Alpine Education Logo" width={96} height={96} className="w-24 h-24 object-contain mb-6" loading="lazy" />
      <h1 className="text-5xl font-extrabold text-blue-700 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Sorry, the page you are looking for does not exist or has been moved.<br />
        Please check the URL or return to the homepage.
      </p>
      <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-200">
        Go to Home
      </Link>
    </div>
  );
} 