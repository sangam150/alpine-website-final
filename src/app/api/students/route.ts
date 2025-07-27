import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();
const studentsRef = collection(db, "applications");

export async function GET(req: NextRequest) {
  try {
    const q = query(studentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, data: students });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch students." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const newStudent = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(studentsRef, newStudent);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create student." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateFields } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing student ID." }, { status: 400 });
    }
    const studentDoc = doc(db, "applications", id);
    await updateDoc(studentDoc, { ...updateFields });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update student." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing student ID." }, { status: 400 });
    }
    const studentDoc = doc(db, "applications", id);
    await deleteDoc(studentDoc);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete student." }, { status: 500 });
  }
} 