import { NextRequest, NextResponse } from "next/server";
// import { google } from "googleapis"; // Uncomment and configure for real integration

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await req.json();
    if (!type || !data) {
      return NextResponse.json({ success: false, error: "Missing type or data." }, { status: 400 });
    }
    // TODO: Integrate with Google Sheets API using service account
    // For demo, just log the data
    // Example: push to Google Sheets here
    // const sheets = google.sheets({ version: "v4", auth });
    // await sheets.spreadsheets.values.append({ ... });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to sync." }, { status: 500 });
  }
} 