import { NextRequest, NextResponse } from 'next/server';
import { db, storage } from '@/lib/firebase-config';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// POST - Generate handbook PDF
export async function POST(request: NextRequest) {
  try {
    if (!db) {
      return NextResponse.json(
        { success: false, error: 'Firestore is not initialized' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { studentId, country, quizData } = body;
    
    if (!studentId || !country || !quizData) {
      return NextResponse.json(
        { success: false, error: 'Student ID, country, and quiz data are required' },
        { status: 400 }
      );
    }

    // Get student data
    const studentRef = doc(db, 'students', studentId);
    const studentSnap = await getDoc(studentRef);
    
    if (!studentSnap.exists()) {
      return NextResponse.json(
        { success: false, error: 'Student not found' },
        { status: 404 }
      );
    }

    const studentData = studentSnap.data();

    // Generate handbook content based on quiz data and country
    const handbookContent = generateHandbookContent(studentData, country, quizData);
    
    // Create PDF (in a real implementation, you would use a PDF library like pdf-lib or html2pdf)
    const pdfBuffer = await generatePDF(handbookContent);
    
    // Upload PDF to Firebase Storage
    if (!storage) {
      return NextResponse.json(
        { success: false, error: 'Storage is not initialized' },
        { status: 500 }
      );
    }
    const storageRef = ref(storage, `handbooks/${studentId}_${Date.now()}.pdf`);
    
    await uploadBytes(storageRef, pdfBuffer);
    const downloadURL = await getDownloadURL(storageRef);

    // Save handbook record to Firestore
    const handbookData = {
      studentId,
      country,
      filename: `${studentId}_${Date.now()}.pdf`,
      url: downloadURL,
      quizData,
      generatedAt: new Date(),
      size: pdfBuffer.length
    };

    const docRef = await addDoc(collection(db, 'handbooks'), handbookData);
    
    return NextResponse.json({
      success: true,
      data: { id: docRef.id, ...handbookData },
      message: 'Handbook generated successfully'
    });
  } catch (error) {
    console.error('Error generating handbook:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate handbook',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to generate handbook content
function generateHandbookContent(studentData: any, country: string, quizData: any) {
  const countryInfo = getCountryInfo(country);
  
  return {
    title: `${country} Study Abroad Handbook`,
    student: {
      name: studentData.name,
      email: studentData.email,
      course: studentData.course
    },
    country: countryInfo,
    quizResults: quizData,
    sections: [
      {
        title: 'Country Overview',
        content: countryInfo.description
      },
      {
        title: 'Visa Requirements',
        content: countryInfo.visaInfo.requirements.join('\n')
      },
      {
        title: 'University Recommendations',
        content: `Based on your quiz results, we recommend focusing on ${quizData.preferredField} programs.`
      },
      {
        title: 'Application Timeline',
        content: generateTimeline(country, quizData)
      },
      {
        title: 'Cost Breakdown',
        content: generateCostBreakdown(country, quizData)
      },
      {
        title: 'Next Steps',
        content: generateNextSteps(quizData)
      }
    ]
  };
}

// Helper function to get country information
function getCountryInfo(country: string) {
  const countries: any = {
    'canada': {
      name: 'Canada',
      description: 'Canada offers world-class education with post-study work opportunities and a high quality of life.',
      universities: 96,
      avgTuition: 'CAD 20,000-35,000',
      visaSuccess: '95%',
      visaInfo: {
        requirements: [
          'Valid passport',
          'Letter of acceptance from DLI',
          'Proof of financial support',
          'Medical examination',
          'Police certificate'
        ],
        processingTime: '4-6 weeks',
        documents: ['Study permit application', 'Biometrics', 'Medical exam results']
      }
    },
    'australia': {
      name: 'Australia',
      description: 'Australia provides excellent education with beautiful campuses and strong industry connections.',
      universities: 43,
      avgTuition: 'AUD 30,000-45,000',
      visaSuccess: '92%',
      visaInfo: {
        requirements: [
          'Valid passport',
          'Confirmation of Enrolment (CoE)',
          'Financial capacity evidence',
          'English proficiency',
          'Health insurance'
        ],
        processingTime: '3-4 weeks',
        documents: ['Student visa application', 'Health check', 'Character assessment']
      }
    },
    'uk': {
      name: 'United Kingdom',
      description: 'The UK offers historic universities with global recognition and diverse cultural experiences.',
      universities: 130,
      avgTuition: 'GBP 15,000-35,000',
      visaSuccess: '88%',
      visaInfo: {
        requirements: [
          'Valid passport',
          'CAS letter from university',
          'Financial evidence',
          'English language test',
          'Tuberculosis test'
        ],
        processingTime: '3 weeks',
        documents: ['Student visa application', 'Biometric residence permit', 'Healthcare surcharge']
      }
    }
  };

  return countries[country.toLowerCase()] || countries['canada'];
}

// Helper function to generate application timeline
function generateTimeline(country: string, quizData: any) {
  const currentDate = new Date();
  const nextYear = currentDate.getFullYear() + 1;
  
  return [
    `September ${currentDate.getFullYear()}: Start researching universities`,
    `October ${currentDate.getFullYear()}: Prepare application documents`,
    `November ${currentDate.getFullYear()}: Submit university applications`,
    `January ${nextYear}: Receive university offers`,
    `February ${nextYear}: Apply for student visa`,
    `March ${nextYear}: Book travel arrangements`,
    `September ${nextYear}: Begin studies`
  ].join('\n');
}

// Helper function to generate cost breakdown
function generateCostBreakdown(country: string, quizData: any) {
  const costs: any = {
    'canada': {
      tuition: 'CAD 20,000-35,000/year',
      accommodation: 'CAD 8,000-15,000/year',
      living: 'CAD 10,000-15,000/year',
      insurance: 'CAD 600-800/year'
    },
    'australia': {
      tuition: 'AUD 30,000-45,000/year',
      accommodation: 'AUD 12,000-20,000/year',
      living: 'AUD 15,000-20,000/year',
      insurance: 'AUD 500-700/year'
    },
    'uk': {
      tuition: 'GBP 15,000-35,000/year',
      accommodation: 'GBP 8,000-15,000/year',
      living: 'GBP 10,000-15,000/year',
      insurance: 'GBP 300-500/year'
    }
  };

  const countryCosts = costs[country.toLowerCase()] || costs['canada'];
  
  return Object.entries(countryCosts)
    .map(([category, amount]) => `${category.charAt(0).toUpperCase() + category.slice(1)}: ${amount}`)
    .join('\n');
}

// Helper function to generate next steps
function generateNextSteps(quizData: any) {
  return [
    'Schedule a consultation with our education counselor',
    'Prepare required documents for university application',
    'Take English proficiency test (IELTS/TOEFL)',
    'Research and shortlist universities',
    'Apply for scholarships and financial aid',
    'Book visa appointment and prepare visa documents'
  ].join('\n');
}

// Helper function to generate PDF (mock implementation)
async function generatePDF(content: any): Promise<Buffer> {
  // In a real implementation, you would use a PDF library
  // For now, we'll return a mock PDF buffer
  const pdfContent = `
    ${content.title}
    
    Student: ${content.student.name}
    Email: ${content.student.email}
    Course: ${content.student.course}
    
    ${content.sections.map((section: any) => `
    ${section.title}
    ${section.content}
    `).join('\n')}
  `;
  
  // Convert to Buffer (mock implementation)
  return Buffer.from(pdfContent, 'utf-8');
} 