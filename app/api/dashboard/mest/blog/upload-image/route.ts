import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

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
    const imageUrl = await new Promise<string>((resolve, reject) => {
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

    return NextResponse.json({ url: imageUrl }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image", error);
    return NextResponse.json(
      { message: `Error uploading image: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
