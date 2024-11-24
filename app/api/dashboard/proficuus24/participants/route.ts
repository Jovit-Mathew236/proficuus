import { NextResponse } from "next/server";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.

export async function GET() {
  try {
    const participantsRef = collection(db, "participants");

    // Create a query to order the documents by 'updatedAt'
    const participantsQuery = query(participantsRef, orderBy("createdAt"));

    // Fetch the data based on the query
    const snapshot = await getDocs(participantsQuery);

    const participants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      { message: `Error fetching participants: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
