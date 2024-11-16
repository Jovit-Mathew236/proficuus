import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export const fetchCache = "force-no-store";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Get the reference to the blog document by id
    const blogRef = doc(db, "blogs", id);
    const blogDoc = await getDoc(blogRef);

    if (!blogDoc.exists()) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Return the blog data if found
    return NextResponse.json(
      {
        id: blogDoc.id,
        ...blogDoc.data(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: `Error fetching blog: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
