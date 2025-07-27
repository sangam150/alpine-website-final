"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Sparkles,
  BookOpen,
  Globe,
  GraduationCap,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Script from "next/script";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "suggestion" | "quick_reply";
  suggestions?: string[];
}

const QUICK_REPLIES = [
  "Tell me about study abroad options",
  "What are the visa requirements?",
  "How much does it cost to study abroad?",
  "Which countries are best for Nepali students?",
  "Help me with IELTS preparation",
  "What documents do I need?",
  "Tell me about scholarships",
  "How to write a good SOP?",
];

const SUGGESTED_TOPICS = [
  {
    icon: <Globe className="w-4 h-4" />,
    text: "Study Destinations",
    color: "bg-blue-100 text-blue-800",
  },
  {
    icon: <GraduationCap className="w-4 h-4" />,
    text: "Course Selection",
    color: "bg-green-100 text-green-800",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    text: "Test Preparation",
    color: "bg-purple-100 text-purple-800",
  },
  {
    icon: <CheckCircle className="w-4 h-4" />,
    text: "Visa Process",
    color: "bg-orange-100 text-orange-800",
  },
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Alpine AI, your study abroad assistant. I can help you with university selection, visa requirements, test preparation, and more. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Inject Chatbase widget script on mount
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      !document.getElementById("chatbase-script")
    ) {
      const script = document.createElement("script");
      script.id = "chatbase-script";
      script.src = "https://www.chatbase.co/embed.min.js";
      script.async = true;
      script.setAttribute("chatbotId", "YGookBr-ObI_UzUTZE-JU");
      script.setAttribute("domain", "www.chatbase.co");
      document.body.appendChild(script);
    }
  }, []);

  // Open Chatbase widget when chat is opened
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      setTimeout(() => {
        if ((window as any).Chatbase) {
          (window as any).Chatbase.openChatbot();
        } else {
          const event = new CustomEvent("openChatbaseChatbot");
          window.dispatchEvent(event);
        }
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        sender: "bot",
        timestamp: new Date(),
        type: "text",
        suggestions: botResponse.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (
    userInput: string,
  ): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();

    if (
      input.includes("study abroad") ||
      input.includes("university") ||
      input.includes("course")
    ) {
      return {
        text: "Great question! Alpine Education offers guidance for studying in 12+ countries including Australia, Canada, UK, USA, Germany, and New Zealand. We can help you find the perfect university and course based on your interests, budget, and career goals. Would you like to know more about a specific country?",
        suggestions: [
          "Australia",
          "Canada",
          "UK",
          "Germany",
          "Cost comparison",
        ],
      };
    }

    if (input.includes("visa") || input.includes("document")) {
      return {
        text: "Visa requirements vary by country, but generally you'll need: passport, academic transcripts, English test scores (IELTS/PTE), financial documents, SOP, and health insurance. Our experts can guide you through the entire process and help prepare your documents. Which country are you interested in?",
        suggestions: ["Document checklist", "Visa timeline", "Interview tips"],
      };
    }

    if (
      input.includes("cost") ||
      input.includes("fee") ||
      input.includes("expense")
    ) {
      return {
        text: "Study abroad costs typically include: tuition fees ($15K-50K/year), living expenses ($10K-25K/year), health insurance, and travel costs. Many countries offer scholarships and part-time work opportunities. We can help you find affordable options and scholarship opportunities. What's your budget range?",
        suggestions: [
          "Scholarship options",
          "Part-time work",
          "Cost by country",
        ],
      };
    }

    if (
      input.includes("ielts") ||
      input.includes("pte") ||
      input.includes("test")
    ) {
      return {
        text: "IELTS and PTE are English proficiency tests required for study abroad. Most universities require 6.0-7.0 IELTS or equivalent PTE scores. We offer test preparation courses with expert trainers, mock tests, and personalized coaching. Would you like to know about our test prep programs?",
        suggestions: [
          "Free mock test",
          "Test prep courses",
          "Score requirements",
        ],
      };
    }

    if (input.includes("sop") || input.includes("statement")) {
      return {
        text: "A Statement of Purpose (SOP) is crucial for university applications. It should explain your academic background, career goals, and why you chose the specific course/university. Our experts can help you write a compelling SOP that stands out. Would you like to see some SOP samples?",
        suggestions: ["SOP samples", "Writing tips", "Review service"],
      };
    }

    return {
      text: "I'm here to help with your study abroad journey! You can ask me about university selection, visa requirements, test preparation, costs, scholarships, or any other study abroad related questions. What would you like to know more about?",
      suggestions: [
        "Study destinations",
        "Visa process",
        "Test preparation",
        "Costs",
      ],
    };
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chatbase Widget Script (SSR safe) */}
      <Script
        id="chatbase-widget"
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
        data-chatbot-id="YGookBr-ObI_UzUTZE-JU"
        data-domain="www.chatbase.co"
      />
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            aria-label="Open AI Chatbot"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Alpine AI Assistant</h3>
                  <div className="flex items-center space-x-1 text-sm opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <div
                    className={`text-xs mt-2 ${message.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {formatTime(message.timestamp)}
                  </div>

                  {/* Suggestions */}
                  {message.sender === "bot" && message.suggestions && (
                    <div className="mt-3 space-y-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="block w-full text-left px-3 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Alpine AI is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_REPLIES.slice(0, 6).map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-left"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Topics */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Popular topics:</p>
              <div className="grid grid-cols-2 gap-2">
                {SUGGESTED_TOPICS.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(topic.text)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${topic.color} hover:opacity-80`}
                  >
                    {topic.icon}
                    <span>{topic.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage(inputValue)
                }
                placeholder="Ask me anything about study abroad..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Features Badge */}
            <div className="flex items-center justify-center mt-3 space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>AI Powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3" />
                <span>Free Service</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
