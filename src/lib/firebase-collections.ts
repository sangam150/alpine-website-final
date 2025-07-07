import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  QuerySnapshot,
  DocumentData,
  DocumentReference,
  CollectionReference,
  Timestamp,
  FieldValue,
  
  serverTimestamp
} from 'firebase/firestore';
import { getFirestoreSafe } from './firebase-config';

// Collection names
export const COLLECTIONS = {
  COUNTRIES: 'countries',
  STUDENTS: 'students',
  ADMIN_USERS: 'adminUsers',
  UPLOADS: 'uploads',
  PAGES: 'pages',
  BLOG_POSTS: 'blogPosts',
  TESTIMONIALS: 'testimonials',
  APPLICATIONS: 'applications',
  QUIZ_RESULTS: 'quizResults',
  APPOINTMENTS: 'appointments',
  CONTENT: 'content',
  ANALYTICS: 'analytics'
} as const;

// Page types
export const PAGE_TYPES = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
  BLOG: 'blog',
  TEST_PREP: 'test-prep',
  STUDENT_SERVICES: 'student-services',
  STUDY_DESTINATIONS: 'study-destinations'
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  COUNSELOR: 'counselor',
  STUDENT: 'student'
} as const;

// Application status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  COMPLETED: 'completed'
} as const;

// File types
export const FILE_TYPES = {
  IMAGE: 'image',
  PDF: 'pdf',
  DOCUMENT: 'document',
  VIDEO: 'video'
} as const;

// Base interfaces
export interface BaseDocument {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  createdBy?: string;
  updatedBy?: string;
}

// Country interface
export interface Country extends BaseDocument {
  name: string;
  code: string;
  flag: string;
  flagUrl?: string;
  description: string;
  universities: number;
  avgTuition: string;
  visaSuccess: string;
  duration: string;
  popularCourses: string[];
  pros: string[];
  cons?: string[];
  visaRequirements: string[];
  livingCosts: {
    accommodation: string;
    food: string;
    transportation: string;
    utilities: string;
    total: string;
  };
  applicationDeadlines: {
    fall: string;
    spring: string;
    summer: string;
  };
  isActive: boolean;
  order: number;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Student interface
export interface Student extends BaseDocument {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality: string;
  passportNumber?: string;
  profileImage?: string;
  documents: {
    passport?: string;
    academicTranscripts?: string[];
    languageTestResults?: string[];
    recommendationLetters?: string[];
    statementOfPurpose?: string;
    cv?: string;
    financialDocuments?: string[];
  };
  applications: string[]; // Application IDs
  quizResults: string[]; // Quiz result IDs
  appointments: string[]; // Appointment IDs
  counselingStage: 'initial' | 'documentation' | 'application' | 'visa' | 'pre_departure' | 'completed';
  counselorId?: string;
  notes?: string;
  isActive: boolean;
  lastLogin?: Timestamp;
}

// Admin User interface
export interface AdminUser extends BaseDocument {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: keyof typeof USER_ROLES;
  permissions: string[];
  profileImage?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: Timestamp;
  department?: string;
  specializations?: string[];
}

// Upload interface
export interface Upload extends BaseDocument {
  fileName: string;
  originalName: string;
  fileType: keyof typeof FILE_TYPES;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  category: string;
  tags: string[];
  description?: string;
  isPublic: boolean;
  downloadCount: number;
  countryId?: string; // For country-specific files
  studentId?: string; // For student-specific files
}

// Page interface
export interface Page extends BaseDocument {
  type: keyof typeof PAGE_TYPES;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  featuredImage?: string;
  isPublished: boolean;
  publishedAt?: Timestamp;
  authorId: string;
  seoData?: {
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      type?: string;
    };
    twitterCard?: {
      title?: string;
      description?: string;
      image?: string;
    };
  };
}

// Blog Post interface
export interface BlogPost extends BaseDocument {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  publishDate: Timestamp;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
  viewCount: number;
  seoData?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    canonicalUrl?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: string;
      type?: string;
    };
  };
}

// Testimonial interface
export interface Testimonial extends BaseDocument {
  studentName: string;
  country: string;
  university: string;
  quote: string;
  image?: string;
  rating: number;
  isFeatured: boolean;
  studentId?: string;
  countryId?: string;
  isApproved: boolean;
}

// Application interface
export interface Application extends BaseDocument {
  studentId: string;
  countryId: string;
  universityId?: string;
  program: string;
  intake: string;
  status: keyof typeof APPLICATION_STATUS;
  documents: {
    academicTranscripts: string[];
    languageTestResults: string[];
    recommendationLetters: string[];
    statementOfPurpose: string;
    cv: string;
    financialDocuments: string[];
  };
  counselorId?: string;
  notes?: string;
  applicationFee?: number;
  tuitionFee?: number;
  scholarshipAmount?: number;
  timeline: {
    applicationSubmitted?: Timestamp;
    offerReceived?: Timestamp;
    visaApplied?: Timestamp;
    visaApproved?: Timestamp;
    departureDate?: Timestamp;
  };
}

// Quiz Result interface
export interface QuizResult extends BaseDocument {
  studentId: string;
  quizType: 'ielts' | 'pte' | 'toefl' | 'general';
  score: number;
  maxScore: number;
  answers: {
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }[];
  duration: number;
  completedAt: Timestamp;
  recommendations: string[];
  handbookGenerated: boolean;
  handbookUrl?: string;
}

// Appointment interface
export interface Appointment extends BaseDocument {
  studentId: string;
  counselorId: string;
  date: Timestamp;
  duration: number; // in minutes
  type: 'initial' | 'follow_up' | 'visa_prep' | 'pre_departure';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  meetingLink?: string;
  location?: string;
}

// Content interface
export interface Content extends BaseDocument {
  type: 'hero' | 'feature' | 'testimonial' | 'stat' | 'faq' | 'service';
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
  data?: Record<string, any>;
}

// Analytics interface
export interface Analytics extends BaseDocument {
  type: 'page_view' | 'form_submission' | 'file_download' | 'quiz_completion' | 'appointment_booking';
  userId?: string;
  sessionId?: string;
  page?: string;
  action?: string;
  data?: Record<string, any>;
  timestamp: Timestamp;
  userAgent?: string;
  ipAddress?: string;
  country?: string;
  city?: string;
}

// Generic CRUD operations
export class FirebaseService {
  static async getDocument<T extends BaseDocument>(
    collectionName: string, 
    docId: string
  ): Promise<T | null> {
    try {
      const db = getFirestoreSafe();
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching document from ${collectionName}:`, error);
      return null;
    }
  }

  static async getDocuments<T extends BaseDocument>(
    collectionName: string,
    constraints: Array<{ field: string; operator: any; value: any }> = [],
    orderByField?: string,
    orderDirection: 'asc' | 'desc' = 'asc',
    limitCount?: number
  ): Promise<T[]> {
    try {
      const db = getFirestoreSafe();
      let q: any = collection(db, collectionName);
      
      // Apply constraints
      constraints.forEach(({ field, operator, value }) => {
        q = query(q, where(field, operator, value));
      });
      
      // Apply ordering
      if (orderByField) {
        q = query(q, orderBy(orderByField, orderDirection));
      }
      
      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) }) as T);
    } catch (error) {
      console.error(`Error fetching documents from ${collectionName}:`, error);
      return [];
    }
  }

  static async addDocument<T extends BaseDocument>(
    collectionName: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string | null> {
    try {
      const db = getFirestoreSafe();
      const docData = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error);
      return null;
    }
  }

  static async updateDocument<T extends BaseDocument>(
    collectionName: string,
    docId: string,
    data: Partial<Omit<T, 'id' | 'createdAt'>>
  ): Promise<boolean> {
    try {
      const db = getFirestoreSafe();
      const docRef = doc(db, collectionName, docId);
      
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error);
      return false;
    }
  }

  static async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<boolean> {
    try {
      const db = getFirestoreSafe();
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error);
      return false;
    }
  }

  // Country-specific methods
  static async getCountries(): Promise<Country[]> {
    return this.getDocuments<Country>(
      COLLECTIONS.COUNTRIES,
      [{ field: 'isActive', operator: '==', value: true }],
      'order',
      'asc'
    );
  }

  static async getCountryBySlug(slug: string): Promise<Country | null> {
    const countries = await this.getDocuments<Country>(
      COLLECTIONS.COUNTRIES,
      [
        { field: 'slug', operator: '==', value: slug },
        { field: 'isActive', operator: '==', value: true }
      ]
    );
    return countries[0] || null;
  }

  // Student-specific methods
  static async getStudentByUid(uid: string): Promise<Student | null> {
    const students = await this.getDocuments<Student>(
      COLLECTIONS.STUDENTS,
      [{ field: 'uid', operator: '==', value: uid }]
    );
    return students[0] || null;
  }

  static async getStudentsByCounselor(counselorId: string): Promise<Student[]> {
    return this.getDocuments<Student>(
      COLLECTIONS.STUDENTS,
      [{ field: 'counselorId', operator: '==', value: counselorId }]
    );
  }

  // Admin User-specific methods
  static async getAdminUserByUid(uid: string): Promise<AdminUser | null> {
    const users = await this.getDocuments<AdminUser>(
      COLLECTIONS.ADMIN_USERS,
      [{ field: 'uid', operator: '==', value: uid }]
    );
    return users[0] || null;
  }

  static async getAdminUsersByRole(role: keyof typeof USER_ROLES): Promise<AdminUser[]> {
    return this.getDocuments<AdminUser>(
      COLLECTIONS.ADMIN_USERS,
      [{ field: 'role', operator: '==', value: role }]
    );
  }

  // Upload-specific methods
  static async getUploadsByCategory(category: string): Promise<Upload[]> {
    return this.getDocuments<Upload>(
      COLLECTIONS.UPLOADS,
      [{ field: 'category', operator: '==', value: category }],
      'createdAt',
      'desc'
    );
  }

  static async getUploadsByStudent(studentId: string): Promise<Upload[]> {
    return this.getDocuments<Upload>(
      COLLECTIONS.UPLOADS,
      [{ field: 'studentId', operator: '==', value: studentId }],
      'createdAt',
      'desc'
    );
  }

  // Page-specific methods
  static async getPageByType(type: keyof typeof PAGE_TYPES): Promise<Page | null> {
    const pages = await this.getDocuments<Page>(
      COLLECTIONS.PAGES,
      [
        { field: 'type', operator: '==', value: type },
        { field: 'isPublished', operator: '==', value: true }
      ]
    );
    return pages[0] || null;
  }

  static async getPageBySlug(slug: string): Promise<Page | null> {
    const pages = await this.getDocuments<Page>(
      COLLECTIONS.PAGES,
      [
        { field: 'slug', operator: '==', value: slug },
        { field: 'isPublished', operator: '==', value: true }
      ]
    );
    return pages[0] || null;
  }

  // Blog Post-specific methods
  static async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return this.getDocuments<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      [{ field: 'isPublished', operator: '==', value: true }],
      'publishDate',
      'desc'
    );
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getDocuments<BlogPost>(
      COLLECTIONS.BLOG_POSTS,
      [
        { field: 'slug', operator: '==', value: slug },
        { field: 'isPublished', operator: '==', value: true }
      ]
    );
    return posts[0] || null;
  }

  // Testimonial-specific methods
  static async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return this.getDocuments<Testimonial>(
      COLLECTIONS.TESTIMONIALS,
      [
        { field: 'isFeatured', operator: '==', value: true },
        { field: 'isApproved', operator: '==', value: true }
      ],
      'createdAt',
      'desc',
      6
    );
  }

  // Application-specific methods
  static async getApplicationsByStudent(studentId: string): Promise<Application[]> {
    return this.getDocuments<Application>(
      COLLECTIONS.APPLICATIONS,
      [{ field: 'studentId', operator: '==', value: studentId }],
      'createdAt',
      'desc'
    );
  }

  static async getApplicationsByCounselor(counselorId: string): Promise<Application[]> {
    return this.getDocuments<Application>(
      COLLECTIONS.APPLICATIONS,
      [{ field: 'counselorId', operator: '==', value: counselorId }],
      'createdAt',
      'desc'
    );
  }

  // Quiz Result-specific methods
  static async getQuizResultsByStudent(studentId: string): Promise<QuizResult[]> {
    return this.getDocuments<QuizResult>(
      COLLECTIONS.QUIZ_RESULTS,
      [{ field: 'studentId', operator: '==', value: studentId }],
      'completedAt',
      'desc'
    );
  }

  // Appointment-specific methods
  static async getAppointmentsByStudent(studentId: string): Promise<Appointment[]> {
    return this.getDocuments<Appointment>(
      COLLECTIONS.APPOINTMENTS,
      [{ field: 'studentId', operator: '==', value: studentId }],
      'date',
      'asc'
    );
  }

  static async getAppointmentsByCounselor(counselorId: string): Promise<Appointment[]> {
    return this.getDocuments<Appointment>(
      COLLECTIONS.APPOINTMENTS,
      [{ field: 'counselorId', operator: '==', value: counselorId }],
      'date',
      'asc'
    );
  }

  // Content-specific methods
  static async getContentBySection(section: string): Promise<Content[]> {
    return this.getDocuments<Content>(
      COLLECTIONS.CONTENT,
      [
        { field: 'section', operator: '==', value: section },
        { field: 'isActive', operator: '==', value: true }
      ],
      'order',
      'asc'
    );
  }

  // Analytics-specific methods
  static async addAnalyticsEvent(event: Omit<Analytics, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
    const success = await this.addDocument(COLLECTIONS.ANALYTICS, event);
    return success !== null;
  }

  static async getAnalyticsByType(type: string, days: number = 30): Promise<Analytics[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    return this.getDocuments<Analytics>(
      COLLECTIONS.ANALYTICS,
      [
        { field: 'type', operator: '==', value: type },
        { field: 'timestamp', operator: '>=', value: startDate }
      ],
      'timestamp',
      'desc'
    );
  }
} 