import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, DollarSign, FileText, Users, BookOpen, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study in Canada from Nepal - Tuition, Scholarships, Visa, PGWP | Alpine Education',
  description: 'Study in Canada from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PGWP, and FAQs. Apply now for top Canadian universities.',
  keywords: ['Study in Canada', 'Canada student visa', 'Canada scholarships', 'Canada PGWP', 'Canada from Nepal', 'Alpine Education'],
  alternates: { canonical: '/countries/canada' },
  openGraph: {
    title: 'Study in Canada from Nepal - Tuition, Scholarships, Visa, PGWP | Alpine Education',
    description: 'Study in Canada from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PGWP, and FAQs. Apply now for top Canadian universities.',
    url: 'https://alpineeducation.com/countries/canada',
    images: ['/og-image.jpg'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Canada from Nepal - Tuition, Scholarships, Visa, PGWP | Alpine Education',
    description: 'Study in Canada from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PGWP, and FAQs. Apply now for top Canadian universities.',
    images: ['/og-image.jpg'],
  },
};

const faqs = [
  {
    q: 'What are the tuition fees for international students in Canada?',
    a: 'Tuition fees range from CAD 20,000 to 40,000 per year depending on the course and university.'
  },
  {
    q: 'What scholarships are available for Nepalese students?',
    a: 'Canadian universities offer merit-based and need-based scholarships. Government and private scholarships are also available.'
  },
  {
    q: 'What is the student visa process for Canada?',
    a: 'The process includes university offer, GIC, medical, and visa application (SDS/Non-SDS). Alpine provides full support.'
  },
  {
    q: 'Can I work part-time as a student in Canada?',
    a: 'Yes, you can work up to 20 hours per week during study and full-time during breaks.'
  },
  {
    q: 'What is the Post-Graduation Work Permit (PGWP) in Canada?',
    a: 'Graduates can get up to 3 years of PGWP after completing their studies.'
  },
];

export default function CanadaPage() {
  return (
    <div className="min-h-screen">
      {/* Schema.org Article markup */}
      <script type="application/ld+json" suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Study in Canada from Nepal - Tuition, Scholarships, Visa, PGWP | Alpine Education",
          "description": "Study in Canada from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PGWP, and FAQs. Apply now for top Canadian universities.",
          "author": {"@type": "Organization", "name": "Alpine Education & Visa Services"},
          "publisher": {"@type": "Organization", "name": "Alpine Education & Visa Services", "logo": {"@type": "ImageObject", "url": "/logo.svg"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://alpineeducation.com/countries/canada"},
          "image": ["/og-image.jpg"],
          "datePublished": "2024-07-04"
        }
      `}</script>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 via-red-500 to-blue-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🇨🇦</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Study in Canada from Nepal</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            Affordable education, high quality of life, and up to 3 years PGWP. Start your Canadian journey with Alpine.
          </p>
          <Button size="lg" asChild className="bg-white text-red-700 hover:bg-gray-100">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-red-700 mb-1">97</div>
            <div className="text-gray-600">Universities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700 mb-1">300+</div>
            <div className="text-gray-600">Nepalese Students Placed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700 mb-1">CAD 20k-40k</div>
            <div className="text-gray-600">Tuition/year</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">Up to 3 yrs</div>
            <div className="text-gray-600">PGWP</div>
          </div>
        </div>
      </section>

      {/* Tuition & Scholarships */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Tuition & Scholarships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tuition fees in Canada range from CAD 20,000 to 40,000 per year. Scholarships are available from the Canadian government, universities, and private organizations. Alpine helps you apply for merit-based and need-based awards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-red-700 mb-2" />
                <CardTitle>Tuition Fees</CardTitle>
                <CardDescription>Undergraduate & Postgraduate</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Bachelor: CAD 20,000 - 35,000/year</li>
                  <li>Master: CAD 22,000 - 40,000/year</li>
                  <li>Living: CAD 15,000/year (approx.)</li>
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
                  <li>Merit-based and need-based scholarships</li>
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
            <h2 className="text-3xl font-bold mb-2">Canada Student Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alpine provides end-to-end support for the Canadian student visa (SDS/Non-SDS). Our experts guide you through every step, from offer letter to visa grant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="w-8 h-8 text-red-700 mb-2" />
                <CardTitle>Step 1: Offer Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Apply to universities and receive a Letter of Acceptance (LOA).</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Step 2: GIC & Medical</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Purchase a GIC, complete medical, and prepare financials.</p>
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

      {/* Work & PGWP Rights */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Part-Time Work & Post-Graduation Work Permit (PGWP)</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students can work up to 20 hours per week during study and full-time during breaks. After graduation, PGWP allows up to 3 years of work.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="w-8 h-8 text-red-700 mb-2" />
                <CardTitle>Part-Time Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>20 hours/week during study</li>
                  <li>Full-time during breaks</li>
                  <li>Minimum wage: CAD 16.65/hour</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Star className="w-8 h-8 text-green-700 mb-2" />
                <CardTitle>Post-Graduation Work Permit (PGWP)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Up to 3 years PGWP after graduation</li>
                  <li>Pathways to PR for skilled graduates</li>
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
            <h2 className="text-3xl font-bold mb-2">FAQs: Study in Canada</h2>
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
      <section className="py-16 bg-gradient-to-r from-red-700 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Study in Canada?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply now or book a free counseling session with Alpine&apos;s expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-red-700 hover:bg-gray-100">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-red-700">
              <Link href="/contact">Book Free Counseling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 