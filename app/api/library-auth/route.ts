import { NextResponse } from 'next/server';

// 1. This data is now SECURE. It only exists on the server.
const authorizedStudents = [
  { id: "C&L-D-1", dob: "1998-07-05", name: "Dr. NANDHINI R" },
  { id: "C&L-D-2", dob: "2003-02-27", name: "Dr. SAMEERA SHAMA A" },
  { id: "C&L-D-3", dob: "2003-03-10", name: "Dr. AMIRAH FATHIMA MOHAMED IMRAN ALI" },
  { id: "C&L-D-4", dob: "1982-04-17", name: "Dr. ANURADHA .B" },
  { id: "C&L-D-5", dob: "1994-04-12", name: "Dr. DARA RAJAVARA KUMAR" },
  { id: "C&L-D-6", dob: "1998-04-21", name: "Dr. VRINDA G KRISHNAN" },
  { id: "C&L-D-7", dob: "1974-11-19", name: "Dr. SHAMA FAROOQH" },
  { id: "C&L-D-8", dob: "1992-06-23", name: "Dr. PANTHAM SAHITHI SREEJA" },
];

// 2. These links are also SECURE. The user only gets them IF they log in.
const libraryDocuments = [
  { id: "lib1", title: "Level 4 NVQF Clinical Cosmetology Syllabus", desc: "Complete module breakdown, learning outcomes, and assessment criteria.", file: "/assets/CLINICAL.pdf" },
  { id: "lib2", title: "International Fellowship Facial Aesthetics Guide", desc: "South Korea & Dubai clinical exposure itinerary and advanced protocol handbooks.", file: "/assets/comman.pdf" },
  { id: "lib3", title: "Cosmetic Dentistry Mastership Blueprint", desc: "Smile design, veneers, and full-mouth rehabilitation step-by-step documentation.", file: "/assets/CLINICAL.pdf" },
  { id: "lib4", title: "ISPMU Permanent Makeup Technical Manual", desc: "Advanced pigment theory, mapping, and machine handling instructions for enrolled students.", file: "/assets/comman.pdf" },
];

export async function POST(request: Request) {
  try {
    // Get the ID and DOB the user typed into the frontend
    const { enrollmentId, dob } = await request.json();

    // Check if they exist in our secure server list
    const authorizedUser = authorizedStudents.find(
      (student) => student.id.toLowerCase() === enrollmentId.trim().toLowerCase() && student.dob === dob
    );

    if (authorizedUser) {
      // SUCCESS: Send back their name and the secret documents!
      return NextResponse.json({ 
        success: true, 
        name: authorizedUser.name,
        documents: libraryDocuments
      });
    } else {
      // FAIL: Send back a 401 Unauthorized error
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}