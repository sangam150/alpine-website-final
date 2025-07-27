"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Target,
  TrendingUp,
  Users,
  DollarSign,
  GraduationCap,
  Globe,
  Star,
  AlertCircle,
  Lightbulb,
  Heart,
  Zap,
  BookOpen
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    careers: string[];
    weight: number;
  }[];
}

interface CareerResult {
  career: string;
  score: number;
  description: string;
  pros: string[];
  cons: string[];
  requirements: {
    education: string;
    skills: string;
    experience: string;
    salary: string;
  };
  universities: string[];
  courses: string[];
  nextSteps: string[];
  demand: "High" | "Medium" | "Low";
  growth: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of work environment do you prefer?",
    options: [
      { text: "Office-based with regular hours", careers: ["Business Administration", "Finance", "Human Resources", "Marketing"], weight: 1 },
      { text: "Creative and flexible environment", careers: ["Design", "Media", "Arts", "Creative Writing"], weight: 2 },
      { text: "Technical and analytical setting", careers: ["Computer Science", "Engineering", "Data Science", "Analytics"], weight: 3 },
      { text: "Healthcare and helping people", careers: ["Medicine", "Nursing", "Psychology", "Public Health"], weight: 2 }
    ]
  },
  {
    id: 2,
    question: "How do you prefer to solve problems?",
    options: [
      { text: "Analyzing data and finding patterns", careers: ["Data Science", "Analytics", "Research", "Statistics"], weight: 3 },
      { text: "Creative thinking and innovation", careers: ["Design", "Engineering", "Architecture", "Product Development"], weight: 2 },
      { text: "Working with people and communication", careers: ["Marketing", "Sales", "Human Resources", "Public Relations"], weight: 1 },
      { text: "Following established procedures", careers: ["Finance", "Accounting", "Administration", "Compliance"], weight: 1 }
    ]
  },
  {
    id: 3,
    question: "What is your preferred level of responsibility?",
    options: [
      { text: "Leading teams and making decisions", careers: ["Management", "Leadership", "Entrepreneurship", "Consulting"], weight: 2 },
      { text: "Specialized technical work", careers: ["Engineering", "Computer Science", "Research", "Technical Specialist"], weight: 3 },
      { text: "Supporting and assisting others", careers: ["Human Resources", "Administration", "Support", "Customer Service"], weight: 1 },
      { text: "Independent creative work", careers: ["Design", "Arts", "Writing", "Creative"], weight: 2 }
    ]
  },
  {
    id: 4,
    question: "What motivates you most in your work?",
    options: [
      { text: "Financial success and stability", careers: ["Finance", "Business", "Sales", "Investment"], weight: 1 },
      { text: "Helping others and making a difference", careers: ["Healthcare", "Education", "Social Work", "Non-profit"], weight: 2 },
      { text: "Innovation and creating new things", careers: ["Engineering", "Design", "Technology", "Research"], weight: 3 },
      { text: "Recognition and achievement", careers: ["Management", "Consulting", "Law", "Medicine"], weight: 2 }
    ]
  },
  {
    id: 5,
    question: "How do you prefer to learn new skills?",
    options: [
      { text: "Hands-on practice and experience", careers: ["Engineering", "Trades", "Healthcare", "Technical"], weight: 2 },
      { text: "Research and self-study", careers: ["Research", "Academia", "Writing", "Analysis"], weight: 3 },
      { text: "Collaboration and teamwork", careers: ["Management", "Sales", "Human Resources", "Consulting"], weight: 1 },
      { text: "Structured courses and training", careers: ["Finance", "Law", "Medicine", "Professional Services"], weight: 2 }
    ]
  },
  {
    id: 6,
    question: "What is your comfort level with technology?",
    options: [
      { text: "Very comfortable - I love new tech", careers: ["Computer Science", "Data Science", "Digital Marketing", "IT"], weight: 3 },
      { text: "Moderately comfortable", careers: ["Engineering", "Design", "Analytics", "Modern Business"], weight: 2 },
      { text: "Somewhat comfortable", careers: ["Marketing", "Administration", "Healthcare", "Education"], weight: 1 },
      { text: "Prefer traditional methods", careers: ["Traditional Arts", "Humanities", "Some Healthcare", "Manual Trades"], weight: 1 }
    ]
  },
  {
    id: 7,
    question: "What type of impact do you want to make?",
    options: [
      { text: "Global impact through innovation", careers: ["Technology", "Research", "Engineering", "International Business"], weight: 3 },
      { text: "Local community impact", careers: ["Healthcare", "Education", "Social Work", "Local Business"], weight: 2 },
      { text: "Organizational success", careers: ["Management", "Finance", "Consulting", "Operations"], weight: 1 },
      { text: "Personal creative expression", careers: ["Arts", "Design", "Writing", "Creative"], weight: 2 }
    ]
  },
  {
    id: 8,
    question: "How important is work-life balance to you?",
    options: [
      { text: "Very important - I need flexibility", careers: ["Remote Work", "Consulting", "Creative", "Some Tech"], weight: 2 },
      { text: "Somewhat important", careers: ["Most Professional", "Healthcare", "Education", "Business"], weight: 1 },
      { text: "I'm willing to work hard for success", careers: ["Management", "Finance", "Law", "Medicine"], weight: 1 },
      { text: "I'm passionate about my work", careers: ["Research", "Engineering", "Technology", "Creative"], weight: 2 }
    ]
  }
];

const careerData: Record<string, CareerResult> = {
  "Computer Science": {
    career: "Computer Science",
    score: 0,
    description: "Computer Science is a rapidly growing field focused on software development, algorithms, and computational systems. It offers excellent career prospects with high salaries and global opportunities.",
    pros: [
      "High salary potential ($80,000-$150,000+)",
      "Strong job market with global opportunities",
      "Continuous learning and innovation",
      "Remote work possibilities",
      "Diverse career paths (AI, Web, Mobile, etc.)"
    ],
    cons: [
      "Requires continuous learning",
      "Can be mentally demanding",
      "Long hours during project deadlines",
      "Competitive entry-level market"
    ],
    requirements: {
      education: "Bachelor's in Computer Science or related field",
      skills: "Programming, Problem-solving, Mathematics, Logic",
      experience: "Internships, Projects, Open Source contributions",
      salary: "$80,000 - $150,000+ (varies by location)"
    },
    universities: [
      "MIT",
      "Stanford University",
      "University of California, Berkeley",
      "Carnegie Mellon University"
    ],
    courses: [
      "Bachelor of Computer Science",
      "Software Engineering",
      "Computer Science & Engineering",
      "Information Technology"
    ],
    nextSteps: [
      "Learn programming fundamentals (Python, Java, JavaScript)",
      "Build portfolio projects",
      "Apply for internships",
      "Join coding communities",
      "Consider specialized areas (AI, Web Dev, Mobile)"
    ],
    demand: "High",
    growth: "22% (Much faster than average)"
  },
  "Data Science": {
    career: "Data Science",
    score: 0,
    description: "Data Science combines statistics, programming, and business acumen to extract insights from data. It's one of the most in-demand fields with applications across all industries.",
    pros: [
      "Extremely high demand across industries",
      "Excellent salary prospects ($90,000-$160,000+)",
      "Impactful work with real business value",
      "Continuous learning opportunities",
      "Remote work friendly"
    ],
    cons: [
      "Requires strong mathematical background",
      "Need to stay updated with new tools",
      "Can be complex and challenging",
      "Requires business understanding"
    ],
    requirements: {
      education: "Bachelor's in Statistics, Math, CS, or related field",
      skills: "Statistics, Programming, Machine Learning, Business Acumen",
      experience: "Data analysis projects, internships",
      salary: "$90,000 - $160,000+ (varies by location)"
    },
    universities: [
      "Stanford University",
      "MIT",
      "University of California, Berkeley",
      "Harvard University"
    ],
    courses: [
      "Data Science",
      "Statistics & Data Science",
      "Computer Science with Data Science",
      "Business Analytics"
    ],
    nextSteps: [
      "Learn Python and R programming",
      "Study statistics and mathematics",
      "Practice with real datasets",
      "Build a portfolio of projects",
      "Network with data professionals"
    ],
    demand: "High",
    growth: "36% (Much faster than average)"
  },
  "Business Administration": {
    career: "Business Administration",
    score: 0,
    description: "Business Administration provides a broad foundation in business principles, management, and leadership. It's versatile and applicable across all industries and sectors.",
    pros: [
      "Versatile degree with many career paths",
      "Good salary potential ($60,000-$120,000+)",
      "Leadership and management opportunities",
      "Global business understanding",
      "Networking opportunities"
    ],
    cons: [
      "Competitive job market",
      "May require additional specialization",
      "Entry-level positions can be administrative",
      "Need to build specific skills"
    ],
    requirements: {
      education: "Bachelor's in Business Administration or related field",
      skills: "Leadership, Communication, Analysis, Strategy",
      experience: "Internships, Leadership roles, Projects",
      salary: "$60,000 - $120,000+ (varies by role and location)"
    },
    universities: [
      "Harvard Business School",
      "Stanford Graduate School of Business",
      "University of Pennsylvania (Wharton)",
      "MIT Sloan School of Management"
    ],
    courses: [
      "Bachelor of Business Administration",
      "Business Management",
      "International Business",
      "Business Economics"
    ],
    nextSteps: [
      "Choose a specialization (Finance, Marketing, HR, etc.)",
      "Gain leadership experience",
      "Build professional network",
      "Consider MBA for advancement",
      "Develop industry-specific knowledge"
    ],
    demand: "Medium",
    growth: "8% (As fast as average)"
  },
  "Engineering": {
    career: "Engineering",
    score: 0,
    description: "Engineering applies scientific and mathematical principles to solve real-world problems. It offers diverse specializations and excellent career prospects with strong problem-solving focus.",
    pros: [
      "High salary potential ($70,000-$140,000+)",
      "Strong problem-solving skills",
      "Diverse specializations available",
      "Global career opportunities",
      "Respected profession"
    ],
    cons: [
      "Requires strong mathematical background",
      "Can be physically demanding (some fields)",
      "Long hours during projects",
      "Need for continuous learning"
    ],
    requirements: {
      education: "Bachelor's in Engineering (specific discipline)",
      skills: "Mathematics, Physics, Problem-solving, Technical Design",
      experience: "Internships, Co-op programs, Projects",
      salary: "$70,000 - $140,000+ (varies by specialization)"
    },
    universities: [
      "MIT",
      "Stanford University",
      "University of California, Berkeley",
      "Georgia Institute of Technology"
    ],
    courses: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Chemical Engineering"
    ],
    nextSteps: [
      "Choose engineering specialization",
      "Focus on mathematics and physics",
      "Participate in engineering projects",
      "Seek internships and co-ops",
      "Consider professional certifications"
    ],
    demand: "High",
    growth: "6% (As fast as average)"
  },
  "Healthcare": {
    career: "Healthcare",
    score: 0,
    description: "Healthcare offers rewarding careers focused on helping people and improving lives. It includes diverse roles from clinical practice to healthcare administration and research.",
    pros: [
      "Meaningful work helping others",
      "Job security and stability",
      "Diverse career opportunities",
      "Good salary potential ($50,000-$200,000+)",
      "Continuous learning and advancement"
    ],
    cons: [
      "Can be emotionally demanding",
      "Long hours and shift work",
      "High responsibility and stress",
      "Requires extensive education for clinical roles"
    ],
    requirements: {
      education: "Varies by role (Bachelor's to Doctorate)",
      skills: "Compassion, Communication, Technical skills, Critical thinking",
      experience: "Clinical rotations, Internships, Volunteer work",
      salary: "$50,000 - $200,000+ (varies by role and specialization)"
    },
    universities: [
      "Johns Hopkins University",
      "Harvard Medical School",
      "Stanford University",
      "University of California, San Francisco"
    ],
    courses: [
      "Medicine",
      "Nursing",
      "Public Health",
      "Healthcare Administration"
    ],
    nextSteps: [
      "Choose healthcare specialization",
      "Gain relevant experience and certifications",
      "Build strong communication skills",
      "Network with healthcare professionals",
      "Consider advanced degrees if needed"
    ],
    demand: "High",
    growth: "13% (Faster than average)"
  },
  "Design": {
    career: "Design",
    score: 0,
    description: "Design combines creativity with problem-solving to create user experiences, products, and visual communications. It's perfect for creative individuals who want to make an impact.",
    pros: [
      "Creative and fulfilling work",
      "Diverse specializations (UX, UI, Graphic, Product)",
      "Remote work opportunities",
      "Growing demand in tech industry",
      "Portfolio-based career advancement"
    ],
    cons: [
      "Subjective feedback and revisions",
      "Can be competitive",
      "Need to stay updated with trends",
      "May require freelance work initially"
    ],
    requirements: {
      education: "Bachelor's in Design or related field (portfolio more important)",
      skills: "Creativity, Technical software, User empathy, Communication",
      experience: "Portfolio projects, Internships, Freelance work",
      salary: "$50,000 - $120,000+ (varies by specialization and experience)"
    },
    universities: [
      "Rhode Island School of Design",
      "Parsons School of Design",
      "ArtCenter College of Design",
      "California Institute of the Arts"
    ],
    courses: [
      "Graphic Design",
      "UX/UI Design",
      "Industrial Design",
      "Digital Design"
    ],
    nextSteps: [
      "Build a strong portfolio",
      "Learn design software (Figma, Adobe Creative Suite)",
      "Choose design specialization",
      "Network with designers",
      "Consider design bootcamps"
    ],
    demand: "Medium",
    growth: "3% (Slower than average)"
  }
};

export default function CareerQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<CareerResult[]>([]);
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
    
    // Calculate scores for each career
    const careerScores: Record<string, number> = {};
    
    finalAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      selectedOption.careers.forEach(career => {
        careerScores[career] = (careerScores[career] || 0) + selectedOption.weight;
      });
    });

    // Convert to array and sort by score
    const sortedResults = Object.entries(careerScores)
      .map(([career, score]) => ({
        ...careerData[career],
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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Preferences</h2>
            <p className="text-gray-600 mb-4">Finding the perfect career path for you...</p>
            <Progress value={100} className="w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Perfect Career Path</h1>
            <p className="text-xl text-gray-600">Based on your preferences, here are the best career options for you:</p>
          </div>

          <div className="space-y-8">
            {results.map((result, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">🎯</div>
                      <div>
                        <CardTitle className="text-2xl flex items-center">
                          {result.career}
                          {index === 0 && <Badge className="ml-2 bg-green-500">Top Match</Badge>}
                        </CardTitle>
                        <CardDescription className="text-lg mt-2">
                          Match Score: {result.score}/24 points
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">{index + 1}</div>
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
                    <h3 className="font-semibold text-gray-900 mb-3">Requirements & Outlook</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700">Education</div>
                        <div className="text-gray-900">{result.requirements.education}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Key Skills</div>
                        <div className="text-gray-900">{result.requirements.skills}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Salary Range</div>
                        <div className="text-gray-900">{result.requirements.salary}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Growth</div>
                        <div className="text-gray-900">{result.growth}</div>
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
                    <h3 className="font-semibold text-gray-900 mb-3">Recommended Courses</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {result.courses.map((course, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <BookOpen className="w-4 h-4 text-purple-600 mr-2" />
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
                    <div className="space-y-2">
                      {result.nextSteps.map((step, i) => (
                        <div key={i} className="flex items-start text-sm">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
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
                      Book Career Counseling
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Career Path</h1>
          <p className="text-xl text-gray-600 mb-6">
            Answer a few questions to discover the best career options for your skills and interests
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
                  className={`w-full h-auto p-6 text-left justify-start hover:bg-green-50 hover:border-green-300 transition-all ${
                    answers[currentQuestion] === index ? 'bg-green-50 border-green-500 text-green-700' : ''
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
        <Card className="mt-6 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Pro Tip</h3>
                <p className="text-green-800 text-sm">
                  Think about what truly motivates you and what you enjoy doing. There are no right or wrong answers - 
                  this quiz helps match your personality and preferences with suitable career paths.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
