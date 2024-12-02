import { NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { db } from "@/lib/firebase/config";

// Initialize Firebase Admin SDK
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Ensure you are authenticated properly
  });
}

export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Get the document ID from the body

    if (!id) {
      return NextResponse.json(
        { message: "Document ID is required" },
        { status: 400 }
      );
    }

    // Delete the participant document from Firestore
    const participantDocRef = doc(db, "participants", id);
    await deleteDoc(participantDocRef);

    // Delete the Firebase Authentication user with the same UID
    await getAuth().deleteUser(id);

    return NextResponse.json(
      { message: "Participant deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting participant:", error);
    return NextResponse.json(
      { message: `Error deleting participant: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
