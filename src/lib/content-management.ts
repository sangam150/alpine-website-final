// @ts-nocheck
import { adminDb } from './firebase-admin';
import { collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';
import { db, storage } from './firebase-config';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

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
  id: string;
  title: string;
  content: any;
  lastUpdated: Date;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  slug: string;
  description: string;
  universities: number;
  avgTuition: string;
  visaSuccess: string;
  duration: string;
  popularCourses: string[];
  pros: string[];
  visaInfo: {
    requirements: string[];
    processingTime: string;
    documents: string[];
  };
  image: string;
}

export interface Upload {
  id: string;
  filename: string;
  url: string;
  type: 'pdf' | 'image' | 'document';
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
  category: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string;
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  progress: number;
  documents: string[];
  quizResult?: any;
  counselorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'counselor' | 'student';
  name: string;
  permissions: string[];
  createdAt: Date;
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

export class ContentManager {
  // Pages Management
  static async getPageContent(pageId: string): Promise<PageContent | null> {
    try {
      const docRef = doc(db, 'pages', pageId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as PageContent;
      }
      return null;
    } catch (error) {
      console.error('Error fetching page content:', error);
      return null;
    }
  }

  static async updatePageContent(pageId: string, content: Partial<PageContent>): Promise<boolean> {
    try {
      const docRef = doc(db, 'pages', pageId);
      await updateDoc(docRef, {
        ...content,
        lastUpdated: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating page content:', error);
      return false;
    }
  }

  // Countries Management
  static async getCountries(): Promise<Country[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'countries'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Country);
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  static async getCountry(slug: string): Promise<Country | null> {
    try {
      const q = query(collection(db, 'countries'), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Country;
      }
      return null;
    } catch (error) {
      console.error('Error fetching country:', error);
      return null;
    }
  }

  static async addCountry(country: Omit<Country, 'id'>): Promise<string | null> {
    try {
      const docRef = await addDoc(collection(db, 'countries'), country);
      return docRef.id;
    } catch (error) {
      console.error('Error adding country:', error);
      return null;
    }
  }

  static async updateCountry(id: string, updates: Partial<Country>): Promise<boolean> {
    try {
      const docRef = doc(db, 'countries', id);
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error('Error updating country:', error);
      return false;
    }
  }

  static async deleteCountry(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'countries', id));
      return true;
    } catch (error) {
      console.error('Error deleting country:', error);
      return false;
    }
  }

  // File Upload Management
  static async uploadFile(
    file: File, 
    category: string, 
    uploadedBy: string
  ): Promise<Upload | null> {
    try {
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `uploads/${category}/${filename}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      const uploadData: Omit<Upload, 'id'> = {
        filename: file.name,
        url: downloadURL,
        type: file.type.includes('pdf') ? 'pdf' : 
              file.type.includes('image') ? 'image' : 'document',
        size: file.size,
        uploadedBy,
        uploadedAt: new Date(),
        category
      };
      
      const docRef = await addDoc(collection(db, 'uploads'), uploadData);
      return { id: docRef.id, ...uploadData };
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  }

  static async getUploads(category?: string): Promise<Upload[]> {
    try {
      let q = collection(db, 'uploads');
      if (category) {
        q = query(q, where('category', '==', category));
      }
      q = query(q, orderBy('uploadedAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Upload);
    } catch (error) {
      console.error('Error fetching uploads:', error);
      return [];
    }
  }

  static async deleteUpload(id: string, filename: string): Promise<boolean> {
    try {
      // Delete from Storage
      const storageRef = ref(storage, `uploads/${filename}`);
      await deleteObject(storageRef);
      
      // Delete from Firestore
      await deleteDoc(doc(db, 'uploads', id));
      return true;
    } catch (error) {
      console.error('Error deleting upload:', error);
      return false;
    }
  }

  // Students Management
  static async getStudents(): Promise<Student[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Student);
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  }

  static async getStudent(id: string): Promise<Student | null> {
    try {
      const docRef = doc(db, 'students', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Student;
      }
      return null;
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  }

  static async addStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<string | null> {
    try {
      const studentData = {
        ...student,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const docRef = await addDoc(collection(db, 'students'), studentData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding student:', error);
      return null;
    }
  }

  static async updateStudent(id: string, updates: Partial<Student>): Promise<boolean> {
    try {
      const docRef = doc(db, 'students', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating student:', error);
      return false;
    }
  }

  // Admin Users Management
  static async getAdminUsers(): Promise<AdminUser[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'adminUsers'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as AdminUser);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      return [];
    }
  }

  static async getAdminUser(id: string): Promise<AdminUser | null> {
    try {
      const docRef = doc(db, 'adminUsers', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as AdminUser;
      }
      return null;
    } catch (error) {
      console.error('Error fetching admin user:', error);
      return null;
    }
  }

  static async addAdminUser(user: Omit<AdminUser, 'id' | 'createdAt'>): Promise<string | null> {
    try {
      const userData = {
        ...user,
        createdAt: new Date()
      };
      const docRef = await addDoc(collection(db, 'adminUsers'), userData);
      return docRef.id;
    } catch (error) {
      console.error('Error adding admin user:', error);
      return null;
    }
  }

  // Dashboard Statistics
  static async getDashboardStats() {
    try {
      const [students, uploads, countries] = await Promise.all([
        getDocs(collection(db, 'students')),
        getDocs(collection(db, 'uploads')),
        getDocs(collection(db, 'countries'))
      ]);

      const totalStudents = students.size;
      const totalUploads = uploads.size;
      const totalCountries = countries.size;

      // Calculate status distribution
      const statusCounts = students.docs.reduce((acc, doc) => {
        const status = doc.data().status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        totalStudents,
        totalUploads,
        totalCountries,
        statusCounts,
        recentStudents: students.docs.slice(0, 5).map(doc => ({ id: doc.id, ...doc.data() }))
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        totalStudents: 0,
        totalUploads: 0,
        totalCountries: 0,
        statusCounts: {},
        recentStudents: []
      };
    }
  }
}

export default ContentManager; 