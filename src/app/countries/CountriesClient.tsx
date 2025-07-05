'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Search, Globe, GraduationCap, DollarSign, CheckCircle } from 'lucide-react';

type Country = {
  name: string;
  flag: string;
  slug: string;
  banner: string;
  tuition: 'low' | 'medium' | 'high';
  ielts: boolean;
  visa: 'low' | 'medium' | 'high';
  dependent: boolean;
  universities: number;
  avgTuition: string;
  visaSuccess: string;
  description: string;
};

const countries: Country[] = [
  { 
    name: 'Australia', 
    flag: '🇦🇺', 
    slug: 'australia', 
    banner: '/og-image.jpg', 
    tuition: 'high', 
    ielts: false, 
    visa: 'high', 
    dependent: true,
    universities: 43,
    avgTuition: 'AUD 30,000-45,000',
    visaSuccess: '95%',
    description: 'World-class education with post-study work opportunities'
  },
  { 
    name: 'United Kingdom', 
    flag: '🇬🇧', 
    slug: 'uk', 
    banner: '/og-image.jpg', 
    tuition: 'high', 
    ielts: false, 
    visa: 'high', 
    dependent: true,
    universities: 130,
    avgTuition: 'GBP 15,000-35,000',
    visaSuccess: '92%',
    description: 'Historic universities with global recognition'
  },
  { 
    name: 'Canada', 
    flag: '🇨🇦', 
    slug: 'canada', 
    banner: '/og-image.jpg', 
    tuition: 'medium', 
    ielts: true, 
    visa: 'high', 
    dependent: true,
    universities: 97,
    avgTuition: 'CAD 20,000-35,000',
    visaSuccess: '88%',
    description: 'High quality education with immigration pathways'
  },
  { 
    name: 'USA', 
    flag: '🇺🇸', 
    slug: 'usa', 
    banner: '/og-image.jpg', 
    tuition: 'high', 
    ielts: true, 
    visa: 'medium', 
    dependent: true,
    universities: 4000,
    avgTuition: 'USD 25,000-50,000',
    visaSuccess: '75%',
    description: 'Diverse options from community colleges to Ivy League'
  },
  { 
    name: 'Germany', 
    flag: '🇩🇪', 
    slug: 'germany', 
    banner: '/og-image.jpg', 
    tuition: 'low', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 400,
    avgTuition: 'EUR 0-1,500',
    visaSuccess: '85%',
    description: 'Free education with strong engineering programs'
  },
  { 
    name: 'France', 
    flag: '🇫🇷', 
    slug: 'france', 
    banner: '/og-image.jpg', 
    tuition: 'low', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 350,
    avgTuition: 'EUR 170-3,770',
    visaSuccess: '82%',
    description: 'Affordable education in the heart of Europe'
  },
  { 
    name: 'New Zealand', 
    flag: '🇳🇿', 
    slug: 'new-zealand', 
    banner: '/og-image.jpg', 
    tuition: 'medium', 
    ielts: true, 
    visa: 'high', 
    dependent: true,
    universities: 8,
    avgTuition: 'NZD 22,000-32,000',
    visaSuccess: '90%',
    description: 'Safe environment with work opportunities'
  },
  { 
    name: 'Ireland', 
    flag: '🇮🇪', 
    slug: 'ireland', 
    banner: '/og-image.jpg', 
    tuition: 'medium', 
    ielts: false, 
    visa: 'high', 
    dependent: true,
    universities: 7,
    avgTuition: 'EUR 10,000-25,000',
    visaSuccess: '88%',
    description: 'English-speaking country with tech opportunities'
  },
  { 
    name: 'Netherlands', 
    flag: '🇳🇱', 
    slug: 'netherlands', 
    banner: '/og-image.jpg', 
    tuition: 'medium', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 13,
    avgTuition: 'EUR 2,168-15,000',
    visaSuccess: '80%',
    description: 'Innovative education with English-taught programs'
  },
  { 
    name: 'Sweden', 
    flag: '🇸🇪', 
    slug: 'sweden', 
    banner: '/og-image.jpg', 
    tuition: 'low', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 39,
    avgTuition: 'Free for EU/EEA',
    visaSuccess: '78%',
    description: 'Free education with high quality of life'
  },
  { 
    name: 'Norway', 
    flag: '🇳🇴', 
    slug: 'norway', 
    banner: '/og-image.jpg', 
    tuition: 'low', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 8,
    avgTuition: 'Free for all',
    visaSuccess: '75%',
    description: 'Free education with stunning natural beauty'
  },
  { 
    name: 'Finland', 
    flag: '🇫🇮', 
    slug: 'finland', 
    banner: '/og-image.jpg', 
    tuition: 'low', 
    ielts: false, 
    visa: 'medium', 
    dependent: false,
    universities: 13,
    avgTuition: 'Free for EU/EEA',
    visaSuccess: '80%',
    description: 'World\'s best education system'
  }
];

const filters = [
  { key: 'tuition', label: 'Low Tuition', value: 'low', icon: DollarSign, color: 'green' },
  { key: 'ielts', label: 'No IELTS', value: false, icon: CheckCircle, color: 'yellow' },
  { key: 'visa', label: 'High Visa Success', value: 'high', icon: Globe, color: 'blue' },
  { key: 'dependent', label: 'Dependent Visa', value: true, icon: GraduationCap, color: 'purple' },
] as const;

type FilterKey = typeof filters[number]['key'];

export default function CountriesClient() {
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

  const getFilterColor = (filterKey: FilterKey) => {
    const filter = filters.find(f => f.key === filterKey);
    return filter?.color || 'gray';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <Image src="/globe.svg" alt="World Map" className="w-full max-w-4xl mx-auto animate-spin-slow" width={800} height={400} loading="lazy" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Image src="/logo.svg" alt="Alpine Education Logo" className="w-16 h-16 object-contain mx-auto mb-4" width={64} height={64} loading="lazy" />
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">Study Destinations</h1>
          <p className="text-xl lg:text-2xl mb-8">Explore {countries.length} countries for your study abroad journey. Filter by tuition, visa success, IELTS requirements, and more.</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Tuition Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Visa Success</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>IELTS Options</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Dependent Visas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="bg-white py-6 shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
            <div className="flex gap-2 flex-wrap justify-center lg:justify-start">
              {filters.map(f => {
                const Icon = f.icon;
                return (
                  <Button
                    key={f.key}
                    variant={activeFilter === f.key ? 'default' : 'outline'}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-all flex items-center gap-2 ${
                      activeFilter === f.key 
                        ? `bg-${f.color}-600 text-white` 
                        : `bg-white text-${f.color}-700 border-${f.color}-600 hover:bg-${f.color}-50`
                    }`}
                    onClick={() => setActiveFilter(activeFilter === f.key ? null : f.key)}
                  >
                    <Icon className="w-4 h-4" />
                    {f.label}
                  </Button>
                );
              })}
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search countries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="mt-4 text-center lg:text-left">
            <p className="text-sm text-gray-600">
              Showing {filteredCountries.length} of {countries.length} countries
              {activeFilter && ` • Filtered by ${filters.find(f => f.key === activeFilter)?.label}`}
              {search && ` • Search: "${search}"`}
            </p>
          </div>
        </div>
      </section>

      {/* Country Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCountries.map((country) => (
              <div key={country.slug} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col border border-gray-100 overflow-hidden">
                <div className="w-full h-32 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src={country.banner}
                    alt={country.name + ' Banner'}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full absolute inset-0"
                    onError={e => { 
                      e.currentTarget.style.display = 'none'; 
                      e.currentTarget.parentElement?.classList.add('bg-gradient-to-br','from-blue-100','to-blue-300'); 
                    }}
                  />
                  <span className="text-5xl z-10 relative">{country.flag}</span>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="font-bold text-xl text-gray-900 mb-2">{country.name}</div>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{country.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Universities:</span>
                      <span className="font-semibold">{country.universities}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Avg Tuition:</span>
                      <span className="font-semibold">{country.avgTuition}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Visa Success:</span>
                      <span className="font-semibold text-green-600">{country.visaSuccess}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 flex-wrap mb-4">
                    {country.tuition === 'low' && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Low Tuition
                      </span>
                    )}
                    {!country.ielts && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        No IELTS
                      </span>
                    )}
                    {country.visa === 'high' && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        High Success
                      </span>
                    )}
                    {country.dependent && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        Dependent Visa
                      </span>
                    )}
                  </div>
                  
                  <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white">
                    <Link href={`/countries/${country.slug}`}>
                      Explore {country.name}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredCountries.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="max-w-md mx-auto">
                  <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No countries found</h3>
                  <p className="text-gray-500 mb-4">
                    No countries match your current search or filter criteria. Try adjusting your filters or search terms.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearch('');
                      setActiveFilter(null);
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 