import cloudinary from "cloudinary";

// Initialize Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to delete an image from Cloudinary by public_id
export async function deleteImageFromCloudinary(imageUrl: string) {
  try {
    // Extract public_id from the Cloudinary image URL
    const public_id = imageUrl.split("/").pop()?.split(".")[0]; // Gets the part before the file extension

    if (!public_id) {
      throw new Error("Invalid Cloudinary image URL");
    }

    // Call Cloudinary API to delete the image
    const result = await cloudinary.v2.uploader.destroy(public_id);

    if (result.result === "ok") {
      console.log("Cloudinary image deleted successfully");
      return true;
    } else {
      throw new Error("Failed to delete Cloudinary image");
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw new Error("Error deleting image from Cloudinary");
  }
}
