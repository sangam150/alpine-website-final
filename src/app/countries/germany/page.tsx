import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GraduationCap, DollarSign, FileText, Users, BookOpen, CheckCircle, Globe, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study in Germany from Nepal - Tuition, Scholarships, Visa, Job Search | Alpine Education',
  description: 'Study in Germany from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, job search, and FAQs. Apply now for top German universities.',
  keywords: ['Study in Germany', 'Germany student visa', 'Germany scholarships', 'Germany job search', 'Germany from Nepal', 'Alpine Education'],
  alternates: { canonical: '/countries/germany' },
  openGraph: {
    title: 'Study in Germany from Nepal - Tuition, Scholarships, Visa, Job Search | Alpine Education',
    description: 'Study in Germany from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, job search, and FAQs. Apply now for top German universities.',
    url: 'https://alpineeducation.com/countries/germany',
    images: ['/og-image.jpg'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Germany from Nepal - Tuition, Scholarships, Visa, Job Search | Alpine Education',
    description: 'Study in Germany from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, job search, and FAQs. Apply now for top German universities.',
    images: ['/og-image.jpg'],
  },
};

const faqs = [
  {
    q: 'What are the tuition fees for international students in Germany?',
    a: 'Most public universities have no tuition fees or charge €0-1,500 per semester. Private universities may charge more.'
  },
  {
    q: 'What scholarships are available for Nepalese students?',
    a: 'DAAD, Erasmus+, and university-specific scholarships are available for international students.'
  },
  {
    q: 'What is the student visa process for Germany?',
    a: 'The process includes university admission, blocked account, health insurance, and visa application. Alpine provides full support.'
  },
  {
    q: 'Can I work part-time as a student in Germany?',
    a: 'Yes, you can work up to 120 full days or 240 half days per year.'
  },
  {
    q: 'What is the job search visa after graduation in Germany?',
    a: 'Graduates can get an 18-month job search visa to find employment in Germany.'
  },
];

export default function GermanyPage() {
  return (
    <div className="min-h-screen">
      {/* Schema.org Article markup */}
      <script type="application/ld+json" suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Study in Germany from Nepal - Tuition, Scholarships, Visa, Job Search | Alpine Education",
          "description": "Study in Germany from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, job search, and FAQs. Apply now for top German universities.",
          "author": {"@type": "Organization", "name": "Alpine Education & Visa Services"},
          "publisher": {"@type": "Organization", "name": "Alpine Education & Visa Services", "logo": {"@type": "ImageObject", "url": "/logo.svg"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://alpineeducation.com/countries/germany"},
          "image": ["/og-image.jpg"],
          "datePublished": "2024-07-04"
        }
      `}</script>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-600 to-gray-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🇩🇪</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Study in Germany from Nepal</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Free or low-cost education, world-class engineering, and 18 months job search after graduation. Start your German journey with Alpine.
          </p>
          <Button size="lg" asChild className="bg-white text-yellow-700 hover:bg-gray-100">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-yellow-700 mb-1">400+</div>
            <div className="text-gray-600">Universities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700 mb-1">200+</div>
            <div className="text-gray-600">Nepalese Students Placed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700 mb-1">€0-1,500</div>
            <div className="text-gray-600">Tuition/semester</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">18 mo</div>
            <div className="text-gray-600">Job Search Visa</div>
          </div>
        </div>
      </section>

      {/* Tuition & Scholarships */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Tuition & Scholarships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Most public universities in Germany have no tuition fees or charge a small semester fee. Scholarships are available from DAAD, Erasmus+, and universities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-yellow-700 mb-2" />
                <CardTitle>Tuition Fees</CardTitle>
                <CardDescription>Undergraduate & Postgraduate</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Bachelor/Master: €0 - 1,500/semester (public)</li>
                  <li>Private: €5,000 - 20,000/year</li>
                  <li>Living: €11,208/year (approx.)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <GraduationCap className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Scholarships</CardTitle>
                <CardDescription>For Nepalese Students</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>DAAD, Erasmus+, university scholarships</li>
                  <li>Merit-based and need-based options</li>
                  <li>Alpine guidance for applications</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Visa Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Germany Student Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alpine provides end-to-end support for the German student visa. Our experts guide you through every step, from admission to visa grant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="w-8 h-8 text-yellow-700 mb-2" />
                <CardTitle>Step 1: Admission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Apply to universities and receive an admission letter.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Step 2: Blocked Account & Insurance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Open a blocked account, get health insurance, and prepare documents.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-purple-700 mb-2" />
                <CardTitle>Step 3: Visa Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Submit visa application, biometrics, and wait for decision.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work & Job Search Rights */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Part-Time Work & Job Search Visa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students can work up to 120 full days or 240 half days per year. After graduation, you can get an 18-month job search visa.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="w-8 h-8 text-yellow-700 mb-2" />
                <CardTitle>Part-Time Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>120 full days or 240 half days/year</li>
                  <li>Minimum wage: €12.41/hour</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Star className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Job Search Visa</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>18 months job search after graduation</li>
                  <li>Pathways to Blue Card/PR</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">FAQs: Study in Germany</h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-0 shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Study in Germany?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply now or book a free counseling session with Alpine's expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-yellow-700 hover:bg-gray-100">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-yellow-700">
              <Link href="/contact">Book Free Counseling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 