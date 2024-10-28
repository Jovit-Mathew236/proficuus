import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ message: "UID is required" }, { status: 400 });
    }

    const userDocRef = doc(db, "participants", uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const userData = {
      id: userDoc.id,
      ...userDoc.data(),
    };

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
