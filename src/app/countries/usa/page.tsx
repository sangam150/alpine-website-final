import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, GraduationCap, DollarSign, FileText, Users, BookOpen, CheckCircle, Globe, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study in USA from Nepal - Tuition, Scholarships, Visa, OPT | Alpine Education',
  description: 'Study in USA from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, OPT, and FAQs. Apply now for top US universities.',
  keywords: ['Study in USA', 'USA student visa', 'USA scholarships', 'USA OPT', 'USA from Nepal', 'Alpine Education'],
  alternates: { canonical: '/countries/usa' },
  openGraph: {
    title: 'Study in USA from Nepal - Tuition, Scholarships, Visa, OPT | Alpine Education',
    description: 'Study in USA from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, OPT, and FAQs. Apply now for top US universities.',
    url: 'https://alpineeducation.com/countries/usa',
    images: ['/og-image.jpg'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in USA from Nepal - Tuition, Scholarships, Visa, OPT | Alpine Education',
    description: 'Study in USA from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, OPT, and FAQs. Apply now for top US universities.',
    images: ['/og-image.jpg'],
  },
};

const faqs = [
  {
    q: 'What are the tuition fees for international students in the USA?',
    a: 'Tuition fees range from USD 25,000 to 60,000 per year depending on the course and university.'
  },
  {
    q: 'What scholarships are available for Nepalese students?',
    a: 'US universities offer merit-based, need-based, and athletic scholarships. Government and private scholarships are also available.'
  },
  {
    q: 'What is the student visa process for the USA?',
    a: 'The process includes university offer, I-20, SEVIS fee, visa interview, and F-1 visa application. Alpine provides full support.'
  },
  {
    q: 'Can I work part-time as a student in the USA?',
    a: 'Yes, you can work up to 20 hours per week on campus during study and full-time during breaks.'
  },
  {
    q: 'What is OPT and STEM OPT in the USA?',
    a: 'Graduates can get 1 year of OPT and an additional 2 years for STEM degrees.'
  },
];

export default function USAPage() {
  return (
    <div className="min-h-screen">
      {/* Schema.org Article markup */}
      <script type="application/ld+json" suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Study in USA from Nepal - Tuition, Scholarships, Visa, OPT | Alpine Education",
          "description": "Study in USA from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, OPT, and FAQs. Apply now for top US universities.",
          "author": {"@type": "Organization", "name": "Alpine Education & Visa Services"},
          "publisher": {"@type": "Organization", "name": "Alpine Education & Visa Services", "logo": {"@type": "ImageObject", "url": "/logo.svg"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://alpineeducation.com/countries/usa"},
          "image": ["/og-image.jpg"],
          "datePublished": "2024-07-04"
        }
      `}</script>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-red-700 to-blue-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🇺🇸</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Study in USA from Nepal</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Top-ranked universities, diverse programs, and up to 3 years OPT for STEM. Start your US journey with Alpine.
          </p>
          <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-900 mb-1">4,000+</div>
            <div className="text-gray-600">Universities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700 mb-1">250+</div>
            <div className="text-gray-600">Nepalese Students Placed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700 mb-1">USD 25k-60k</div>
            <div className="text-gray-600">Tuition/year</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">Up to 3 yrs</div>
            <div className="text-gray-600">OPT (STEM)</div>
          </div>
        </div>
      </section>

      {/* Tuition & Scholarships */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Tuition & Scholarships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tuition fees in the USA range from USD 25,000 to 60,000 per year. Scholarships are available from US universities, government, and private organizations. Alpine helps you apply for merit-based, need-based, and athletic awards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-blue-900 mb-2" />
                <CardTitle>Tuition Fees</CardTitle>
                <CardDescription>Undergraduate & Postgraduate</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Bachelor: USD 25,000 - 45,000/year</li>
                  <li>Master: USD 30,000 - 60,000/year</li>
                  <li>Living: USD 15,000/year (approx.)</li>
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
                  <li>Merit-based, need-based, athletic scholarships</li>
                  <li>Government & university scholarships</li>
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
            <h2 className="text-3xl font-bold mb-2">USA Student Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alpine provides end-to-end support for the US F-1 student visa. Our experts guide you through every step, from I-20 to visa grant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="w-8 h-8 text-blue-900 mb-2" />
                <CardTitle>Step 1: Offer & I-20</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Apply to universities, receive an offer, and get your I-20 form.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Step 2: SEVIS & Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Pay SEVIS fee, prepare financials, and complete DS-160.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-purple-700 mb-2" />
                <CardTitle>Step 3: Visa Interview</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Attend visa interview and receive F-1 visa.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work & OPT Rights */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Part-Time Work & OPT</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students can work up to 20 hours per week on campus during study and full-time during breaks. After graduation, OPT allows 1 year of work, with an additional 2 years for STEM graduates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-900 mb-2" />
                <CardTitle>Part-Time Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>20 hours/week on campus during study</li>
                  <li>Full-time during breaks</li>
                  <li>Minimum wage: USD 7.25/hour (varies by state)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Star className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>OPT & STEM OPT</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>1 year OPT after graduation</li>
                  <li>2 additional years for STEM degrees</li>
                  <li>Pathways to H-1B and Green Card</li>
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
            <h2 className="text-3xl font-bold mb-2">FAQs: Study in USA</h2>
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
      <section className="py-16 bg-gradient-to-r from-blue-900 to-red-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Study in the USA?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply now or book a free counseling session with Alpine's expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-900">
              <Link href="/contact">Book Free Counseling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 