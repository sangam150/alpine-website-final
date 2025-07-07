import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-config';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, where, orderBy, Query } from 'firebase/firestore';

// GET - Fetch all students
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const counselorId = searchParams.get('counselorId');
    
    let studentsQuery: Query = collection(db, 'students');
    
    // Apply filters if provided
    if (status) {
      studentsQuery = query(studentsQuery, where('status', '==', status));
    }
    
    if (counselorId) {
      studentsQuery = query(studentsQuery, where('counselorId', '==', counselorId));
    }
    
    // Order by creation date
    studentsQuery = query(studentsQuery, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(studentsQuery);
    
    const students = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
    }));

    return NextResponse.json({ 
      success: true, 
      data: students,
      count: students.length 
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch students',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Add new student
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, country, course, counselorId } = body;
    
    if (!name || !email || !country || !course) {
      return NextResponse.json(
        { success: false, error: 'Name, email, country, and course are required' },
        { status: 400 }
      );
    }

    // Check if student with same email already exists
    const existingQuery = query(collection(db, 'students'), where('email', '==', email));
    const existingSnapshot = await getDocs(existingQuery);
    
    if (!existingSnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Student with this email already exists' },
        { status: 409 }
      );
    }

    const studentData = {
      name,
      email,
      phone: phone || '',
      country,
      course,
      status: 'pending',
      progress: 0,
      documents: [],
      quizResult: null,
      counselorId: counselorId || '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await addDoc(collection(db, 'students'), studentData);
    
    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...studentData },
      message: 'Student added successfully'
    });
  } catch (error) {
    console.error('Error adding student:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to add student',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update student
export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    const studentRef = doc(db, 'students', id);
    const updatePayload = {
      ...updateData,
      updatedAt: new Date()
    };

    await updateDoc(studentRef, updatePayload);
    
    return NextResponse.json({
      success: true,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('Error updating student:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update student',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete student
export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Student ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'students', id));
    
    return NextResponse.json({
      success: true,
      message: 'Student deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete student',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 