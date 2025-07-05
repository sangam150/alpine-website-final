import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, recommendation } = body;

    if (!email || !recommendation) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email with personalized handbook content
    const { error } = await resend.emails.send({
      from: 'Alpine Education <noreply@alpineeducation.com.np>',
      to: [email],
      subject: `Your Personalized Study Abroad Handbook - ${recommendation.country}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af; text-align: center;">Alpine Education & Visa Services</h1>
          <h2 style="color: #374151; text-align: center;">Your Personalized Study Abroad Handbook</h2>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Recommended Destination</h3>
            <h2 style="color: #059669; font-size: 24px;">${recommendation.country}</h2>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Recommended Universities</h3>
            <ul style="color: #6b7280;">
              ${recommendation.universities.map((uni: string) => `<li>${uni}</li>`).join('')}
            </ul>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Requirements</h3>
            <ul style="color: #6b7280;">
              ${recommendation.requirements.map((req: string) => `<li>${req}</li>`).join('')}
            </ul>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="background: #dbeafe; padding: 15px; border-radius: 8px;">
              <h4 style="color: #1e40af; margin: 0;">Timeline</h4>
              <p style="color: #1e40af; margin: 5px 0 0 0;">${recommendation.timeline}</p>
            </div>
            <div style="background: #dcfce7; padding: 15px; border-radius: 8px;">
              <h4 style="color: #059669; margin: 0;">Estimated Cost</h4>
              <p style="color: #059669; margin: 5px 0 0 0;">${recommendation.estimatedCost}</p>
            </div>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Next Steps</h3>
            <ol style="color: #6b7280;">
              ${recommendation.nextSteps.map((step: string) => `<li>${step}</li>`).join('')}
            </ol>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #92400e; margin-top: 0;">Contact Alpine Education</h3>
            <p style="color: #92400e; margin: 5px 0;">Phone: +977-1-4XXXXXXX</p>
            <p style="color: #92400e; margin: 5px 0;">Email: info@alpineeducation.com.np</p>
            <p style="color: #92400e; margin: 5px 0;">WhatsApp: +977-XXXXXXXXX</p>
          </div>
          
          <p style="text-align: center; color: #6b7280; margin-top: 30px;">
            Thank you for choosing Alpine Education & Visa Services!
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send handbook' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Handbook generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 