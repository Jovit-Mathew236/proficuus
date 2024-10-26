import { NextRequest, NextResponse } from "next/server";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import cloudinary from "cloudinary";
import { Resend } from "resend";
import { EmailTemplateParticipant } from "@/components/email-template-participant";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

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
      expectation,
      experience,
      image,
    } = await request.json();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      phone
    );
    const user = userCredential.user;

    let imageUrl: string | undefined;

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
            resolve(result.secure_url);
          }
        );
        // Stream the image buffer to Cloudinary
        stream.end(imageBuffer);
      });
    }

    // Generate a unique ID for the Firestore document
    const userDocRef = doc(db, "participants", user.uid);

    // Prepare the data to save
    const userData = {
      name,
      collage,
      year,
      zone,
      phone,
      alternativephone,
      expectation,
      experience,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(imageUrl ? { imageUrl } : {}),
    };

    // Save user details to Firestore
    await setDoc(userDocRef, userData);

    // Send email notification
    try {
      const { data, error } = await resend.emails.send({
        from: "Proficuus <onboarding@proficuus.jymest.com>",
        to: [email],
        subject: "Registration Successful",
        react: EmailTemplateParticipant({
          firstName: name,
        }),
      });

      if (error) {
        return Response.json(
          { error, message: "Error on sending email" },
          { status: 500 }
        );
      }
      if (!error) {
        return Response.json({ data }, { status: 200 });
      }
      return NextResponse.json(
        { message: "Registration completed", imageUrl },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error details:", error); // Log the error for debugging
      return NextResponse.json(
        {
          error: (error as Error).message || error,
          message: "Error on sending email 2",
        },
        { status: 500 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error on registration", error);
    return NextResponse.json(
      { message: `Error on registration: ${error.message}` },
      { status: 500 }
    );
  }
}
