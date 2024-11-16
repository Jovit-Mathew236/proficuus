"use client";
import React, { useState, useRef } from "react";
import { RichTextEditor } from "./modules/RichText";
import { useToast } from "@/hooks/use-toast";
import MetaDataForm from "./modules/MetaDataForm";
import { FormSchemaType } from "./modules/MetaDataForm";

const BlogCreate: React.FC = () => {
  const { toast } = useToast();
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
      // Submit the form data

      // Example: final submission to backend
      const response = await fetch("/api/dashboard/mest/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          title: data.title,
          description: data.description,
          keywords: data.keywords,
          thumbnail: imageBase64,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Blog created",
          description: "Your blog has been created successfully",
          duration: 3000,
        });
        setContent("");
      } else {
        setErrorMessage(result.message || "An error occurred");
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the post.");
      console.error(error);
    } finally {
      setLoading(false);
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
