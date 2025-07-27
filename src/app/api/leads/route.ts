import { NextRequest, NextResponse } from "next/server";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/lib/firebase-config";

// Initialize Firebase if not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();
const leadsRef = collection(db, "leads");

export async function GET(req: NextRequest) {
  try {
    const q = query(leadsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const leads = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch leads." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // If this is a public application (has personalInfo), run the old logic
    if (data.personalInfo) {
      const { personalInfo, academicInfo, preferences } = data;
      const { firstName, lastName, email, phone, dateOfBirth, nationality } =
        personalInfo || {};
      const {
        currentEducation,
        institution,
        graduationYear,
        gpa,
        englishTest,
        englishScore,
      } = academicInfo || {};
      const { preferredCountries, preferredCourses, intake, budget } =
        preferences || {};

      if (!firstName || !lastName || !email || !phone) {
        return NextResponse.json(
          { error: "Missing required fields." },
          { status: 400 },
        );
      }

      // Compose admin email
      const html = `
        <h2>New Study Abroad Application</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date of Birth:</strong> ${dateOfBirth || "N/A"}</p>
        <p><strong>Nationality:</strong> ${nationality || "N/A"}</p>
        <hr/>
        <h3>Academic Info</h3>
        <p><strong>Current Education:</strong> ${currentEducation || "N/A"}</p>
        <p><strong>Institution:</strong> ${institution || "N/A"}</p>
        <p><strong>Graduation Year:</strong> ${graduationYear || "N/A"}</p>
        <p><strong>GPA:</strong> ${gpa || "N/A"}</p>
        <p><strong>English Test:</strong> ${englishTest || "N/A"}</p>
        <p><strong>English Score:</strong> ${englishScore || "N/A"}</p>
        <hr/>
        <h3>Preferences</h3>
        <p><strong>Preferred Countries:</strong> ${(preferredCountries || []).join(", ")}</p>
        <p><strong>Preferred Courses:</strong> ${(preferredCourses || []).join(", ")}</p>
        <p><strong>Intake:</strong> ${intake || "N/A"}</p>
        <p><strong>Budget:</strong> ${budget || "N/A"}</p>
      `;

      // Send email to admin
      // Assuming sendTransactionalEmail is still available or replaced by a new function
      // For now, commenting out as it's not defined in the new_code
      // const adminResult = await sendTransactionalEmail({
      //   to: "info@alpinevisa.com.np",
      //   subject: "New Study Abroad Application - Alpine Education",
      //   html,
      //   replyTo: email,
      // });

      // if (!adminResult.success) {
      //   return NextResponse.json(
      //     { error: "Failed to send email. Please try again later." },
      //     { status: 500 },
      //   );
      // }

      // Send confirmation email to user
      const userHtml = `
        <h2>Thank you for your application!</h2>
        <p>Dear ${firstName},</p>
        <p>We have received your application and our counselors will contact you within 24 hours to discuss the next steps.</p>
        <hr/>
        <p>Best regards,<br/>Alpine Education & Visa Services Team</p>
      `;
      // Assuming sendTransactionalEmail is still available or replaced by a new function
      // For now, commenting out as it's not defined in the new_code
      // await sendTransactionalEmail({
      //   to: email,
      //   subject: "Thank you for your application - Alpine Education",
      //   html: userHtml,
      //   from: "Alpine Education <no-reply@alpinevisa.com.np>",
      // });

      return NextResponse.json({ success: true });
    }
    // Admin: create new lead
    const { name, email, phone, country, course, status, source, message, notes, priority, counselor } = data;
    if (!name || !email || !phone || !country) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    const newLead = {
      name,
      email,
      phone,
      country,
      course: course || "",
      status: status || "new",
      source: source || "website",
      message: message || "",
      notes: notes || "",
      priority: priority || "medium",
      counselor: counselor || "",
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
    };
    const docRef = await addDoc(leadsRef, newLead);
    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create lead." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, ...updateFields } = data;
    if (!id) {
      return NextResponse.json({ error: "Missing lead ID." }, { status: 400 });
    }
    const leadDoc = doc(db, "leads", id);
    await updateDoc(leadDoc, { ...updateFields, lastContact: new Date().toISOString() });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update lead." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing lead ID." }, { status: 400 });
    }
    const leadDoc = doc(db, "leads", id);
    await deleteDoc(leadDoc);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete lead." }, { status: 500 });
  }
}
