import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { sopText } = data;

  // TODO: Integrate with OpenAI or local AI model
  // For now, return random scores and suggestions
  const scores = {
    grammar: Math.floor(Math.random() * 5) + 1,
    structure: Math.floor(Math.random() * 5) + 1,
    clarity: Math.floor(Math.random() * 5) + 1,
    tone: Math.floor(Math.random() * 5) + 1,
    strength: Math.floor(Math.random() * 5) + 1,
  };
  const suggestions = [
    "Check your introduction for clarity.",
    "Use more formal language in the conclusion.",
    "Add more details about your academic background.",
  ];

  return NextResponse.json({ ...scores, suggestions });
} 