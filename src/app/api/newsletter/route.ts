import { NextRequest, NextResponse } from "next/server";
import { addToNewsletter } from "@/lib/mailchimp";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }
    const result = await addToNewsletter(email, firstName);
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: result.error || "Failed to subscribe." },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
