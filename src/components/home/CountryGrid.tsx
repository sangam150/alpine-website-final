"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  GraduationCap,
  DollarSign,
  Briefcase,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllCountries, Country } from "@/lib/content-management";

export default function CountryGrid() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      const data = await getAllCountries();
      setCountries(data);
      setLoading(false);
    }
    fetchCountries();
  }, []);

  const getPdfUrl = (countryName: string) => {
    const slug = countryName.toLowerCase().replace(/ /g, "-");
    return `/blog-pdfs/${slug}-blog.html`;
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular Study Destinations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
            Choose from our top destinations with high visa success rates and
            excellent opportunities
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400 py-8 text-center">Loading countries...</div>
        ) : countries.length === 0 ? (
          <div className="text-gray-400 py-8 text-center">No countries found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {countries.map((country) => (
              <Card
                key={country.id}
                className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 shadow-lg bg-white"
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Flag and Country Name */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Image
                        src={country.flag}
                        alt={`${country.name} flag`}
                        width={32}
                        height={32}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-sm shadow-sm flex-shrink-0"
                      />
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                        {country.name}
                      </h3>
                    </div>
                    {/* Popularity stars (optional, fallback to 4) */}
                    <div className="flex items-center">
                      {[...Array((country as any).popularity || 4)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {country.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <GraduationCap className="w-2 h-2 sm:w-3 sm:h-3 text-blue-600" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900">
                        {country.visaSuccess}
                      </div>
                      <div className="text-xs text-gray-500">Visa Rate</div>
                    </div>

                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <DollarSign className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900">
                        {country.avgTuition}
                      </div>
                      <div className="text-xs text-gray-500">Tuition</div>
                    </div>

                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Briefcase className="w-2 h-2 sm:w-3 sm:h-3 text-purple-600" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900">
                        {country.duration}
                      </div>
                      <div className="text-xs text-gray-500">Work Visa</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href={`/countries/${country.slug}`}
                      className="inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 group-hover:shadow-md text-sm sm:text-base"
                    >
                      <span className="line-clamp-1">Explore {country.name}</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </Link>
                    <a
                      href={getPdfUrl(country.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-all duration-300 text-sm sm:text-base"
                      aria-label={`Download ${country.name} Guide PDF`}
                    >
                      Download PDF
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Countries CTA */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/countries"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Explore All Countries
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
