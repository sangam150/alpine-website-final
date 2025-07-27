import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ success: false, error: "Missing email or code." }, { status: 400 });
    }
    // Send email via Resend
    await resend.emails.send({
      from: 'Alpine Education <noreply@alpineeducation.com>',
      to: email,
      subject: "Your Alpine Education 2FA Verification Code",
      html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code will expire in 10 minutes.</p>`,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to send code." }, { status: 500 });
  }
} 