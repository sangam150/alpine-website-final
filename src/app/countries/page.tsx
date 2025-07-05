import { Metadata } from 'next';
import CountriesClient from './CountriesClient';

export const metadata: Metadata = {
  title: 'Study Destinations - Alpine Education',
  description: 'Explore top study destinations including Australia, UK, Canada, USA, Germany, France, and New Zealand. Find universities, visa information, and tuition fees.',
};

export default async function CountriesPage() {
  // Fetch countries data from API
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/countries`, {
    cache: 'no-store'
  });
  
  const countries = response.ok ? await response.json() : [];

  return <CountriesClient countries={countries} />;
} 