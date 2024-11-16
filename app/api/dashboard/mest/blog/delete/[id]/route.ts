import { NextRequest, NextResponse } from "next/server";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import cloudinary from "cloudinary";

// Initialize Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fetchCache = "force-no-store";

export async function DELETE(
  req: NextRequest,
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

    const blogData = blogDoc.data();
    const thumbnailUrl = blogData?.thumbnailUrl;
    const content = blogData?.content || "";

    // Extract public_id from Cloudinary URL if exists for thumbnail
    // Extract public_id from Cloudinary URL if exists for thumbnail
    const cloudinaryPublicIds: string[] = [];

    // 1. Handle thumbnail URL deletion if it exists
    if (thumbnailUrl) {
      const urlParts = thumbnailUrl.split("/");
      const publicId = urlParts[urlParts.length - 1].split(".")[0];
      cloudinaryPublicIds.push(publicId);
    }

    // 2. Extract image URLs from the blog content and add their public_id to the list
    const imageRegex =
      /https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/[^/]+\/([^\.]+)\.([a-z]+)/g;
    const matches = [...content.matchAll(imageRegex)];
    for (const match of matches) {
      if (match && match[1]) {
        cloudinaryPublicIds.push(match[1]);
      }
    }

    // Delete all images from Cloudinary using their public_ids
    await Promise.all(
      cloudinaryPublicIds.map(
        (publicId) =>
          new Promise<void>((resolve, reject) => {
            cloudinary.v2.uploader.destroy(publicId, (error) => {
              if (error) {
                return reject(
                  new Error(
                    `Cloudinary delete failed for ${publicId}: ${error.message}`
                  )
                );
              }
              resolve();
            });
          })
      )
    );

    // 3. Delete the blog post from Firestore
    await deleteDoc(blogRef);

    // Return success response
    return NextResponse.json(
      { message: "Blog post and all images deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: `Error deleting blog: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
