import { NextResponse } from 'next/server';
import { fetchAll, addItem } from '@/lib/firestore-admin';

export async function GET() {
  try {
    const uploads = await fetchAll('uploads');
    return NextResponse.json(uploads);
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return NextResponse.json({ error: 'Failed to fetch uploads' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const uploadData = await request.json();
    const uploadId = await addItem('uploads', uploadData);
    return NextResponse.json({ id: uploadId, success: true });
  } catch (error) {
    console.error('Error creating upload record:', error);
    return NextResponse.json({ error: 'Failed to create upload record' }, { status: 500 });
  }
} 