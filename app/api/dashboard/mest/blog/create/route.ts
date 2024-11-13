import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const { content, title, description, keywords, thumbnail } =
      await request.json();

    let thumbnailUrl: string | undefined;

    // If a thumbnail is provided, handle image upload to Cloudinary
    if (thumbnail) {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(thumbnail.split(",")[1], "base64");
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
      thumbnailUrl = await new Promise<string>((resolve, reject) => {
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
    }

    // Generate a unique ID for the Firestore document
    const blogDocRef = doc(db, "blogs", title);

    // Prepare the blog data
    const blogData = {
      title,
      description,
      keywords,
      content,
      thumbnailUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save the blog post to Firestore
    await setDoc(blogDocRef, blogData);

    return NextResponse.json(
      { message: "Blog post created successfully", blogData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { message: `Error creating blog post: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
