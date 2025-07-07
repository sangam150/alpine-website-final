import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase-config';
import { collection, getDocs, addDoc, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// GET - Fetch all uploads
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    let uploadsQuery: any = collection(db, 'uploads');
    
    // Apply filters if provided
    if (category) {
      uploadsQuery = query(uploadsQuery, where('category', '==', category));
    }
    
    if (type) {
      uploadsQuery = query(uploadsQuery, where('type', '==', type));
    }
    
    // Order by upload date
    uploadsQuery = query(uploadsQuery, orderBy('uploadedAt', 'desc'));
    
    const querySnapshot = await getDocs(uploadsQuery);
    
    const uploads = querySnapshot.docs.map(doc => {
      const data = doc.data() as { uploadedAt?: any } | undefined;
      return {
        id: doc.id,
        ...data,
        uploadedAt: data?.uploadedAt?.toDate?.() || data?.uploadedAt
      };
    });

    return NextResponse.json({ 
      success: true, 
      data: uploads,
      count: uploads.length 
    });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch uploads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Upload file
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const uploadedBy = formData.get('uploadedBy') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'File is required' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Category is required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum 10MB allowed' },
        { status: 400 }
      );
    }

    // Upload to Firebase Storage
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name}`;
    if (!storage) {
      return NextResponse.json(
        { success: false, error: 'Storage is not initialized' },
        { status: 500 }
      );
    }
    const storageRef = ref(storage, `uploads/${category}/${filename}`);
    
    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await uploadBytes(storageRef, arrayBuffer);
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // Save metadata to Firestore
    const uploadData = {
      filename: file.name,
      url: downloadURL,
      type: fileExtension === 'pdf' ? 'pdf' : 
            ['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension) ? 'image' : 'document',
      size: file.size,
      uploadedBy: uploadedBy || 'anonymous',
      uploadedAt: new Date(),
      category
    };

    const docRef = await addDoc(collection(db!, 'uploads'), uploadData);
    
    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...uploadData },
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to upload file',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete upload
export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    if (!storage) {
      return NextResponse.json(
        { success: false, error: 'Storage is not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Upload ID is required' },
        { status: 400 }
      );
    }

    // Get upload data from Firestore
    const uploadQuery = query(collection(db, 'uploads'), where('__name__', '==', id));
    const uploadSnapshot = await getDocs(uploadQuery);
    
    if (uploadSnapshot.empty) {
      return NextResponse.json(
        { success: false, error: 'Upload not found' },
        { status: 404 }
      );
    }

    const uploadData = uploadSnapshot.docs[0].data();
    
    // Delete from Storage
    try {
      const storageRef = ref(storage, uploadData.url);
      await deleteObject(storageRef);
    } catch (storageError) {
      console.warn('Failed to delete from storage:', storageError);
      // Continue with Firestore deletion even if storage deletion fails
    }

    // Delete from Firestore
    await deleteDoc(doc(db, 'uploads', id));
    
    return NextResponse.json({
      success: true,
      message: 'Upload deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting upload:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete upload',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 