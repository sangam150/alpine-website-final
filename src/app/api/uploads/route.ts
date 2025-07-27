import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();
const uploadsRef = collection(db, "uploads");

export async function GET(req: NextRequest) {
  try {
    const q = query(uploadsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const uploads = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, data: uploads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch uploads." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Validate required fields
    if (!data.fileName || !data.mimeType || !data.size || !data.uploadedBy) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const newUpload = {
      ...data,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(uploadsRef, newUpload);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create upload." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateFields } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing upload ID." }, { status: 400 });
    }
    const uploadDoc = doc(db, "uploads", id);
    await updateDoc(uploadDoc, { ...updateFields });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update upload." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing upload ID." }, { status: 400 });
    }
    const uploadDoc = doc(db, "uploads", id);
    await deleteDoc(uploadDoc);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete upload." }, { status: 500 });
  }
}
