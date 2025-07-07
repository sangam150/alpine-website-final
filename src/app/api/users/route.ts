import { NextRequest, NextResponse } from 'next/server';
import { db, isFirebaseInitialized } from '@/lib/firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

// GET - Fetch all users
export async function GET() {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const usersRef = collection(db, 'users');
    const querySnapshot = await getDocs(usersRef);
    
    const users = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt
    }));

    return NextResponse.json({ 
      success: true, 
      data: users,
      count: users.length 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Add new user
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
    const { email, role, name } = body;
    
    if (!email || !role) {
      return NextResponse.json(
        { success: false, error: 'Email and role are required' },
        { status: 400 }
      );
    }

    const userData = {
      email,
      role,
      name: name || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'users'), userData);
    
    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...userData },
      message: 'User added successfully'
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update user
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
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userRef = doc(db, 'users', id);
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };

    await updateDoc(userRef, updatePayload);
    
    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
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
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'users', id));
    
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 