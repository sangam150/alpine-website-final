// @ts-nocheck
import { adminDb } from './firebase-admin';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase-config';

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'cta' | 'list' | 'image' | 'stats';
  value: string;
  page: string;
  section: string;
  order: number;
  isActive: boolean;
  metadata?: {
    level?: number; // for headings
    variant?: string; // for CTAs
    size?: string; // for text
    color?: string;
    alignment?: 'left' | 'center' | 'right';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface PageContent {
  page: string;
  blocks: ContentBlock[];
}

// Client-side functions for fetching content
export async function getPageContent(page: string): Promise<ContentBlock[]> {
  try {
    const q = query(
      collection(db, 'content'),
      where('page', '==', page),
      where('isActive', '==', true),
      orderBy('order')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as ContentBlock[];
  } catch (error) {
    console.error('Error fetching page content:', error);
    return [];
  }
}

export async function getContentBlock(id: string): Promise<ContentBlock | null> {
  try {
    const docRef = doc(db, 'content', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id,
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      } as ContentBlock;
    }
    return null;
  } catch (error) {
    console.error('Error fetching content block:', error);
    return null;
  }
}

// Server-side functions for admin operations
export async function createContentBlock(block: Omit<ContentBlock, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    
    const now = new Date();
    const docRef = doc(collection(adminDb, 'content'));
    
    await setDoc(docRef, {
      ...block,
      createdAt: now,
      updatedAt: now,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating content block:', error);
    throw error;
  }
}

export async function updateContentBlock(id: string, updates: Partial<ContentBlock>): Promise<void> {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    const docRef = doc(adminDb, 'content', id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating content block:', error);
    throw error;
  }
}

export async function deleteContentBlock(id: string): Promise<void> {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    const docRef = doc(adminDb, 'content', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting content block:', error);
    throw error;
  }
}

export async function getAllContentBlocks(): Promise<ContentBlock[]> {
  try {
    if (!adminDb) {
      throw new Error('Firebase Admin not initialized');
    }
    const q = query(collection(adminDb, 'content'), orderBy('page'), orderBy('order'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as ContentBlock[];
  } catch (error) {
    console.error('Error fetching all content blocks:', error);
    return [];
  }
}

// Helper functions for common content operations
export function getContentBlockClasses(block: ContentBlock): string {
  switch (block.type) {
    case 'heading':
      return `font-bold ${block.metadata?.size || 'text-2xl'} ${block.metadata?.color || 'text-gray-900'} ${block.metadata?.alignment || 'text-left'}`;
    
    case 'paragraph':
      return `${block.metadata?.size || 'text-base'} ${block.metadata?.color || 'text-gray-700'} ${block.metadata?.alignment || 'text-left'}`;
    
    case 'cta':
      return `px-6 py-3 rounded-lg font-semibold transition-colors ${
        block.metadata?.variant === 'primary' 
          ? 'bg-blue-600 text-white hover:bg-blue-700' 
          : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
      }`;
    
    case 'list':
      return 'list-disc list-inside space-y-2';
    
    case 'stats':
      return 'grid grid-cols-1 md:grid-cols-3 gap-6';
    
    default:
      return '';
  }
}

export function getContentBlockTag(block: ContentBlock): string {
  switch (block.type) {
    case 'heading':
      return `h${block.metadata?.level || 1}`;
    case 'paragraph':
      return 'p';
    case 'cta':
      return 'button';
    case 'list':
      return 'ul';
    case 'stats':
      return 'div';
    default:
      return 'div';
  }
}

// Initialize default content blocks
export const defaultContentBlocks: Omit<ContentBlock, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Homepage content
  {
    type: 'heading',
    value: 'Your Gateway to Global Education',
    page: 'home',
    section: 'hero',
    order: 1,
    isActive: true,
    metadata: { level: 1, size: 'text-5xl', alignment: 'center' }
  },
  {
    type: 'paragraph',
    value: 'Alpine Education & Visa Services helps students achieve their dreams of studying abroad. We provide comprehensive guidance for university applications, visa processes, and test preparation.',
    page: 'home',
    section: 'hero',
    order: 2,
    isActive: true,
    metadata: { size: 'text-xl', alignment: 'center' }
  },
  {
    type: 'cta',
    value: 'Book Free Counselling',
    page: 'home',
    section: 'hero',
    order: 3,
    isActive: true,
    metadata: { variant: 'primary' }
  },
  
  // About page content
  {
    type: 'heading',
    value: 'About Alpine Education',
    page: 'about',
    section: 'hero',
    order: 1,
    isActive: true,
    metadata: { level: 1, size: 'text-4xl' }
  },
  {
    type: 'paragraph',
    value: 'With over 10 years of experience in international education, Alpine Education has helped thousands of students successfully study abroad. Our expert counselors provide personalized guidance throughout your journey.',
    page: 'about',
    section: 'hero',
    order: 2,
    isActive: true,
    metadata: { size: 'text-lg' }
  },
  
  // Countries page content
  {
    type: 'heading',
    value: 'Study Destinations',
    page: 'countries',
    section: 'hero',
    order: 1,
    isActive: true,
    metadata: { level: 1, size: 'text-6xl', alignment: 'center' }
  },
  {
    type: 'paragraph',
    value: 'Find your perfect country for studying abroad. Filter by tuition, visa success, IELTS requirements, and more.',
    page: 'countries',
    section: 'hero',
    order: 2,
    isActive: true,
    metadata: { size: 'text-2xl', alignment: 'center' }
  }
];

export async function initializeDefaultContent(): Promise<void> {
  try {
    for (const block of defaultContentBlocks) {
      await createContentBlock(block);
    }
    console.log('Default content blocks initialized successfully');
  } catch (error) {
    console.error('Error initializing default content:', error);
  }
} 