'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: 3000,
    suffix: '+',
    label: 'Students Placed',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: Globe,
    value: 12,
    suffix: '+',
    label: 'Countries',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Award,
    value: 95,
    suffix: '%',
    label: 'Success Rate',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Clock,
    value: 24,
    suffix: '/7',
    label: 'Support Hours',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(timer);
        }

        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }, duration / steps);
    });
  };

  return (
    <section id="stats-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by thousands of students and families across Nepal for their study abroad journey.
          </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
              <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {counts[index]}
                <span className={stat.color}>&apos;{stat.suffix}</span>
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">500+</div>
            <p className="text-gray-600">Partner Universities</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">15+</div>
            <p className="text-gray-600">Years of Experience</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-900 mb-2">98%</div>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 