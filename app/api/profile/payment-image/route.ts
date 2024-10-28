// app/api/profile/payment-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { doc, updateDoc, getDoc } from "firebase/firestore";
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
    const { image, uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // First, check if the document exists
    const userDocRef = doc(db, "participants", uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    let paymentImageUrl: string | undefined;

    if (image) {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(image.split(",")[1], "base64");
      const imageSize = Buffer.byteLength(imageBuffer);

      // Check if image size exceeds the limit
      if (imageSize > MAX_IMAGE_SIZE) {
        return NextResponse.json(
          {
            message:
              "Image size exceeds 10 MB. Please reduce the size and try again.",
          },
          { status: 400 }
        );
      }

      // Upload image to Cloudinary
      paymentImageUrl = await new Promise<string>((resolve, reject) => {
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

    // Update only the necessary fields
    const updateData = {
      paymentImageUrl: paymentImageUrl,
      paymentUpload: true,
      updatedAt: new Date().toISOString(),
    };

    // Update the document
    await updateDoc(userDocRef, updateData);

    return NextResponse.json(
      {
        message: "Payment image uploaded successfully",
        imageUrl: paymentImageUrl,
      },
      { status: 200 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error uploading payment image:", error);
    return NextResponse.json(
      { message: `Error uploading payment image: ${error.message}` },
      { status: 500 }
    );
  }
}
