import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { collegeName, email } = await request.json();

    if (!collegeName) {
      return NextResponse.json(
        { message: "College name is required." },
        { status: 400 }
      );
    }

    // Check if the user is a coordinator in either "participants" or "volunteers"
    const userQueryParticipants = query(
      collection(db, "participants"),
      where("email", "==", email)
    );
    const userQueryVolunteers = query(
      collection(db, "volunteers"),
      where("email", "==", email)
    );

    // Get user data from both collections in parallel
    const [userSnapshotParticipants, userSnapshotVolunteers] =
      await Promise.all([
        getDocs(userQueryParticipants),
        getDocs(userQueryVolunteers),
      ]);

    let userDoc = null;

    // Check if user is found in "participants" collection
    if (!userSnapshotParticipants.empty) {
      userDoc = userSnapshotParticipants.docs[0].data();
    }
    // Check if user is found in "volunteers" collection
    else if (!userSnapshotVolunteers.empty) {
      userDoc = userSnapshotVolunteers.docs[0].data();
    }

    if (!userDoc) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (!userDoc.isCoordinator) {
      return NextResponse.json(
        { message: "User is not a coordinator." },
        { status: 403 }
      );
    }

    // If user is a coordinator, fetch participants from the specified college
    const participantsRef = collection(db, "participants");
    const participantsQuery = query(
      participantsRef,
      where("collage", "==", collegeName)
    );
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
