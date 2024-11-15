export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.
import { NextResponse } from "next/server";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET() {
  try {
    // Create a query with a limit higher than your expected document count
    const q = query(collection(db, "volunteers"));

    const querySnapshot = await getDocs(q);
    const volunteers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = NextResponse.json(volunteers, { status: 200 });

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
    console.error("Error fetching volunteers", error);
    return NextResponse.json(
      { message: "Error fetching volunteers" },
      { status: 500 }
    );
  }
}
