import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all countries
export async function GET() {
  try {
    const mockCountries = [
      {
        id: 'australia',
        name: 'Australia',
        slug: 'australia',
        description: 'Study in Australia with world-class universities and beautiful landscapes.',
        universities: 43,
        avgTuition: 'AUD 20,000-35,000',
        visaSuccess: '95%',
        duration: '2-4 years',
        popularCourses: ['Business', 'Engineering', 'IT', 'Healthcare'],
        pros: ['High quality education', 'Work opportunities', 'Beautiful country'],
        image: '/flags/australia.svg'
      },
      {
        id: 'canada',
        name: 'Canada',
        slug: 'canada',
        description: 'Experience high-quality education in a multicultural environment.',
        universities: 97,
        avgTuition: 'CAD 15,000-30,000',
        visaSuccess: '90%',
        duration: '2-4 years',
        popularCourses: ['Computer Science', 'Business', 'Engineering', 'Arts'],
        pros: ['Affordable education', 'Immigration friendly', 'Safe country'],
        image: '/flags/canada.svg'
      },
      {
        id: 'uk',
        name: 'United Kingdom',
        slug: 'uk',
        description: 'Study at prestigious universities with rich academic traditions.',
        universities: 164,
        avgTuition: '£10,000-25,000',
        visaSuccess: '88%',
        duration: '3-4 years',
        popularCourses: ['Business', 'Law', 'Medicine', 'Arts'],
        pros: ['World-class universities', 'Rich history', 'Cultural diversity'],
        image: '/flags/uk.svg'
      },
      {
        id: 'usa',
        name: 'United States',
        slug: 'usa',
        description: 'Access top-ranked universities and diverse study options.',
        universities: 4000,
        avgTuition: 'USD 25,000-50,000',
        visaSuccess: '85%',
        duration: '4 years',
        popularCourses: ['Computer Science', 'Business', 'Engineering', 'Arts'],
        pros: ['Top universities', 'Innovation hub', 'Career opportunities'],
        image: '/flags/usa.svg'
      },
      {
        id: 'germany',
        name: 'Germany',
        slug: 'germany',
        description: 'Study in Germany with low tuition fees and excellent education.',
        universities: 400,
        avgTuition: '€0-1,500',
        visaSuccess: '92%',
        duration: '3-4 years',
        popularCourses: ['Engineering', 'Science', 'Business', 'Arts'],
        pros: ['Low tuition fees', 'Strong economy', 'Central location'],
        image: '/flags/germany.svg'
      },
      {
        id: 'france',
        name: 'France',
        slug: 'france',
        description: 'Experience French culture and excellent higher education.',
        universities: 350,
        avgTuition: '€170-380',
        visaSuccess: '90%',
        duration: '3-4 years',
        popularCourses: ['Business', 'Arts', 'Engineering', 'Science'],
        pros: ['Affordable education', 'Rich culture', 'Central Europe'],
        image: '/flags/france.svg'
      }
    ];

    return NextResponse.json({ 
      success: true, 
      data: mockCountries,
      count: mockCountries.length 
    });
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch countries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Add new country (Mock implementation)
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Firebase not configured' },
    { status: 503 }
  );
}

// PUT - Update country (Mock implementation)
export async function PUT(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Firebase not configured' },
    { status: 503 }
  );
}

// DELETE - Delete country (Mock implementation)
export async function DELETE(request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Firebase not configured' },
    { status: 503 }
  );
} 