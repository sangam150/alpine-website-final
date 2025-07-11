import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-config';
import { collection, addDoc } from 'firebase/firestore';

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

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

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