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
    const { email, paymentStatus, paymentAmount, remarks } =
      await request.json();

    if (!email || paymentStatus === undefined || !paymentAmount) {
      return NextResponse.json(
        { message: "Email, payment status, and amount are required" },
        { status: 400 }
      );
    }

    // Query the volunteers collection where email matches
    const volunteersRef = collection(db, "volunteers");
    const q = query(volunteersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json(
        { message: "Volunteer not found" },
        { status: 404 }
      );
    }

    // Update the first matching document
    const volunteerDoc = querySnapshot.docs[0];
    const updateData: {
      paymentStatus: boolean;
      paymentAmount: number;
      remarks?: string;
    } = {
      paymentStatus,
      paymentAmount,
    };

    // Only add remarks if it's provided
    if (remarks !== undefined) {
      updateData.remarks = remarks;
    }

    await updateDoc(volunteerDoc.ref, updateData);

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
