"use client";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TagsInput } from "@/components/ui/tags-input";
import { Progress } from "@/components/ui/progress";
import imageCompression from "browser-image-compression";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

// Define the schema for validation
const FormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." })
    .max(1000, {
      message: "Description must not be longer than 1000 characters.",
    }),
  thumbnailUrl: z.any().optional(),
  keywords: z.array(z.string().min(1, "Tag cannot be empty")).max(10, {
    message: "You can only add up to 10 tags.",
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

// Define the props for the MetaDataForm component
interface MetaDataFormProps {
  onSubmit: (data: FormSchemaType, file: File | null) => void;
  loading: boolean;
  errorMessage: string;
  compressionProgressProfile: number;
  setCompressionProgressProfile: React.Dispatch<React.SetStateAction<number>>;
  setUpdateButtonDisable: React.Dispatch<React.SetStateAction<boolean>>;
  updateButtonDisable: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  initialData?: FormSchemaType; // Add initialData as an optional prop for pre-filling the form
}

const MetaDataForm: React.FC<MetaDataFormProps> = ({
  onSubmit,
  loading,
  errorMessage,
  compressionProgressProfile,
  setCompressionProgressProfile,
  setUpdateButtonDisable,
  updateButtonDisable,
  fileInputRef,
  initialData, // Use initialData to pre-fill the form
}) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      keywords: [],
      thumbnailUrl: undefined,
    },
  });

  // Handle image upload and compression
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any
  ) => {
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
        form.setValue("thumbnailUrl", compressedFileWithOriginalName);
      } catch (error) {
        console.error("Image compression error:", error);
        setUpdateButtonDisable(false);
      }
    } else {
      form.setValue("thumbnailUrl", undefined);
      setUpdateButtonDisable(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-purple-500/5 to-blue-500/5 backdrop-blur-sm">
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              onSubmit(data, form.getValues().thumbnailUrl)
            )}
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
              name="thumbnailUrl"
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
  );
};

export default MetaDataForm;
