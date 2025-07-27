"use client";

import {
  GraduationCap,
  FileText,
  BookOpen,
  Award,
  Users,
  MessageCircle,
  Globe,
  Shield,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Icon mapping for lucide-react icons
const iconMap: Record<string, JSX.Element> = {
  Users: <Users className="h-8 w-8 text-blue-600" />,
  Globe: <Globe className="h-8 w-8 text-green-600" />,
  Shield: <Shield className="h-8 w-8 text-purple-600" />,
  Target: <Target className="h-8 w-8 text-orange-600" />,
  GraduationCap: <GraduationCap className="h-8 w-8 text-blue-600" />,
  FileText: <FileText className="h-8 w-8 text-gray-600" />,
  BookOpen: <BookOpen className="h-8 w-8 text-indigo-600" />,
  Award: <Award className="h-8 w-8 text-yellow-600" />,
  MessageCircle: <MessageCircle className="h-8 w-8 text-blue-600" />,
};

export default function ServicesOverview() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [section, setSection] = useState<any>(null);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "homepage", "services");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setServices(docSnap.data().services || []);
        setSection(docSnap.data());
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

  return (
    <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {section?.title || "Our Trusted Services"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {section?.subtitle || "Comprehensive support for your study abroad journey from initial counseling to visa approval"}
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400 py-8 text-center">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-gray-400 py-8 text-center">No services found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative transition-all duration-500"
              >
                <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {iconMap[service.icon] || <Award className="h-8 w-8 text-blue-600" />}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </div>
                <div className="text-gray-600 mb-4 leading-relaxed text-sm">
                  {service.description}
                </div>
                {/* Features */}
                {service.features && (
                  <div className="mb-4">
                    {service.features.map((feature: string, i: number) => (
                      <div
                        key={i}
                        className="text-xs text-gray-500 mb-1 flex items-center justify-center"
                      >
                        <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                )}
                <Link
                  href={service.link || "/student-services"}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
                >
                  Learn More
                  <MessageCircle className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        {section?.trustBadge && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4 mr-2" />
              {section.trustBadge}
            </div>
            <p className="text-gray-600">{section.trustText}</p>
          </div>
        )}
      </div>
    </section>
  );
}
