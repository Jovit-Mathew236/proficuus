"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { RichTextEditor } from "./modules/RichText";
import MetaDataForm from "./modules/MetaDataForm";
import { FormSchemaType } from "./modules/MetaDataForm";
import { useToast } from "@/hooks/use-toast";
import { BlogData } from "../../home/blogs/blog";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const EditPage = ({ id }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const [blogData, setBlogData] = useState<BlogData>();
  const [content, setContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  //   const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/dashboard/mest/blog/get/${id}`);
        const data = await response.json();
        if (response.ok) {
          setBlogData(data);
          setContent(data.content); // Set initial content for the editor
        } else {
          setErrorMessage(data.message || "Error fetching blog data");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setErrorMessage("Error loading blog data");
      }
    };

    fetchBlogData();
  }, [id]);

  const onSubmit = async (data: FormSchemaType, thumbnail: File | null) => {
    if (!content) {
      setErrorMessage("Content cannot be empty!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      let thumbnailUrl = blogData?.thumbnailUrl; // Start with the existing thumbnail URL

      // If a new thumbnail image is provided, convert it to base64
      if (thumbnail && thumbnail instanceof File) {
        const reader = new FileReader();

        // Return a Promise from the FileReader
        thumbnailUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string); // Convert to base64
          reader.onerror = reject;
          reader.readAsDataURL(thumbnail); // This works only if thumbnail is a File
        });
      }

      // Submit the edited blog data
      const response = await fetch(`/api/dashboard/mest/blog/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          title: data.title,
          description: data.description,
          keywords: data.keywords,
          thumbnailUrl, // Use the original URL or the base64 image
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Blog updated",
          description: "Your blog has been updated successfully",
          duration: 3000,
        });
        router.push("/dashboard/mest/blog");
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

  if (!blogData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-4 my-10">
      <div className="w-full md:w-[400px]">
        <MetaDataForm
          onSubmit={onSubmit}
          loading={loading}
          errorMessage={errorMessage}
          compressionProgressProfile={0} // Set this value according to your needs
          setCompressionProgressProfile={() => {}}
          setUpdateButtonDisable={() => {}}
          updateButtonDisable={false}
          fileInputRef={React.createRef()}
          initialData={{
            title: blogData.title,
            description: blogData.description,
            keywords: blogData.keywords || [],
            thumbnailUrl: blogData.thumbnailUrl, // Pass the existing thumbnail URL
          }}
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
        <RichTextEditor content={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default EditPage;
