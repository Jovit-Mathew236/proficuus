import { NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.

export async function GET() {
  try {
    // Create a query with sorting by 'updatedAt' (assuming it's the field you want to sort by)
    const q = query(collection(db, "volunteers"), orderBy("createdAt"));

    // Fetch the data based on the query
    const querySnapshot = await getDocs(q);
    const volunteers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Prepare the response
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
