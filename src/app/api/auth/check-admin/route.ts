import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseInitialized } from '@/lib/firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    if (!isFirebaseInitialized() || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists and has admin role
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return NextResponse.json({
        success: true,
        isAdmin: false
      });
    }

    const userData = userDoc.data();
    const isAdmin = userData.role === 'admin';

    return NextResponse.json({
      success: true,
      isAdmin
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check admin status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Check if user exists and has admin role
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      return NextResponse.json({
        success: true,
        isAdmin: false
      });
    }

    const userData = userDoc.data();
    const isAdmin = userData.role === 'admin';

    return NextResponse.json({
      success: true,
      isAdmin
    });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check admin status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 