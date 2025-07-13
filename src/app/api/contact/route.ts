import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

// Email notification function
async function sendEmailNotification(type: 'admin' | 'user', data: any) {
  try {
    // For now, we'll use a simple console log as email service setup requires additional configuration
    // In production, you would integrate with services like Resend, SendGrid, or Mailchimp
    
    if (type === 'admin') {
      console.log('📧 ADMIN NOTIFICATION:', {
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'admin@alpineedu.com',
        subject: `New Contact Form Submission from ${data.name}`,
        message: `
          New contact form submission received:
          
          Name: ${data.name}
          Email: ${data.email}
          Phone: ${data.phone}
          Subject: ${data.subject}
          Country: ${data.country}
          Course: ${data.course}
          Message: ${data.message}
          
          Submitted at: ${data.createdAt}
        `
      });
    } else {
      console.log('📧 USER CONFIRMATION:', {
        to: data.email,
        subject: 'Thank you for contacting Alpine Education',
        message: `
          Dear ${data.name},
          
          Thank you for contacting Alpine Education & Visa Services. We have received your message and will get back to you within 24 hours.
          
          Your inquiry details:
          Subject: ${data.subject}
          Message: ${data.message}
          
          If you have any urgent questions, please call us at ${process.env.NEXT_PUBLIC_CONTACT_PHONE || '+977-1-4XXXXXXX'}.
          
          Best regards,
          Alpine Education Team
        `
      });
    }
    
    return true;
  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Database not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message, country, course } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create contact submission data
    const contactData = {
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      country: country || '',
      course: course || '',
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to Firestore
    const docRef = await addDoc(collection(db, 'contacts'), contactData);

    // Send email notifications
    await sendEmailNotification('admin', contactData);
    await sendEmailNotification('user', contactData);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      data: { id: docRef.id, ...contactData }
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 