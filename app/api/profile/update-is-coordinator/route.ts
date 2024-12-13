// app/api/profile/payment-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function POST(request: NextRequest) {
  try {
    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // First, check if the document exists
    const userDocRef = doc(db, "participants", uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update only the necessary fields
    const updateData = {
      isCoordinator: true, // Set paymentVerified to true
      updatedAt: new Date().toISOString(),
    };

    // Update the document
    await updateDoc(userDocRef, updateData);

    return NextResponse.json(
      {
        message: "Payment verified successfully",
      },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error uploading payment image:", error);
    return NextResponse.json(
      { message: `Error uploading payment image: ${error.message}` },
      { status: 500 }
    );
  }
}
