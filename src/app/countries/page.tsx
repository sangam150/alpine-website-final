'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Study Destinations - Alpine Education & Visa Services',
  description: 'Explore top study abroad destinations. Filter by tuition, visa success, IELTS, and more. Find your perfect country with Alpine Education.'
};

type Country = {
  name: string;
  flag: string;
  slug: string;
  banner: string;
  tuition: 'low' | 'medium' | 'high';
  ielts: boolean;
  visa: 'low' | 'medium' | 'high';
  dependent: boolean;
};

const countries: Country[] = [
  { name: 'Australia', flag: '🇦🇺', slug: 'australia', banner: '/banners/australia.jpg', tuition: 'high', ielts: false, visa: 'high', dependent: true },
  { name: 'United Kingdom', flag: '🇬🇧', slug: 'uk', banner: '/banners/uk.jpg', tuition: 'high', ielts: false, visa: 'high', dependent: true },
  { name: 'Canada', flag: '🇨🇦', slug: 'canada', banner: '/banners/canada.jpg', tuition: 'medium', ielts: true, visa: 'high', dependent: true },
  { name: 'USA', flag: '🇺🇸', slug: 'usa', banner: '/banners/usa.jpg', tuition: 'high', ielts: true, visa: 'medium', dependent: true },
  { name: 'Germany', flag: '🇩🇪', slug: 'germany', banner: '/banners/germany.jpg', tuition: 'low', ielts: false, visa: 'medium', dependent: false },
  { name: 'France', flag: '🇫🇷', slug: 'france', banner: '/banners/france.jpg', tuition: 'low', ielts: false, visa: 'medium', dependent: false },
  { name: 'New Zealand', flag: '🇳🇿', slug: 'new-zealand', banner: '/banners/new-zealand.jpg', tuition: 'medium', ielts: true, visa: 'high', dependent: true },
  // Add more as needed
];

const filters = [
  { key: 'tuition', label: 'Low Tuition', value: 'low' },
  { key: 'ielts', label: 'No IELTS', value: false },
  { key: 'visa', label: 'High Visa Success', value: 'high' },
  { key: 'dependent', label: 'Dependent Visa', value: true },
] as const;

type FilterKey = typeof filters[number]['key'];

export default function CountriesPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);

  const filteredCountries = countries.filter((country) => {
    let match = true;
    if (activeFilter) {
      switch (activeFilter) {
        case 'tuition':
          match = country.tuition === 'low';
          break;
        case 'ielts':
          match = country.ielts === false;
          break;
        case 'visa':
          match = country.visa === 'high';
          break;
        case 'dependent':
          match = country.dependent === true;
          break;
        default:
          match = true;
      }
    }
    if (search) {
      match = match && country.name.toLowerCase().includes(search.toLowerCase());
    }
    return match;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <img src="/globe.svg" alt="World Map" className="w-full max-w-4xl mx-auto animate-spin-slow" loading="lazy" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <img src="/logo.png" alt="Alpine Education Logo" className="w-16 h-16 object-contain mx-auto mb-4" />
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Study Destinations</h1>
          <p className="text-xl lg:text-2xl mb-8">Find your perfect country for studying abroad. Filter by tuition, visa, IELTS, and more.</p>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex gap-2 flex-wrap">
            {filters.map(f => (
              <Button
                key={f.key}
                variant={activeFilter === f.key ? 'default' : 'outline'}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${activeFilter === f.key ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border-blue-600 hover:bg-blue-50'}`}
                onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
              >
                {f.label}
              </Button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search countries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCountries.map((country) => (
              <div key={country.slug} className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col items-center p-0 text-center border border-blue-50">
                <div className="w-full h-32 bg-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden relative">
                  <img
                    src={country.banner}
                    alt={country.name + ' Banner'}
                    className="object-cover w-full h-full absolute inset-0"
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('bg-gradient-to-br','from-blue-100','to-blue-300'); }}
                  />
                  <span className="text-5xl z-10 relative">{country.flag}</span>
                </div>
                <div className="font-bold text-lg text-gray-900 mb-1">{country.name}</div>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {country.tuition === 'low' && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Low Tuition</span>}
                  {!country.ielts && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">No IELTS</span>}
                  {country.visa === 'high' && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">High Visa Success</span>}
                  {country.dependent && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Dependent Visa</span>}
                </div>
                <Button asChild className="w-full mt-2 mb-4">
                  <Link href={`/countries/${country.slug}`}>Learn More</Link>
                </Button>
              </div>
            ))}
            {filteredCountries.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-12">
                No countries match your search or filter.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 