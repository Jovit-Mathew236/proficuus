import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

// Disable caching and ISR
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    // Get the query parameter 'id' from the URL
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing 'id' query parameter" },
        { status: 400 }
      );
    }

    // Get the reference to the specific blog document
    const blogDocRef = doc(db, "blogs", id);

    // Fetch the blog document
    const blogDoc = await getDoc(blogDocRef);

    if (!blogDoc.exists()) {
      // If the document doesn't exist, return a 404 response
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    // Return the blog data, including the ID and the document data
    const blog = { id: blogDoc.id, ...blogDoc.data() };

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { message: `Error fetching blog: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
