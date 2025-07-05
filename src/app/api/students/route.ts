import { NextResponse } from 'next/server';
import { fetchAll, addItem } from '@/lib/firestore-admin';

export async function GET() {
  try {
    const students = await fetchAll('students');
    return NextResponse.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const studentData = await request.json();
    const studentId = await addItem('students', studentData);
    return NextResponse.json({ id: studentId, success: true });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ error: 'Failed to create student' }, { status: 500 });
  }
} 