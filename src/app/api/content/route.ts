import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-config';
import { collection, getDocs, getDoc, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

// GET - Fetch page content
export async function GET(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    
    if (pageId) {
      // Fetch specific page content
      const pageRef = doc(db, 'pages', pageId);
      const pageSnap = await getDoc(pageRef);
      
      if (pageSnap.exists()) {
        return NextResponse.json({
          success: true,
          data: { id: pageSnap.id, ...pageSnap.data() }
        });
      } else {
        return NextResponse.json(
          { success: false, error: 'Page not found' },
          { status: 404 }
        );
      }
    } else {
      // Fetch all pages
      const pagesRef = collection(db, 'pages');
      const querySnapshot = await getDocs(pagesRef);
      
      const pages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastUpdated: doc.data().lastUpdated?.toDate?.() || doc.data().lastUpdated
      }));

      return NextResponse.json({
        success: true,
        data: pages,
        count: pages.length
      });
    }
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create or update page content
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { pageId, title, content, seo } = body;
    
    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const pageData = {
      title: title || '',
      content: content || {},
      seo: seo || {
        title: '',
        description: '',
        keywords: []
      },
      lastUpdated: new Date()
    };

    // Check if page exists
    const pageRef = doc(db, 'pages', pageId);
    const pageSnap = await getDoc(pageRef);
    
    if (pageSnap.exists()) {
      // Update existing page
      await updateDoc(pageRef, pageData);
    } else {
      // Create new page
      await updateDoc(pageRef, pageData);
    }
    
    return NextResponse.json({
      success: true,
      message: pageSnap.exists() ? 'Page updated successfully' : 'Page created successfully',
      data: { id: pageId, ...pageData }
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update specific page content
export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { pageId, ...updateData } = body;
    
    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const pageRef = doc(db, 'pages', pageId);
    const updatePayload = {
      ...updateData,
      lastUpdated: new Date()
    };

    await updateDoc(pageRef, updatePayload);
    
    return NextResponse.json({
      success: true,
      message: 'Page updated successfully'
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete page content
export async function DELETE(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');
    
    if (!pageId) {
      return NextResponse.json(
        { success: false, error: 'Page ID is required' },
        { status: 400 }
      );
    }

    await deleteDoc(doc(db, 'pages', pageId));
    
    return NextResponse.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 