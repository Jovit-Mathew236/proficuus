import { NextRequest, NextResponse } from "next/server";
import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Initialize an object to hold user data
    let userData = null;

    // Search in the participants collection by email
    const participantsQuery = query(
      collection(db, "participants"),
      where("email", "==", email)
    );
    const participantSnapshot = await getDocs(participantsQuery);

    if (!userData && !participantSnapshot.empty) {
      const participantDoc = participantSnapshot.docs[0]; // assuming email is unique in participants collection
      userData = {
        id: participantDoc.id,
        ...participantDoc.data(),
      };
    }

    // If no user data from participants, search the volunteers collection by email
    if (!userData) {
      const volunteersQuery = query(
        collection(db, "volunteers"),
        where("email", "==", email)
      );
      const volunteerSnapshot = await getDocs(volunteersQuery);

      if (!volunteerSnapshot.empty) {
        const volunteerDoc = volunteerSnapshot.docs[0]; // assuming email is unique in volunteers collection
        userData = {
          id: volunteerDoc.id,
          ...volunteerDoc.data(),
        };
      }
    }

    // If no user is found in both collections
    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
        "Vercel-CDN-Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { message: "Error fetching user details" },
      { status: 500 }
    );
  }
}
