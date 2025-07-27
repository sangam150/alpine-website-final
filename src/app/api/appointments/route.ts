import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-config";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();
const appointmentsRef = collection(db, "appointments");

export async function GET(req: NextRequest) {
  try {
    const q = query(appointmentsRef, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, data: appointments });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch appointments." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { studentName, studentEmail, studentPhone, date, time, duration, type, status, counselor, notes, meetingLink } = data;
    if (!studentName || !studentEmail || !studentPhone || !date || !time || !type || !status || !counselor) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const newAppointment = {
      studentName,
      studentEmail,
      studentPhone,
      date,
      time,
      duration: duration || 30,
      type,
      status,
      counselor,
      notes: notes || "",
      meetingLink: meetingLink || "",
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(appointmentsRef, newAppointment);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create appointment." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateFields } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing appointment ID." }, { status: 400 });
    }
    const appointmentDoc = doc(db, "appointments", id);
    await updateDoc(appointmentDoc, { ...updateFields });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update appointment." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing appointment ID." }, { status: 400 });
    }
    const appointmentDoc = doc(db, "appointments", id);
    await deleteDoc(appointmentDoc);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete appointment." }, { status: 500 });
  }
} 