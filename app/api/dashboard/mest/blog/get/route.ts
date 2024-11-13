export const fetchCache = "force-no-store";
export const revalidate = 0; // To disable ISR.
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export async function GET() {
  try {
    const blogsRef = collection(db, "blogs");
    const snapshot = await getDocs(blogsRef);

    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { message: `Error fetching blogs: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
