import {
  BookOpen,
  Award,
  FileText,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Test Preparation - Alpine Education & Visa Services",
  description:
    "Get expert coaching for IELTS, TOEFL, and PTE. Take free mock tests and boost your scores with Alpine Education.",
};

export default function TestPreparationPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Test Preparation</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Boost your scores with expert coaching, free mock tests, and
        personalized support for IELTS, TOEFL, and PTE. Join thousands of
        successful students who achieved their study abroad dreams with Alpine
        Education.
      </p>
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-t-4 border-blue-500">
          <BookOpen className="w-10 h-10 text-blue-600 mb-3" />
          <h2 className="font-semibold text-lg mb-2">IELTS</h2>
          <p className="text-gray-600 text-sm mb-4">
            Comprehensive IELTS preparation with practice tests, tips, and
            expert feedback.
          </p>
          <Link
            href="/test-preparation/ielts"
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            Learn More <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-t-4 border-green-500">
          <BookOpen className="w-10 h-10 text-green-600 mb-3" />
          <h2 className="font-semibold text-lg mb-2">TOEFL</h2>
          <p className="text-gray-600 text-sm mb-4">
            Personalized TOEFL coaching and resources to help you achieve your
            target score.
          </p>
          <Link
            href="/test-preparation/toefl"
            className="inline-flex items-center text-green-600 font-medium hover:underline"
          >
            Learn More <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-t-4 border-purple-500">
          <BookOpen className="w-10 h-10 text-purple-600 mb-3" />
          <h2 className="font-semibold text-lg mb-2">PTE</h2>
          <p className="text-gray-600 text-sm mb-4">
            Expert PTE preparation with mock tests, strategies, and score
            improvement plans.
          </p>
          <Link
            href="/test-preparation/pte"
            className="inline-flex items-center text-purple-600 font-medium hover:underline"
          >
            Learn More <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center mb-12">
        <h3 className="text-2xl font-bold mb-2">Take a Free Mock Test</h3>
        <p className="mb-4">
          Assess your readiness for IELTS, TOEFL, or PTE. Get instant feedback
          and personalized tips.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-50 transition-all"
        >
          <Link href="/mock-test">Start Mock Test</Link>
        </Button>
      </div>
      <div className="text-center">
        <h4 className="text-lg font-semibold mb-2">Need Guidance?</h4>
        <p className="text-gray-600 mb-4">
          Book a free consultation with our test prep experts and get a
          personalized study plan.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          <Link href="/contact">Book Free Consultation</Link>
        </Button>
      </div>
    </div>
  );
}
