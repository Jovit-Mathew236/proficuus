export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.
import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET(req: NextRequest) {
  try {
    // Extract the UID from the query parameters
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    // Validate UID presence
    if (!uid) {
      return NextResponse.json({ message: "UID is required" }, { status: 400 });
    }

    // Get the document by UID
    const userDocRef = doc(db, "volunteers", uid);
    const userDoc = await getDoc(userDocRef);

    // Check if the document exists
    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
    };

    const response = NextResponse.json(userData, { status: 200 });

    // Disable caching by setting cache control headers
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0 must-revalidate"
    );
    // Add Vercel-specific header to prevent caching
    response.headers.set(
      "Vercel-CDN-Cache-Control",
      "no-store, max-age=0 must-revalidate"
    );
    // Add a timestamp to force uniqueness
    response.headers.set("Last-Modified", new Date().toUTCString());

    return response;
  } catch (error) {
    console.error("Error fetching user details", error);
    return NextResponse.json(
      { message: "Error fetching user details" },
      { status: 500 }
    );
  }
}
