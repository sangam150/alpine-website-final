import {
  GraduationCap,
  FileText,
  Award,
  MessageCircle,
  ArrowRight,
  Users,
  Globe,
  Shield,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Student Services - Alpine Education & Visa Services",
  description:
    "Explore all student services: counseling, visa guidance, SOP help, scholarships, and more. Get expert support for your study abroad journey.",
};

const services = [
  {
    icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
    title: "Personalized Counseling",
    desc: "One-on-one guidance to choose the right country, university, and course for your goals.",
    href: "/contact",
    features: ["Career assessment", "Free consultation", "Profile evaluation"],
  },
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: "Visa Guidance",
    desc: "Step-by-step support for your student visa application and documentation.",
    href: "/contact",
    features: ["Visa checklist", "Document review", "Interview prep"],
  },
  {
    icon: <FileText className="h-8 w-8 text-purple-600" />,
    title: "SOP & Document Help",
    desc: "Expert SOP writing, LOR preparation, and document support for your applications.",
    href: "/student-services#sop-writing",
    features: ["SOP writing", "LOR prep", "Document review"],
  },
  {
    icon: <Award className="h-8 w-8 text-orange-600" />,
    title: "Scholarships & Aid",
    desc: "Advice on scholarships, financial aid, and funding opportunities.",
    href: "/contact",
    features: ["Scholarship search", "Application help", "Financial planning"],
  },
];

export default function StudentServicesPage() {
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Student Services</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Comprehensive support for every step of your study abroad journey. Our
        expert team is here to help you succeed.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
          >
            <div className="mb-4 p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full w-16 h-16 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <div className="text-xl font-semibold text-gray-900 mb-3">
              {service.title}
            </div>
            <div className="text-gray-600 mb-4 leading-relaxed text-sm">
              {service.desc}
            </div>
            <div className="mb-4">
              {service.features.map((feature, index) => (
                <div
                  key={index}
                  className="text-xs text-gray-500 mb-1 flex items-center justify-center"
                >
                  <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
            <Link
              href={service.href}
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors"
            >
              Learn More
              <MessageCircle className="w-4 h-4 ml-1" />
            </Link>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-12">
        <h3 className="text-2xl font-bold mb-2">Book a Free Consultation</h3>
        <p className="mb-4">
          Get personalized guidance for your study abroad plans. Our counselors
          are ready to help you succeed.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all"
        >
          <Link href="/contact">Book Now</Link>
        </Button>
      </div>
    </div>
  );
}
