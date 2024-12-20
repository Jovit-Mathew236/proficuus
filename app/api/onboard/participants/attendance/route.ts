// app/api/profile/payment-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  onSnapshot,
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

export async function GET(request: NextRequest) {
  const encoder = new TextEncoder();

  try {
    // Create a ReadableStream for SSE
    const stream = new ReadableStream({
      start(controller) {
        // Send initial heartbeat
        controller.enqueue(encoder.encode(": heartbeat\n\n"));

        // Set up heartbeat interval
        const heartbeat = setInterval(() => {
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        }, 30000); // Send heartbeat every 30 seconds

        // Query the participants collection where attendanceStatus is true
        const participantsRef = collection(db, "participants");
        const q = query(participantsRef, where("attendanceStatus", "==", true));

        // Set up real-time listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const attendees = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Send the data as a SSE event
          const data = `data: ${JSON.stringify({ attendees })}\n\n`;
          controller.enqueue(encoder.encode(data));
        });

        // Clean up listener when the connection closes
        request.signal.addEventListener("abort", () => {
          clearInterval(heartbeat);
          unsubscribe();
        });
      },
    });

    // Return the stream as a Server-Sent Events response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "X-Accel-Buffering": "no", // Disable Nginx buffering
      },
    });
  } catch (error) {
    console.error("Error setting up real-time connection:", error);
    return NextResponse.json(
      {
        message: `Error setting up real-time connection: ${
          (error as Error).message
        }`,
      },
      { status: 500 }
    );
  }
}
