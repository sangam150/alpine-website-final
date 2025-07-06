import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface CountryPageProps {
  params: Promise<{
    country: string;
  }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country: countrySlug } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/countries`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Study Destination - Alpine Education',
        description: 'Explore study opportunities and visa information.',
      };
    }
    
    const countries = await response.json();
    const country = countries.find((c: any) => c.slug === countrySlug);
    
    if (!country) {
      return {
        title: 'Study Destination - Alpine Education',
        description: 'Explore study opportunities and visa information.',
      };
    }
    
    return {
      title: `Study in ${country.name} - Alpine Education`,
      description: country.description || `Study in ${country.name} with Alpine Education. Get visa guidance, university information, and tuition details.`,
      keywords: [`study in ${country.name}`, `${country.name} universities`, `${country.name} visa`, 'study abroad', 'international education'],
    };
  } catch (error) {
    return {
      title: 'Study Destination - Alpine Education',
      description: 'Explore study opportunities and visa information.',
    };
  }
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { country: countrySlug } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/countries`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      notFound();
    }
    
    const countries = await response.json();
    const country = countries.find((c: any) => c.slug === countrySlug);
    
    if (!country) {
      notFound();
    }
    
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{country.flag}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Study in {country.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {country.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tuition Fees</h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {country.tuition.min.toLocaleString()} - {country.tuition.max.toLocaleString()} {country.tuition.currency}
                </div>
                <p className="text-gray-600">Annual tuition fees</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visa Information</h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Success Rate</span>
                  <div className="text-2xl font-bold text-blue-600">{country.visa.successRate}%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-medium">{country.visa.processingTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Universities</span>
                    <span className="font-medium">{country.universities}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose {country.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {country.filters.map((filter: string) => (
                <div key={filter} className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-900">{filter}</h3>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Apply Now
              </button>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                Book Free Counselling
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 