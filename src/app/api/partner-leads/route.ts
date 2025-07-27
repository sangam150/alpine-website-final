import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const VALID_API_KEYS = [process.env.PARTNER_API_KEY || "demo-key"];
const RATE_LIMIT = 10; // max 10 requests per hour per key (demo)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get("x-api-key");
    if (!apiKey || !VALID_API_KEYS.includes(apiKey)) {
      return NextResponse.json({ success: false, error: "Invalid API key." }, { status: 401 });
    }
    // Simple in-memory rate limiting (for demo)
    const now = Date.now();
    const rl = rateLimitMap.get(apiKey) || { count: 0, lastReset: now };
    if (now - rl.lastReset > 60 * 60 * 1000) {
      rl.count = 0;
      rl.lastReset = now;
    }
    if (rl.count >= RATE_LIMIT) {
      return NextResponse.json({ success: false, error: "Rate limit exceeded." }, { status: 429 });
    }
    rl.count++;
    rateLimitMap.set(apiKey, rl);

    const { name, email, phone, country, notes } = await req.json();
    if (!name || !email || !phone || !country) {
      return NextResponse.json({ success: false, error: "Missing required fields." }, { status: 400 });
    }
    const db = getFirestore();
    await addDoc(collection(db, "partner_leads"), {
      name,
      email,
      phone,
      country,
      notes: notes || "",
      createdAt: serverTimestamp(),
      source: "partner-api",
      apiKey,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to submit lead." }, { status: 500 });
  }
} 