import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseInitialized } from '@/lib/firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET - Fetch all leads
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const leadsRef = collection(db, 'leads');
    const querySnapshot = await getDocs(leadsRef);
    
    const leads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }));

    return NextResponse.json({ 
      success: true, 
      data: leads,
      count: leads.length 
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch leads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Add new lead
export async function POST(request: NextRequest) {
  try {
    if (!isFirebaseInitialized() || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 503 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, country, course } = body;
    
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const leadData = {
      name,
      email,
      phone: phone || '',
      country: country || '',
      course: course || '',
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'leads'), leadData);
    
    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...leadData },
      message: 'Lead added successfully'
    });
  } catch (error) {
    console.error('Error adding lead:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update lead
export async function PUT(request: NextRequest) {
  try {
    if (!isFirebaseInitialized() || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const leadRef = doc(db, 'leads', id);
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };

    await updateDoc(leadRef, updatePayload);
    
    return NextResponse.json({
      success: true,
      message: 'Lead updated successfully'
    });
  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete lead
export async function DELETE(request: NextRequest) {
  try {
    if (!isFirebaseInitialized() || !db) {
      return NextResponse.json(
        { success: false, error: 'Firebase not initialized' },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'leads', id));
    
    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete lead',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 