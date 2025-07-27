"use client";

import {
  GraduationCap,
  Users,
  Award,
  Globe,
  Star,
  Shield,
  CheckCircle,
} from "lucide-react";
import { motion, useAnimation, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function AnimatedCounter({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const isPercent = value.includes("%");
  const isPlus = value.includes("+");
  const num = parseInt(value.replace(/[^0-9]/g, ""));
  const motionValue = useMotionValue(0);
  useEffect(() => {
    const controls = animate(motionValue, num, {
      duration: 1.5,
      ease: [0.42, 0, 0.58, 1],
      onUpdate: (latest) => {
        setDisplay(
          Math.floor(latest).toLocaleString() +
            (isPercent ? "%" : "") +
            (isPlus ? "+" : ""),
        );
      },
    });
    return () => controls.stop();
  }, [num, isPercent, isPlus, motionValue]);
  return <span>{display}</span>;
}

const iconMap: Record<string, JSX.Element> = {
  GraduationCap: <GraduationCap className="h-8 w-8 text-blue-600" />,
  Users: <Users className="h-8 w-8 text-green-600" />,
  Award: <Award className="h-8 w-8 text-yellow-500" />,
  Globe: <Globe className="h-8 w-8 text-purple-600" />,
  Star: <Star className="h-6 w-6 text-yellow-500" />,
  Shield: <Shield className="h-6 w-6 text-blue-600" />,
  CheckCircle: <CheckCircle className="h-6 w-6 text-purple-600" />,
};

export default function StatsSection() {
  const [section, setSection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const db = getFirestore();
      const docRef = doc(db, "homepage", "stats");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSection(docSnap.data());
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading || !section) {
    return <div className="text-center py-16 text-gray-400">Loading stats...</div>;
  }

  return (
    <section id="stats-section" className="w-full py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {section.stats.map((stat: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3">{iconMap[stat.icon]}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        {section.trustBadges && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {section.trustTitle || "Trusted & Certified"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {section.trustBadges.map((badge: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-2">{iconMap[badge.icon]}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {badge.name}
                  </div>
                  <div className="text-xs text-gray-500">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partner Universities */}
        {section.partnerLogos && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              {section.partnerTitle || "Partner Universities"}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {section.partnerLogos.map((partner: any, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    {partner.logo ? (
                      <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-xs font-medium text-gray-600 text-center">
                        {partner.name.split(" ")[0]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards & Recognition */}
        {section.awards && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {section.awardsTitle || "Awards & Recognition"}
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {section.awards.map((award: any, i: number) => (
                <div key={i} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
                  {iconMap[award.icon] || <Award className="h-5 w-5 text-yellow-500" />}
                  <span className="text-sm font-medium">{award.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
