"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Target,
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
  MapPin,
  Star,
  AlertCircle
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    countries: string[];
    weight: number;
  }[];
}

interface QuizResult {
  country: string;
  score: number;
  description: string;
  pros: string[];
  cons: string[];
  requirements: {
    ielts: string;
    tuition: string;
    livingCost: string;
    workRights: string;
  };
  universities: string[];
  nextSteps: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your preferred study level?",
    options: [
      { text: "Bachelor's Degree", countries: ["Canada", "Australia", "UK", "USA"], weight: 1 },
      { text: "Master's Degree", countries: ["Canada", "Australia", "UK", "Germany"], weight: 1 },
      { text: "PhD/Research", countries: ["Canada", "Germany", "Australia", "UK"], weight: 1 },
      { text: "Diploma/Certificate", countries: ["Canada", "Australia", "New Zealand"], weight: 1 }
    ]
  },
  {
    id: 2,
    question: "What is your budget for tuition fees per year?",
    options: [
      { text: "Under $15,000 CAD", countries: ["Canada", "Germany"], weight: 2 },
      { text: "$15,000 - $25,000 CAD", countries: ["Canada", "Australia", "New Zealand"], weight: 1 },
      { text: "$25,000 - $35,000 CAD", countries: ["Australia", "UK", "Canada"], weight: 1 },
      { text: "Over $35,000 CAD", countries: ["USA", "UK", "Australia"], weight: 1 }
    ]
  },
  {
    id: 3,
    question: "How important is post-study work opportunities?",
    options: [
      { text: "Very Important - I want to work after graduation", countries: ["Canada", "Australia", "New Zealand"], weight: 3 },
      { text: "Somewhat Important", countries: ["UK", "Germany", "Canada"], weight: 2 },
      { text: "Not Very Important", countries: ["USA", "UK"], weight: 1 },
      { text: "I plan to return home immediately", countries: ["Germany", "UK", "USA"], weight: 1 }
    ]
  },
  {
    id: 4,
    question: "What is your English proficiency level?",
    options: [
      { text: "Advanced (IELTS 7.0+)", countries: ["UK", "Australia", "Canada", "USA"], weight: 1 },
      { text: "Good (IELTS 6.0-6.5)", countries: ["Canada", "Australia", "New Zealand"], weight: 2 },
      { text: "Intermediate (IELTS 5.5-6.0)", countries: ["Canada", "Germany"], weight: 2 },
      { text: "Beginner (IELTS 5.0 or below)", countries: ["Germany", "Canada"], weight: 3 }
    ]
  },
  {
    id: 5,
    question: "What type of environment do you prefer?",
    options: [
      { text: "Large, diverse cities", countries: ["Canada", "Australia", "UK", "USA"], weight: 1 },
      { text: "Medium-sized cities", countries: ["Canada", "Australia", "New Zealand"], weight: 2 },
      { text: "Small towns/universities", countries: ["Canada", "Germany", "New Zealand"], weight: 2 },
      { text: "Rural/outdoor lifestyle", countries: ["Canada", "Australia", "New Zealand"], weight: 3 }
    ]
  },
  {
    id: 6,
    question: "How important is the cost of living?",
    options: [
      { text: "Very Important - I need affordable living", countries: ["Canada", "Germany"], weight: 3 },
      { text: "Somewhat Important", countries: ["Australia", "New Zealand"], weight: 2 },
      { text: "Not Very Important", countries: ["UK", "USA"], weight: 1 },
      { text: "I can afford higher costs", countries: ["USA", "UK", "Australia"], weight: 1 }
    ]
  },
  {
    id: 7,
    question: "What is your field of study?",
    options: [
      { text: "Engineering/Technology", countries: ["Canada", "Germany", "Australia"], weight: 2 },
      { text: "Business/Management", countries: ["UK", "Canada", "Australia"], weight: 1 },
      { text: "Healthcare/Medicine", countries: ["Canada", "Australia", "UK"], weight: 2 },
      { text: "Arts/Humanities", countries: ["UK", "Canada", "Australia"], weight: 1 }
    ]
  },
  {
    id: 8,
    question: "How long do you plan to stay after graduation?",
    options: [
      { text: "Permanently - I want to immigrate", countries: ["Canada", "Australia", "New Zealand"], weight: 3 },
      { text: "2-3 years to gain experience", countries: ["Canada", "Australia", "UK"], weight: 2 },
      { text: "1 year or less", countries: ["UK", "Germany", "USA"], weight: 1 },
      { text: "Return immediately", countries: ["Germany", "UK", "USA"], weight: 1 }
    ]
  }
];

const countryData: Record<string, QuizResult> = {
  "Canada": {
    country: "Canada",
    score: 0,
    description: "Canada offers excellent education quality, affordable tuition, and generous post-study work opportunities. With a welcoming environment and strong immigration pathways, it's ideal for students seeking long-term opportunities.",
    pros: [
      "Affordable tuition fees",
      "Generous post-study work permits (up to 3 years)",
      "Strong immigration pathways",
      "High quality of life",
      "Multicultural environment"
    ],
    cons: [
      "Cold winters in most regions",
      "Higher cost of living in major cities",
      "Competitive admission for top programs"
    ],
    requirements: {
      ielts: "6.0-6.5 (varies by program)",
      tuition: "$15,000-$30,000 CAD/year",
      livingCost: "$12,000-$20,000 CAD/year",
      workRights: "Up to 3 years post-graduation"
    },
    universities: [
      "University of Toronto",
      "University of British Columbia",
      "McGill University",
      "University of Waterloo"
    ],
    nextSteps: [
      "Research specific programs and universities",
      "Prepare IELTS/PTE scores",
      "Gather required documents",
      "Apply for study permit",
      "Book accommodation and flights"
    ]
  },
  "Australia": {
    country: "Australia",
    score: 0,
    description: "Australia combines world-class education with an amazing lifestyle. With beautiful weather, diverse cities, and strong post-study work options, it's perfect for students who want quality education and life experience.",
    pros: [
      "Beautiful weather and lifestyle",
      "Strong post-study work opportunities",
      "High quality education",
      "Diverse and welcoming culture",
      "English-speaking environment"
    ],
    cons: [
      "Higher tuition fees",
      "Expensive cost of living",
      "Distance from home country"
    ],
    requirements: {
      ielts: "6.0-6.5 (varies by program)",
      tuition: "$20,000-$35,000 AUD/year",
      livingCost: "$18,000-$25,000 AUD/year",
      workRights: "Up to 4 years post-graduation"
    },
    universities: [
      "University of Melbourne",
      "University of Sydney",
      "Australian National University",
      "University of Queensland"
    ],
    nextSteps: [
      "Choose your preferred city and university",
      "Prepare English test scores",
      "Apply for student visa",
      "Arrange accommodation",
      "Plan your arrival"
    ]
  },
  "UK": {
    country: "UK",
    score: 0,
    description: "The UK offers prestigious universities with rich academic traditions. While costs are higher, the quality of education and international recognition make it an excellent choice for career-focused students.",
    pros: [
      "Prestigious universities",
      "Rich academic tradition",
      "International recognition",
      "Cultural diversity",
      "Strong industry connections"
    ],
    cons: [
      "High tuition fees",
      "Expensive cost of living",
      "Limited post-study work options",
      "Brexit uncertainties"
    ],
    requirements: {
      ielts: "6.0-7.0 (varies by program)",
      tuition: "£15,000-£35,000/year",
      livingCost: "£12,000-£18,000/year",
      workRights: "2 years post-graduation"
    },
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London"
    ],
    nextSteps: [
      "Research UK universities and programs",
      "Prepare English test scores",
      "Apply through UCAS or directly",
      "Apply for student visa",
      "Arrange accommodation"
    ]
  },
  "Germany": {
    country: "Germany",
    score: 0,
    description: "Germany offers excellent education at very low or no tuition fees. With strong engineering programs and good job opportunities, it's perfect for students seeking affordable quality education.",
    pros: [
      "Very low or no tuition fees",
      "Excellent engineering programs",
      "Strong economy and job market",
      "High quality of life",
      "Central European location"
    ],
    cons: [
      "Language barrier (German required)",
      "Complex visa process",
      "Limited English programs",
      "Cold weather"
    ],
    requirements: {
      ielts: "6.0-6.5 (for English programs)",
      tuition: "€0-€1,500/year (public universities)",
      livingCost: "€8,000-€12,000/year",
      workRights: "18 months post-graduation"
    },
    universities: [
      "Technical University of Munich",
      "Heidelberg University",
      "Ludwig Maximilian University",
      "RWTH Aachen University"
    ],
    nextSteps: [
      "Learn German (if required)",
      "Research programs and universities",
      "Prepare required documents",
      "Apply for student visa",
      "Arrange accommodation"
    ]
  },
  "USA": {
    country: "USA",
    score: 0,
    description: "The USA offers unparalleled opportunities with world-renowned universities and diverse programs. While costs are high, the networking opportunities and career prospects are exceptional.",
    pros: [
      "World-renowned universities",
      "Diverse program options",
      "Excellent networking opportunities",
      "Strong career prospects",
      "Innovation and technology hub"
    ],
    cons: [
      "Very high tuition fees",
      "Expensive cost of living",
      "Complex visa process",
      "Limited post-study work options",
      "Healthcare costs"
    ],
    requirements: {
      ielts: "6.5-7.0 (varies by program)",
      tuition: "$25,000-$50,000 USD/year",
      livingCost: "$15,000-$25,000 USD/year",
      workRights: "1 year OPT, 2 years STEM OPT"
    },
    universities: [
      "Harvard University",
      "Stanford University",
      "Massachusetts Institute of Technology",
      "University of California, Berkeley"
    ],
    nextSteps: [
      "Research US universities and programs",
      "Prepare GRE/GMAT scores",
      "Apply for student visa",
      "Arrange accommodation",
      "Plan your arrival"
    ]
  },
  "New Zealand": {
    country: "New Zealand",
    score: 0,
    description: "New Zealand offers a unique combination of quality education and stunning natural beauty. With a relaxed lifestyle and good post-study opportunities, it's perfect for nature-loving students.",
    pros: [
      "Beautiful natural environment",
      "Relaxed lifestyle",
      "Good post-study work options",
      "Safe and friendly environment",
      "English-speaking country"
    ],
    cons: [
      "Limited university options",
      "Higher cost of living",
      "Distance from major markets",
      "Smaller job market"
    ],
    requirements: {
      ielts: "6.0-6.5 (varies by program)",
      tuition: "$20,000-$30,000 NZD/year",
      livingCost: "$15,000-$20,000 NZD/year",
      workRights: "Up to 3 years post-graduation"
    },
    universities: [
      "University of Auckland",
      "University of Otago",
      "University of Canterbury",
      "Victoria University of Wellington"
    ],
    nextSteps: [
      "Choose your preferred university",
      "Prepare English test scores",
      "Apply for student visa",
      "Arrange accommodation",
      "Plan your arrival"
    ]
  }
};

export default function CountryQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: number[]) => {
    setIsLoading(true);
    
    // Calculate scores for each country
    const countryScores: Record<string, number> = {};
    
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      selectedOption.countries.forEach(country => {
        countryScores[country] = (countryScores[country] || 0) + selectedOption.weight;
      });
    });

    // Convert to array and sort by score
    const sortedResults = Object.entries(countryScores)
      .map(([country, score]) => ({
        ...countryData[country],
        score
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setTimeout(() => {
      setResults(sortedResults);
      setIsComplete(true);
      setIsLoading(false);
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsComplete(false);
    setResults([]);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Preferences</h2>
            <p className="text-gray-600 mb-4">Finding the perfect study destination for you...</p>
            <Progress value={100} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Perfect Study Destination</h1>
            <p className="text-xl text-gray-600">Based on your preferences, here are the best countries for you:</p>
          </div>

          <div className="space-y-8">
            {results.map((result, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">🏆</div>
                      <div>
                        <CardTitle className="text-2xl flex items-center">
                          {result.country}
                          {index === 0 && <Badge className="ml-2 bg-yellow-500">Top Match</Badge>}
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                          Match Score: {result.score}/24 points
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-blue-600">{index + 1}</div>
                      <div className="text-sm text-gray-500">Rank</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-700 leading-relaxed">{result.description}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-700 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Pros
                      </h3>
                      <ul className="space-y-2">
                        {result.pros.map((pro, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-700 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Cons
                      </h3>
                      <ul className="space-y-2">
                        {result.cons.map((con, i) => (
                          <li key={i} className="flex items-start">
                            <AlertCircle className="w-4 h-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Requirements & Costs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">IELTS Score</div>
                        <div className="text-gray-900">{result.requirements.ielts}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Tuition Fees</div>
                        <div className="text-gray-900">{result.requirements.tuition}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Living Cost</div>
                        <div className="text-gray-900">{result.requirements.livingCost}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Work Rights</div>
                        <div className="text-gray-900">{result.requirements.workRights}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Top Universities</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {result.universities.map((university, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <GraduationCap className="w-4 h-4 text-blue-600 mr-2" />
                          {university}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
                    <div className="space-y-2">
                      {result.nextSteps.map((step, i) => (
                        <div key={i} className="flex items-start text-sm">
                          <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            {i + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button className="flex-1" size="lg">
                      <Target className="w-4 h-4 mr-2" />
                      Get Detailed Guide
                    </Button>
                    <Button variant="outline" className="flex-1" size="lg">
                      <Users className="w-4 h-4 mr-2" />
                      Book Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button onClick={resetQuiz} variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Study Destination</h1>
          <p className="text-xl text-gray-600 mb-6">
            Answer a few questions to discover the best countries for your international education journey
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full h-3" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">{currentQ.question}</CardTitle>
            <CardDescription>
              Select the option that best describes your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`w-full h-auto p-6 text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-all ${
                    answers[currentQuestion] === index ? 'bg-blue-50 border-blue-500 text-blue-700' : ''
                  }`}
                  onClick={() => handleAnswer(index)}
                >
                  <div className="flex items-center w-full">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg">{option.text}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={goBack}
                disabled={currentQuestion === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} of {questions.length} questions
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Pro Tip</h3>
                <p className="text-blue-800 text-sm">
                  Be honest with your answers! This will help us find the best study destination that matches your preferences, 
                  budget, and career goals. There are no right or wrong answers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
