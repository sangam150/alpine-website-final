"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, Download, Star } from "lucide-react";
import Link from "next/link";

interface SopFeedback {
  grammar: number;
  structure: number;
  clarity: number;
  tone: number;
  strength: number;
  suggestions: string[];
  error?: string;
}

export default function SopEvaluator() {
  const [sopFile, setSopFile] = useState<File | null>(null);
  const [sopFeedback, setSopFeedback] = useState<SopFeedback | null>(null);
  const [sopLoading, setSopLoading] = useState(false);

  const handleEvaluate = async () => {
    if (!sopFile) return;
    setSopLoading(true);
    setSopFeedback(null);
    try {
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(sopFile);
      });
      const res = await fetch("/api/sop-evaluator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sopText: text }),
      });
      const feedback = await res.json();
      setSopFeedback(feedback);
    } catch (err) {
      setSopFeedback({ 
        grammar: 0, 
        structure: 0, 
        clarity: 0, 
        tone: 0, 
        strength: 0, 
        suggestions: [], 
        error: "Failed to evaluate SOP/LOE." 
      });
    }
    setSopLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI SOP/LOE Evaluator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant AI-powered feedback on your Statement of Purpose or Letter of Explanation
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Upload Your Document
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={e => setSopFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: PDF, DOC, DOCX, TXT (max 5MB)
              </p>
            </div>

            {sopFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">{sopFile.name}</span>
                </div>
              </div>
            )}

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
              disabled={!sopFile || sopLoading}
              onClick={handleEvaluate}
            >
              {sopLoading ? "Evaluating..." : "Evaluate with AI"}
            </Button>

            {sopFeedback && !sopFeedback.error && (
              <div className="space-y-6 mt-8">
                <h3 className="text-xl font-bold text-gray-900 text-center">AI Evaluation Results</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">Scores (1-5)</h4>
                    {Object.entries(sopFeedback).filter(([key]) => key !== 'suggestions').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="capitalize text-gray-700">{key}:</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= (value as number) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-gray-900">{value as number}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Suggestions for Improvement</h4>
                    <ul className="space-y-2">
                      {sopFeedback.suggestions.map((suggestion: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {sopFeedback?.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                {sopFeedback.error}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/student-portal" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Student Portal
          </Link>
        </div>
      </div>
    </div>
  );
} 