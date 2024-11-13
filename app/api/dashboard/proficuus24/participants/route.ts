export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET() {
  try {
    const participantsRef = collection(db, "participants");
    const snapshot = await getDocs(participantsRef);

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
