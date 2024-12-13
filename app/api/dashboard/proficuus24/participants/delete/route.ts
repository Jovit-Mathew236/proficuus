import { NextResponse } from "next/server";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import {
  authenticateAndVerifyUserByEmail,
  deleteUserByAdmin,
} from "@/lib/firebase/firebaseAdmin";
import { db } from "@/lib/firebase/config";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";

export async function DELETE(request: Request) {
  try {
    // Parse the request URL and get the UID from query parameters
    const url = new URL(request.url);
    const uid = url.searchParams.get("id");

    if (!uid) {
      return NextResponse.json(
        { message: "Document ID (UID) is required" },
        { status: 400 }
      );
    }

    // Authenticate and verify the user using the UID
    const authResult = await authenticateAndVerifyUserByEmail(uid);

    // Handle the case where authentication fails
    if (!authResult.isAuthenticated) {
      return NextResponse.json(
        {
          message: "Authentication failed",
          error: authResult.error,
        },
        { status: 401 }
      );
    }

    // Ensure user is not null before accessing its UID
    const user = authResult.user;
    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Get the imageUrl from the user's Firestore document
    const participantDocRef = doc(db, "participants", user.uid);
    const participantDocSnap = await getDoc(participantDocRef);
    const participantData = participantDocSnap.data();

    if (participantData?.imageUrl) {
      // Delete the image from Cloudinary
      await deleteImageFromCloudinary(participantData.imageUrl);
    }

    // Delete user from Firebase Authentication using email
    const deletionResult = await deleteUserByAdmin(user.uid);

    if (!deletionResult.success) {
      return NextResponse.json(
        {
          message: "Failed to delete user",
          error: deletionResult.error,
        },
        { status: 500 }
      );
    }

    // Delete the participant document from Firestore using UID
    await deleteDoc(participantDocRef);

    return NextResponse.json(
      { message: "Participant and image deleted successfully" },
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
