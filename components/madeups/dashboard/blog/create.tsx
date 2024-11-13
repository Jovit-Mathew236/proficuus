"use client";
import React, { useRef, useState } from "react";
import { RichTextEditor } from "./modules/RichText"; // Import the RichTextEditor component
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
const defaultValues: Partial<FormSchema> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

const BlogCreate: React.FC = () => {
  const [value, setValue] = useState(""); // State to store the content of the editor
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [compressionProgressProfile, setCompressionProgressProfile] =
    useState<number>(0);
  const [updateButtonDisable, setUpdateButtonDisable] =
    useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<FormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    formKey: typeof defaultValues & keyof FormSchema,
    progressHandler: (progress: number) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
    setUpdateButtonDisable(true);

    const file = event.target.files ? event.target.files[0] : null;
    field.onChange(file);

    // Create a preview URL

    // const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      // const previewUrl = URL.createObjectURL(file);
      // setImagePreview(previewUrl);
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 4,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          fileType: file.type,
          onProgress: progressHandler,
        });

        const compressedFileWithOriginalName = new File(
          [compressedFile],
          file.name,
          {
            type: file.type,
          }
        );
        form.setValue(formKey, compressedFileWithOriginalName);
        // console.log(compressedFileWithOriginalName, compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    } else {
      form.setValue(formKey, "");
      setUpdateButtonDisable(false);
    }
  };

  const imageLoaderProfile = (progress: number) => {
    setCompressionProgressProfile(progress);
    if (progress === 100) {
      setUpdateButtonDisable(false);
    }
  };
  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
    handleImageUpload(event, "thumbnail", imageLoaderProfile, field);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("hi");

    if (!value) {
      alert("Content cannot be empty!");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      console.log(
        value,
        data.title,
        data.description,
        data.thumbnail,
        data.keywords,
        tags
      );

      // Find all base64 image URLs in the editor content
      // const imageUrls = Array.from(
      //   value.matchAll(/<img[^>]+src="data:image\/[^;]+;base64,([^"]+)"/g)
      // ).map((match) => match[0]);

      // // Upload the images to the server
      // const uploadPromises = imageUrls.map(async (imageTag) => {
      //   const base64Url = imageTag.match(/src="([^"]+)"/)?.[1];
      //   if (!base64Url) return;

      //   // Send the base64 image to the backend to store it
      //   const response = await fetch("/api/dashboard/mest/blog/upload-image", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ image: base64Url }),
      //   });

      //   if (response.ok) {
      //     const { url } = await response.json();
      //     // Replace the base64 URL with the uploaded image URL in the content
      //     // Instead of reassigning `value`, use `setValue` to update the state
      //     setValue((prevValue) => prevValue.replace(base64Url, url));
      //   } else {
      //     alert("Image upload failed.");
      //   }
      // });

      // // Wait for all images to be uploaded
      // await Promise.all(uploadPromises);

      // // Send the final HTML content to the backend
      // const response = await fetch("/api/dashboard/mest/blog/create", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ content: value }),
      // });

      // const result = await response.json();
      // if (response.ok) {
      //   alert("Blog post created successfully!");
      //   setValue(""); // Reset content after successful submission
      // } else {
      //   alert(`Error: ${result.message}`);
      // }
    } catch (error) {
      alert("An error occurred while submitting the post.");
      console.error(error);
    }
  };

  return (
    <div className=" mx-auto flex flex-col md:flex-row gap-4 my-10">
      <div className="w-full md:w-[400px]">
        {/* TODO: create form fields Title,small description,thumbnail,keywords */}
        <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm ">
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className=" space-y-4"
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
                {/* Handling Tags with Controller */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({}) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <TagsInput
                          tags={tags}
                          setTags={setTags}
                          editTag={false}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="max-w-md mx-auto mt-10">
                  <p className="text-sm">Current Tags:</p>
                  <div className="flex gap-2 mt-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs text-gray-700 bg-gray-200 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload the thumbnail image</FormLabel>
                      <FormControl>
                        <div
                          className="flex items-center justify-center w-full h-12 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition duration-200 bg-secondary"
                          onClick={() => fileInputRef.current!.click()} // Trigger file input on div click
                        >
                          <span className="text-foreground">
                            Click to upload an image
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleProfileImageUpload(e, field)} // Update handler to use the new function
                            className="hidden"
                            ref={fileInputRef}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        This image is for the blog post preview
                        {/* <span className="text-red-500">AND UPLOAD A MAX 4 MB File</span> */}
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
      <div>
        <h1 className="text-2xl font-bold mb-4">Create New Blog Post</h1>
        <RichTextEditor content={value} onChange={setValue} />{" "}
        {/* Pass state and setter to the RichTextEditor */}
      </div>
    </div>
  );
};

export default BlogCreate;
