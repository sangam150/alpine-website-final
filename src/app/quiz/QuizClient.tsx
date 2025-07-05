'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, CheckCircle, Download, Mail } from 'lucide-react';
import Link from 'next/link';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  category: string;
}

interface QuizResult {
  country: string;
  universities: string[];
  requirements: string[];
  timeline: string;
  estimatedCost: string;
  nextSteps: string[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is your preferred study destination?",
    options: ["Australia", "Canada", "United Kingdom", "United States", "Germany", "New Zealand"],
    category: "destination"
  },
  {
    id: 2,
    question: "What is your current academic level?",
    options: ["High School (12th grade)", "Bachelor's degree", "Master's degree", "PhD"],
    category: "academic"
  },
  {
    id: 3,
    question: "What field of study interests you most?",
    options: ["Engineering", "Business/Management", "Computer Science/IT", "Healthcare/Medicine", "Arts/Humanities", "Science"],
    category: "field"
  },
  {
    id: 4,
    question: "What is your budget range for tuition fees per year?",
    options: ["Under $15,000", "$15,000 - $25,000", "$25,000 - $35,000", "Over $35,000"],
    category: "budget"
  },
  {
    id: 5,
    question: "What is your English proficiency level?",
    options: ["Beginner (No IELTS/PTE)", "Intermediate (IELTS 5.5-6.0)", "Advanced (IELTS 6.5+)", "Native/Fluent"],
    category: "english"
  },
  {
    id: 6,
    question: "When do you plan to start your studies?",
    options: ["Within 6 months", "6-12 months", "1-2 years", "More than 2 years"],
    category: "timeline"
  }
];

const countryData = {
  "Australia": {
    universities: ["University of Melbourne", "University of Sydney", "Australian National University"],
    requirements: ["IELTS 6.5+", "Academic transcripts", "Personal statement", "Financial documents"],
    timeline: "6-8 months",
    estimatedCost: "AUD 25,000-35,000/year",
    nextSteps: ["Take IELTS/PTE", "Prepare documents", "Apply for universities", "Apply for student visa"]
  },
  "Canada": {
    universities: ["University of Toronto", "University of British Columbia", "McGill University"],
    requirements: ["IELTS 6.5+", "Academic transcripts", "Statement of purpose", "Financial proof"],
    timeline: "8-10 months",
    estimatedCost: "CAD 25,000-35,000/year",
    nextSteps: ["Take IELTS/PTE", "Prepare documents", "Apply for universities", "Apply for study permit"]
  },
  "United Kingdom": {
    universities: ["University of Oxford", "University of Cambridge", "Imperial College London"],
    requirements: ["IELTS 6.5+", "Academic transcripts", "Personal statement", "Financial documents"],
    timeline: "6-8 months",
    estimatedCost: "£20,000-30,000/year",
    nextSteps: ["Take IELTS/PTE", "Prepare documents", "Apply through UCAS", "Apply for student visa"]
  },
  "United States": {
    universities: ["Harvard University", "Stanford University", "MIT"],
    requirements: ["TOEFL/IELTS", "SAT/GRE scores", "Academic transcripts", "Financial documents"],
    timeline: "12-18 months",
    estimatedCost: "USD 40,000-60,000/year",
    nextSteps: ["Take TOEFL/IELTS", "Prepare for SAT/GRE", "Apply to universities", "Apply for F-1 visa"]
  },
  "Germany": {
    universities: ["Technical University of Munich", "Heidelberg University", "Ludwig Maximilian University"],
    requirements: ["German language (B2)", "Academic transcripts", "Motivation letter", "Financial proof"],
    timeline: "8-12 months",
    estimatedCost: "€0-1,500/semester",
    nextSteps: ["Learn German", "Prepare documents", "Apply to universities", "Apply for student visa"]
  },
  "New Zealand": {
    universities: ["University of Auckland", "University of Otago", "Victoria University of Wellington"],
    requirements: ["IELTS 6.5+", "Academic transcripts", "Personal statement", "Financial documents"],
    timeline: "6-8 months",
    estimatedCost: "NZD 25,000-35,000/year",
    nextSteps: ["Take IELTS/PTE", "Prepare documents", "Apply for universities", "Apply for student visa"]
  }
};

export default function QuizClient() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [email, setEmail] = useState('');

  const handleAnswer = (answer: string) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.category]: answer }));
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRecommendation = (): QuizResult => {
    const destination = answers.destination || "Australia";
    const data = countryData[destination as keyof typeof countryData];
    return {
      country: destination,
      ...data
    };
  };

  const generatePDF = async () => {
    if (!email) return;
    setIsGeneratingPDF(true);
    try {
      const recommendation = getRecommendation();
      const response = await fetch('/api/generate-handbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, recommendation, answers }),
      });
      if (response.ok) {
        alert('Your personalized handbook has been sent to your email!');
      } else {
        alert('Failed to generate handbook. Please try again.');
      }
    } catch (error) {
      alert('Error generating handbook. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const recommendation = getRecommendation();
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Your Personalized Study Abroad Plan
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Recommended Destination</CardTitle>
                <CardDescription>
                  Based on your preferences, here's your personalized plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-blue-600 mb-2">{recommendation.country}</h2>
                  <p className="text-gray-600">Your ideal study destination</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Recommended Universities</h3>
                  <ul className="space-y-2">
                    {recommendation.universities.map((uni, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{uni}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {recommendation.requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Estimated Timeline</h3>
                  <p className="text-gray-700">{recommendation.timeline}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Estimated Cost</h3>
                  <p className="text-gray-700">{recommendation.estimatedCost}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Next Steps</h3>
                  <ul className="space-y-2">
                    {recommendation.nextSteps.map((step, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Get Your Personalized Handbook</CardTitle>
                <CardDescription>
                  Enter your email to receive a PDF handbook with your results and next steps.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={e => { e.preventDefault(); generatePDF(); }} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isGeneratingPDF} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    {isGeneratingPDF ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Handbook
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Study Abroad Assessment Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Answer a few questions to get your personalized study abroad plan.
          </p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2 rounded-full bg-blue-100" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full text-left px-6 py-4 rounded-lg border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 