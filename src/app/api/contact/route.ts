import { NextRequest, NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/resend";
import { addItem } from "@/lib/firestore-admin";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }

    // Store in Firestore
    await addItem("messages", {
      name,
      email,
      phone: phone || "",
      message,
      status: "new",
    });

    // Compose email content
    const html = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    `;

    // Send email to admin
    const adminResult = await sendTransactionalEmail({
      to: "info@alpinevisa.com.np",
      subject: "New Contact Form Submission - Alpine Education",
      html,
      replyTo: email,
    });

    if (!adminResult.success) {
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 },
      );
    }

    // Send confirmation email to user
    const userHtml = `
      <h2>Thank you for contacting Alpine Education!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and our counselors will get back to you within 24 hours.</p>
      <p><strong>Your Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Best regards,<br/>Alpine Education & Visa Services Team</p>
    `;
    await sendTransactionalEmail({
      to: email,
      subject: "Thank you for contacting Alpine Education",
      html: userHtml,
      from: "Alpine Education <no-reply@alpinevisa.com.np>",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
