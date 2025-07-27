import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface AuditLogEntry {
  userId: string;
  userEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: any;
  timestamp?: any;
}

export async function logAuditEvent(entry: Omit<AuditLogEntry, "timestamp">) {
  const db = getFirestore();
  await addDoc(collection(db, "audit_logs"), {
    ...entry,
    timestamp: serverTimestamp(),
  });
} 