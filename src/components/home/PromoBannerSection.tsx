import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function PromoBannerSection() {
  const [banner, setBanner] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function fetchBanner() {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "homepage", "promoBanner");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBanner(docSnap.data());
      }
      setLoading(false);
    }
    fetchBanner();
  }, []);

  if (loading || !banner || banner.status !== "active" || dismissed) return null;

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between px-4 py-3 md:py-4 relative z-50">
      {banner.image && (
        <div className="hidden md:block mr-4">
          <Image src={banner.image} alt={banner.text} width={64} height={64} className="rounded shadow" />
        </div>
      )}
      <div className="flex-1 text-center md:text-left">
        <span className="font-semibold text-lg mr-2">{banner.text}</span>
        {banner.ctaLink && banner.ctaText && (
          <Link href={banner.ctaLink} className="ml-2 inline-block bg-white text-blue-600 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 transition-colors">
            {banner.ctaText}
          </Link>
        )}
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 text-white hover:text-gray-200 text-2xl font-bold focus:outline-none"
        aria-label="Dismiss banner"
      >
        ×
      </button>
    </div>
  );
} 