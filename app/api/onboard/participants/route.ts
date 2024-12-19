// app/api/profile/payment-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
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

    // Get the first matching document
    const userData = querySnapshot.docs[0].data();

    return NextResponse.json(
      {
        message: "User data fetched successfully",
        user: userData,
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
