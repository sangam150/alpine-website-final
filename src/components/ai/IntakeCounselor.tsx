"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, GraduationCap, Globe, Calendar, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  type: "bot" | "user";
  content: string;
  timestamp: Date;
}

interface IntakeData {
  destination: string;
  courseLevel: string;
  englishTest: string;
  graduationYear: string;
  budgetRange: string;
}

const questions = [
  {
    id: "destination",
    question: "Which country would you like to study in?",
    type: "select",
    options: ["Australia", "Canada", "UK", "USA", "Germany", "Ireland", "Netherlands", "New Zealand", "Other"]
  },
  {
    id: "courseLevel",
    question: "What level of study are you interested in?",
    type: "select",
    options: ["Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Certificate", "Foundation Year"]
  },
  {
    id: "englishTest",
    question: "Have you taken an English proficiency test?",
    type: "select",
    options: ["IELTS", "PTE", "TOEFL", "Not yet", "Other"]
  },
  {
    id: "graduationYear",
    question: "When did you graduate or when will you graduate?",
    type: "select",
    options: ["2024", "2023", "2022", "2021", "2020", "Before 2020", "Still studying"]
  },
  {
    id: "budgetRange",
    question: "What's your budget range for tuition fees per year?",
    type: "select",
    options: ["Under $10,000", "$10,000 - $20,000", "$20,000 - $30,000", "$30,000 - $40,000", "Over $40,000"]
  }
];

export default function IntakeCounselor({ onComplete }: { onComplete?: (data: IntakeData) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your AI intake counselor. Let me help you find the perfect study abroad opportunity. I'll ask you a few questions to understand your requirements better.",
      timestamp: new Date()
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [intakeData, setIntakeData] = useState<IntakeData>({
    destination: "",
    courseLevel: "",
    englishTest: "",
    graduationYear: "",
    budgetRange: ""
  });
  const [isComplete, setIsComplete] = useState(false);
  const [isQualified, setIsQualified] = useState(false);

  const addMessage = (content: string, type: "bot" | "user" = "bot") => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleAnswer = (answer: string) => {
    const question = questions[currentQuestionIndex];
    const fieldName = question.id as keyof IntakeData;
    
    // Add user's answer to chat
    addMessage(answer, "user");
    
    // Update intake data
    setIntakeData(prev => ({ ...prev, [fieldName]: answer }));
    
    // Move to next question or complete
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimeout(() => {
        addMessage(questions[currentQuestionIndex + 1].question);
      }, 500);
    } else {
      // Complete intake
      setTimeout(() => {
        const qualified = evaluateQualification({ ...intakeData, [fieldName]: answer });
        setIsQualified(qualified);
        setIsComplete(true);
        
        if (qualified) {
          addMessage("Great! Based on your responses, you appear to be a good candidate for study abroad. Let me connect you with our application process.");
        } else {
          addMessage("Thank you for your responses. I recommend speaking with one of our expert counselors to better understand your options and requirements.");
        }
        
        // Log to Firestore (placeholder)
        logToFirestore({ ...intakeData, [fieldName]: answer });
        
        if (onComplete) {
          onComplete({ ...intakeData, [fieldName]: answer });
        }
      }, 500);
    }
  };

  const evaluateQualification = (data: IntakeData): boolean => {
    // Simple qualification logic
    const hasEnglishTest = data.englishTest !== "Not yet";
    const recentGraduation = ["2024", "2023", "2022", "Still studying"].includes(data.graduationYear);
    const reasonableBudget = data.budgetRange !== "Under $10,000";
    
    return hasEnglishTest && recentGraduation && reasonableBudget;
  };

  const logToFirestore = async (data: IntakeData) => {
    try {
      await fetch("/api/intake-counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Failed to log intake data:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-0 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          AI Intake Counselor
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 mb-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {!isComplete && currentQuestionIndex < questions.length && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <Label className="text-sm font-medium text-blue-900">
                {questions[currentQuestionIndex].question}
              </Label>
            </div>
            
            {questions[currentQuestionIndex].type === "select" && (
              <Select onValueChange={handleAnswer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {questions[currentQuestionIndex].options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        )}

        {isComplete && (
          <div className="space-y-4">
            <div className={`flex items-center gap-2 p-4 rounded-lg ${
              isQualified ? "bg-green-50 border border-green-200" : "bg-yellow-50 border border-yellow-200"
            }`}>
              {isQualified ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              )}
              <span className={`font-medium ${
                isQualified ? "text-green-900" : "text-yellow-900"
              }`}>
                {isQualified ? "You're qualified!" : "Let's discuss your options"}
              </span>
            </div>
            
            <div className="flex gap-3">
              {isQualified ? (
                <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link href="/apply">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Start Application
                  </Link>
                </Button>
              ) : (
                <Button asChild className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  <Link href="/contact">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Counselor
                  </Link>
                </Button>
              )}
              
              <Button variant="outline" onClick={() => {
                setMessages([messages[0]]);
                setCurrentQuestionIndex(0);
                setIntakeData({
                  destination: "",
                  courseLevel: "",
                  englishTest: "",
                  graduationYear: "",
                  budgetRange: ""
                });
                setIsComplete(false);
                setIsQualified(false);
              }}>
                Start Over
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 