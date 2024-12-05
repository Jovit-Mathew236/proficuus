import { NextResponse } from "next/server";
import { doc, deleteDoc } from "firebase/firestore";
import {
  authenticateAndVerifyUser,
  deleteUserByAdmin,
} from "@/lib/firebase/firebaseAdmin";
import { db } from "@/lib/firebase/config";

export async function DELETE(request: Request) {
  try {
    // Parse the request URL
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Document ID is required" },
        { status: 400 }
      );
    }

    // Authenticate and verify the user first
    const authResult = await authenticateAndVerifyUser(id);

    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        {
          message: "Authentication failed",
          error: authResult.error,
        },
        { status: 401 }
      );
    }

    // Delete user from Firebase Authentication
    const deletionResult = await deleteUserByAdmin(id);

    if (!deletionResult.success) {
      return NextResponse.json(
        {
          message: "Failed to delete user",
          error: deletionResult.error,
        },
        { status: 500 }
      );
    }

    // Delete the participant document from Firestore
    const participantDocRef = doc(db, "participants", id);
    await deleteDoc(participantDocRef);

    return NextResponse.json(
      { message: "Participant deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting participant:", error);

    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    return NextResponse.json(
      {
        message: "Error deleting participant",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
