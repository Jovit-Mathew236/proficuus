"use client";
import React, { useRef, useState } from "react";
import { RichTextEditor } from "./modules/RichText";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TagsInput } from "@/components/ui/tags-input";
import { Progress } from "@/components/ui/progress";
import imageCompression from "browser-image-compression";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must not be longer than 1000 characters.",
    }),
  thumbnail: z.any().optional(),
  keywords: z.array(z.string().min(1, "Tag cannot be empty")).max(10, {
    message: "You can only add up to 10 tags.",
  }),
});

type FormSchema = z.infer<typeof FormSchema>;

const BlogCreate: React.FC = () => {
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [compressionProgressProfile, setCompressionProgressProfile] =
    useState<number>(0);
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: [],
      thumbnail: undefined,
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
    setUpdateButtonDisable(true);
    const file = event.target.files ? event.target.files[0] : null;
    field.onChange(file);

    if (file) {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 4,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          fileType: file.type,
          onProgress: (progress) => {
            setCompressionProgressProfile(progress);
            if (progress === 100) {
              setUpdateButtonDisable(false);
            }
          },
        });

        const compressedFileWithOriginalName = new File(
          [compressedFile],
          file.name,
          {
            type: file.type,
          }
        );
        form.setValue("thumbnail", compressedFileWithOriginalName);
      } catch (error) {
        console.error("Image compression error:", error);
        setUpdateButtonDisable(false);
      }
    } else {
      form.setValue("thumbnail", undefined);
      setUpdateButtonDisable(false);
    }
  };

  const onSubmit = async (data: FormSchema) => {
    if (!content) {
      setErrorMessage("Content cannot be empty!");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Log the complete form data including content
      console.log({
        ...data,
        content,
      });

      let imageBase64 = "";
      if (data.thumbnail) {
        // Convert image to Base64 if thumbnail is provided
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(data.thumbnail as File);
        });
      }

      // Find all base64 image URLs in the editor content
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
    data: FormSchema,
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
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="mx-auto flex flex-col md:flex-row gap-4 my-10">
      <div className="w-full md:w-[400px]">
        <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <h1 className="text-xl font-bold">Meta Data</h1>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Blog description"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagsInput
                          tags={field.value}
                          setTags={(newTags) => field.onChange(newTags)}
                          editTag={false}
                        />
                      </FormControl>
                      <FormMessage />
                      <div className="mt-2">
                        <p className="text-sm">Current Tags:</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {field.value.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload the thumbnail image</FormLabel>
                      <FormControl>
                        <div
                          className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition duration-200 bg-secondary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <span className="text-foreground">
                            Click to upload an image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, field)}
                            className="hidden"
                            ref={fileInputRef}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        This image is for the blog post preview
                      </FormDescription>
                      <Progress value={compressionProgressProfile} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={loading || updateButtonDisable}>
                  {loading ? "Publishing..." : "Publish"}
                </Button>

                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
        <RichTextEditor content={content} onChange={setContent} />
      </div>
    </div>
  );
};

export default BlogCreate;
