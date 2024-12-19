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
    const { email, paymentStatus, paymentAmount } = await request.json();

    if (!email || paymentStatus === undefined || !paymentAmount) {
      return NextResponse.json(
        { message: "Email, payment status, and amount are required" },
        { status: 400 }
      );
    }

    // Query the participants collection where email matches
    const participantsRef = collection(db, "participants");
    const q = query(participantsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "Participant not found" },
        { status: 404 }
      );
    }

    // Update the first matching document
    const participantDoc = querySnapshot.docs[0];
    await updateDoc(participantDoc.ref, {
      paymentStatus,
      paymentAmount,
    });

    return NextResponse.json(
      {
        message: "Payment status updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json(
      { message: `Error updating payment status: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
