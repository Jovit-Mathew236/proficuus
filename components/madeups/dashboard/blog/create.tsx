"use client";
import React, { useState, useRef } from "react";
import { RichTextEditor } from "./modules/RichText";
import { useToast } from "@/hooks/use-toast";
import MetaDataForm from "./modules/MetaDataForm";
import { FormSchemaType } from "./modules/MetaDataForm";
import { useRouter } from "next/navigation";

// BlogCreate component
const BlogCreate: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [compressionProgressProfile, setCompressionProgressProfile] =
    useState<number>(0);
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = async (data: FormSchemaType, thumbnail: File | null) => {
    if (!content) {
      setErrorMessage("Content cannot be empty!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      let imageBase64 = "";
      if (thumbnail) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(thumbnail);
        });
      }

      // Process the content and any base64 images
      const imageUrls = Array.from(
        content.matchAll(/<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"/g)
      ).map((match) => match[0]);

      // If there are no images in the content, proceed with form submission
      if (imageUrls.length === 0) {
        await submitForm(data, imageBase64);
        return;
      }

      // Upload the images to the server and replace the base64 URLs with the uploaded ones
      const updatedContent = await uploadImagesAndReplaceURLs(imageUrls);

      // Now submit the form with the updated content
      await submitForm(data, imageBase64, updatedContent);
    } catch (error) {
      setErrorMessage("An error occurred while submitting the post.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the image upload and content update
  const uploadImagesAndReplaceURLs = async (imageUrls: string[]) => {
    let updatedContent = content;

    const uploadPromises = imageUrls.map(async (imageTag) => {
      const base64Url = imageTag.match(/src="([^"]+)"/)?.[1];
      if (!base64Url) return;

      // Send the base64 image to the backend to store it
      const response = await fetch("/api/dashboard/mest/blog/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Url }),
      });

      if (response.ok) {
        const { url } = await response.json();

        // Replace the base64 URL in the content with the new image URL
        updatedContent = updatedContent.replace(base64Url, url);
      } else {
        const result = await response.json();
        alert(result.message);
      }
    });

    // Wait for all images to be uploaded and content to be updated
    await Promise.all(uploadPromises);

    // Return the updated content
    return updatedContent;
  };

  // Function to submit the form
  const submitForm = async (
    data: FormSchemaType,
    imageBase64: string,
    updatedContent: string = content
  ) => {
    // Send the final HTML content to the backend
    const response = await fetch("/api/dashboard/mest/blog/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: updatedContent, // Content of the blog post (updated with image URLs)
        title: data.title, // Title of the blog
        description: data.description, // Description of the blog post
        keywords: data.keywords, // Keywords for SEO
        thumbnail: imageBase64, // Optional base64 thumbnail image (if available)
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Blog post created:", result);
      setContent(""); // Reset content after successful submission
      toast({
        title: "Blog created",
        description: "Your blog has been created successfully",
        duration: 3000,
      });
      router.push("/dashboard/mest/blog");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-4 my-10">
      <div className="w-full md:w-[400px]">
        <MetaDataForm
          onSubmit={onSubmit}
          loading={loading}
          errorMessage={errorMessage}
          compressionProgressProfile={compressionProgressProfile}
          setCompressionProgressProfile={setCompressionProgressProfile}
          setUpdateButtonDisable={setUpdateButtonDisable}
          updateButtonDisable={updateButtonDisable}
          fileInputRef={fileInputRef}
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
        <RichTextEditor content={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default BlogCreate;
