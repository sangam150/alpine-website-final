"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  GraduationCap,
  DollarSign,
  MapPin,
  Users,
  Globe,
  BookOpen,
  Calendar,
  Award,
  Building,
  CheckCircle,
  ArrowRight,
  Star,
  MessageCircle,
  Phone,
  Download,
  Clock,
  Briefcase,
  Home,
  Utensils,
  Bus,
  Wifi,
} from "lucide-react";
import CountryPageCTA from "./StickyComparisonCTA";
import { CountryPage } from "@/types/cms";
import { getCountryBySlug } from "@/lib/content-management";

interface University {
  name: string;
  ranking: string;
  location: string;
  acceptanceRate: string;
  popularCourses: string[];
  tuition: string;
  logo?: string;
}

interface LivingCost {
  category: string;
  cost: string;
  details: string;
  icon: React.ReactNode;
}

interface CountryPageTemplateProps {
  slug: string;
}

export default function CountryPageTemplate({ slug }: CountryPageTemplateProps) {
  const [country, setCountry] = useState<CountryPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    async function fetchCountry() {
      setLoading(true);
      try {
        const data = await getCountryBySlug(slug);
        setCountry(data);
      } catch (e) {
        setError("Failed to load country data");
      } finally {
        setLoading(false);
      }
    }
    fetchCountry();
  }, [slug]);

  if (loading) return <div className="py-12 text-center text-gray-400">Loading country info...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!country) return <div className="py-12 text-center text-gray-400">No country data found.</div>;

  // Helper to get country code from name (for demo, map a few major countries)
  const countryCodeMap: Record<string, string> = {
    "Australia": "au",
    "Canada": "ca",
    "United Kingdom": "gb",
    "UK": "gb",
    "USA": "us",
    "United States": "us",
    "Germany": "de",
    "France": "fr",
    "Ireland": "ie",
    "Netherlands": "nl",
    "New Zealand": "nz",
    "Malta": "mt",
    "Spain": "es",
    "UAE": "ae",
  };
  const code = countryCodeMap[country.name] || country.flag?.split("/").pop()?.split(".")[0] || "";
  const flag1x1 = code ? `/flags/1x1/${code}.svg` : country.flag;
  const flag4x3 = code ? `/flags/4x3/${code}.svg` : country.flag;

  const livingCostIcons = {
    Accommodation: <Home className="h-4 w-4" />,
    Food: <Utensils className="h-4 w-4" />,
    Transportation: <Bus className="h-4 w-4" />,
    Utilities: <Wifi className="h-4 w-4" />,
    Entertainment: <Star className="h-4 w-4" />,
    "Books & Supplies": <BookOpen className="h-4 w-4" />,
  };

  return (
    <>
      <CountryPageCTA />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Hero Section */}
        <section
          className={`relative ${country.heroGradient} text-white py-20 overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Image
              src={flag4x3}
              alt={`${country.name} Flag`}
              width={200}
              height={150}
              className="opacity-20"
            />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src={flag1x1}
                    alt={`${country.name} Flag`}
                    width={40}
                    height={30}
                    className="mr-3"
                  />
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30"
                  >
                    Study Destination
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Study in {country.name}
                </h1>
                <p className="text-xl lg:text-2xl mb-8 opacity-90">
                  {country.description}
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {country.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    <Link href="/contact">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Free Consultation
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-900"
                  >
                    <Link href="/apply">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Apply Now
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-3xl font-bold">
                        {country.stats.universities}
                      </div>
                      <div className="opacity-80">Universities</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {country.stats.students}
                      </div>
                      <div className="opacity-80">Students</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {country.stats.ranking}
                      </div>
                      <div className="opacity-80">Global Ranking</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {country.stats.countries}
                      </div>
                      <div className="opacity-80">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={country.breadcrumbItems} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="universities">Universities</TabsTrigger>
              <TabsTrigger value="costs">Costs & Living</TabsTrigger>
              <TabsTrigger value="visa">Visa & Process</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Building className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {country.stats.universities}
                    </h3>
                    <p className="text-gray-600">Universities</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {country.stats.students}
                    </h3>
                    <p className="text-gray-600">International Students</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Award className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {country.stats.ranking}
                    </h3>
                    <p className="text-gray-600">Global Rankings</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Globe className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-900">
                      {country.stats.countries}
                    </h3>
                    <p className="text-gray-600">Countries Represented</p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      Tuition Fees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {country.tuition.min.toLocaleString()} -{" "}
                      {country.tuition.max.toLocaleString()}{" "}
                      {country.tuition.currency}
                    </div>
                    <p className="text-gray-600">Annual tuition fees</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-medium">{country.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Intakes</span>
                        <span className="font-medium">
                          {country.intakes.join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Work Rights</span>
                        <span className="font-medium">
                          {country.workRights}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      Visa Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-medium">Success Rate</span>
                      <div className="text-2xl font-bold text-blue-600">
                        {country.visa.successRate}%
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Processing Time</span>
                        <span className="font-medium">
                          {country.visa.processingTime}
                        </span>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href="/visa-checker">
                        Check Visa Requirements
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Universities Tab */}
            <TabsContent value="universities" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {country.universities.map((university: any, index: number) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{university.ranking}</Badge>
                        <Badge variant="outline">
                          {university.acceptanceRate}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {university.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        {university.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="font-medium text-gray-900">
                            Popular Courses
                          </div>
                          <div className="text-sm text-gray-600">
                            {university.popularCourses.join(", ")}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Tuition
                          </div>
                          <div className="text-sm text-gray-600">
                            {university.tuition}
                          </div>
                        </div>
                        <Button asChild size="sm" className="w-full">
                          <Link href="/contact">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Costs Tab */}
            <TabsContent value="costs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {country.livingCosts.map((cost: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {cost.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {cost.category}
                          </h3>
                          <p className="text-2xl font-bold text-blue-600">
                            {cost.cost}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{cost.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Visa Tab */}
            <TabsContent value="visa" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Visa Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Required Documents</h3>
                      <ul className="space-y-2">
                        {country.visa.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Process Timeline</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <div>
                            <div className="font-medium">
                              Application Submission
                            </div>
                            <div className="text-sm text-gray-600">
                              Week 1-2
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <div>
                            <div className="font-medium">Document Review</div>
                            <div className="text-sm text-gray-600">
                              Week 3-4
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <div>
                            <div className="font-medium">Visa Decision</div>
                            <div className="text-sm text-gray-600">
                              Week 5-8
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <CardContent className="p-0">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Study in {country.name}?
                </h2>
                <p className="text-xl mb-6 opacity-90">
                  Join thousands of students who have successfully achieved
                  their study abroad dreams with Alpine Education
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <Link href="/contact">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Book Free Consultation
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    <Link href="/apply">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Start Application
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
