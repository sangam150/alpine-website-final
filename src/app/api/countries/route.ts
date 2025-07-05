import { NextResponse } from 'next/server';
import { fetchAll } from '@/lib/firestore-admin';

export async function GET() {
  try {
    const countries = await fetchAll('countries');
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Return mock data for development
    return NextResponse.json([
      { 
        name: 'Australia', 
        flag: '🇦🇺', 
        slug: 'australia', 
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
        tuition: 'high', 
        ielts: false, 
        visa: 'high', 
        dependent: true,
        universities: 130,
        avgTuition: 'GBP 15,000-35,000',
        visaSuccess: '92%',
        description: 'Historic universities with global recognition'
      }
    ]);
  }
} 