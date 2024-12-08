import { NextResponse } from "next/server";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import {
  authenticateAndVerifyUserByEmail,
  deleteUserByAdmin,
} from "@/lib/firebase/firebaseAdmin";
import { db } from "@/lib/firebase/config";
import { deleteImageFromCloudinary } from "@/lib/cloudinary"; // Import Cloudinary delete function

export async function DELETE(request: Request) {
  try {
    // Parse the request URL and get the email from query parameters
    const url = new URL(request.url);
    const email = url.searchParams.get("email");

    // Check if the email is valid (not undefined or null)
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Authenticate and verify the user using the email
    const authResult = await authenticateAndVerifyUserByEmail(email);

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
    const volunteerDocRef = doc(db, "volunteers", email);
    const volunteerDocSnap = await getDoc(volunteerDocRef);
    const volunteerData = volunteerDocSnap.data();

    if (volunteerData?.imageUrl) {
      // Delete the image from Cloudinary
      await deleteImageFromCloudinary(volunteerData.imageUrl);
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

    // Delete the volunteer document from Firestore using email
    await deleteDoc(volunteerDocRef);

    return NextResponse.json(
      { message: "Volunteer and image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting volunteer:", error);

    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    return NextResponse.json(
      {
        message: "Error deleting volunteer",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
