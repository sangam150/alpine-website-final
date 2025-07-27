import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";

export default function BlogHighlightsSection() {
  const [highlights, setHighlights] = useState<any[]>([]);
  const [section, setSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighlights() {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "homepage", "blogHighlights");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHighlights(docSnap.data().highlights || []);
        setSection(docSnap.data());
      }
      setLoading(false);
    }
    fetchHighlights();
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-400">Loading blog highlights...</div>;
  if (!highlights.length) return <div className="py-8 text-center text-gray-400">No blog highlights found.</div>;

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-2 text-center">{section?.title || "Latest from the Blog"}</h2>
      {section?.subtitle && <p className="text-lg text-gray-600 mb-8 text-center">{section.subtitle}</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {highlights
          .filter((h) => h.status === "active")
          .sort((a, b) => (a.order || 0) - (b.order || 0))
          .map((highlight, i) => (
            <Link key={i} href={highlight.link || "#"} className="block group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {highlight.image && (
                <div className="relative h-48 w-full">
                  <Image src={highlight.image} alt={highlight.title} fill className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{highlight.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{highlight.excerpt}</p>
                <span className="text-blue-600 font-medium group-hover:underline">Read More →</span>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
} 