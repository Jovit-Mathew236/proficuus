// app/api/profile/payment-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return NextResponse.json(
        { message: "Phone number is required" },
        { status: 400 }
      );
    }

    // Query the participants collection where phone field matches phoneNumber
    const participantsRef = collection(db, "participants");
    const q = query(participantsRef, where("phone", "==", phoneNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Get the first matching document and its reference
    const docRef = querySnapshot.docs[0].ref;
    const userData = querySnapshot.docs[0].data();

    // Update the attendance status
    await updateDoc(docRef, {
      attendanceStatus: true,
    });

    return NextResponse.json(
      {
        message: "Attendance marked successfully",
        user: { ...userData, attendanceStatus: true },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: `Error fetching user data: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Query the participants collection where attendanceStatus is true
    const participantsRef = collection(db, "participants");
    const q = query(participantsRef, where("attendanceStatus", "==", true));

    // Get documents once instead of setting up a real-time listener
    const querySnapshot = await getDocs(q);

    const attendees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Return regular JSON response instead of SSE
    return NextResponse.json({ attendees }, { status: 200 });
  } catch (error) {
    console.error("Error fetching attendees:", error);
    return NextResponse.json(
      {
        message: `Error fetching attendees: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
