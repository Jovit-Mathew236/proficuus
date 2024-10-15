import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "volunteers"));
    const volunteers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = NextResponse.json(volunteers, { status: 200 });

    // Disable caching by setting cache control headers
    response.headers.set("Cache-Control", "no-store, max-age=0");

    return response;
  } catch (error) {
    console.error("Error fetching volunteers", error);
    return NextResponse.json(
      { message: "Error fetching volunteers" },
      { status: 500 }
    );
  }
}
