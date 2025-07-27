"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  FileText,
  Globe,
  Users,
  BookOpen,
  Award,
  Star,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  Clock,
} from "lucide-react";
import { Service } from "@/types/cms";
import { getServices } from "@/lib/content-management";

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      try {
        const data = await getServices();
        setServices(data);
      } catch (e) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  if (loading) return <div className="py-12 text-center text-gray-400">Loading services...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!services.length) return <div className="py-12 text-center text-gray-400">No services found.</div>;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200 bg-opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 bg-opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 mr-2" />
            Comprehensive Services
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Your Complete Study Abroad Solution
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From initial counseling to visa approval, we provide end-to-end
            support for your study abroad journey. Our comprehensive services
            ensure your success at every step.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-500 ${
                  hoveredService === index ? "transform scale-105" : ""
                }`}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Enhanced Card */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="relative p-8">
                    {/* Enhanced Icon */}
                    <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {Icon ? <Icon className="h-8 w-8 text-blue-600" /> : <Award className="h-8 w-8 text-blue-600" />}
                    </div>

                    {/* Enhanced Content */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Enhanced Features */}
                      <div className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-start space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Price and CTA */}
                    <div className="border-t border-gray-100 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-gray-900">
                            {service.price}
                          </div>
                          {service.price !== "Free" &&
                            service.price !== "Free Consultation" && (
                              <div className="text-sm text-gray-500">
                                One-time payment
                              </div>
                            )}
                        </div>
                        <Button
                          size="sm"
                          className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -skew-x-12 -translate-x-full group-hover:translate-x-full"></div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
              </div>
            );
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Join thousands of successful students who have transformed their
                lives through international education. Get your free
                consultation today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="btn-gold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://wa.me/977144444444?text=Hi%20Alpine%20Education!%20I%20would%20like%20to%20book%20a%20free%20consultation%20session.",
                      "_blank",
                    )
                  }
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Consultation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Clock className="mr-2 h-5 w-5" />
                  Book Free Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
