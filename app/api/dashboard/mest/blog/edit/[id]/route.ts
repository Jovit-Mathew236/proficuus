import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { content, title, description, keywords, thumbnailUrl } =
      await request.json();

    let newthumbnailUrl: string | undefined;

    // If a thumbnail is provided as a base64 string, upload it to Cloudinary
    if (
      thumbnailUrl &&
      !thumbnailUrl.startsWith("https://res.cloudinary.com")
    ) {
      // Convert base64 to buffer if it's not a URL
      const imageBuffer = Buffer.from(thumbnailUrl.split(",")[1], "base64");
      const imageSize = Buffer.byteLength(imageBuffer);

      // Check if image size exceeds the limit
      if (imageSize > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          {
            message:
              "Thumbnail image size exceeds 10 MB. Please reduce the size and try again.",
          },
          { status: 400 }
        );
      }

      // Upload the thumbnail image to Cloudinary
      newthumbnailUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { resource_type: "image", format: "webp", quality: 80 },
          (error, result) => {
            if (error) {
              return reject(
                new Error("Cloudinary upload failed: " + error.message)
              );
            }
            if (!result || !result.secure_url) {
              return reject(new Error("Upload did not return a valid URL"));
            }
            resolve(result.secure_url);
          }
        );
        // Stream the image buffer to Cloudinary
        stream.end(imageBuffer);
      });
    } else if (thumbnailUrl) {
      // If the thumbnail is already a Cloudinary URL (not a base64 string), use it directly
      newthumbnailUrl = thumbnailUrl;
    }

    // Get the reference to the blog document from Firebase Firestore
    const blogDocRef = doc(db, "blogs", params.id); // `params.id` is the blog ID from the URL

    // Prepare the updated blog data
    const blogData = {
      title,
      description,
      keywords,
      content,
      thumbnailUrl: newthumbnailUrl,
      updatedAt: new Date().toISOString(),
    };

    // Update the blog post in Firestore
    await updateDoc(blogDocRef, blogData);

    return NextResponse.json(
      { message: "Blog post updated successfully", blogData },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: `Error updating blog post: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
