import { NextRequest, NextResponse } from "next/server";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      collage,
      year,
      zone,
      phone,
      alternativephone,
      email,
      availability,
      experience,
      ministry,
      image,
    } = await request.json();

    let imageUrl: string | undefined;

    if (image) {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(image.split(",")[1], "base64");

      // Upload image to Cloudinary
      imageUrl = await new Promise<string>((resolve, reject) => {
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
            resolve(result.secure_url); // Ensure we resolve with a string
          }
        );

        // Stream the image buffer to Cloudinary
        stream.end(imageBuffer);
      });
    }

    // Generate a unique ID for the Firestore document
    const userDocRef = doc(db, "volunteers", email); // Use email or another unique identifier

    // Prepare the data to save
    const userData = {
      name,
      collage,
      year,
      zone,
      phone,
      alternativephone,
      availability,
      experience,
      email,
      ministry,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(imageUrl ? { imageUrl } : {}), // Only include imageUrl if it's defined
    };

    // Save user details to Firestore
    await setDoc(userDocRef, userData);

    return NextResponse.json(
      { message: "registration completed", imageUrl },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}

// Uncomment the following block if you need to handle large file uploads
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb",
//     },
//   },
// };
