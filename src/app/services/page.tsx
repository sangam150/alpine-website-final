import { Button } from "@/components/ui/button";
import {
  FaUserGraduate,
  FaUniversity,
  FaPassport,
  FaBookOpen,
  FaMoneyCheckAlt,
  FaPlaneDeparture,
} from "react-icons/fa";

export const metadata = {
  title: "Our Services - Alpine Education & Visa Services",
  description:
    "Explore the full range of services offered by Alpine Education & Visa Services: study abroad counseling, visa assistance, test preparation, and more.",
};

export default function ServicesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center">
        Our Services
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Alpine Education & Visa Services offers comprehensive support for your
        international education journey:
      </p>
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {/* Personalized Counseling */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaUserGraduate
              className="text-blue-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">Personalized Counseling</h2>
              <p className="text-gray-600 text-sm">
                Tailored study abroad guidance for your goals.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Personalized Counseling"
          >
            Learn More
          </a>
        </div>
        {/* University & Course Selection */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaUniversity
              className="text-green-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">
                University & Course Selection
              </h2>
              <p className="text-gray-600 text-sm">
                Expert help choosing the right institution and program.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about University & Course Selection"
          >
            Learn More
          </a>
        </div>
        {/* Visa Application Guidance */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaPassport
              className="text-purple-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">
                Visa Application Guidance
              </h2>
              <p className="text-gray-600 text-sm">
                Step-by-step support for your student visa process.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Visa Application Guidance"
          >
            Learn More
          </a>
        </div>
        {/* Test Preparation */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaBookOpen
              className="text-yellow-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">Test Preparation</h2>
              <p className="text-gray-600 text-sm">
                IELTS, TOEFL, PTE coaching to boost your scores.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Test Preparation"
          >
            Learn More
          </a>
        </div>
        {/* Scholarship & Financial Aid */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaMoneyCheckAlt
              className="text-pink-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">
                Scholarship & Financial Aid
              </h2>
              <p className="text-gray-600 text-sm">
                Advice on scholarships and funding opportunities.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Scholarship & Financial Aid"
          >
            Learn More
          </a>
        </div>
        {/* Pre-departure Orientation */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaPlaneDeparture
              className="text-indigo-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">
                Pre-departure Orientation
              </h2>
              <p className="text-gray-600 text-sm">
                Get ready for your new life abroad with our expert tips.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Pre-departure Orientation"
          >
            Learn More
          </a>
        </div>
        {/* SOP Writing */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaBookOpen
              className="text-purple-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">SOP Writing</h2>
              <p className="text-gray-600 text-sm">
                Professional Statement of Purpose writing and review.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about SOP Writing"
          >
            Learn More
          </a>
        </div>
        {/* Profile Evaluation */}
        <div className="flex flex-col h-full bg-white rounded-lg shadow p-4">
          <div className="flex items-start gap-4 mb-2">
            <FaUserGraduate
              className="text-green-600 text-2xl mt-1"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-semibold text-lg">Profile Evaluation</h2>
              <p className="text-gray-600 text-sm">
                Comprehensive assessment to maximize your admission chances.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="mt-auto text-blue-600 font-medium hover:underline text-sm"
            aria-label="Learn more about Profile Evaluation"
          >
            Learn More
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild size="lg" className="text-lg px-8 py-4">
          <a href="/contact" aria-label="Book a Free Consultation">
            Book a Free Consultation
          </a>
        </Button>
      </div>
    </div>
  );
}
