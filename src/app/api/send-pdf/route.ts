import { NextRequest, NextResponse } from "next/server";
import { sendTransactionalEmail } from "@/lib/resend";
import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  try {
    const { email, category, name } = await req.json();
    if (!email || !category) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 },
      );
    }
    // Match template
    const templatePath = path.join(
      process.cwd(),
      "public",
      "pdf_templates",
      `quiz_result_${category.toLowerCase()}.html`,
    );
    if (!fs.existsSync(templatePath)) {
      return NextResponse.json(
        { error: "Template not found." },
        { status: 404 },
      );
    }
    let html = fs.readFileSync(templatePath, "utf8");
    // Optionally personalize with name
    if (name) {
      html = html.replace(
        /Prepared for you by Alpine Education/,
        `Prepared for ${name} by Alpine Education`,
      );
    }
    // Generate PDF with Puppeteer
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();
    // Send PDF via Resend
    const result = await sendTransactionalEmail({
      to: email,
      subject: `Your Personalized Study Abroad Guide - ${category}`,
      html: `<p>Dear ${name || "Student"},</p><p>Your personalized study abroad guide for <strong>${category}</strong> is attached as a PDF.</p><p>Best regards,<br/>Alpine Education Team</p>`,
      from: "Alpine Education <no-reply@alpinevisa.com.np>",
      attachments: [
        {
          filename: `Alpine_Guide_${category}.pdf`,
          content: Buffer.from(pdfBuffer).toString("base64"),
          encoding: "base64",
        },
      ],
    });
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email." },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: 500 },
    );
  }
}
