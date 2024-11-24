import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// POST request for user registration
export async function POST(request: NextRequest) {
  try {
    const { name, collage, year, phone, email } = await request.json();

    // Check if the collage is already registered
    const userDocRef = doc(db, "campus-santa", collage);
    const userDocSnap = await getDoc(userDocRef);

    // If document already exists, return an error response
    if (userDocSnap.exists()) {
      return NextResponse.json(
        {
          message:
            "This collage has already been registered by " +
            userDocSnap.data().name,
        },
        { status: 400 } // Bad Request
      );
    }

    // Prepare the data to save
    const userData = {
      name,
      collage,
      year,
      phone,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save user details to Firestore
    await setDoc(userDocRef, userData);

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on registration", error);
    return NextResponse.json(
      { message: `Error on registration: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
