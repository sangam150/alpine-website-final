import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, DollarSign, FileText, Users, BookOpen, Star, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study in Australia from Nepal - Tuition, Scholarships, Visa, PSW | Alpine Education',
  description: 'Study in Australia from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PSW, and FAQs. Apply now for top Australian universities.',
  keywords: ['Study in Australia', 'Australia student visa', 'Australia scholarships', 'Australia PSW', 'Australia from Nepal', 'Alpine Education'],
  alternates: { canonical: '/countries/australia' },
  openGraph: {
    title: 'Study in Australia from Nepal - Tuition, Scholarships, Visa, PSW | Alpine Education',
    description: 'Study in Australia from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PSW, and FAQs. Apply now for top Australian universities.',
    url: 'https://alpineeducation.com/countries/australia',
    images: ['/og-image.jpg'],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Study in Australia from Nepal - Tuition, Scholarships, Visa, PSW | Alpine Education',
    description: 'Study in Australia from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PSW, and FAQs. Apply now for top Australian universities.',
    images: ['/og-image.jpg'],
  },
};

const faqs = [
  {
    q: 'What are the tuition fees for international students in Australia?',
    a: 'Tuition fees range from AUD 20,000 to 45,000 per year depending on the course and university.'
  },
  {
    q: 'What scholarships are available for Nepalese students?',
    a: 'Many universities offer merit-based scholarships covering 10%-100% of tuition. Government and private scholarships are also available.'
  },
  {
    q: 'What is the student visa process for Australia?',
    a: 'The process includes university offer, GTE assessment, financials, health check, and visa application (subclass 500). Alpine provides full support.'
  },
  {
    q: 'Can I work part-time as a student in Australia?',
    a: 'Yes, you can work up to 48 hours per fortnight during study and full-time during breaks.'
  },
  {
    q: 'What is the Post-Study Work (PSW) right in Australia?',
    a: 'Graduates can get 2-6 years of PSW depending on qualification and location.'
  },
];

export default function AustraliaPage() {
  return (
    <div className="min-h-screen">
      {/* Schema.org Article markup */}
      <script type="application/ld+json" suppressHydrationWarning>{`
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Study in Australia from Nepal - Tuition, Scholarships, Visa, PSW | Alpine Education",
          "description": "Study in Australia from Nepal with Alpine Education. Get details on tuition fees, scholarships, visa process, part-time work, PSW, and FAQs. Apply now for top Australian universities.",
          "author": {"@type": "Organization", "name": "Alpine Education & Visa Services"},
          "publisher": {"@type": "Organization", "name": "Alpine Education & Visa Services", "logo": {"@type": "ImageObject", "url": "/logo.svg"}},
          "mainEntityOfPage": {"@type": "WebPage", "@id": "https://alpineeducation.com/countries/australia"},
          "image": ["/og-image.jpg"],
          "datePublished": "2024-07-04"
        }
      `}</script>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🇦🇺</span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Study in Australia from Nepal</h1>
          <p className="text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
            World-class education, generous scholarships, and up to 6 years post-study work rights. Start your Australian journey with Alpine.
          </p>
          <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-gray-100">
            <Link href="/apply">Apply Now</Link>
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-700 mb-1">43+</div>
            <div className="text-gray-600">Universities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-700 mb-1">500+</div>
            <div className="text-gray-600">Nepalese Students Placed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-700 mb-1">AUD 20k-45k</div>
            <div className="text-gray-600">Tuition/year</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600 mb-1">2-6 yrs</div>
            <div className="text-gray-600">Post-Study Work</div>
          </div>
        </div>
      </section>

      {/* Tuition & Scholarships */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Tuition & Scholarships</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tuition fees in Australia range from AUD 20,000 to 45,000 per year. Many universities offer generous scholarships for Nepalese students based on academic merit, leadership, and extracurriculars. Some scholarships cover up to 100% of tuition.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Tuition Fees</CardTitle>
                <CardDescription>Undergraduate & Postgraduate</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Bachelor: AUD 20,000 - 35,000/year</li>
                  <li>Master: AUD 22,000 - 45,000/year</li>
                  <li>Living: AUD 21,000/year (approx.)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <GraduationCap className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Scholarships</CardTitle>
                <CardDescription>For Nepalese Students</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Merit-based scholarships (10%-100%)</li>
                  <li>Government & university scholarships</li>
                  <li>Early-bird and regional scholarships</li>
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
            <h2 className="text-3xl font-bold mb-2">Australia Student Visa Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Alpine provides end-to-end support for the Australian student visa (subclass 500). Our experts guide you through every step, from offer letter to visa grant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Step 1: Offer Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Apply to universities and receive a Confirmation of Enrollment (CoE).</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Step 2: GTE & Financials</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Prepare Genuine Temporary Entrant (GTE) statement and show required funds.</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle>Step 3: Visa Application</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Submit visa application, health check, and biometrics. Wait for decision.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work & PSW Rights */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Part-Time Work & Post-Study Work (PSW)</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Students can work up to 48 hours per fortnight during study and full-time during breaks. After graduation, PSW rights allow 2-6 years of work depending on your degree and location.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Part-Time Work</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>48 hours/fortnight during study</li>
                  <li>Full-time during breaks</li>
                  <li>Minimum wage: AUD 23.23/hour</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Star className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle>Post-Study Work (PSW)</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>2-6 years PSW after graduation</li>
                  <li>Extra 1-2 years for regional study</li>
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
            <h2 className="text-3xl font-bold mb-2">FAQs: Study in Australia</h2>
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
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Study in Australia?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Apply now or book a free counseling session with Alpine&apos;s expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-gray-100">
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-blue-700">
              <Link href="/contact">Book Free Counseling</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 