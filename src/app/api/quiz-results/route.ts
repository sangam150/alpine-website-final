import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, answers, type } = await req.json();
    if (!name || !email || !answers || !type) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }
    if (!adminDb) {
      return NextResponse.json(
        { error: "Firestore not initialized." },
        { status: 500 },
      );
    }
    const docRef = await adminDb.collection("quizResults").add({
      name,
      email,
      phone: phone || "",
      answers,
      type,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
