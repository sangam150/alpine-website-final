import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { OrganizationStructuredData } from "@/components/layout/StructuredData";
import { getCountryBySlug } from "@/lib/content-management";
import type { CountryPage } from "@/types/cms";

interface CountryPageProps {
  params: { country: string };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = await getCountryBySlug(params.country);
  if (!country) {
    return {
      title: "Study Destination - Alpine Education",
      description: "Explore study opportunities and visa information.",
    };
  }
  return {
    title: `Study in ${country.name} - Alpine Education`,
    description:
      country.description ||
      `Study in ${country.name} with Alpine Education. Get visa guidance, university information, and tuition details.`,
    keywords: [
      `study in ${country.name}`,
      `${country.name} universities`,
      `${country.name} visa`,
      "study abroad",
      "international education",
    ],
    openGraph: {
      title: `Study in ${country.name} - Alpine Education`,
      description: country.description,
      url: `/study-in-${country.slug}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  // Optionally fetch all country slugs from Firestore for SSG
  return [
    { country: "uk" },
    { country: "australia" },
    { country: "canada" },
    { country: "usa" },
    { country: "germany" },
    { country: "france" },
    { country: "new-zealand" },
    { country: "norway" },
    { country: "sweden" },
    { country: "finland" },
    { country: "netherlands" },
    { country: "ireland" },
  ];
}

export default async function CountryPage({ params }: CountryPageProps) {
  const country = await getCountryBySlug(params.country);
  if (!country) notFound();

  const breadcrumbItems = [
    { label: "Study Destinations", href: "/countries" },
    { label: country.name, current: true },
  ];

  return (
    <>
      <OrganizationStructuredData />
      <div className="min-h-screen bg-gray-50 py-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{country.flag}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Study in {country.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {country.description}
            </p>
            {/* Download PDF Button */}
            <div className="mt-4 flex justify-center">
              <a
                href={`/blog-pdfs/${country.slug}-blog.html`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-base"
                aria-label={`Download ${country.name} Guide PDF`}
              >
                Download PDF
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tuition Fees
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {country.tuition?.min?.toLocaleString?.() || "-"} - {country.tuition?.max?.toLocaleString?.() || "-"} {country.tuition?.currency}
                </div>
                <p className="text-gray-600">Annual tuition fees</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Visa Information
              </h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Success Rate</span>
                  <div className="text-2xl font-bold text-blue-600">
                    {country.visaSuccess}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Time</span>
                    <span className="font-medium">
                      {country.visaRequirements?.[0] || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Universities</span>
                    <span className="font-medium">
                      {country.universities}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Courses Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Top Courses in {country.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(country.popularCourses || []).map((course: string) => (
                <div
                  key={course}
                  className="bg-white rounded-lg shadow p-4 text-center"
                >
                  <span className="text-lg font-semibold text-blue-700">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Why Choose {country.name}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(country.pros || []).map((pro: string) => (
                <div
                  key={pro}
                  className="bg-white rounded-lg shadow-lg p-6 text-center"
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-900">{pro}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Link href="/contact">Book Free Counselling</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
