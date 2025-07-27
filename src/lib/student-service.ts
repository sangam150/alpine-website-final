import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getFirestoreSafe, getStorageSafe } from "./firebase-config";
import { Student, Upload, Application } from "./firebase-collections";

export interface StudentProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  nationality: string;
  passportNumber?: string;
  profileImage?: string;
  counselingStage:
    | "initial"
    | "documentation"
    | "application"
    | "visa"
    | "pre_departure"
    | "completed";
  counselorId?: string;
  notes?: string;
  isActive: boolean;
  lastLogin?: Timestamp;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface StudentDocument {
  id: string;
  fileName: string;
  originalName: string;
  fileType: "image" | "pdf" | "document" | "video";
  mimeType: string;
  size: number;
  url: string;
  category: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
  uploadedAt: Timestamp;
  notes?: string;
}

export interface StudentApplication {
  id: string;
  countryId: string;
  countryName: string;
  universityId?: string;
  universityName?: string;
  program: string;
  intake: string;
  status: "pending" | "in_progress" | "approved" | "rejected" | "completed";
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export class StudentService {
  private static getDb() {
    return getFirestoreSafe();
  }
  private static getStorage() {
    return getStorageSafe();
  }

  // Get student profile by UID
  static async getStudentProfile(uid: string): Promise<StudentProfile | null> {
    try {
      const db = this.getDb();
      const docRef = doc(db, "students", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { uid, ...docSnap.data() } as StudentProfile;
      }
      return null;
    } catch (error) {
      console.error("Error getting student profile:", error);
      throw error;
    }
  }

  // Create or update student profile
  static async updateStudentProfile(
    uid: string,
    data: Partial<StudentProfile>,
  ): Promise<void> {
    try {
      const db = this.getDb();
      const docRef = doc(db, "students", uid);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating student profile:", error);
      throw error;
    }
  }

  // Create new student profile
  static async createStudentProfile(
    uid: string,
    data: Omit<StudentProfile, "uid" | "createdAt" | "updatedAt">,
  ): Promise<void> {
    try {
      const db = this.getDb();
      const docRef = doc(db, "students", uid);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error creating student profile:", error);
      throw error;
    }
  }

  // Get student documents
  static async getStudentDocuments(uid: string): Promise<StudentDocument[]> {
    try {
      const db = this.getDb();
      const q = query(
        collection(db, "uploads"),
        where("uploadedBy", "==", uid),
        where("studentId", "==", uid),
      );

      const querySnapshot = await getDocs(q);
      const documents: StudentDocument[] = [];

      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() } as StudentDocument);
      });

      return documents.sort(
        (a, b) => b.uploadedAt.toMillis() - a.uploadedAt.toMillis(),
      );
    } catch (error) {
      console.error("Error getting student documents:", error);
      throw error;
    }
  }

  // Upload document
  static async uploadDocument(
    uid: string,
    file: File,
    category: string,
    description?: string,
  ): Promise<StudentDocument> {
    try {
      const storage = this.getStorage();
      // Upload file to Firebase Storage
      const fileName = `${uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `student-documents/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Determine file type
      const fileType = file.type.startsWith("image/")
        ? "image"
        : file.type === "application/pdf"
          ? "pdf"
          : file.type.startsWith("video/")
            ? "video"
            : "document";

      // Create document record in Firestore
      const db = this.getDb();
      const docData = {
        fileName: fileName,
        originalName: file.name,
        fileType: fileType as 'image' | 'pdf' | 'document' | 'video',
        mimeType: file.type,
        size: file.size,
        url: downloadURL,
        uploadedBy: uid,
        studentId: uid,
        category: category,
        description: description,
        status: "uploaded" as 'pending' | 'uploaded' | 'approved' | 'rejected',
        uploadedAt: serverTimestamp(),
      };
      const docRef = await addDoc(collection(db, "uploads"), docData);
      return { id: docRef.id, ...docData, uploadedAt: new Date() as any };
    } catch (error) {
      console.error("Error uploading document:", error);
      throw error;
    }
  }

  // Delete document
  static async deleteDocument(
    documentId: string,
    fileName: string,
  ): Promise<void> {
    try {
      const db = this.getDb();
      // Delete from Firestore
      const docRef = doc(db, "uploads", documentId);
      await deleteDoc(docRef);

      const storage = this.getStorage();
      // Delete from Storage
      const storageRef = ref(storage, `student-documents/${fileName}`);
      await deleteObject(storageRef);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  }

  // Get student applications
  static async getStudentApplications(
    uid: string,
  ): Promise<StudentApplication[]> {
    try {
      const db = this.getDb();
      const q = query(
        collection(db, "applications"),
        where("studentId", "==", uid),
      );

      const querySnapshot = await getDocs(q);
      const applications: StudentApplication[] = [];

      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() } as StudentApplication);
      });

      return applications.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis(),
      );
    } catch (error) {
      console.error("Error getting student applications:", error);
      throw error;
    }
  }

  // Create new application
  static async createApplication(
    uid: string,
    data: Omit<StudentApplication, "id" | "createdAt" | "updatedAt">,
  ): Promise<string> {
    try {
      const db = this.getDb();
      const docData = {
        studentId: uid,
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "applications"), docData);
      return docRef.id;
    } catch (error) {
      console.error("Error creating application:", error);
      throw error;
    }
  }

  // Update application
  static async updateApplication(
    applicationId: string,
    data: Partial<StudentApplication>,
  ): Promise<void> {
    try {
      const db = this.getDb();
      const docRef = doc(db, "applications", applicationId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating application:", error);
      throw error;
    }
  }

  // Get student timeline/events
  static async getStudentTimeline(uid: string): Promise<any[]> {
    try {
      // This would typically fetch from a timeline/events collection
      // For now, return a mock timeline
      return [
        {
          date: "2025-01-05",
          event: "Initial Consultation",
          status: "completed",
        },
        {
          date: "2025-01-10",
          event: "Document Collection Started",
          status: "completed",
        },
        {
          date: "2025-01-15",
          event: "University Application Submitted",
          status: "completed",
        },
        {
          date: "2025-01-20",
          event: "Visa Application Preparation",
          status: "in-progress",
        },
        {
          date: "2025-02-01",
          event: "Visa Application Submission",
          status: "pending",
        },
        { date: "2025-02-15", event: "Visa Interview", status: "pending" },
        { date: "2025-03-01", event: "Visa Decision", status: "pending" },
      ];
    } catch (error) {
      console.error("Error getting student timeline:", error);
      throw error;
    }
  }

  // Update last login
  static async updateLastLogin(uid: string): Promise<void> {
    try {
      const db = this.getDb();
      const docRef = doc(db, "students", uid);
      await updateDoc(docRef, {
        lastLogin: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error updating last login:", error);
      // Don't throw error for this as it's not critical
    }
  }
}
