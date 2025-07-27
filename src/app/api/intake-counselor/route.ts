import { NextRequest, NextResponse } from "next/server";
import { getFirestoreSafe } from "@/lib/firebase-config";
import { collection, addDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const db = getFirestoreSafe();
    
    await addDoc(collection(db, "intakeCounselor"), {
      ...data,
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") || "unknown"
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error logging intake data:", error);
    return NextResponse.json({ error: "Failed to log data" }, { status: 500 });
  }
} 